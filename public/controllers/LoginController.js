angular.module('contactAgenda').controller('LoginController', LoginController);

function LoginController($scope, $state, authService){

    $scope.loginFormData = {};

    $scope.authError = false;

    $scope.login = function() {
        var username = $scope.loginFormData.username;
        var password = $scope.loginFormData.password;

        authService.login(username, password).then(function() {
            $state.go('agenda.new', {}, {reload: true});
        }, function() {
            $scope.authError = true;
        });

        $scope.loginForm.$setPristine();
        $scope.loginFormData = {};
    }
}