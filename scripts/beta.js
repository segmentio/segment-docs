const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const fastcsv = require('fast-csv')
const {
  type
} = require('os');

require('dotenv').config();

PAPI_URL = "https://api.segmentapis.com"

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

const slugify = (displayName) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')

  if (slug === '-net') slug = 'net'
  if (slug === 'talon-one') slug = 'talonone'
  if (slug === 'roku-alpha') slug = 'roku'
  if (slug === 'shopify-by-littledata') slug = 'shopify-littledata'
  if (slug === 'talon-one') slug = 'talonone'
  if (slug == 'google-adwords-remarketing-lists-customer-match') slug = 'adwords-remarketing-lists'
  if (slug == 'canny-classic') slug = 'canny'
  return slug
}


const isCatalogItemBeta = (itemURL) => {
  try {
    const catalogPath = path.resolve('src', itemURL, 'index.md')
    if (fs.existsSync(catalogPath)) {
      const f = fm(fs.readFileSync(catalogPath, 'utf8'));
      if (f.attributes.beta) return true
    }
    return false
  } catch (e) {
    console.log(error)
    return false
  }
}

const getUpdateTime = (itemURL) => {
  try {
    const catalogPath = path.resolve('src', itemURL, 'index.md')
    if (fs.existsSync(catalogPath)) {

      const stats = fs.statSync(catalogPath)
      const date = stats.mtime
      return date.toISOString().split('T')[0]
    }

  } catch (e){
    console.log(error)
  }
}

const getSources = async () => {
  let sources = []
  let sourcesUpdated = []
  //let regionalSourcesUpdated = []
  let nextPageToken = "MA=="
  //let categories = new Set()
  //let sourceCategories = []

  while (nextPageToken !== null) {
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

  sources.forEach(source => {
    let slug = slugify(source.name)
    let mainCategory = source.categories[0] ? source.categories[0].toLowerCase() : ''

    // determine the doc url based on the source's main category
    if (libraryCategories.includes(mainCategory)) {
      url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`
    } else {
      url = `connections/sources/catalog/cloud-apps/${slug}`
      mainCategory = 'cloud-app'
    }

    let updateTime = getUpdateTime(url)

    let updatedSource = {
      id: source.id,
      display_name: source.name,
      slug,
      url: "https://segment.com/docs/" + url,
      updateTime
    }

    if (isCatalogItemBeta(url)) {
      sourcesUpdated.push(updatedSource)
    }
  })
  const ws = fs.createWriteStream("beta-sources.csv");
  fastcsv
    .write(sourcesUpdated, {
      headers: true
    })
    .on("finish", function () {
      console.log("Write to CSV successfully!");
    })
    .pipe(ws);

}

const getDestinations = async () => {
  let destinations = []
  let destinationsUpdated = []
  let regionalDestinationsUpdated = []
  let destinationCategories = []
  let categories = new Set()
  let nextPageToken = "MA=="

  while (nextPageToken !== null) {
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

  destinations.forEach(destination => {
    // We need to be able to keep the system slug in some cases.
    const slugOverrides = ['actions-google-enhanced-conversions', 'actions-google-analytics-4', 'actions-facebook-conversions-api', 'actions-friendbuy-cloud', 'sprig-web']
    let slug = slugify(destination.name)
    if (slugOverrides.includes(destination.slug)) {
      slug = destination.slug
    }
    // Flip the slug of Actions destinations
    const actionsDests = [
      'amplitude-actions',
      'slack-actions',
      'fullstory-actions',
      'friendbuy-actions'
    ]

    if (actionsDests.includes(slug)) {
      const newSlug = slug.split('-')
      slug = newSlug[1] + '-' + newSlug[0]
    }
    let url = `connections/destinations/catalog/${slug}`
    let updateTime = getUpdateTime(url)

    let updatedDestination = {
      destination_id: destination.id,
      display_name: destination.name,
      slug,
      url: "https://segment.com/docs/" + url,
      updateTime
    }
    if (destination.status == 'PUBLIC_BETA') {
      destinationsUpdated.push(updatedDestination)
      //console.log(destination.name)
    }
  })
  const ws = fs.createWriteStream("beta-destinations.csv");
  fastcsv
    .write(destinationsUpdated, {
      headers: true
    })
    .on("finish", function () {
      console.log("Write destinations to CSV successfully!");
    })
    .pipe(ws);
}


getSources()
getDestinations()
