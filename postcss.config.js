const autoprefixer = require('autoprefixer');

module.exports = () => ({
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 4 versions',
        'last 20 Chrome versions',
        'last 20 Firefox versions',
      ],
    }),
  ],
});
