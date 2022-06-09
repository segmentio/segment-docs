const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const {
  type
} = require('os');

require('dotenv').config();

PAPI_URL = "https://api.segmentapis.com"

const regionalSupport = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/regional-support.yml`)))
const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/slugs.yml`)))


const slugify = (displayName) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')

  for (key in slugOverrides) {
    let original = slugOverrides[key].original
    let override = slugOverrides[key].override

    if (slug == original) {
      console.log(original+" -> "+override)
      slug = override
    }
  }

  return slug
}

const getCatalog = async (url, page_token = "MA==") => {
  try {
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAPI_TOKEN}`
      },
      data: {
        "pagination": {
          "count": 200,
          "cursor": page_token
        }
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
  }
  destination.components.forEach(component => {
    switch (component.type) {
      case 'IOS':
        connectionModes.device.mobile = true
        break
      case 'ANDROID':
        connectionModes.device.mobile = true
        break
      case 'BROWSER':
        if (destination.browserUnbundling) {
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
 * If catalog item does not exist, create folder and index.md file for it, and record it as incomplete for later fill in
 */
const doesCatalogItemExist = (item) => {
  const docsPath = `src/${item.url}`

  if (!fs.existsSync(docsPath)) {
    console.log(`${item.slug} does not exist: ${docsPath}`)
    let content = `---\ntitle: '${item.display_name} Source'\nhidden: true\n---`
    if (!docsPath.includes('/sources/')) {
      let betaFlag = ''
      if (item.status === 'PUBLIC_BETA') {
        betaFlag = 'beta: true\n'
      }
      content = `---\ntitle: '${item.display_name} Destination'\nhidden: true\nid: ${item.id}\npublished: false\n${betaFlag}---\n`
    }
    fs.mkdirSync(docsPath)
    fs.writeFileSync(`${docsPath}/index.md`, content)
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
  let regionalSourcesUpdated = []
  let nextPageToken = "MA=="
  let categories = new Set()
  let sourceCategories = []

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/sources/`, nextPageToken)
    sources = sources.concat(res.data.sourcesCatalog)
    nextPageToken = res.data.pagination.next
  }

  sources.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  })

  const libraryCategories = [
    'server',
    'mobile',
    'ott',
    'roku',
    'website'
  ]

  const hiddenSources = [
    'amp',
    'factual-engine',
    'twilio-event-streams-beta',
    'ibm-watson-assistant'
  ]

  const regionalSourceEndpoint = regionalSupport.sources.endpoint
  const regionalSourceRegion = regionalSupport.sources.region

  sources.forEach(source => {
    let slug = slugify(source.name)
    let settings = source.options
    let hidden = false
    let regions = ['us']
    let endpoints = ['us']
    let mainCategory = source.categories[0] ? source.categories[0].toLowerCase() : ''

    // determine the doc url based on the source's main category
    if (libraryCategories.includes(mainCategory)) {
      url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`
    } else {
      url = `connections/sources/catalog/cloud-apps/${slug}`
      mainCategory = 'cloud-app'
    }

    // sort the sources alphabetically. JS's default sort is case sensistve which is why we compare lowercase on the fly
    settings.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    })

    // check if the source should be hidden
    if (hiddenSources.includes(slug)) {
      hidden = true
    }

    if (regionalSourceEndpoint.includes(slug)) {
      endpoints.push('eu')
    }

    if (regionalSourceRegion.includes(slug)) {
      regions.push('eu')
    }

    // create the catalog metadata
    let updatedSource = {
      id: source.id,
      display_name: source.name,
      isCloudEventSource: source.isCloudEventSource,
      slug,
      url,
      hidden: isCatalogItemHidden(url),
      regions,
      endpoints,
      source_type: mainCategory,
      description: source.description,
      logo: {
        url: source.logos.default
      },
      // mark: {
      //   url: source.logos.mark
      // },
      categories: source.categories,
    }
    sourcesUpdated.push(updatedSource)
    doesCatalogItemExist(updatedSource)
    source.categories.reduce((s, e) => s.add(e), categories);

    let updatedRegional = {
      id: source.id,
      display_name: source.name,
      slug,
      url,
      regions,
      endpoints
    }
    regionalSourcesUpdated.push(updatedRegional)


  })

  const sourceArray = Array.from(categories)
  sourceArray.forEach(category => {
    sourceCategories.push({
      display_name: category,
      slug: slugify(category)
    })
    sourceCategories.sort((a, b) => {
      if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
        return -1;
      }
      if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
  })


  // Create source catalog yaml file
  const options = {
    noArrayIndent: false
  };
  var todayDate = new Date().toISOString().slice(0, 10);
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  output += "# sources last updated " + todayDate + " \n";
  output += yaml.dump({
    items: sourcesUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources.yml`), output);

  // Create source-category mapping yaml file
  var todayDate = new Date().toISOString().slice(0, 10);
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  output += "# source cateogries last updated " + todayDate + " \n";
  output += yaml.dump({
    items: sourceCategories
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/source_categories.yml`), output);

  
  // output = "# AUTOGENERATED LIST OF CONNECTIONS THAT SUPPORT REGIONAL\n"
  // output += "# Last updated " + todayDate + " \n";
  output = yaml.dump({
    sources: regionalSourcesUpdated
  }, options)
  fs.appendFileSync(path.resolve(__dirname, `../src/_data/catalog/regional-supported.yml`), output);
  console.log("sources done")
}

const updateDestinations = async () => {
  let destinations = []
  let destinationsUpdated = []
  let regionalDestinationsUpdated = []
  let destinationCategories = []
  let categories = new Set()
  let nextPageToken = "MA=="

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/destinations/`, nextPageToken)
    destinations = destinations.concat(res.data.destinationsCatalog)
    nextPageToken = res.data.pagination.next
  }

  destinations.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  })

  const regionalDestinationEndpoints= regionalSupport.destinations.endpoint
  const regionalDestinationRegions= regionalSupport.destinations.region


  destinations.forEach(destination => {
    let endpoints = ['us']
    let regions = ['us']

    let slug = slugify(destination.name)

    if (regionalDestinationEndpoints.includes(slug)) {
      endpoints.push('eu')
    }

    if (regionalDestinationRegions.includes(slug)) {
      regions.push('eu')
    }
    

    let url = `connections/destinations/catalog/${slug}`

    let tempCategories = [destination.categories]
    tempCategories = tempCategories.filter(category => category != '')
    tempCategories = tempCategories.flat()

    let connection_modes = getConnectionModes({
      components: destination.components,
      platforms: destination.supportedPlatforms,
      browserUnbundling: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      methods: destination.supportedMethods
    })

    let settings = destination.options

    settings.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
    let actions = destination.actions
    let presets = destination.presets

    const clone = (obj) => Object.assign({}, obj)
    const renameKey = (object, key, newKey) => {
      const clonedObj = clone(object);
      const targetKey = clonedObj[key];
      delete clonedObj[key];

      clonedObj[newKey] = targetKey;
      return clonedObj;
    };

    destination.supportedMethods = renameKey(destination.supportedMethods, 'pageview', 'page')

    let updatedDestination = {
      id: destination.id,
      display_name: destination.name,
      name: destination.name,
      slug,
      hidden: isCatalogItemHidden(url),
      endpoints,
      regions,
      url,
      previous_names: destination.previousNames,
      website: destination.website,
      status: destination.status,
      categories: tempCategories,
      logo: {
        url: destination.logos.default
      },
      mark: {
        url: destination.logos.mark
      },
      methods: destination.supportedMethods,
      platforms: destination.supportedPlatforms,
      components: destination.components,
      browserUnbundlingSupported: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      replay: destination.supportedFeatures.replay,
      connection_modes,
      settings,
      actions,
      presets
    }
    destinationsUpdated.push(updatedDestination)
    doesCatalogItemExist(updatedDestination)
    tempCategories.reduce((s, e) => s.add(e), categories)

    let updatedRegionalDestination = {
      id: destination.id,
      display_name: destination.name,
      slug,
      url,
      regions,
      endpoints
    }

    regionalDestinationsUpdated.push(updatedRegionalDestination)
  })


  const destinationArray = Array.from(categories)
  destinationArray.forEach(category => {
    destinationCategories.push({
      display_name: category,
      slug: slugify(category)
    })
    destinationCategories.sort((a, b) => {
      if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
        return -1;
      }
      if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
  })


  const options = {
    noArrayIndent: true
  };
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0, 10);
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.dump({
    items: destinationsUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations.yml`), output);

  // Create destination-category mapping yaml file
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0, 10);
  output += "# destination categories last updated " + todayDate + " \n";
  output += yaml.dump({
    items: destinationCategories
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destination_categories.yml`), output);

  // Append regional destinations to regional file
  output = yaml.dump({
    destinations: regionalDestinationsUpdated
  }, {
    noArrayIndent: false
  })
  fs.appendFileSync(path.resolve(__dirname,`../src/_data/catalog/regional-supported.yml`),output);
  console.log("destinations done")
}

const updateWarehouses = async () => {
  let warehouses = []
  let nextPageToken = "MA=="
  let warehousesUpdated = []


  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/warehouses/`, nextPageToken)
    warehouses = warehouses.concat(res.data.warehousesCatalog)
    nextPageToken = res.data.pagination.next
  }

  warehouses.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  })

  const regionalWarehouseEndpoints = regionalSupport.warehouses.endpoint
  const regionalWarehouseRegions = regionalSupport.warehouses.region


  warehouses.forEach(warehouse => {
    let slug = slugify(warehouse.slug)
    let endpoints = ['us']
    let regions = ['us']
    let url = `connections/storage/catalog/${slug}`

    if (regionalWarehouseEndpoints.includes(slug)) {
      endpoints.push('eu')
    }

    if (regionalWarehouseRegions.includes(slug)) {
      regions.push('eu')
    }

    let settings = warehouse.options
    settings.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    })

    let updatedWarehouse = {
      id: warehouse.id,
      display_name: warehouse.name,
      url,
      slug,
      endpoints,
      regions

    }
    warehousesUpdated.push(updatedWarehouse)


  })
  const options = {
    noArrayIndent: true
  };
  // output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  const todayDate = new Date().toISOString().slice(0, 10);
  // output += "# warehouse data last updated " + todayDate + " \n";
  // output += yaml.dump({
  //   items: warehousesUpdated
  // }, options);
  // fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/warehouse_papi.yml`), output);

  // Create regional support map
  output = "# AUTOGENERATED LIST OF CONNECTIONS THAT SUPPORT REGIONAL\n"
  output += "# Last updated " + todayDate + " \n";
  output += yaml.dump({
    warehouses: warehousesUpdated
  }, {
    noArrayIndent: false
  })
  fs.writeFileSync(path.resolve(__dirname,`../src/_data/catalog/regional-supported.yml`),output);
  console.log("warehouses done")
}
updateWarehouses()
updateSources()
updateDestinations()

