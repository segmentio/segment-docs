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
  if (slug === 'talon-one') slug = 'talonone'
  if (slug === 'roku-alpha') slug = 'roku'
  if (slug === 'shopify-by-littledata') slug = 'shopify-littledata'
  if (slug === 'talon-one') slug = 'talonone'
  if (slug == 'google-adwords-remarketing-lists-customer-match') slug = 'adwords-remarketing-lists'
  if (slug == 'canny-classic') slug = 'canny'
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
    },
    summary: "testing",
    cmode_type: ""
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
        if (destination.browserUnbundlingSupported) {
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

  // summarize connection modes in plain english.
  // start with no-cloud
  if (connectionModes.cloud.web == false && connectionModes.cloud.mobile == false && connectionModes.cloud.server == false){
    // first check if no info at all available - these need backfill
    if (connectionModes.device.web == false && connectionModes.device.mobile == false) {
      connectionModes.summary = "No connection mode information available."
      connectionModes.case = "0"
      connectionModes.cmode_type = "none"
    }
    // handle has-device-modes: three cases
    else if (connectionModes.device.web == true || connectionModes.device.mobile == true){
      connectionModes.cmode_type = "device-only"
      if (connectionModes.device.web == true && connectionModes.device.mobile == true) {
        connectionModes.summary = "accepts device-mode data from both Analytics.js and mobile sources. It does not accept data in cloud-mode."
        connectionModes.case = "1"
      }
      if (connectionModes.device.web == true && connectionModes.device.mobile == false) {
        connectionModes.summary = "accepts device-mode data only from Analytics.js."
        connectionModes.case = "2"
      }
      if (connectionModes.device.web == false && connectionModes.device.mobile == true) {
        connectionModes.summary = "accepts device-mode data only from a mobile source."
        connectionModes.case = "3"
      }
    }

  }
  //next check if all are true.
  else if (connectionModes.cloud.web == true && connectionModes.cloud.mobile == true && connectionModes.cloud.server == true && connectionModes.device.web == true && connectionModes.device.mobile == true) {
    connectionModes.cmode_type = "all"
    connectionModes.summary = "accepts cloud-mode data from all Segment source types. It can accept device-mode data from both web and mobile sources."
    connectionModes.case = "4"
  }

  //next handle all cloud-only (no-device-mode) cases
  else if ((connectionModes.device.web == false && connectionModes.device.mobile == false) && (connectionModes.cloud.web == true || connectionModes.cloud.mobile == true || connectionModes.cloud.server == true)) {
    connectionModes.cmode_type = "cloud-only"
    // accepts all cloud-mode
    if (connectionModes.cloud.web == true && connectionModes.cloud.mobile == true && connectionModes.cloud.server == true){
      connectionModes.summary = "accepts cloud-mode data from all Segment source types. It does not offer device-mode connections."
      connectionModes.case = "5"
    }
    //edge-case-y: only mobile and server cloud
    else if (connectionModes.cloud.web == false && connectionModes.cloud.mobile == true && connectionModes.cloud.server == true){
      connectionModes.summary = "accepts data from any Segment mobile or server source in cloud mode. It does not accept data from a web source, and does not offer device-mode connections."
      connectionModes.case = "6"
    }
    //edge-case-y: web and mobile cloud, no server.
    else if (connectionModes.cloud.web == true && connectionModes.cloud.mobile == true && connectionModes.cloud.server == false){
      connectionModes.summary = "accepts only cloud-mode data from web and mobile sources."
      connectionModes.case = "7"
    }
    //edge-case-y: mobile cloud only.
    else if (connectionModes.cloud.web == false && connectionModes.cloud.mobile == true && connectionModes.cloud.server == false){
      connectionModes.summary = "accepts only cloud-mode data from mobile sources."
      connectionModes.case = "8"
    }
  }

  //handle mixed-case - in the dossier, use the case, or type: "mixed" to invoke a check for what type of device mode
  else if ((connectionModes.cloud.web == true || connectionModes.cloud.mobile == true || connectionModes.cloud.server == true) && (connectionModes.device.mobile == true || connectionModes.device.web == true)){
// remove "both" as that would be covered under ALL
    if (!(connectionModes.device.mobile == true && connectionModes.device.web == true)){
      connectionModes.cmode_type = "mixed"
      // all cloud-mode plus one device
      if ((connectionModes.cloud.web == true && connectionModes.cloud.mobile == true && connectionModes.cloud.server == true) && (connectionModes.device.mobile == true || connectionModes.device.web == true)){
        if (connectionModes.device.mobile == true || connectionModes.device.web == false){
          connectionModes.summary = "accepts data in cloud-mode from all source types, and can accept data in device-mode from mobile sources."
        }
        else if (connectionModes.device.mobile == false || connectionModes.device.web == true){
          connectionModes.summary = "accepts data in cloud-mode from all source types, and can accept data in device-mode from Analytics.js sources."
        }
        connectionModes.case = "9"
      }
      // edge-case-y: cloud web and mobile, no server, one device
      else if ((connectionModes.cloud.web == true && connectionModes.cloud.mobile == true && connectionModes.cloud.server == false) && (connectionModes.device.mobile == true || connectionModes.device.web == true)){
        if (connectionModes.device.mobile == true || connectionModes.device.web == false){
          connectionModes.summary = "accepts data in cloud-mode from web and mobile sources, and can accept data in device-mode from mobile sources."
        }
        else if (connectionModes.device.mobile == false || connectionModes.device.web == true){
          connectionModes.summary = "accepts data in cloud-mode from web and mobile sources, and can accept data in device-mode from Analytics.js sources."
        }
        connectionModes.case = "10"
      }
      // edge-case-y: cloud mobile and server, device mobile, no web
      else if (connectionModes.cloud.web == false && connectionModes.cloud.mobile == true && connectionModes.cloud.server == true && connectionModes.device.mobile == true && connectionModes.device.web == false){
        connectionModes.summary = "accepts data in cloud-mode from mobile and server sources, and can accept data in device-mode from mobile sources."
        connectionModes.case = "11"
      }
    }
  }

  return connectionModes
}

/**
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
  try {
    const catalogPath = path.resolve('src', itemURL, 'index.md')
    if (fs.existsSync(catalogPath)) {
      const f = fm(fs.readFileSync(catalogPath, 'utf8'));
      if (f.attributes.hidden) return true
    }
    return false
  } catch (e) {
    console.log(error)
    return false
  }
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
    if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
    if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
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
      categories: source.categories,
      type: source.type
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
    sourceCategories.sort((a, b) => {
      if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
      if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
      return 0;
    })
  })

  // Create source catalog yaml file
  const options = { noArrayIndent: false };
  var todayDate = new Date().toISOString().slice(0,10);
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  output += "# sources last updated " + todayDate + " \n";
  output += yaml.dump({ items: sourcesUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources_capi.yml`), output);

  // Create source-category mapping yaml file
  var todayDate = new Date().toISOString().slice(0,10);
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  output += "# source cateogries last updated " + todayDate + " \n";
  output += yaml.dump({ items: sourceCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/source_categories_capi.yml`), output);
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
    if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
    if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
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
      browserUnbundlingPublic: destination.browserUnbundlingPublic,
      methods: destination.methods
    })

    let url = `connections/destinations/catalog/${slug}`

    let settings = destination.settings
    settings.sort((a, b) => {
      if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
      if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
      return 0;
    })
    settings.forEach(setting => {
      if (setting.settings.length > 0) {
        setting.settings.sort((a, b) => {
          if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
          if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
          return 0;
        })
      }
    })

    let updatedDestination = {
      display_name: destination.display_name,
      slug,
      name: destination.name,
      url,
      description: destination.description,
      hidden: isCatalogItemHidden(url),
      status: destination.status,
      previous_names: destination.previous_names,
      logo:  {
        url: destination.logos.logo
      },
      mark: {
        url: destination.logos.mark
      },
      categories: tempCategories,
      methods: destination.methods,
      components: destination.components,
      platforms: destination.platforms,
      browserUnbundlingSupported: destination.browserUnbundlingSupported,
      browserUnbundlingPublic: destination.browserUnbundlingPublic,
      connection_modes,
      settings
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
    destinationCategories.sort((a, b) => {
      if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
      if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
      return 0;
    })
  })

  // Create destination catalog yaml file
  const options = { noArrayIndent: true };
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.dump({ items: destinationsUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations_capi.yml`), output);

   // Create destination-category mapping yaml file
  output = "# AUTOGENERATED FROM PLATFORM API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination categories last updated " + todayDate + " \n";
  output += yaml.dump({ items: destinationCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destination_categories_capi.yml`), output);
}

updateSources()
updateDestinations()
