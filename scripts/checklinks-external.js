// A script to check all external links on the docs site

const globby = require('globby')
const posthtml = require('posthtml')
const fs = require('fs')
const server = require('browser-sync').create()
const checkLinks = require('check-links')
const ora = require('ora')



const checkForDeadExternalUrls = async () => {
  try {
    // Grab all the files from the specified directory, add their paths to a new set 
    const files = await globby('_site/**/*.html')
    const throbber = ora('Link Check Starting').start()
    // Use a set here for efficiency, no duplicate values!
    const urls = new Set()

    // Because we're checking for external URLs only, add every URL that does not start with a `/`,
    // or point to 0.0.0.0. Also exclude segmentio GitHub URLs
    const ph = posthtml([
      require('posthtml-urls')({
        eachURL: (url) => {
          if (!url.startsWith('http://0') && !url.startsWith('/') && !url.startsWith('https://github.com/segmentio')) {
            urls.add(url)
          }
        },
      }),
    ])
    throbber.succeed()
    throbber.start('Processing files')

    // Run the above logic on each file 
    files.forEach((file) => {
      ph.process(fs.readFileSync(file))
    })


    // Check all the links collected in the section above
    throbber.succeed()
    throbber.start('Checking the links')
    const results = await checkLinks(
      Array.from(urls).map((url) =>
        url
      )
    )

    // If a link returns 'dead' (404), add it to an array
    const deadUrls = Array.from(urls).filter(
      (url) => results[url].statusCode === 404,
    )
 
    // Get the ignore list
    throbber.succeed()
    throbber.start('Get the ignore list')
    const readFileLines = filename =>
      fs.readFileSync(filename)
      .toString('UTF8')
      .split('\n')

    let ignoreList = readFileLines('ignore-links.txt')

    throbber.succeed()

    // Filter the ignored links
    throbber.start('Filter the ignored URls')
    let broke = []
    broke = deadUrls.filter(val => !ignoreList.includes(val));

    // If there are dead URLs, list them here, along with the count. Exit status 1 to indicate an error.
    if (broke.length > 0) {
      throbber.fail(`Dead URLS: ${broke.length}\n\n`)
      console.log(`Dead URLS: ${broke.length}\n\n${broke.join('\n')}`)
      process.exit(1)
    }
    // Otherwise, claim that all the links work, and exit the process normally.
    else {
      throbber.succeed()
      console.log('All links work!')
      process.exit
    }
    throbber.stop()
    server.exit()
  } catch (e) {
    console.error(e)
    server.exit()
  }
}
checkForDeadExternalUrls()
