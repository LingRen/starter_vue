// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}{{#if_eq device "mobile"}},
    {{#if_eq px "rem"}}
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    }{{/if_eq}}
    {{#if_eq px "vw"}}
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 13,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore-', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: []
    }
    {{/if_eq}}
    {{/if_eq}}
  }
}
