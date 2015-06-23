module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		typescript: {
			base: {
				src: ['src/**/*.ts'],
				dest: 'lib/',
				options: {
					module: 'commonjs',
					target: 'es5',
				}
			},
			index: {
				src: ['index.ts'],
				dest: 'index.js',
				options: {
					module: 'commonjs',
					target: 'es5',
				}
			}
		},
		copy: {
			javascript: {
				files: [
					// copy all javascript files in the js/ folder into the lib/ folder
					{expand: true, cwd: 'src/', src: '**/*.js', dest: 'lib/'},
				]
			}
		},
		watch: {
			source: {
				files: ['src/**'],
				tasks: ['_compile_lib'],
			},
			index: {
				files: ['index.ts'],
				tasks: ['_compile_index'],
			},
		},
		clean: {
			lib: ['lib/*'],
			// Don't ask.
			lib_files: ['lib/**/*', 'lib/**/*/**'],
			index: ['index.js'],
		},
	});

	grunt.registerTask('__compile_lib', ['copy', 'typescript:base']);
	grunt.registerTask('__compile_index', ['typescript:index']);
	grunt.registerTask('_compile_lib', ['clean:lib_files', '__compile_lib']);
	grunt.registerTask('_compile_index', ['clean:index', '__compile_index']);
	grunt.registerTask('_compile', ['_compile_lib', '_compile_index'])

	grunt.registerTask('compile', ['_compile']);
	grunt.registerTask('default', ['compile']);

}
