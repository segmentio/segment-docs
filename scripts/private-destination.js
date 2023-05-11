const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const {
  prompt
} = require('enquirer');
const {
  type
} = require('os');

require('dotenv').config();


// Here, global variables are set
const PAPI_URL = "https://api.segmentapis.com"

const PRIVATE_DESTINATIONS = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations_private.yml`)))
const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/slugs.yml`)))

const privateDests = PRIVATE_DESTINATIONS.items
let private = []
const getCatalog = async (url, page_token = "MA==") => {
  let res = null
  try {
    res = await axios.get(url, {
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
  } catch (err) {
    console.error("Error response:");
    console.error(err.response.data); // ***
    console.error(err.response.status); // ***
    console.error(err.response.headers); // ***
  } finally {

  }
}

const slugify = (displayName, type) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')

  let overrides = ""
  if (type == "sources") {
    overrides = slugOverrides.sources
  } 

  if (type == "destinations") {
    overrides = slugOverrides.destinations
  } 

  for (key in overrides) {
    let original = overrides[key].original
    let override = overrides[key].override

    if (slug == original) {
      console.log(original + " -> " + override)
      slug = override
    }
  }
  return slug
}

const checkDestinationStatus = async (id) => {
  const res = await getCatalog(`${PAPI_URL}/catalog/destinations/${id}`)
  let destination = res.data.destinationMetadata
  return destination
}

const makeDestinationPublic = async (itemURL) => {
  const catalogPath = path.resolve('src/', itemURL, 'index.md')
  const f = fm(fs.readFileSync(catalogPath, 'utf8'));
  const fmatter = f.attributes
  fmatter.private = false
  fmatter.hidden = false
  let new_fm = ""
  for (const property in fmatter) {
    if (property == "versions") {
      console.log(`Need to fix versions on this one`)
    }
    //console.log(`${property}: ${fmatter[property]}`);
    new_fm += `${property}: ${fmatter[property]}\n`
  }
  const attr = `---\n${new_fm}\n---\n`
  const body = f.body
  const content = attr + body
  fs.writeFileSync(catalogPath, content)
}
const getDestinationData = async (id) => {
  const res = await getCatalog(`${PAPI_URL}/catalog/destinations/${id}`)
  if (res == null) {
    return
  }
  let destination = res.data.destinationMetadata
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
  let slug = slugify(destination.name, "destinations")
  let url = `connections/destinations/catalog/${slug}`

  // Force screen method into supportedMethods object
  destination.supportedMethods.screen = false
  // Set it true for LiveLike, per request
  if (destination.id == '63e42b47479274407b671071') {
    destination.supportedMethods.screen = true
  }

  const clone = (obj) => Object.assign({}, obj)
  const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];

    clonedObj[newKey] = targetKey;
    return clonedObj;
  };

  destination.supportedMethods = renameKey(destination.supportedMethods, 'pageview', 'page')

  let updatePrivateDest = {
    id: destination.id,
    display_name: destination.name,
    name: destination.name,
    slug: slugify(destination.name, "destinations"),
    previous_names: destination.previousNames,
    url,
    website: destination.website,
    status: destination.status,
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
    settings,
    actions,
    presets
  }


  if (destination.status === "PRIVATE_BETA" || destination.status === "PRIVATE_BUILDING") {
    private.push(updatePrivateDest)
  } else {
    console.log(`${destination.name} is public and will be removed`)
    makeDestinationPublic(url)
  }

  const options = {
    noArrayIndent: false
  }

  output = "# AUTOGENERATED FROM PUBLIC API. DO NOT EDIT\n"
  var todayDate = new Date().toISOString().slice(0, 10);
  output += "# destination data last updated " + todayDate + " \n";
  output += yaml.dump({
    items: private
  }, options)
  fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations_private.yml`), output);
}


const checkExistingStatus = async () => {
  let existingIds = []
  let newIds = []
  for (let [key] of Object.entries(privateDests)) {
    existingIds.push(privateDests[key].id)
  }

  existingIds.sort()

  for (i in existingIds) {
    let id = existingIds[i]
    let destination = await checkDestinationStatus(id)
    let status = destination.status
    let slug = slugify(destination.name, "destinations")
    let url = `connections/destinations/catalog/${slug}`

    
    

    if (status === "PRIVATE_BETA") {
      // console.log(`${destination.name} is private`)
      newIds.push(id)
    } else {
      console.log(`src/connections/${destination.name}is public`)
      makeDestinationPublic(url)
    }
  }
  return newIds
}
const addPrivateDestination = async () => {
  let ids = await checkExistingStatus()
  ids.sort();
  const DEST_ID = await prompt({
    type: 'input',
    name: 'id',
    message: 'Enter the destination ID'
  })

  if (DEST_ID.id == '0') {
    for (const element in ids) {
      let currentId = ids[element]
      await getDestinationData(currentId)
    }
    console.log("Updating exsting Private Beta destinations.")
  } else {
    if (ids.includes(DEST_ID.id)) {
      console.log("This destination is already captured.")
      return
    } else {
      ids.push(DEST_ID.id)
      fs.writeFileSync(path.resolve(__dirname, `../src/_data/catalog/destinations_private.yml`), '');

    }
    ids.sort();


    for (const element in ids) {
      let currentId = ids[element]
      await getDestinationData(currentId)
    }
  }

}


addPrivateDestination()
