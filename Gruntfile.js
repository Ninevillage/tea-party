var path;

path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      coffee: {
        files: ['**/*.coffee'],
        tasks: ['clear', 'mochacli']
      }
    },
    mochacli: {
      options: {
        files: ['test/**/*.coffee'],
        reporter: 'spec',
        compilers: ['coffee:coffee-script/register'],
        require: ['should'],
        ui: 'bdd',
        quiet: false,
        growl: true,
        env: {
          NODE_ENV: 'test',
          DEBUG: 'tea-party:tea-party:*'
        }
      },
      unit: {
        options: {
          files: ['test/unit/**/*.coffee']
        }
      },
      integration: {
        options: {
          files: ['test/integration/**/*.coffee']
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
  grunt.registerTask('test:watcher', ['watch:coffee']);
  
  return grunt;
};