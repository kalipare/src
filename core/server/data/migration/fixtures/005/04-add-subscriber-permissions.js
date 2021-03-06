// Update the permissions & permissions_roles tables to add entries for subscribers
var utils = require('../utils'),
    resource = 'subscriber';

function getPermissions() {
    return utils.findModelFixtures('Permission', {object_type: resource});
}

function getRelations() {
    return utils.findPermissionRelationsForObject(resource);
}

function printResult(logger, result, message) {
    if (result.done === result.expected) {
        logger.info(message);
    } else {
        logger.warn('(' + result.done + '/' + result.expected + ') ' + message);
    }
}

module.exports = function addSubscriberPermissions(options, logger) {
    var modelToAdd = getPermissions(),
        relationToAdd = getRelations();

    return utils.addFixturesForModel(modelToAdd, options).then(function (result) {
        printResult(logger, result, 'Adding permissions fixtures for ' + resource + 's');
        return utils.addFixturesForRelation(relationToAdd, options);
    }).then(function (result) {
        printResult(logger, result, 'Adding permissions_roles fixtures for ' + resource + 's');
    });
};
