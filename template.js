/*
 * grunt-init-fcoo-maps
 * https://gruntjs.com/
 *
 */

'use strict';

// Basic template description.
exports.description = 'Create a repository with a layer using fcoo-maps/fcoo-maps-time.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Please wait...';


// Template-specific notes to be displayed after question prompts.
exports.after =
    '*******************************************\n' +
    'FINISH :-)\n' +
    '>You can now use the following cmd\n' +
    '>grunt check\n' +
    '>grunt dev\n' +
    '>grunt build\n' +
    '>grunt push\n' +
    '>grunt push-cli\n' +
    '*******************************************\n' +
    '';

// Any existing file or directory matching this wildcard will cause a warning : All files are moved into .ORIGINAL
exports.warnOn = 'NOT';

// The actual init template.
exports.template = function(grunt, init, done) {

    function moveToORIGINAL(path, originalPath){
        var list = grunt.file.expand({'cwd': path, expand: false, 'src':['*.*', '**']}, '**');
        for (var i=0; i<list.length; i++ ){
            if (list[i]){
                var fileNames = list[i].split('/');
                if (fileNames.length == 1){
                    var fileName = fileNames[0],
                            newPath = path + '/' + fileName,
                            newOriginalPath = originalPath + '/' + fileName;

                    if (grunt.file.isDir( newPath )){
                        grunt.file.mkdir( newOriginalPath );
                      moveToORIGINAL( newPath, newOriginalPath );
                        grunt.file.delete( newPath );
                    }
                    else {
                        grunt.file.copy( newPath, newOriginalPath );
                        grunt.file.delete( newPath );
                    }
                }
            }
        }
    }

    var deleteList = ['temp', 'node_modules', 'bower_components', '.ORIGINAL'];
    for (var i=0; i<deleteList.length; i++ )
        if (grunt.file.isDir( deleteList[i] ))
            grunt.file.delete( deleteList[i] );


    grunt.file.mkdir('.ORIGINAL');
    moveToORIGINAL('.', '.ORIGINAL');

    // Clone github/fcoo/gruntfile.js into /temp
    grunt.util.spawn(
        {
            cmd: "git",
            args: ["clone", "https://github.com/fcoo/fcoo-gruntfile.js", "./temp"],
            opts: {
                cwd: init.destpath(),
                stdio: "inherit"
            }
        },
        function(error, result, code) {
            grunt.log.writeln('\nPlease enter following information:');
            init.process(
                [
                    {
                        name: 'name',
                        message: 'name (fcoo-maps-NAME) (lowercase)',
                        validator: /^[a-z-_]+$/,
                        warning: 'Only lowercase letters.'
                    },

                    {
                        name   : 'map_layer_id',
                        message: 'mapLayer-id (CamelCase):',
                        validator: /([A-Z-_])\w+/,
                        warning: 'Only letters. Must start with a upper case letter ("TheName" not "theName")',
                        default: function(value, data, done) {
                            var className = data.name;
                            className = className.replace(/[\W_]+/g, ' ');
                            className = className.replace(/\w+/g, function(word) { return word[0].toUpperCase() + word.slice(1).toLowerCase(); });
                            className = className.replace(/ /g, '');
                            done(null, className);
                        }
                    },


                    {
                        name: 'menu_id',
                        message: 'mapLayer-MENU-id (UPPERCASE)',
                        validator: /^[A-Z-_]+$/,
                        warning: 'Only uppercase letters.'
                    },



                    init.prompt('description (from README.md)'),
/*
                    init.prompt('github_user'),
                    init.prompt('version'),
                    init.prompt('repository'),
                    init.prompt('homepage'),
*/
                    init.prompt('author_name'),

                    init.prompt('author_email'),
                ],

                function(err, props) {
                    //Add default values
                    props.licenses = ['MIT'];
                    props.year = (new Date()).getFullYear();

                    props.is_application = 'false';
                    props.have_ghpages = 'true';

                    props.jquery_class_name = props.class_name;
//                    props.jquery_class_name = props.jquery_class_name.substring(0, 1).toLowerCase() + props.jquery_class_name.substring(1); //myClass => MyClass

                // Files to copy (and process).
                    var files = init.filesToCopy(props);

                // Add properly-named license files.
                    init.addLicenseFiles(files, props.licenses);

//                  //Add gruntfile.js and package.json from fcoo-gruntfile.js to files
//                  var fileList = ['gruntfile.js', 'package.json'];
                    //Add package.json and all .*rc from fcoo-gruntfile.js to files
                    var fileList = ['package.json', '.browserslistrc', '.eslintrc', '.uglifyrc'];
                    for (var i=0; i<fileList.length; i++ )
                        files[ fileList[i] ] = init.destpath() + '\\temp\\' + fileList[i];

                    // Actually copy (and process) files.
                    init.copyAndProcess(files, props);


                    // Run "yarn --force" in project's directory
                    grunt.log.writeln('Install node-packages...');
                    grunt.util.spawn(
                        {
                            cmd: "yarn",
                            args: ["--force"],
                            opts: {
                                cwd: init.destpath(),
                                stdio: "inherit"
                            }
                        },
                        function(error, result, code) {
                            grunt.log.writeln('DONE! Now run "bower update; grunt dev');
                            done();
                        }
                    );

                } //end of function(err, props) {
            ); //end of init.process(...
        } //end of function(error, result, code)
    ); //end of grunt.util.spawn(
}; //end of exports.template = function(grunt, init, done) {