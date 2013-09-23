/*
 * grunt-bb2ng
 * https://github.com/boneskull/grunt-bb2ng
 *
 * Copyright (c) 2013 Christopher Hiller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bb2ng',
    'Grunt task to convert a Backbone project to an AngularJS project',
    function () {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        name: 'myApp'
      });

      // Iterate over all specified file groups.
      this.files.forEach(function (f) {
        // Concat specified files.
        var src = f.src.filter(function (filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function (filepath) {
            // Read file source.
            return grunt.file.read(filepath);
          }).join('\n');

        // totally convert to angularjs
        src =
        'angular.module("' + options.name + '", [])\n  .run(function() { ' +
        src + '});';

        // Write the destination file.
        grunt.file.write(f.dest, src);

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      });
    });

};
