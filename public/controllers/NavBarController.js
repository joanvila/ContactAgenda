angular.module('contactAgenda').controller('NavBarController', NavBarController);

function NavBarController($scope, $state, authService){

    $scope.loggedUser = authService.getUser();

    $scope.logout = function() {
        authService.logout();
        $scope.loggedUser = false;
        $state.go('agenda.new', {}, {reload: true});
    }
}