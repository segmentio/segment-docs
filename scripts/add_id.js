// 1. Check all index.md files in Sources and Destinations
// 2. For files w/out an ID, get it from the API
// 3. Append id to frontmatter 
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const glob = require("glob")
const {
  type
} = require('os');

require('dotenv').config();

// Here, global variables are set
const PAPI_URL = "https://api.segmentapis.com"
const destinationList = "src/connections/destinations/catalog/*/index.md"
const sources = "src/connections/sources/catalog/**/index.md"

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

const updateDestinationIds = async() => {
    let destinations = []
    const files = glob.sync(destinationList)
    let noIds = []
    let nextPageToken = "MA=="


    while (nextPageToken !== undefined) {
        const res = await getCatalog(`${PAPI_URL}/catalog/destinations/`, nextPageToken)
        destinations = destinations.concat(res.data.destinationsCatalog)
        nextPageToken = res.data.pagination.next
      }
    
    
    files.forEach(function(item, index){
        if (fs.existsSync(item)) {
            const f = fm(fs.readFileSync(item, 'utf8'));
            const fmatter = f.frontmatter
            const re_id = new RegExp("(id: )\S*")
            const re_pub = new RegExp("(published: false)|(hidden: true)")
            if (!re_id.test(fmatter) && !re_pub.test(fmatter)) {
             noIds.push(item)
            }
      
            // const attr = `---\n${f.frontmatter}\nid: ${integration.id}\n---\n`
            // const body = f.body
            // const content = attr + body
            // console.log(attr)
            // fs.writeFileSync(catalogPath, content)
          }
          
    })

    console.log(noIds)
}

updateDestinationIds()