module.exports = function(grunt) {

  const sass = require('node-sass');
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
      sass: {
        options: {
          implementation: sass,
            sourceMap: true
          },
        dist: {
          files: {
            'build/css/style.css': 'source/sass/style.scss'
          }
        }
      }, 

      postcss: {
        style: {
          options: {
            processors: [
              require('autoprefixer')('last 2 versions', 'IE 11', 'Firefox ESR')
            ]
          },
          src: 'build/css/*.css'
        }
      },

      browserSync: {
      server: {
        bsFiles: {
          src: [
            'build/*.html',
            'build/css/*.css',
            'build/js/*.js'
          ]
        },
        options: {
          server: 'build/',
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      style: {
        files: ['source/sass/**/*.{scss,sass}'],
        tasks: ['sass', 'postcss', 'csso']
      }
    }, 

    svgstore: { 
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
        'build/img/sprite.svg': ['source/img/icons/icon-*.svg']
       }
      }
    }, 

    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
         'build/css/style.min.css': ['build/css/style.css']
        }
      }
    }, 

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },

        files: [{
          expand: true,
          src: ['build/img/**/*.{png,jpg,svg}']
        }]
      }
    },

    copy: {
      build: {
        files: [{
         expand: true,
          cwd: 'source',
          src: [
            'fonts/**/*.{woff,woff2}',
            'img/**',
            'js/**/*.js',
            '*.html'
          ],
         dest: 'build'
        }] 
      }
    }, 

    clean: {
      build: ['build']
    }
  });

  grunt.registerTask('svg', ['svgstore']);

  grunt.registerTask('serve', ['browserSync', 'watch']);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'postcss',
    'csso',
    'imagemin',
    'svgstore'
  ]);
};