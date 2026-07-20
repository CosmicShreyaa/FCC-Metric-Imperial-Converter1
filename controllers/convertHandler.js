function ConvertHandler() {

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const unitMap = {
    gal: 'gal', l: 'L',
    lbs: 'lbs', kg: 'kg',
    mi: 'mi', km: 'km'
  };

  const spellMap = {
    gal: 'gallons', l: 'liters',
    lbs: 'pounds', kg: 'kilograms',
    mi: 'miles', km: 'kilometers'
  };

  this.getNum = function(input) {
    const match = input.match(/[a-zA-Z]+$/);
    const numStr = match ? input.slice(0, match.index) : input;

    if (numStr === '') return 1;

    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    if (slashCount === 1) {
      const [numerator, denominator] = numStr.split('/');
      if (numerator === '' || denominator === '' ||
          isNaN(numerator) || isNaN(denominator)) {
        return 'invalid number';
      }
      return parseFloat(numerator) / parseFloat(denominator);
    }

    if (isNaN(numStr)) return 'invalid number';
    return parseFloat(numStr);
  };

  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+$/);
    const unitStr = match ? match[0].toLowerCase() : '';

    if (!unitMap.hasOwnProperty(unitStr)) return 'invalid unit';
    return unitMap[unitStr];
  };

  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    const returnUnitMap = {
      gal: 'L', l: 'gal',
      lbs: 'kg', kg: 'lbs',
      mi: 'km', km: 'mi'
    };
    return returnUnitMap[unit];
  };

  this.spellOutUnit = function(unit) {
    return spellMap[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const unit = initUnit.toLowerCase();
    let result;
    switch (unit) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };

}

module.exports = ConvertHandler;
