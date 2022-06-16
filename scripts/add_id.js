// Purpose: Add id values to integrations that don't have them
// Why it's important: We look up integration metadata by ID, rather than slug
// Instructions: run `make add-id`, select the integration type, enter the slug
// The script:
// 1. Get's the list of public integrations from the API
// 2. Checks the slug you entered for an id
// 3. If there is no ID, it adds the ID retrieved from the API to the file.



const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const {
  Select
} = require('enquirer');
const {
  AutoComplete
} = require('enquirer');

const {
  type
} = require('os');


require('dotenv').config();

// Here, global variables are set
const PAPI_URL = "https://api.segmentapis.com"
const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/slugs.yml`)))

const slugify = (displayName) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')

  for (key in slugOverrides) {
    let original = slugOverrides[key].original
    let override = slugOverrides[key].override

    if (slug == original) {
      slug = override
    }
  }

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


const updateId = async () => {
  const type_select = new Select({
    name: 'int_type',
    message: 'What type of integration?',
    choices: ['sources', 'destinations']
  })

  let int_type = await type_select.run()



  let nextPageToken = "MA=="
  let integrations = []
  let paredIntegrations = []

  while (nextPageToken !== undefined) {
    const res = await getCatalog(`${PAPI_URL}/catalog/${int_type}/`, nextPageToken)
    if (int_type == "sources") {
      integrations = integrations.concat(res.data.sourcesCatalog)
    } else {
      integrations = integrations.concat(res.data.destinationsCatalog)
    }
    nextPageToken = res.data.pagination.next
  }



  integrations.forEach(integration => {

    const urlParse = (slug, type) => {
      let url = ""
      if (type == "destinations") {
        url = `connections/destinations/catalog/${slug}`
      } else {
        const libraryCategories = [
          'server',
          'mobile',
          'ott',
          'roku',
          'website'
        ]

        let mainCategory = integration.categories[0] ? integration.categories[0].toLowerCase() : ''

        if (libraryCategories.includes(mainCategory)) {
          url = `connections/sources/catalog/libraries/${mainCategory}/${slug}`
        } else {
          url = `connections/sources/catalog/cloud-apps/${slug}`
          mainCategory = 'cloud-app'
        }
      }

      return url
    }
    let slug = slugify(integration.name)
    let url = urlParse(slug, int_type)

    let updatedIntegration = {
      id: integration.id,
      slug,
      url
    }
    paredIntegrations.push(updatedIntegration)
  })

  let integrationSlugs = paredIntegrations.map(a => a.slug)

  const slug_select = new AutoComplete({
    name: "slug",
    message: "Enter the integration slug",
    limit: 10,
    initial: 2,
    choices: integrationSlugs

  })

  let slug_value = await slug_select.run()

  let final = paredIntegrations.find(x => x.slug == slug_value)
  let itemURL = final.url

  const catalogPath = path.resolve('src/', itemURL, 'index.md')
  if (fs.existsSync(catalogPath)) {
    const f = fm(fs.readFileSync(catalogPath, 'utf8'));
    const fmatter = f.frontmatter
    const re_id = new RegExp("(id: )\S*")
    if (!re_id.test(fmatter)) {
      const attr = `---\n${f.frontmatter}\nid: ${final.id}\n---\n`
      const body = f.body
      const content = attr + body
      fs.writeFileSync(catalogPath, content)
      console.log(`${final.slug} updated`)
    } else {
      console.log("integration already has an ID")
    }
  } else {
    console.log("can't find that integration")
  }
}

updateId()
