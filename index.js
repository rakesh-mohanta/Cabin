'use strict';

require('colors');
var program = require('commander');

module.exports = function (argv) {
  program
    .version(require('./package.json').version)
    .option('-t, --templateEngine [templateEngine]', 'Specify a template engine')
    .option('-p, --CSSPreprocessor [CSSPreprocessor]', 'Specify a CSS preprocessor')
    .option('-l, --local',  'Use a local Cabin theme')
    .option('-n, --noInstall',  'Don\'t install npm modules after scaffolding');

  program
    .command('new <siteName> [theme]')
    .description('Scaffold out a static site generator')
    .action(function (siteName, theme) {
      if (siteName.indexOf('/') !== -1) {
        console.log('Error, forgot to specify site name. Please run cabin new with the following format:\n'.red +
                    'cabin new ' + '<siteName> '.blue + siteName);
        process.exit(1);
        return;
      }

      require('./lib/new.js')({
        siteName: siteName,
        theme: theme || 'CabinJS/Candy',
        local: program.local,
        templateEngine: program.templateEngine,
        CSSPreprocessor: program.CSSPreprocessor,
        noInstall: program.noInstall
      });
    });

  program
    .parse(argv);

  if (!program.args.length) program.help();
};
