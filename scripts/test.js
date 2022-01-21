const checkLinks = require('check-links')

const check =  async () => {
  const url = process.argv[2]
  const results = await checkLinks([url])
  console.log(results)

}

check()