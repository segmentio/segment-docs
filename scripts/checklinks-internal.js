const globby = require('globby')
const posthtml = require('posthtml')
const fs = require('fs')
const server = require('browser-sync').create()
const checkLinks = require('check-links')
const ora = require('ora')


const checkForDeadLocalUrls = async () => {
  try {
    const files = await globby('_site/**/*.html')
    const throbber = ora('Link Check Starting').start()
    const urls = new Set()

    const ph = posthtml([
      require('posthtml-urls')({
        eachURL: (url) => {
          if (url.startsWith('/docs/')) {
            urls.add(url.replace('/docs/', 'http://localhost:3000/'))
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

    const results = await checkLinks(
      Array.from(urls).map((url) =>
        url
      ),
    )
    const deadUrls = Array.from(urls).filter(
      (url) => results[url].status === 'dead',
    )

    let broke = []

    deadUrls.forEach(url => {
      link = url.replace('http://localhost:3000', 'https://segment.com/docs')
      if (!link.endsWith('/')){
        link = link+'/'
      }
      broke.push(link)
    });



    const redirects = ['https://segment.com/docs/guides/usage-and-billing/','https://segment.com/docs/connections/sources/catalog/libraries/website/plugins/', 'https://segment.com/docs/assets/docs.bundle.js/']
    const data = require('../_site/redirects.json')
    Object.keys(data).forEach(key => {
      if (!key.endsWith('/')){
        key = key+'/'
      }
      redirects.push('https://segment.com/docs'+key.replace('/docs',''))
    })
    broke = broke.filter(val => !redirects.includes(val));

    if (broke.length > 0) {
      throbber.fail(`Dead URLS: ${broke.length}\n\n`)
      console.error(`${broke.join('\n')}`)
      process.exit(1)
    }else {
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

checkForDeadLocalUrls()

