var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var uglify          = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var cmq             = require('gulp-combine-media-queries');
var gnotify         = require('gulp-notify');
var watch           = require('gulp-watch');
var stream = require('webpack-stream');


var path = {
    HTML: './index.html',
    ALL: ['src/scss/**/*.scss', 'src/**/**/*.js'],
    MINIFIED_OUT: 'bundle.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/',
    DEST: 'dist'
};

gulp.task('styles', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested'
        }))
        .on('error', function () {
            gnotify.onError().apply(this, arguments);
            this.emit('end');
        })
        .pipe(autoprefixer("last 2 versions", "ie 8"))
        //.pipe(cmq({ log: true }))
        .pipe(gulp.dest('./dist/styles'));
        //.pipe(browserSync.reload({stream:true}));
});



gulp.task('webpack', [], function () {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});



gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});


gulp.task('watch', function() {
    gulp.watch(path.ALL, ['webpack', 'styles']);
});


gulp.task('default', ['webpack-dev-server', 'watch']);



