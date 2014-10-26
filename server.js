var Hapi = require('hapi'),
    path = require('path'),
    config = require('./config.js'),
    server = new Hapi.Server(config.port),
    routes = {
        css: {
            method: 'GET',
            path: '/css/{file*}',
            handler: createDirectoryRoute('css')
        },
        js: {
            method: 'GET',
            path: '/js/{file*}',
            handler: createDirectoryRoute('js')
        },
        templates: {
            method: 'GET',
            path: '/templates/{file*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: '/{file*}',
            handler: {
                file: path.join(__dirname, '/dist/index.html')
            }
        }
    };

server.route([ routes.css, routes.js, routes.templates, routes.spa ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', config.port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/dist/' + directory)
        }
    };
}
