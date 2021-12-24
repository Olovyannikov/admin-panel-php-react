let projectName = 'Tapmobile';

let project_folder = `C:/OpenServer/domains/${projectName}/admin`;
let source_folder = "./app/src";

const paths = {
    src: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{png,jpeg,jpg,gif,ico,webp,svg}",
        fonts: source_folder + "/fonts/*.{woff,woff2,ttf,svg}",
    },
    build: {
        html: project_folder,
        js: project_folder + "/js/",
        css: project_folder + "/css/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{png,jpeg,jpg,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/",
}

const {gulp, src, dest, parallel, series} = require('gulp');
const webpack = require("webpack-stream");
const sass = require("gulp-sass");

const copyHtml = () => {
    return src(paths.src.html)
        .pipe(dest(paths.build.html))
};

const buildJs = () => {
    return src(paths.src.js)
        .pipe(webpack({
            mode: "development",
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }],
                                    "@babel/react"]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest(paths.build.js))
}

const buildCSS = () => {
    return src(paths.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(paths.build.css)
}

exports.default = series(copyHtml, buildJs);