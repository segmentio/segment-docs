const {updateSources} = require('./updateSources.js');
const {updateDestinations} = require('./updateDestinations.js');
const {updateWarehouses} = require('./updateWarehouses.js');
const {updatePrivateDestinations} = require('./updatePrivateDestinations.js');

updateSources();
updateWarehouses();

// Wait for the main catalog to update before updating the private destinations
async function destinations() {
    await updateDestinations()
    updatePrivateDestinations();
}



destinations();