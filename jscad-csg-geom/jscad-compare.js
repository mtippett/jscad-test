var fs = require('fs');
var csg = require('csg').CSG;
var openjscad = require('openjscad');
var cad = require('jscad');


var csg_element = csg.cube([1, 1, 1]);

var extension = "stl";
var output = openjscad.generateOutput(extension, csg_element);
fs.writeFileSync("jscad-csg-1x1." + extension, output.asBuffer());

extension = "x3d";
output = openjscad.generateOutput(extension, csg_element);
fs.writeFileSync("jscad-csg-1x1." + extension, output.asBuffer());

var jscad_element = cube([1, 1, 1]);
cad.renderFile(jscad_element, "npm-jscad-1x1.stl");
