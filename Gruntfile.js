var path;

path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['**/*.js'],
        tasks: ['clear', 'mochacli']
      }
    },
    mochacli: {
      options: {
        files: ['test/**/*.js'],
        reporter: 'spec',
        require: ['should'],
        ui: 'bdd',
        quiet: false,
        growl: true,
        env: {
          NODE_ENV: 'test',
          DEBUG: 'tea-party:tea-party:*',
          CONFIG: path.join(__dirname, 'app/config'),
          HELPERS: path.join(__dirname, 'app/helpers'),
          MODELS: path.join(__dirname, 'app/models'),
          MODULES: path.join(__dirname, 'app/helpers/modules')
        }
      },
      unit: {
        options: {
          files: ['test/unit/**/*.js']
        }
      },
      integration: {
        options: {
          files: ['test/integration/**/*.js']
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-clear');
  
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('test:unit', ['mochacli:unit']);
  grunt.registerTask('test:integration', ['mochacli:integration']);
  grunt.registerTask('test:watcher', ['watch:js']);
  
  return grunt;
};