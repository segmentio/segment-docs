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
      content =`---\ntitle: '${item.display_name} Destination'\nhidden: true\npublished: false\n${betaFlag}---\n`
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
  let categories = new Set()
  let sourceCategories = []

  while (nextPageToken !== null) {
    const res = await getCatalog(`${PAPI_URL}/catalog/sources/`, nextPageToken)
    sources = sources.concat(res.data.sourcesCatalog)
    nextPageToken = res.data.pagination.next
  }

  sources.sort((a, b) => {
    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
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
  ]

  sources.forEach(source => {
    let slug = slugify(source.name)
    let settings = source.options
    let hidden = false
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
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })

    // check if the source should be hidden
    if (hiddenSources.includes(slug)) {
      hidden = true
    }

    // create the catalog metadata
    let updatedSource = {
      display_name: source.name,
      slug,
      url,
      hidden,
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
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  output += "# sources last updated " + todayDate + " \n";
  output += yaml.dump({ items: sourcesUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources.yml`), output);

  // Create source-category mapping yaml file
  var todayDate = new Date().toISOString().slice(0,10);
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  output += "# source cateogries last updated " + todayDate + " \n";
  output += yaml.dump({ items: sourceCategories }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/source_categories.yml`), output);



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
    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    return 0;
  })


  destinations.forEach(destination => {
    let slug = slugify(destination.name)

    // Flip the slug of Actions destinations
    const actionsDests = [
      'amplitude-actions',
      'slack-actions',
      'fullstory-actions'
    ]

    if (actionsDests.includes(slug)) {
        const newSlug = slug.split('-')
        slug = newSlug[1]+'-'+newSlug[0]
    }

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
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })

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
      platforms: destination.supportedPlatforms,
      components: destination.components,
      browserUnbundlingSupported: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      replay: destination.supportedFeatures.replay,
      connection_modes,
      settings
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
    destinationCategories.sort((a, b) => {
      if(a.display_name.toLowerCase() < b.display_name.toLowerCase()) { return -1; }
      if(a.display_name.toLowerCase() > b.display_name.toLowerCase()) { return 1; }
      return 0;
    })
  })


  const options = { noArrayIndent: true };
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.dump({ items: destinationsUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations.yml`), output);

  // Create destination-category mapping yaml file
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0,10);
  output += "# destination categories last updated " + todayDate + " \n";
  output += yaml.dump({ items: destinationCategories }, options);
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
    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    return 0;
  })

  warehouses.forEach(warehouse => {
    let slug = slugify(warehouse.slug)
    let url = `connections/storage/catalog/${slug}`

    let settings = warehouse.options
    settings.sort((a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
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
  output += yaml.dump({ items: warehousesUpdated }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/warehouse_papi.yml`), output);

}

updateDestinations()
updateSources()
updateWarehouses()
