const glob = require('glob');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const yaml = require('js-yaml');

const ignore = [ 'connections/**', '_*/**', '*.md' ];

const capitalize = (str) => str.charAt(0).toLocaleUpperCase() + str.slice(1);
const getTitle = (str) => str.split('-').map(capitalize).join(' ');

const getSection = (accum, paths) => {
    const slug = paths.join('/');
    if (accum[slug]) return accum[slug];

    const section_title = getTitle(paths[paths.length - 1]);
    const section = [];

    const subsection = paths.length > 1
        ? { section_title, slug, section }
        : { section_title, section };

    accum[slug] = subsection;
    if (paths.length > 1) getSection(accum, paths.slice(0, -1)).section.push(subsection);

    return subsection;
};

const files = glob.sync('**/*.md', { ignore, cwd: path.resolve(__dirname, '../src') });

const sections = files.reduce((accum, file) => {
    const paths = file.split('/');

    // Not a valid path or some deep-nested directory structure we don't support
    if (paths.length < 2 || paths.length > 3) {
        console.log(`skipping ${file}`);
        return accum;
    }

    // read in the .md file, parse the frontmatter attributes
    const f = fm(fs.readFileSync(path.resolve(__dirname, '../src', file), 'utf8'));

    const title = f.attributes.title || getTitle(paths[paths.length - 1].slice(0, -3));
    const s = getSection(accum, paths.slice(0, -1));

    if (paths[paths.length - 1] === 'index.md') {
        s.section.unshift({ path: `/${paths.slice(0, -1).join('/')}`, title });
    } else {
        s.section.push({ path: `/${paths.join('/').slice(0, -3)}`, title });
    }

    return accum;
}, {});

const mainSections = {};
const legalSections = {};
const apiSections = {};
const partnerSections = {};

Object.keys(sections).filter(key => !key.includes('/')).forEach((key) => {
    const value = sections[key];

    switch (key) {
        case 'legal': legalSections[key] = value; break;
        case 'api': apiSections[key] = value; break;
        case 'partners': partnerSections[key] = value; break;
        default: mainSections[key] = value; break;
    }
});

[   ['main', mainSections],
    ['legal', legalSections],
    ['api', apiSections],
    ['partners', partnerSections]
].forEach(([ name, sections ]) => {
    const options = { noArrayIndent: true };
    const output = yaml.safeDump({ sections: Object.values(sections) }, options);
    fs.writeFileSync(path.resolve(__dirname, `../src/_data/sidenav1/${name}.yml`), output);
});
