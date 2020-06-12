// https://github.com/shelljs/shelljs
//全局js
require('shelljs/global')
//全局node
env.NODE_ENV = 'production'
//路径设置
const path = require('path');
//配置设置
const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const spinner = ora('building for production...');
spinner.start();
const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);
webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
})
