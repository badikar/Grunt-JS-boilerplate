module.exports = function (grunt) {
  grunt.config.init({
    clean: {
      dev: {
        src: ["src/css/*"],
      },
      prod: {
        src: ["build/*", "build/**/*"],
      },
    },

    jshint: {
      options: {
        eqeqeq: true,
      },
      dev: {
        src: "/src/js/**/*.js",
      },
    },

    sass: {
      dev: {
        options: {
          style: "expanded",
        },
        src: "src/sass/style.scss",
        dest: "src/css/style.css",
      },
    },

    autoprefixer: {
      dev: {
        options: {
          browsers: ["last 4 versions"],
        },
        src: "src/css/*.css",
      },
    },

    concat: {
      options: {
        separator: ";",
      },
      prod: {
        files: {
          "build/js/scripts.js": "src/js/**/*js",
        },
      },
    },
    uglify: {
      prod: {
        options: {
          mangle: false,
        },
        files: {
          "build/js/scripts.js": "build/js/scripts.js",
        },
      },
    },

    cssmin: {
      prod: {
        files: {
          "build/css/style.css": "src/css/style.css",
        },
      },
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
      },
      prod: {
        files: {
          "build/index.html": "src/index.html",
        },
      },
    },
    imagemin: {
      options: {
        optimazationLevel: 3,
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: "src/images/",
            src: "*",
            dest: "build/images/",
          },
        ],
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      dev: {
        files: ["src/**/*", "!src/css/*"],
        tasks: ["dev"],
      },
    },
    copy: {
      src: "src/index.html",
      dest: "build/index.html",
    },
  });

  grunt.registerTask("copy", "copy files", () => {
    const src = grunt.config.get("copy.src"),
      dest = grunt.config.get("copy.dest");

    grunt.file.copy(src, dest);

    grunt.log.ok("File copied!");
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("dev", ["clean", "jshint", "sass", "autoprefixer"]);
  grunt.registerTask("prod", ["concat", "uglify", "cssmin", "imagemin", "copy"]);
  grunt.registerTask("default", "dev");
  grunt.registerTask("build", ["dev", "prod"]);
};
