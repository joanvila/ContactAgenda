angular.module('contactAgenda').factory('contactService', contactService);

function contactService($http, $q) {
    var SERVER_URL = 'http://localhost:8080/contacts/';
    var contacts = {
        list: []
    };

    function getContacts() {
        var q = $q.defer();
        $http.get(SERVER_URL).then(function(data){
            contacts.list = data.data;
            q.resolve(data);
        }, function(){
            q.reject();
        });

        return q.promise;
    }

    function addContact(newContact) {
        var q = $q.defer();
        $http.post(SERVER_URL, newContact).then(function(data){
            getContacts();
            q.resolve(data)
        }, function(){
            q.reject(data);
        });
        return q.promise;
    }

    function removeContact(id) {
        var q = $q.defer();
        $http.delete(SERVER_URL + id).then(function(data){
            getContacts();
            q.resolve(data);
        }, function(data) {
            q.reject(data);
        });
        return q.promise;
    }

    return {
        contacts: contacts,
        getContacts: getContacts,
        addContact: addContact,
        removeContact: removeContact
    }
}