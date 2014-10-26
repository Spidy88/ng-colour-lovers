
angular.module('ColourLovers')
    .controller('AppCtrl', [ '$location', 'Style', AppCtrl ])
    .controller('ResourceCtrl', [ '$routeParams', 'AppCache', 'Style', 'ColourLoverService', ResourceCtrl ]);

function AppCtrl( $location, Style ) {
    var vm = this;

    vm.Style = Style;
    vm.viewResource = viewResource;
    vm.resource = $location.path().substring( $location.path().lastIndexOf('/') + 1 );

    function viewResource( resource ) {
        $location.path( '/' + resource );
        vm.resource = resource;
    }
}

function ResourceCtrl( $routeParams, AppCache, Style, ColourLoverService ) {
    var vm = this,
        resource = $routeParams.resource;

    vm.Style = Style;
    vm.selectResource = selectResource;
    vm.resources = AppCache.get( resource );

    if( !vm.resources ) {
        ColourLoverService.getResource( resource ).then( onSuccess, onError );
    }

    function selectResource( res ) {
        if( resource === 'colors' ) {
            selectColor( res );
        } else if( resource === 'palettes' ) {
            selectPalette( res );
        } else if( resource === 'patterns' ) {
            selectPattern( res );
        } else {
            console.log( 'Unrecognized resource: ', res );
        }

        console.log( 'Style: ', Style );
    }

    function selectColor( color ) {
        Style.backgroundPattern = null;
        Style.primaryBackgroundColor = '#' + color.hex;
    }

    function selectPalette( palette ) {
        Style.backgroundPattern = null;
        Style.primaryBackgroundColor = '#' + palette.colors[0];
        Style.secondaryBackgroundColor = '#' + palette.colors[1];
        Style.primaryAccentColor = '#' + palette.colors[2];
        Style.secondaryAccentColor = '#' + palette.colors[3];
        Style.primaryTextColor = '#' + palette.colors[4];
        Style.secondaryTextColor = '#' + palette.colors[3];
    }

    function selectPattern( pattern ) {
        Style.backgroundPattern = pattern.imageUrl;
    }

    function onSuccess( data ) {
        vm.resources = data;
        AppCache.put( resource, vm.resources );
    }

    function onError( err ) {
        console.log( 'Error: ', err );
    }
}
