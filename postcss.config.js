const autoprefixer = require('autoprefixer');
const postCssFlexibility = require('postcss-flexibility');

module.exports = () => ({
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 4 versions',
        'last 20 Chrome versions',
        'last 20 Firefox versions'
      ]
    }),
    postCssFlexibility
  ]
});
