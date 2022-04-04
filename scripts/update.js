// These lines are the required packages we need. These let us do things like make network requests to the Public API
// and interact with the frontmatter
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const {
  type
} = require('os');

require('dotenv').config();

// Here, global variables are set
const PAPI_URL = "https://api.segmentapis.com"
const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/slugs.yml`)))

// This function connects with the Public API. It looks for the endpoint URL and a page token value.
// The function is called in the updateSources and update Destination functions.
// Functions let us reuse code easily. Instead of needing to write this out multiple times, I can define it once
// and pass in the necessary details when I call it.
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

// This function, again called by the two update functions, is what generates the slug values for each integration.
// It takes the integration's Display Name and converts it to a slug.
const slugify = (displayName) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')

  // This is how we handle manual slug overrides right now.
  // If a slug appears in the slugOverrides file, we want to use the 'override' value instead.
  for (key in slugOverrides) {
    let original = slugOverrides[key].original
    let override = slugOverrides[key].override

    if (slug == original) {
      // console.log(original + " -> " + override)
      slug = override
    }
  }

  return slug
}

// This function does the actual work of adding the id value to the source and destination
// Notice that the write to file step is commented out. This is to verify that the updated frontmatter
// is correct before we write a whole bunch of files.
// Uncomment that line and remove the line above it to run it for real.
const addIdToExisting = (integration) => {
  let itemURL = integration.url
  try {
    const catalogPath = path.resolve('src', itemURL, 'index.md')
    if (fs.existsSync(catalogPath)) {
      const f = fm(fs.readFileSync(catalogPath, 'utf8'));

      const fmatter = f.frontmatter
      const re_id = new RegExp("(id: )\S*")
      if (!re_id.test(fmatter)) {
        const attr = `---\n${f.frontmatter}\nid: ${integration.id}\n---\n`
        const body = f.body
        const content = attr + body
        console.log(attr)
        fs.writeFileSync(catalogPath, content)
      }

    }
  } catch (e) {
    console.log(error)
    return false
  }
}


// This is just a stripped down version of the updateSources() script from the catalog script.
// We're retrieving less information overall, because all we care about here is the id.
const updateSources = async () => {

  let sources = []
  let nextPageToken = "MA=="

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/sources/`, nextPageToken)
    sources = sources.concat(res.data.sourcesCatalog)
    nextPageToken = res.data.pagination.next
  }

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

    if (libraryCategories.includes(mainCategory)) {
      url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`
    } else {
      url = `connections/sources/catalog/cloud-apps/${slug}`
      mainCategory = 'cloud-app'
    }
    // So, we retrieve and store only the id and the URL, which is defined in the if statement on line 116.
    let updatedSource = {
      id: source.id,
      url,
    }
    addIdToExisting(updatedSource)
  })
}

// Similar to the sources script, only for destinations.
const updateDestinations = async () => {
  let destinations = []
  let nextPageToken = "MA=="

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/destinations/`, nextPageToken)
    destinations = destinations.concat(res.data.destinationsCatalog)
    nextPageToken = res.data.pagination.next
  }


  destinations.forEach(destination => {
    let slug = slugify(destination.name)

    let url = `connections/destinations/catalog/${slug}`

    let updatedDestination = {
      id: destination.id,
      url
    }
    addIdToExisting(updatedDestination)

  })

}
updateDestinations()
updateSources()
