module.exports = function(grunt) {

    grunt.registerTask('default', [ 'clean', 'browserify', 'sass', 'autoprefixer', 'bower_concat', 'copy' ]);

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/js/app.js': ['./app/scripts/app.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './dist/css/style.css': './app/sass/style.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    './dist/css/style.css': './dist/css/style.css'
                }
            }
        },

        watch: {
            dist: {
                files: [ './app/**/*.*' ],
                tasks: [ 'default' ]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [ './**/*.png' ],
                        dest: './dist/img',
                        cwd: './app/assets/'
                    },
                    {
                        expand: true,
                        src: [ './**/*.html' ],
                        dest: './dist',
                        cwd: './app/pages/'
                    },
                    {
                        expand: true,
                        src: [ './**/*.html' ],
                        dest: './dist/templates',
                        cwd: './app/templates'
                    }
                ]
            }
        },

        clean: ['./dist'],

        bower_concat: {
            dist: {
                dest: './dist/js/vendors.js',
                cssDest: './dist/css/vendors.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-bower-concat');
};