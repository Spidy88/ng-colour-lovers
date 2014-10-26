
angular.module('ColourLovers', [ 'ngRoute' ])
    .config( configFn );

function configFn( $locationProvider, $routeProvider ) {
    $locationProvider.html5Mode( true );

    $routeProvider
        .when('/:resource', {
            templateUrl: "/templates/resources.html",
            controller: 'ResourceCtrl',
            controllerAs: 'ctrl'
        });
}

require('./controllers');
require('./services');
require('./cache');
require('./style');