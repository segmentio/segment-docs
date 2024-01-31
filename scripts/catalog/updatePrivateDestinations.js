const {
  getDestinationData,
  checkExistingStatus
} = require('./utilities_private_destinations.js');

const updatePrivateDestinations = async () => {
  let ids = await checkExistingStatus();
  ids.sort();

  for (const element in ids) {
    let currentId = ids[element];
    await getDestinationData(currentId);
  }
  console.log("private destinations done");
};

exports.updatePrivateDestinations = updatePrivateDestinations;