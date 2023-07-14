const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');


const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../src/_data/catalog/slugs.yml`)));

const slugify = (displayName, type) => {
    let slug = displayName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace('-&-', '-')
      .replace('/', '-')
      .replace(/[\(\)]/g, '')
      .replace('.', '-');
  
    let overrides = "";
    if (type == "sources") {
      overrides = slugOverrides.sources;
    }
  
    if (type == "destinations") {
      overrides = slugOverrides.destinations;
    }
  
    for (key in overrides) {
      let original = overrides[key].original;
      let override = overrides[key].override;
  
      if (slug == original) {
        console.log(original + " -> " + override);
        slug = override;
      }
    }
    return slug;
  };
  
  exports.slugify = slugify;