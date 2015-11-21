module.exports = function (grunt) { 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  
	sass: {
		dist: {
		  files: [{
			expand: true,
			src: ['./bower_components/**/*.scss','./bower_components/**/css/*.scss'],
			ext: '.css'
		  }]
		}
	},	
    concat: {
            css: {
                src: [					
                     './apps/client/css/kidart.css',
					 './apps/client/css/kidart-global.css',					
					 './apps/client/css/kidart-layout.css',
					 './apps/client/css/kidart-module-centralinfo.css',
					 './apps/client/css/kidart-post.css',
					 './apps/client/css/kidart-iconfont.css',
					 './apps/client/css/kidart-artwork.css',
					 './apps/client/css/message-item.css',
					 './apps/client/css/paneltab.css',
					 './bower_components/bootstrap-datepicker/css/datepicker3.css',
					 './bower_components/bootstrapValidator/dist/css/bootstrapValidator.css',
					 './bower_components/pnotify/pnotify.core.css',
					 './bower_components/pnotify/pnotify.buttons.css',
					 './bower_components/animate.css/animate.min.css',
					 './bower_components/Morphist/morphist.css',
					 './apps/client/css/kidart-media.css',
					 './apps/client/css/kidart-login.css',
					 './apps/client/css/kidart-map.css'
                ],
                dest: './apps/client/css/bundle.css'
            }
    },
    cssmin: {
      minify: {
       	src: './apps/client/css/bundle.css',
       	dest: './apps/client/css/bundle.min.css'
       }
    },
    browserify: {
    prod: {
        src: ['./src/js/app.js'] ,	  
        dest: './apps/client/js/bundle.js',
		options: {
				transform: ['jadeify','debowerify']
			}
    }} ,
    jshint: {
      all: ['./apps/client/*.js']
    } ,
    uglify: {
    my_target: {
      files: {
        './apps/client/js/bundle.min.js': ['./apps/client/js/bundle.js']
      }
    }
   } ,
    shell: { 
		tar : {
			 options: {                      
                stdout: true
            },
            command: 'sudo tar -zxvf ~/deploy/source.tgz -C ~/deploy/code'			
		},
        rsync : {                      
            options: {                      
                stdout: true
            },
            command: 'rsync -avh ~/deploy/code/ ~/code/ --exclude "source.tgz"  --progress  --no-times --checksum'
        },
		bower: {                      
            options: {                      
                stdout: true
            },
            command: 'bower install  --allow-root'
        } ,		
		npm : {
			options: {                      
                stdout: true
            },
            command: 'npm install'
		} ,
		chmod : {
			options: {                      
                stdout: true
            },
            command: 'chmod 776 -R ./*'
		},		
		deploy : {
			options: {                      
                stdout: true
            },
            command: './app deploy'		
		},
		start : {
			options: {                      
                stdout: true
            },
            command: './app start'		
		}
    },  
	clean: {
		build: ["./bower_components"]
	},
	mochaTest: {
            test: {
                src: ['test/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            }
    }   
   
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default',['shell:tar','shell:rsync','shell:npm','shell:deploy']);
  grunt.registerTask('ci',['shell:start','shell:bower','shell:npm','concat','cssmin','browserify:prod','uglify','shell:deploy']);  
  grunt.registerTask('chmod',['shell:chmod']);   
  grunt.registerTask('test', ['mochaTest:test']);
};
