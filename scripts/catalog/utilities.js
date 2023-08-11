const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');
const fm = require('front-matter');




const slugOverrides = yaml.load(fs.readFileSync(path.resolve(__dirname, `../../src/_data/catalog/slugs.yml`)));

const slugify = (displayName, type) => {
  let slug = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace('-&-', '-')
    .replace('/', '-')
    .replace(/[\(\)]/g, '')
    .replace('.', '-')
    .replace(/'/g, '');

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
      // console.log(original + " -> " + override);
      slug = override;
    }
  }
  return slug;
};

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

    return res.data;
  } catch (error) {
    console.log("Something went wrong with the request to the Public API.\nIf you're updating a private destination, ensure the ID is correct.");
  }
};

const getConnectionModes = (destination) => {
  let connectionModes = {
    device: {
      web: false,
      mobile: false,
      server: false
    },
    cloud: {
      web: false,
      mobile: false,
      server: false
    }
  };

  if (destination.components.length) {
    destination.components.forEach(component => {
      switch (component.type) {
        case 'IOS':
          connectionModes.device.mobile = true;
          break;
        case 'ANDROID':
          connectionModes.device.mobile = true;
          break;
        case 'BROWSER':
          if (destination.browserUnbundling) {
            connectionModes.cloud.web = true;
          }
          connectionModes.device.web = true;
          break;
        case 'SERVER':
          connectionModes.cloud.mobile = true;
          if (destination.platforms.server) {
            connectionModes.cloud.server = true;
          }
          if (destination.platforms.browser) {
            connectionModes.cloud.web = true;
          }
          break;
        case 'CLOUD':
          connectionModes.cloud.mobile = true;
          if (destination.platforms.server) {
            connectionModes.cloud.server = true;
          }
          if (destination.platforms.browser) {
            connectionModes.cloud.web = true;
          }
          break;
      }
    });
  } else {
    if (destination.platforms.browser) {
      connectionModes.cloud.web = true;
    }
    if (destination.platforms.mobile) {
      connectionModes.cloud.mobile = true;
    }
    if (destination.platforms.server) {
      connectionModes.cloud.server = true;
    }
  }

  return connectionModes;
};

const doesCatalogItemExist = (item) => {
  const docsPath = `src/${item.url}`;

  if (!fs.existsSync(docsPath)) {
    console.log(`${item.slug} (id: ${item.id}) does not exist: ${docsPath}`);
    let content = `---\ntitle: '${item.display_name} Source'\nhidden: true\n---`;

    if (!docsPath.includes('/sources/')) {
      let betaFlag = '';
      if (item.status === 'PUBLIC_BETA') {
        betaFlag = 'beta: true\n';
      }
      content = `---\ntitle: '${item.display_name} Destination'\nhidden: true\nid: ${item.id}\npublished: false\n${betaFlag}---\n`;
    }

    fs.mkdirSync(docsPath);
    fs.writeFileSync(`${docsPath}/index.md`, content);
  }
};

const isCatalogItemHidden = (itemURL) => {
  try {
    const catalogPath = path.resolve('src', itemURL, 'index.md');
    if (fs.existsSync(catalogPath)) {
      const f = fm(fs.readFileSync(catalogPath, 'utf8'));
      if (f.attributes.hidden) return true;
    }
    return false;
  } catch (e) {
    console.log(error);
    return false;
  }
};

const sanitize = (text) => {
  const regex = /(<[^\/a].*?>)/ig;
  result = text.replace(regex, "`$1`");
  return result;
};



exports.slugify = slugify;
exports.getCatalog = getCatalog;
exports.getConnectionModes = getConnectionModes;
exports.isCatalogItemHidden = isCatalogItemHidden;
exports.sanitize = sanitize;
exports.doesCatalogItemExist = doesCatalogItemExist;
