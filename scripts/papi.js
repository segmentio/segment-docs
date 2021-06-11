// To Do:
// [x] add sources
// [x] support categorization
// [x] support creating new files
// [x] support reading if article is hidden or not
// [x] figure out connection modes for destinations
// [x] retain existing slugify function, to account for custom slug rewrites
// [x] Add dossier content
// [x] make quick info work
// [x] why aren't hidden articles hiding?
// [x] fix slugify overrides?
// [x] fix settings sections

// Notes
// PAPI sources do not include type or categories


const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');

require('dotenv').config();

PAPI_URL = "https://api.segmentapis.com"

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
    summary: "",
    cmode_type:""
  }
  destination.components.forEach(component =>{
    switch (component.type){
      case 'ios':
        connectionModes.device.mobile = true
        break
      case 'android':
        connectionModes.device.mobile = true
        break
      case 'browser':
        if (destination.browserUnbundling) {
          connectionModes.cloud.web = true
        }
        connectionModes.device.web = true
        break
      case 'server':
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
  let nextPageToken = "MA=="

  while (nextPageToken !== null) {
    const res = await getCatalog(`${PAPI_URL}/catalog/sources/`, nextPageToken)
    sources = sources.concat(res.data.sourcesCatalog)
    nextPageToken = res.data.pagination.next
  }

  sources.sort((a, b) => {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })

  sources.forEach(source => {
    let slug = slugify(source.name)
    let settings = source.options
    settings.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

    let updatedSource = {
      display_name: source.name,
      slug,
      description: source.description,
      logo: {
        url: source.logos.default
      },
      // mark: {
      //   url: source.logos.mark
      // }
    }
    sourcesUpdated.push(updatedSource)
    doesCatalogItemExist(updatedSource)


    const options = { noArrayIndent: true };
    output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
    var todayDate = new Date().toISOString().slice(0,10);
    output += "# source data last updated " + todayDate + " \n";
    output += yaml.safeDump({ items: sourcesUpdated }, options);
    fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources_papi.yml`), output);
  })



}

const updateDestinations = async () => {
  let destinations = []
  let destinationsUpdated = []
  let destinationCategories = []
  let categories = new Set()
  let nextPageToken = "MA=="

  while (nextPageToken !== null) {
    const res = await getCatalog(`${PAPI_URL}/catalog/destinations/`, nextPageToken)
    destinations = destinations.concat(res.data.destinationsCatalog)
    nextPageToken = res.data.pagination.next
  }

  destinations.sort((a, b) => {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })


  destinations.forEach(destination => {
    let slug = slugify(destination.name)
    let url = `connections/destinations/catalog/${slug}`
    
    let tempCategories = [destination.categories]
    tempCategories = tempCategories.filter(category => category != '')
    tempCategories = tempCategories.flat()

    let connection_modes = getConnectionModes({
      components: destination.components,
      platforms: destination.supportedPlatforms,
      browserUnbundlingSupported: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      methods: destination.supportedMethods
    })
    
    let settings = destination.options
    settings.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

    let updatedDestination = {
      display_name: destination.name,
      name: destination.name,
      slug,
      hidden: isCatalogItemHidden(url),
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
      components: destination.components,
      platforms: destination.supportedPlatforms,
      browserUnbundlingSupported: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      replay: destination.supportedFeatures.replay,
      settings,
      connection_modes
    }
    destinationsUpdated.push(updatedDestination)
    doesCatalogItemExist(updatedDestination)

    tempCategories.reduce((s, e) => s.add(e), categories)
  })
    


    const destinationArray = Array.from(categories)


    destinationArray.forEach(category => {
      destinationCategories.push({
        display_name: category,
        slug: slugify(category)
      })
    })


  const options = { noArrayIndent: true };
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.safeDump({ items: destinationsUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations.yml`), output);

  // Create destination-category mapping yaml file
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination categories last updated " + todayDate + " \n";
  output += yaml.safeDump({ items: destinationCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destination_categories.yml`), output);
}

const updateWarehouses = async () => {
  let warehouses = []
  let nextPageToken = "MA=="
  let warehousesUpdated = []


  while (nextPageToken !== null) {
    const res = await getCatalog(`${PAPI_URL}/catalog/warehouses/`, nextPageToken)
    warehouses = warehouses.concat(res.data.warehousesCatalog)
    nextPageToken = res.data.pagination.next
  }

  warehouses.sort((a, b) => {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })

  warehouses.forEach(warehouse => {
    let slug = slugify(warehouse.slug)
    let url = `connections/storage/catalog/${slug}`

    let settings = warehouse.options
    settings.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

    let updatedWarehouse = {
      display_name: warehouse.name,
      slug,
      description: warehouse.description,
      logo: {
        url: warehouse.logos.default
      },
      mark: {
        url: warehouse.logos.mark
      },
      settings
    }
    warehousesUpdated.push(updatedWarehouse)
    doesCatalogItemExist(updatedWarehouse)

  })
  const options = { noArrayIndent: true };
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# warehouse data last updated " + todayDate + " \n";
  output += yaml.safeDump({ items: warehousesUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/warehouses_papi.yml`), output);

}

updateDestinations()
//updateSources()
updateWarehouses()