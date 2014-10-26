
angular.module('ColourLovers')
    .service('ColourLoverService', [ '$http', '$q', ColourLoverService ]);

function ColourLoverService( $http, $q ) {
    var baseUrl = 'http://www.colourlovers.com/api/',
        colorsPath = 'colors/',
        palettesPath = 'palettes/',
        patternsPath = 'patterns/';

    this.getResource = getResource;
    this.getColors = getResource.bind( this, colorsPath );
    this.getPalettes = getResource.bind( this, palettesPath );
    this.getPatterns = getResource.bind( this, patternsPath );

    function getResource( resourcePath, filter, options ) {
        var url = baseUrl + resourcePath + '?format=json&jsonCallback=JSON_CALLBACK',
            deferred = $q.defer();

        if( filter ) {
            url += filter;
        }

        if( options ) {
            for (var key in options) {
                url += (key + '=' + options[key]);
            }
        }

        $http({ method: 'JSONP', url: url }).success( deferred.resolve).error( deferred.reject );

        return deferred.promise;
    }
}