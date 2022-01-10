const globby = require('globby')
const posthtml = require('posthtml')
const fs = require('fs')
const server = require('browser-sync').create()
const checkLinks = require('check-links')
const {
  $dataMetaSchema
} = require('ajv')
const ora = require('ora')



const checkForDeadExternalUrls = async () => {
  try {
    const files = await globby('_site/**/*.html')
    const throbber = ora('Link Check Starting').start()
    const urls = new Set()

    const ph = posthtml([
      require('posthtml-urls')({
        eachURL: (url) => {
          if (!url.startsWith('http://0') && !url.startsWith('/') && !url.startsWith('https://github.com/segmentio'))  {
            urls.add(url)
          }
        },
      }),
    ])
    throbber.succeed()
    throbber.start('Processing files')
    
    files.forEach((file) => {
      ph.process(fs.readFileSync(file))
    })
    throbber.succeed()
    throbber.start('Starting server')
    await new Promise((resolve) => {
      server.init({
          port: 3000,
          server: {
            baseDir: '_site',
          },
          open: false,
          logLevel: 'silent',
        },
        resolve,
      )
      throbber.succeed()
    })
    
    throbber.start('Checking the links')
    const results = await checkLinks(
      Array.from(urls).map((url) =>
        url
      ),
    )
    const deadUrls = Array.from(urls).filter(
      (url) => results[url].status === 'dead',
    )

    if (deadUrls.length > 0) {
      throbber.fail(`Dead URLS: ${deadUrls.length}\n\n`)
      console.log(`Dead URLS: ${deadUrls.length}\n\n${deadUrls.join('\n')}`)
      process.exit(1)
    } else {
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
