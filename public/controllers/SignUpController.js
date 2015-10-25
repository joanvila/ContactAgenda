angular.module('contactAgenda').controller('SignUpController', SignUpController);

function SignUpController($scope, $state, userService){
    $scope.signupForm = {};

    $scope.signup = function() {

        var newUser = {
            name: $scope.signupFormData.name,
            username: $scope.signupFormData.username,
            email: $scope.signupFormData.email,
            password: $scope.signupFormData.password,
        };

        userService.addUser(newUser);

        $scope.signupForm.$setPristine();
        $scope.signUpFormData = {};

        $state.go('login', {}, {reload: true});
    }
}