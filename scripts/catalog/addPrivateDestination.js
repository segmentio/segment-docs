const path = require('path');
const fs = require('fs');
const { prompt } = require('enquirer');
const {
    getDestinationData,
    checkExistingStatus
  } = require('./utilities_private_destinations.js');

const addPrivateDestination = async () => {
  let ids = await checkExistingStatus();
  ids.sort();

  const DEST_ID = await prompt({
    type: 'input',
    name: 'id',
    message: 'Enter the destination ID'
  });


    if (ids.includes(DEST_ID.id)) {
      console.log("This destination is already captured.");
      return;
    } else {
      ids.push(DEST_ID.id);
      fs.writeFileSync(path.resolve(__dirname, `../../src/_data/catalog/destinations_private.yml`), '');
    }
    ids.sort();

    for (const element in ids) {
      let currentId = ids[element];
      await getDestinationData(currentId);
    }
};

addPrivateDestination();