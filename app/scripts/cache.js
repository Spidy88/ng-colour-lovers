
angular.module('ColourLovers')
    .service('AppCache', AppCache);

function AppCache() {
    var cache = {};

    this.get = get;
    this.put = put;
    this.remove = remove;
    this.clearCache = clearCache;

    function get(key, defaultz) {
        if( cache.hasOwnProperty(key) ) {
            return cache[key];
        }

        return defaultz;
    }

    function put(key, value) {
        cache[key] = value;
    }

    function remove(key) {
        if( cache.hasOwnProperty(key) ) {
            delete cache[key];
        }
    }

    function clearCache() {
        cache = {};
    }
}