var fs = require('fs');

var csg = require('csg').CSG;
var openjscad = require('openjscad');


var cad = require('jscad');


//var dim = [2, 5, 10, 15, 25, 50, 75, 85, 100, 115, 125, 150];
var dim = [1, 2, 3];

var calls = [{
        strip_op: strip_op_union,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_union",
        extension: "stl"
    }, {
        strip_op: strip_op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "x3d"
    }, {
        strip_op: strip_op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "stl"
    }, {
        strip_op: strip_op_union,
        gen_output: npm_jscad_generate,
        create_element: npm_jscad_create_element,
        name: "npm_jscad_union",
        extension: "stl"
    }, {
        strip_op: strip_op_array,
        gen_output: npm_jscad_generate,
        create_element: npm_jscad_create_element,
        name: "npm_jscad_array",
        extension: "stl"
    }

]

for (var index in calls) {
    var strip_op = calls[index].strip_op;
    var gen_output = calls[index].gen_output
    var create_element = calls[index].create_element;
    var name = calls[index].name;
    var extension = calls[index].extension;


    var strip = null;
    //    console.log(strip);
    for (var count in dim) {
        console.log(count);
        for (var x = 0; x < dim[count]; x++) {
            for (var y = 0; y < dim[count]; y++) {
                strip = strip_op(strip, create_element(x, y));
            }
        }
        console.log("Created Geometry for " + dim[count] + " elements with " + name);
        gen_output(name, extension, strip);
        console.log("Generated output for " + dim[count] + " elements with " + name);
        console.log("");


    }
}

function npm_jscad_create_element(x, y) {
    var element = cube([1, 1, 1])
        .translate([x, y, x])
        .setColor([Math.random() * 256, Math.random() * 256, Math.random() * 256]);

    return (element)
}


function jscad_csg_create_element(x, y) {
    var element = csg.cube([1, 1, 1])
        .translate([x, y, x])
        .setColor([Math.random() * 256, Math.random() * 256, Math.random() * 256]);

    return (element)
}

function openjscad_generate(name, extension, strip) {
    const output = openjscad.generateOutput(extension, strip);
    fs.writeFileSync(name + "-" + dim[count] + "." + extension, output.asBuffer());
}

function npm_jscad_generate(name, extension, strip) {
    cad.renderFile(strip, name + "-" + dim[count] + "." + extension);
}

function strip_op_array(target, element) {
    //    console.log(target, element);
    if (target == null) {
        target = [element];
    } else {
        target.push(element);
    }
    return target;
}

function strip_op_union(target, element) {
    if (target == null) {
        target = element;
    } else {
        target = target.union(element);
    }
    return target;
}
