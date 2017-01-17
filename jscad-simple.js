
var csg = require('csg').CSG;
var openjscad = require('openjscad');

var cube = csg.cube([1,1,1]);

const output = openjscad.generateOutput('stl', cube);
fs.writeFileSync('fancy.stl', output.asBuffer());
