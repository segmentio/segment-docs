const yaml = require('js-yaml'); 
const fs = require('fs').promises; 
const matter = require ('gray-matter');

const catalogFilePath = 'src/_data/catalog/destinations.yml'; 
const directory = 'src/connections/destinations/catalog'; 

function updateDestinationStatus() {
  try {
    const catalog = yaml.load(catalogFilePath);
    if (Array.isArray(catalog)) {
      catalog.forEach (id); {
        const pageSlug = id.slug;
        const itemStatus = id.status;

        if (itemStatus == 'PRIVATE_BETA') {
          const filepath = `${directory}/${pageSlug}`;
          try {
            matter(readFile(filepath));
            matter.stringify({private: 'true', beta: 'true'})

            console.log(`Updated page ${pageSlug} with status: ${itemStatus}`);
          } catch (error) {
            console.error(`Error processing page ${itemId}: ${error.message}`);
          }
        } 

        if (itemStatus == 'PUBLIC_BETA'){
          const filepath = `${directory}/${pageSlug}`;
          try {
            matter(readFile(filepath));
            if (frontMatter.private === "true") {
            delete frontMatter["private"];
            console.log(`Updated page ${pageSlug} with status: ${itemStatus}`);
          } 
          } catch (error) {
            console.error(`Error processing page ${itemId}: ${error.message}`);
          }
        }
        
        } if (itemStatus == 'PUBLIC'){
          const filepath = `${directory}/${pageSlug}`;
          try {
            matter(readFile(filepath));
            if (frontMatter.beta === "true") {
            delete frontMatter["beta"];
            console.log(`Updated page ${pageSlug} with status: ${itemStatus}`);
          } 
          } catch (error) {
            console.error(`Error processing page ${itemId}: ${error.message}`);
          }
        } else {
          console.warn('Skipping item with missing status or ID:', item);
        }
    } 
  } catch {
      console.warn('Unable to update destination status.');
 }
}

updateDestinationStatus();
