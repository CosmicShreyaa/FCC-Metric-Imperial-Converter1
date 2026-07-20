const Mocha = require('mocha');
const path = require('path');

const mocha = new Mocha({ ui: 'tdd' });

mocha.addFile(path.join(__dirname, '1_unit-tests.js'));
mocha.addFile(path.join(__dirname, '2_functional-tests.js'));

mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;
});
