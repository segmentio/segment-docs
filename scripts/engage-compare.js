const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');
const Diff = require('diff')
const ora = require('ora')
const {
  type
} = require('os');
const pages = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/engage-compare.yml`)))


const compare = async () => {
    let title = ""
    let engage_path = ""
    let personas_path = ""
   

  for (const key in pages) {
    title = pages[key].title
    engage_path = pages[key].engage
    personas_path = pages[key].personas
    const throbber = ora(`${title}`).start()

    const engage_article = path.resolve(engage_path)
    const personas_article = path.resolve(personas_path)

    try {
        const e = fm(fs.readFileSync(engage_article, 'utf8')).body;
        const p = fm(fs.readFileSync(personas_article, 'utf8')).body;
        const diff = Diff.diffChars(p, e)

        if (diff.length > 1) {
            throbber.fail(`${title} has diffs!`)
        } else {
            throbber.succeed()
        }


    } catch (e) {
        console.log(e)
        return false
    }

  }
}

compare()
