module.exports = function(grunt) {
    "use strict"

     // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        clean: {
          dev: {
            src: [ "dev" ]
          },
          temp: {
            src: [ "dev/*.jade" ]
          }
         },

        copy: {
          dev: {
            cwd: "source",
            src: [ '**' ],
            dest: "dev",
            expand: true
          },
         },

        preprocess: {
          dev: {
            src: "source/index.jade",
            dest: "dev/index.jade",
            options: {
              context: {
                production: false
              }
            }
          },
         },

        jade: {
          dev: {
              options: {
                  data: { debug: false },
                  pretty: true,
              },
              files: [
                  {
                    cwd: "dev",
                    src: "**/*.jade",
                    dest: "dev",
                    expand: true,
                    ext: ".html",
                  }
              ],
          },
         },

        watch: {
          options: { livereload: true },
          dev:{
            files: [ "source/**/*.*" ], 
            tasks: [ "copy:dev", "preprocess:dev", "jade:dev", "clean:temp" ],
            options: { livereload: true },
          },
         },

        connect: {
          dev: {
              options: { 
                  port: 54321,
                  base: "dev",
                  open: true,
                  livereload: true,
              },
          },
         },
    });

    grunt.registerTask('default', ["clean:dev", "copy:dev", "preprocess:dev", "jade:dev", "clean:temp"]);
    grunt.registerTask('server', ["clean:dev", "copy:dev", "preprocess:dev", "jade:dev", "clean:temp", "connect:dev", "watch:dev"]);

 };