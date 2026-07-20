const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input.', function() {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input.', function() {
    assert.strictEqual(convertHandler.getNum('3.2L'), 3.2);
  });

  test('convertHandler should correctly read a fractional input.', function() {
    assert.strictEqual(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function() {
    assert.strictEqual(convertHandler.getNum('5.4/3L'), 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3L'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
    assert.strictEqual(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit.', function() {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg',
                    'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    units.forEach(unit => {
      assert.notEqual(convertHandler.getUnit('1' + unit), 'invalid unit');
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function() {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit.', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L.', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('convertHandler should correctly convert L to gal.', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  test('convertHandler should correctly convert mi to km.', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('convertHandler should correctly convert km to mi.', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('convertHandler should correctly convert lbs to kg.', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });

  test('convertHandler should correctly convert kg to lbs.', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
