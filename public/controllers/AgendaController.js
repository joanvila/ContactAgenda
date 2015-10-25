angular.module('contactAgenda').controller('AgendaController', AgendaController);


function AgendaController($scope, contactService, groupService, authService) {

    $scope.contacts = [];

    $scope.loggedUser = authService.getUser();

    if($scope.loggedUser.isLogged) {
        contactService.getContacts().then(function(data) {
            //contacts
            $scope.contacts = contactService.contacts;
            for(var i = 0; i < $scope.contacts.list.length; i++) {

                if ($scope.contacts.list[i].owner != $scope.loggedUser.info._id) {
                    $scope.contacts.list.splice(i, 1);
                    --i;
                }
            }
            //Groups
            for (i = 0; i < $scope.contacts.list.length; i++) {
                groupService.addGroupIfNotPresent($scope.contacts.list[i].group);
            }
            $scope.groups = groupService.groups;
            $scope.activeGroup = $scope.groups[0];
        }, function() {});
    }

    $scope.formData = {
        group: 'Default'
    };
    $scope.search = {};

    $scope.changeTab = function(group) {
        $scope.activeGroup = group;
    }

}