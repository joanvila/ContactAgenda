angular.module('contactAgenda').controller('ContactFormController', ContactFormController);

function ContactFormController($scope, contactService, groupService, authService, $state, $stateParams) {

    $scope.loggedUser = authService.getUser();

    $scope.sendForm = function() {

        var enteredGroup = $scope.formData.group;
        groupService.addGroupIfNotPresent(enteredGroup);

        var newContact = {
            name: $scope.formData.name,
            surname: $scope.formData.surname,
            company: $scope.formData.company,
            email: $scope.formData.email,
            telephone: $scope.formData.telephone,
            address: $scope.formData.address,
            group: $scope.formData.group,
            owner: $scope.loggedUser.info._id
        };

        contactService.addContact(newContact);

        $scope.newContactForm.$setPristine();
        $scope.formData = {
            group: 'Default'
        };


        $state.transitionTo('agenda.new', $stateParams, { reload: true, inherit: false, notify: true });

    };
}