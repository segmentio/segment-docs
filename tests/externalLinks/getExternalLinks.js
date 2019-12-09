const fs = require('fs')
const glob = require('glob')
const markdownLinkExtractor = require('markdown-link-extractor')

// Find all external links in our docs
const files = glob.sync('src/**/*.md')
const externalLinkPattern = /^https?\:\/\/(?!segment)/
files.reduce((accum, file) => {
  let markdown = fs.readFileSync(file, 'utf8').toString()
  const links = markdownLinkExtractor(markdown)
  links.forEach(function (link) {
    if (externalLinkPattern.test(link)) console.log(link)
  })
})