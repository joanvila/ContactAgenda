angular.module('contactAgenda').factory('authService', authService);

function authService($http, $window,  $q) {

    var SERVER_URL = 'http://localhost:8080/authenticate/';
    var user = {
        info: null,
        isLogged: false
    };

    function getUserFromDb() {
        var q = $q.defer();
        $http.get('http://localhost:8080/users/').then(function(data) {
            user.info = data.data[0];
            user.isLogged = true;
            q.resolve(user);
        }, function() {
            q.reject();
        });
        return q.promise;
    }

    getUserFromDb();


    function login(username, password) {
        var q = $q.defer();
        $http.post(SERVER_URL, {username: username, password: password}).then(function(data) {
            user.info = data.data.user;
            user.isLogged = true;
            $window.sessionStorage.token = data.data.token;
            q.resolve();
        }, function() {
            q.reject();
        });
        return q.promise;
    }

    function getUser() {
        return user;
    }

    function isUserLogged() {
        return user.isLogged;
    }

    function logout() {
        user.info = null;
        user.isLogged = false;
        $window.sessionStorage.token = null;
    }

    return {
        isUserLogged: isUserLogged,
        login: login,
        getUser: getUser,
        getUsersFromDb: getUserFromDb,
        logout: logout
    }
}