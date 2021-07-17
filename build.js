const fs = require('fs');

const builders = [
  'artic', 'beast', 'demi-human', 'element', 'elf', 'ghost', 'goblin', 'marine', 'mech', 'nature', 'orc', 'paladin', 'shadow', 'undead'
]

let rawUnits = {};
let allUnits = [];

builders.forEach(builder => {
  rawUnits[builder] = require(`./assets/data/raw/${builder}.json`).units
})

Object.keys(rawUnits).forEach(builder => {
  rawUnits[builder].forEach(unit => {
    obj = {};
    Object.keys(unit).forEach((key, i) => {
      const ogKey = key;
      let normKey = key.toLowerCase().replace(/\s{1}/g, '_').trim();
  
      if (ogKey === 'Melee / Ranged') {
        normKey = 'melee_or_ranged';
      }
      obj[normKey] = unit[ogKey];
    })
    allUnits.push(obj)
  })
})

var stream = fs.createWriteStream("src/units.json", { flags: 'w' });
stream.write(`{ "units": ${JSON.stringify(allUnits)} }`);
