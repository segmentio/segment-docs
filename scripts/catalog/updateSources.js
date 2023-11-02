const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const {
  slugify,
  getCatalog,
  isCatalogItemHidden,
  doesCatalogItemExist
} = require('./utilities.js');

require('dotenv').config();

const PAPI_URL = "https://api.segmentapis.com";

const regionalSupport = yaml.load(fs.readFileSync(path.resolve(__dirname, `../../src/_data/regional-support.yml`)));

// This file keeps a list of known test sources that show up in the system. 
// Because we don't have a status value for sources, they end up showing in our catalog.
// We use this below to prevent them from being written to yaml.
const testSources = yaml.load(fs.readFileSync(path.resolve(__dirname, `../../src/_data/catalog/test_sources.yml`)));


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
        // console.log(`skipped ${source.name}`);
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
    fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/sources.yml`), output);
  
    // Create source-category mapping YAML file
    output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n";
    output += "# source categories last updated " + todayDate + " \n";
    output += yaml.dump({
      items: sourceCategories
    }, options);
    fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/source_categories.yml`), output);
  
    // Create regional support YAML file
    output = yaml.dump({
      sources: regionalSourcesUpdated
    }, options);
    fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/regional-supported.yml`), output);
  
    console.log("sources done");
  };


  exports.updateSources = updateSources;