angular.module('contactAgenda').factory('userService', userService);

function userService($http, $q) {
    var SERVER_URL = 'http://localhost:8080/users/';

    function addUser(newUser) {
        var q = $q.defer();
        $http.post(SERVER_URL, newUser).then(function(data){
            q.resolve(data)
        }, function(){
            q.reject(data);
        });
        return q.promise;
    }

    return {
        addUser: addUser
    }
}