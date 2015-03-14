module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({

        /* -------------------- Prepare Build -------------------- */

        // Clean Build folder
        // Target: build/
        clean: {
            everything: ['build/**']
        },

        // Clean Build folder
        // Target: build/
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'app/images/*',
                        dest: 'build/images/',
                        filter: 'isFile'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/materialize/font/material-design-icons/**',
                        dest: 'build/font/material-design-icons/',
                        filter: 'isFile'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        src: 'bower_components/modernizr/modernizr.js',
                        dest: 'build/js/',
                        flatten: true,
                        filter: 'isFile',
                    }
                ]
            }
        },

        /* -------------------- Bower Dependencies -------------------- */

        // Concatenate all Bower dependencies
        // Target: .tmp/
        bower_concat: {
            all: {
                dest: '.tmp/js/_bower.js',
                cssDest: '.tmp/css/_bower.css',
                bowerOptions: {
                    relative: false,

                },
                mainFiles: {
                    'skrollr-menu': 'bower_components/skrollr-menu/dist/skrollr.menu.min.js'
                },
                exclude: [
                    'modernizr',
                    'firebase'
                    ]
            }
        },

        /* -------------------- Styles -------------------- */

        // SASS Compiler
        // Target: .tmp/
        sass: {
            development: {
                options: {
                    style: 'expanded'
                },
                files: {
                    ".tmp/css/main_unprefixed.css": "app/styles/main.scss"
                }
            },
            production: {
                options: {
                    style: 'compressed'
                },
                files: {
                    ".tmp/css/main_unprefixed.css": "app/styles/main.scss"
                }
            }
        },

        // For Browser Vendor Profiles
        // Target: .tmp/
        autoprefixer: {
            default: {
                files: {
                    ".tmp/css/main.css": ".tmp/css/main_unprefixed.css"
                }
            }
        },

        // CSS concatenation and minification
        // Target: build/
        cssmin: {
            default: {
                files: {
                    'build/css/style.css': [
                        '.tmp/css/_bower.css',
                        '.tmp/css/main.css'
                    ]
                }
            }
        },

        concat_css: {
            default: {
                files: {
                    'build/css/style.css': [
                        '.tmp/css/_bower.css',
                        '.tmp/css/main.css'
                    ]
                }
            }
        },

        /* -------------------- HTML -------------------- */

        // HTML includes
        // Target: .tmp/
        includereplace: {
            default: {
                options: {
                    prefix: '<!--@@',
                    suffix: ' -->',
                    includesDir: 'app/partials/'
                },
                files: {
                    '.tmp/': 'app/index.html'
                }
            }
        },

        // Minification
        // Target: build/
        htmlmin: { // Task
            production: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': '.tmp/app/index.html'
                }
            },
            development: {
                files: {
                    'build/index.html': '.tmp/app/index.html'
                }
            }
        },

        /* -------------------- Javascript -------------------- */

        // Syntax checker
        jshint: {
            development: {
                src: ['Gruntfile.js', 'app/**/*.js'],
                options: {
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    unused: true,
                    boss: true,
                    eqnull: true,
                    node: true,
                    force: true
                }
            },
            production: {
                src: ['Gruntfile.js', 'app/**/*.js'],
                options: {
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    unused: true,
                    boss: true,
                    eqnull: true,
                    node: true,
                    force: false
                }
            }
        },

        // Uglify, minify and concatenate
        // Target: build/
        uglify: {
            development: {
                files: {
                    'build/js/scripts.js': ['.tmp/js/_bower.js',
                                            'app/scripts/main.js',
                                            'app/scripts/data.js',
                                            'app/scripts/scroll.js',
                                           'app/scripts/utilities.js']
                }
            }
        },

        /* -------------------- Production -------------------- */

        // Web Server
        connect: {
            server: {
                options: {
                    port: 8081,
                    hostname: 'localhost',
                    base: 'build',
                    livereload: 1337,
                    keepalive: false
                }
            }
        },

        // Watch for changes
        watch: {
            options: {
                livereload: 1337,
                nospawn: true
            },
            html: {
                files: 'app/**/*.html',
                tasks: ['html']
            },
            sass: {
                files: 'app/**/*.scss',
                tasks: ['styles']
            },
            js: {
                files: 'app/**/*.js',
                tasks: ['js']
            },
            images: {
                files: 'app/images/**',
                tasks: ['copy:images']
            }
        }


    });


    //SASS
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //HTML
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //Javascript
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //Dependencies
    grunt.loadNpmTasks('grunt-bower-concat');
    //Build
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // Prepare
    grunt.registerTask('prepare', [
        'clean',
        'copy'
    ]);

    // Styles
    grunt.registerTask('styles', [
        'sass:development',
        'autoprefixer',
        'cssmin'
    ]);
    grunt.registerTask('styles:production', [
        'sass:production',
        'autoprefixer',
        'cssmin'
    ]);

    // HTML
    grunt.registerTask('html', [
        'includereplace',
        'htmlmin:development'
    ]);
    grunt.registerTask('html:production', [
        'includereplace',
        'htmlmin:production'
    ]);

    // Javascript
    grunt.registerTask('js', [
        'uglify'
    ]);
    grunt.registerTask('js:production', [
        'jshint:production',
        'uglify'
    ]);

    // Development
    grunt.registerTask('development', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('default', [
        'prepare',
        'bower_concat',
        'styles',
        'html',
        'js',
        'development'
    ]);

    grunt.registerTask('default:production', [
        'prepare',
        'bower_concat',
        'styles:production',
        'html:production',
        'js:production',
        'connect'
    ]);

};