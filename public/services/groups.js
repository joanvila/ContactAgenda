angular.module('contactAgenda').factory('groupService', groupService);

function groupService() {
    var groups = [];

    var addGroupIfNotPresent = function(group) {
        var index = groups.indexOf(group);
        if (index < 0) {
            groups.push(group);
        }
    };

    return {
        groups: groups,
        addGroupIfNotPresent: addGroupIfNotPresent
    }
}