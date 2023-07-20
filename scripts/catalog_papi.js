const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const {
  slugify,
  getCatalog,
  getConnectionModes,
  isCatalogItemHidden,
  sanitize,
  doesCatalogItemExist
} = require('./utilities.js');

require('dotenv').config();

const PAPI_URL = "https://api.segmentapis.com";

const regionalSupport = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/regional-support.yml`)));

// This file keeps a list of known test sources that show up in the system. 
// Because we don't have a status value for sources, they end up showing in our catalog.
// We use this below to prevent them from being written to yaml.
const testSources = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/test_sources.yml`)));


const updateSources = async () => {
  let sources = [];                     // Initialize an empty array to hold all sources  
  let sourcesUpdated = [];              // Initialize an empty array to hold all sources that have been updated    
  let regionalSourcesUpdated = [];      // Initialize an empty array to hold updated source regional information            
  let nextPageToken = "MA==";           // Set the initial page token to the first page      
  let categories = new Set();           // Initialize an empty set to hold all categories      
  let sourceCategories = [];            // Initialize an empty array to hold all source categories      


  // Get all sources from the catalog
  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/sources/`, nextPageToken);
    sources = sources.concat(res.data.sourcesCatalog);
    nextPageToken = res.data.pagination.next;
  }

  // Sort the sources alphabetically
  sources.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  // Set the list of categories for libraries
  const libraryCategories = [
    'server',
    'mobile',
    'ott',
    'roku',
    'website'
  ];

  // Here, define some sources that are real, but that we want to hide.
  const hiddenSources = [
    'amp',
    'factual-engine',
    'twilio-event-streams-beta',
    'ibm-watson-assistant'
  ];

  // More regional stuff
  const regionalSourceEndpoint = regionalSupport.sources.endpoint;
  const regionalSourceRegion = regionalSupport.sources.region;

  
  // Loop through all sources and create a new object with the data we want
  sources.forEach(source => {
    let slug = slugify(source.name, "sources");
    let settings = source.options;
    let hidden = false;
    let regions = ['us'];
    let endpoints = ['us'];
    let mainCategory = source.categories[0] ? source.categories[0].toLowerCase() : '';

    if (libraryCategories.includes(mainCategory)) {
      url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`;
    } else {
      url = `connections/sources/catalog/cloud-apps/${slug}`;
      mainCategory = 'cloud-app';
    }

    // Sort the settings alphabetically
    settings.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    if (hiddenSources.includes(slug)) {
      hidden = true;
    }

    if (regionalSourceEndpoint.includes(slug)) {
      endpoints.push('eu');
    }

    if (regionalSourceRegion.includes(slug)) {
      regions.push('eu');
    }

    // If the source ID is in the list of test sources, skip it.
    // If it's not, add it to the list of sources to be written to yaml.
    if (testSources.includes(source.id)) {
      console.log(`skipped ${source.name}`);
    } else {
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
        categories: source.categories,
      };
      sourcesUpdated.push(updatedSource);
      doesCatalogItemExist(updatedSource);
    }

    source.categories.reduce((s, e) => s.add(e), categories);

    // Sources don't yet have regional information in the Public API, so we write that info here.
    let updatedRegional = {
      id: source.id,
      display_name: source.name,
      hidden: isCatalogItemHidden(url),
      slug,
      url,
      regions,
      endpoints
    };
    regionalSourcesUpdated.push(updatedRegional);
  });

  const sourceArray = Array.from(categories);
  sourceArray.forEach(category => {
    sourceCategories.push({
      display_name: category,
      slug: slugify(category)
    });
    sourceCategories.sort((a, b) => {
      if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
        return -1;
      }
      if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  });

  const options = {
    noArrayIndent: false
  };
  const todayDate = new Date().toISOString().slice(0, 10);

  // Create source catalog YAML file
  let output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
  output += "# sources last updated " + todayDate + " \n";
  output += yaml.dump({
    items: sourcesUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/sources.yml`), output);

  // Create source-category mapping YAML file
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
  output += "# source categories last updated " + todayDate + " \n";
  output += yaml.dump({
    items: sourceCategories
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/source_categories.yml`), output);

  // Create regional support YAML file
  output = yaml.dump({
    sources: regionalSourcesUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/regional-supported.yml`), output);

  console.log("sources done");
};

// Update destinations
const updateDestinations = async () => {
  let destinations = [];
  let destinationsUpdated = [];
  let destinationCategories = [];
  let categories = new Set();
  let nextPageToken = "MA==";

  // Get all destinations from the Public API
  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/destinations/`, nextPageToken);
    destinations = destinations.concat(res.data.destinationsCatalog);
    nextPageToken = res.data.pagination.next;
  }

  // Sort the destinations alphabetically
  destinations.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  // Loop through all destinations and create a new object with the data we want
  destinations.forEach(destination => {
    let endpoints = [];
    let regions = [];

    let slug = slugify(destination.name, "destinations");

    if (typeof destination.supportedRegions != "undefined") {
      regions = destination.supportedRegions;
    } else {
      regions.push('us-west-2', 'eu-west-1');
    }

    if (typeof destination.regionEndpoints != "undefined") {
      endpoints = destination.regionEndpoints;
    } else {
      endpoints.push('US');
    }

    let url = `connections/destinations/catalog/${slug}`;

    let tempCategories = [destination.categories];
    tempCategories = tempCategories.filter(category => category != '');
    tempCategories = tempCategories.flat();

    let connection_modes = getConnectionModes({
      components: destination.components,
      platforms: destination.supportedPlatforms,
      browserUnbundling: destination.supportedFeatures.browserUnbundling,
      browserUnbundlingPublic: destination.supportedFeatures.browserUnbundlingPublic,
      methods: destination.supportedMethods
    });

    let settings = destination.options;

    settings.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    settings.forEach(setting => {
      setting.description = sanitize(setting.description);
    });

    let actions = destination.actions;
    let presets = destination.presets;

    const clone = (obj) => Object.assign({}, obj);
    const renameKey = (object, key, newKey) => {
      const clonedObj = clone(object);
      const targetKey = clonedObj[key];
      delete clonedObj[key];

      clonedObj[newKey] = targetKey;
      return clonedObj;
    };

    // I honestly don't remember why I did this.
    // I think someone wanted to mention support for the Screen method to whatever destination that is
    destination.supportedMethods.screen = false;
    if (destination.id == '63e42b47479274407b671071') {
      destination.supportedMethods.screen = true;
    }

    // Pageview is renamed to Page
    destination.supportedMethods = renameKey(destination.supportedMethods, 'pageview', 'page');

    // All updated destination information gets added to this object
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
    };

    // Add the updated destination to the destinationsUpdated array
    destinationsUpdated.push(updatedDestination);
    doesCatalogItemExist(updatedDestination);
    tempCategories.reduce((s, e) => s.add(e), categories);
  });

  const destinationArray = Array.from(categories);
  destinationArray.forEach(category => {
    destinationCategories.push({
      display_name: category,
      slug: slugify(category)
    });
    destinationCategories.sort((a, b) => {
      if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
        return -1;
      }
      if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  });

  const options = {
    noArrayIndent: true
  };
  const todayDate = new Date().toISOString().slice(0, 10);

  // Create destination catalog YAML file
  let output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.dump({
    items: destinationsUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations.yml`), output);

  // Create destination-category mapping YAML file
  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
  output += "# destination categories last updated " + todayDate + " \n";
  output += yaml.dump({
    items: destinationCategories
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destination_categories.yml`), output);

  console.log("destinations done");
};

const updateWarehouses = async () => {
  let warehouses = [];
  let nextPageToken = "MA==";
  let warehousesUpdated = [];

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/warehouses/`, nextPageToken);
    warehouses = warehouses.concat(res.data.warehousesCatalog);
    nextPageToken = res.data.pagination.next;
  }

  warehouses.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const regionalWarehouseEndpoints = regionalSupport.warehouses.endpoint;
  const regionalWarehouseRegions = regionalSupport.warehouses.region;

  warehouses.forEach(warehouse => {
    let slug = slugify(warehouse.slug);
    let endpoints = ['us'];
    let regions = ['us'];
    let url = `connections/storage/catalog/${slug}`;

    if (regionalWarehouseEndpoints.includes(slug)) {
      endpoints.push('eu');
    }

    if (regionalWarehouseRegions.includes(slug)) {
      regions.push('eu');
    }

    let updatedWarehouse = {
      id: warehouse.id,
      display_name: warehouse.name,
      url,
      slug,
      endpoints,
      regions
    };

    warehousesUpdated.push(updatedWarehouse);
  });

  const options = {
    noArrayIndent: true
  };
  const todayDate = new Date().toISOString().slice(0, 10);

  // Create regional support YAML file
  let output = "# AUTOGENERATED LIST OF CONNECTIONS THAT SUPPORT REGIONAL\n";
  output += "# Last updated " + todayDate + " \n";
  output += yaml.dump({
    warehouses: warehousesUpdated
  }, options);
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/regional-supported.yml`), output);

  console.log("warehouses done");
};

// Execute the update functions
updateWarehouses();
updateSources();
updateDestinations();
