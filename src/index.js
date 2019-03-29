/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendWithComponent (api, conf) {
  // add quasar dependencies
  if (!conf.framework) conf.framework = {}
  if (!conf.framework.directives) conf.framework.directives = []
  if (!conf.framework.directives.includes('TouchPan')) conf.framework.directives.push('TouchPan')

  // add boot file
  if (!conf.boot) conf.boot = []
  const boot = conf.boot

  // make sure boot file is registered
  if (!boot.includes('~quasar-app-extension-swipe-to-close/src/boot/index.js')) {
    boot.push('~quasar-app-extension-swipe-to-close/src/boot/index.js')
    // make sure boot file transpiles
    conf.build.transpileDependencies.push(/quasar-app-extension-swipe-to-close[\\/]src[\\/]boot/)
    console.log(` App Extension (qswipe-to-close) Info: 'Adding swipe-to-close boot reference to your quasar.conf.js'`)
  }
}

module.exports = function (api, ctx) {
  // register JSON api
  api.registerDescribeApi('QSwipeToClose', './components/QSwipeToClose.json')

  // extend quasar.conf
  api.extendQuasarConf(conf => extendWithComponent(api, conf))
}
