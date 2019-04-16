/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendWithComponent (conf) {
  // make sure boot file is registered
  conf.boot.push('~quasar-app-extension-swipe-to-close/src/boot/index.js')

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-swipe-to-close[\\/]src/)
  console.log(` App Extension (qswipe-to-close) Info: 'Adding swipe-to-close boot reference to your quasar.conf.js'`)
}

module.exports = function (api) {
  api.compatibleWith('@quasar/app', '^1.0.0-beta.18')

  // register JSON api
  api.registerDescribeApi('QSwipeToClose', './components/QSwipeToClose.json')

  // extend quasar.conf
  api.extendQuasarConf(extendWithComponent)
}
