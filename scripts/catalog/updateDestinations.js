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
    fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/destinations.yml`), output);
  
    // Create destination-category mapping YAML file
    output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
    output += "# destination categories last updated " + todayDate + " \n";
    output += yaml.dump({
      items: destinationCategories
    }, options);
    fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/destination_categories.yml`), output);
  
    console.log("destinations done");
  };


  exports.updateDestinations = updateDestinations;