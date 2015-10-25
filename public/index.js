angular.module('contactAgenda',['ui.router', 'ngMessages'])
    .config(Config);

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sign-up', {
            url: '/sign-up',
            templateUrl: 'templates/sign-up.html',
            controller: 'SignUpController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('agenda', {
            url: '/agenda',
            templateUrl: 'templates/agenda.html',
            controller: 'AgendaController',
            abstract: true
        })
        .state('agenda.new', {
            url: '/new',
            templateUrl: 'templates/newContactForm.html',
            controller: 'ContactFormController'
        })
        .state('agenda.single', {
            url: '/:id',
            templateUrl: 'templates/singleContact.html',
            controller: 'SingleContactController'
        });

    $urlRouterProvider.otherwise('/agenda/new');
}