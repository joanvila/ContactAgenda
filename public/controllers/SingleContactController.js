angular.module('contactAgenda').controller('SingleContactController', SingleContactController);

function SingleContactController($scope, $state, $stateParams, contactService){

    contactService.getContacts().then(function(data){
        $scope.contact = _.find(data.data, function (chr) {

            return $stateParams.id === chr._id;
        });
    });

    $scope.removeContact = function() {
        contactService.removeContact($scope.contact._id).then(function(data){
            $state.go('agenda.new', {}, {reload: true});
        });
    }
}