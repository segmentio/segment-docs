require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
const { chunk } = require('lodash')

// Limit number of url objects per request
const PAGE_SIZE = 50

// Delay between requests to avoid rate limiting
const REQUEST_DELAY = 50

// Generate an OAuth2 token
const generateToken = async () => {
  const response = await axios.post(
    'https://api2-us-west-2.insided.com/oauth2/token',

    // Axios automatically sends URLSearchParams as form data
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.GAINSIGHT_CLIENT_ID,
      client_secret: process.env.GAINSIGHT_CLIENT_SECRET,
      scope: 'write'
    })
  )
  return response.data.access_token
}

// Send a POST request to the Gainsight API to index the pages
const index = async (pages) => {
  const token = await generateToken()
  const pageChunks = chunk(pages, PAGE_SIZE)
  console.log(`Gainsight: indexing ${pages.length} pages in ${pageChunks.length} chunks`)
  let currentPage = 0
  for (const pageChunk of pageChunks) {
    currentPage++
    console.log(`Indexing page ${currentPage} of ${pageChunks.length}...`)
    await axios.post(
      'https://api2-us-west-2.insided.com/external-content/index',
      { batch: pageChunk },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    )
    await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY))
  }
}

// The `onSuccess` hook runs after the deploy is live. This matters because Gainsight will
// access the URLs we upload, so the updated content has to be live before we index it.
//
// Copied file handling approach from Netlify's Brand Guardian plugin:
// https://github.com/tzmanics/netlify-plugin-brand-guardian/blob/33f90f745086a2bc9ed9273b15340002960afdfa/index.js
const onSuccess = async ({ constants }) => {
  const pagesJson = fs.readFileSync(`${constants.PUBLISH_DIR}/gainsight-pages.json`)
  const pages = JSON.parse(pagesJson)
  await index(pages)
}

onSuccess({ constants: { PUBLISH_DIR: './_site' } })