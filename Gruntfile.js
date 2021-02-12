module.exports = function (grunt) {
  grunt.config.init({
    clean: {
      dev: {
        src: ["src/css/*"],
      },
    },

    jshint: {
      dev: {
        src: ["/src/js/**/*.js"],
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
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("default", ["clean", "jshint", "sass", "autoprefixer"]);
};
