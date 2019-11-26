const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');

require('dotenv').config();

PLATFORM_API_URL = "https://platform.segmentapis.com"

const slugify = (displayName) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.','-')

  if (slug === '-net') slug = 'net'
  if (slug === 'roku-alpha') slug = 'roku'

  return slug
}

const getCatalog = async (url, page_token = "") => {
  try {
   const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PLATFORM_API_TOKEN}`
      },
      params: {
        page_token,
        page_size: 100
      }
    });
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getConnectionModes = (destination) => {
  let connectionModes = {
    device: {
      web: false,
      mobile: false,
      server: false
    },
    cloud: {
      web: false,
      mobile: false,
      server: false
    }
  }
  destination.components.forEach(component => {
    switch (component.type) {
      case 'IOS':
        connectionModes.device.mobile = true
        break
      case 'ANDROID':
        connectionModes.device.mobile = true
        break
      case 'WEB':
        if (destination.browserUnbundlingSupported && destination.browserUnbundlingPublic) {
          connectionModes.cloud.web = true
        }
        connectionModes.device.web = true
        break
      case 'SERVER':
        connectionModes.cloud.mobile = true
        if (destination.platforms.server) {
          connectionModes.cloud.server = true
        }
        if (destination.platforms.browser) {
          connectionModes.cloud.web = true
        }
        break
      case 'CLOUD':
        connectionModes.cloud.mobile = true
        if (destination.platforms.server) {
          connectionModes.cloud.server = true
        }
        if (destination.platforms.browser) {
          connectionModes.cloud.web = true
        }
        break
    }  
  })
  return connectionModes
}

/**
 * 
 * If catalog item does not exist, create folder and index.md file for it, and record it as incomplete for later fill in
 */
const doesCatalogItemExist = (item) => {
  const docsPath = `src/${item.url}`

  if (!fs.existsSync(docsPath)) {
    console.log(`${item.slug} does not exist: ${docsPath}`)
    let content =`---\ntitle: '${item.display_name} Source'\nhidden: true\n---`
    if (!docsPath.includes('/sources/')) {
      let betaFlag = ''
      if (item.status === 'PUBLIC_BETA') {
        betaFlag = 'beta: true\n'
      }
      content =`---\ntitle: '${item.display_name} Destination'\nhidden: true\n${betaFlag}--- %}`
    }
    fs.mkdirSync(docsPath)
    fs.writeFileSync(`${docsPath}/index.md`, content)
    fs.appendFileSync('src/_data/catalog/incompleteDocs.txt', `${docsPath}\n`)
  }
}

const isCatalogItemHidden = (itemURL) => {
  const f = fm(fs.readFileSync(path.resolve('src', itemURL, 'index.md'), 'utf8'));
  if (f.attributes.hidden) return true
  return false
}

const updateSources = async () => {
  let sources = []
  let sourcesUpdated = []
  let categories = new Set();
  let sourceCategories = []
  let nextPageToken = null

  while (nextPageToken !== "") {
    const res = await getCatalog(`${PLATFORM_API_URL}/v1beta/catalog/sources`, nextPageToken)
    sources = sources.concat(res.sources)
    nextPageToken = res.next_page_token
  }

  sources.sort((a, b) => {
    if(a.display_name < b.display_name) { return -1; }
    if(a.display_name > b.display_name) { return 1; }
    return 0;
  })

  const libraryCategories = [
    'server',
    'mobile',
    'ott',
    'roku',
    'website'
  ]

  sources.forEach(source => {
    let slug = slugify(source.display_name)
    let url = ''
    let mainCategory = source.categories[0] ? source.categories[0].toLowerCase() : ''

    if (libraryCategories.includes(mainCategory)) {
      url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`
    } else {
      url = `connections/sources/catalog/cloud-apps/${slug}`
    }

    let updatedSource = {
      display_name: source.display_name,
      slug,
      name: source.name,
      description: source.description,
      url,
      logo: {
        url: source.logos.logo
      },
      mark: {
        url: source.logos.mark
      },
      categories: source.categories
    }
    sourcesUpdated.push(updatedSource)
    doesCatalogItemExist(updatedSource)
    // add unique source categories to set
    source.categories.reduce((s, e) => s.add(e), categories);
  })

  const sourceArray = Array.from(categories)
  sourceArray.forEach(category => {
    sourceCategories.push({
      display_name: category,
      slug: slugify(category)
    })
  })

  // Create source catalog yaml file
  const options = { noArrayIndent: true };
  let output = yaml.safeDump({ items: sourcesUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources.yml`), output);

  // Create source-category mapping yaml file 
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  output += yaml.safeDump({ items: sourceCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/source_categories.yml`), output);
}

const updateDestinations = async () => {
  let destinations = []
  let destinationsUpdated = []
  let destinationCategories = []
  let categories = new Set()
  let nextPageToken = null

  while (nextPageToken !== "") {
    const res = await getCatalog(`${PLATFORM_API_URL}/v1beta/catalog/destinations`, nextPageToken)
    destinations = destinations.concat(res.destinations)
    nextPageToken = res.next_page_token
  }
  destinations.sort((a, b) => {
    if(a.display_name < b.display_name) { return -1; }
    if(a.display_name > b.display_name) { return 1; }
    return 0;
  })
  destinations.forEach(destination => {
    let slug = slugify(destination.display_name)

    let tempCategories = [destination.categories.primary, destination.categories.secondary, ...destination.categories.additional]
    tempCategories = tempCategories.filter(category => category != '')

    let connection_modes = getConnectionModes({
      components: destination.components,
      platforms: destination.platforms,
      browserUnbundlingSupported: destination.browserUnbundlingSupported,
      browserUnbundlingPublic: destination.browserUnbundlingPublic
    })
    
    let url = `connections/destinations/catalog/${slug}`
    
    let updatedDestination = {
      display_name: destination.display_name,
      slug,
      name: destination.name,
      description: destination.description,
      hidden: isCatalogItemHidden(url),
      url,
      status: destination.status,
      logo:  {
        url: destination.logos.logo
      },
      mark: {
        url: destination.logos.mark
      },
      categories: tempCategories,
      components: destination.components,
      platforms: destination.platforms,
      browserUnbundlingSupported: destination.browserUnbundlingSupported,
      browserUnbundlingPublic: destination.browserUnbundlingPublic,
      settings: destination.settings,
      connection_modes
    }

    destinationsUpdated.push(updatedDestination)
    doesCatalogItemExist(updatedDestination)
    
    // add unique destination categories to set
    tempCategories.reduce((s, e) => s.add(e), categories);

  })

  const destinationArray = Array.from(categories)
  destinationArray.forEach(category => {
    destinationCategories.push({
      display_name: category,
      slug: slugify(category)
    })
  })

  // Create destination catalog yaml file
  const options = { noArrayIndent: true };
  let output = yaml.safeDump({ items: destinationsUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations.yml`), output);
   // Create source-category mapping yaml file 
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  output += yaml.safeDump({ items: destinationCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destination_categories.yml`), output);
}

updateSources()
updateDestinations()