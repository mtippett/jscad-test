var csg = require('csg').CSG
var openjscad = require('openjscad')
var fs = require('fs')

var cad = require('jscad');


//var dim = [2, 5, 10, 15, 25, 50, 75, 85, 100, 115, 125, 150];
var dim = [10,17,22,26,30,33,36,39];
var dim = [3,5,7,39,17,33,26,30,22,36,10];
//var offsets = [0,0.1,0.5,0.9,1,1.1];
var offsets = [1];

var calls = [/*{
        op: op_union,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_union",
        extension: "x3d"
    },*/ {
        op: op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "x3d"
    },
]

for (var index in calls) {
    var op = calls[index].op;
    var gen_output = calls[index].gen_output
    var create_element = calls[index].create_element;
    var name = calls[index].name;
    var extension = calls[index].extension;


    //    console.log(strip);
    for (var count in dim) {
    for (var offset in offsets) {
    var strip = null;
        var then = Date.now();
        for (var x = 0; x < dim[count]; x++) {
        for (var y = 0; y < dim[count]; y++) {
                strip = op(strip, create_element(x, y, offsets[offset]));
        }
        }
        gen_output(name, extension, strip);
        console.log(name+"," + dim[count]*dim[count] + ", "+ offsets[offset]+","+ (Date.now() - then));
    }
    }
}


function jscad_csg_create_element(x, y,offset) {
    var element = csg.cube({
            corner1: [0, 0, 0],
            corner2: [1, 1, 1]
        })
        .translate([x*offset, y*offset, 0])
        .setColor([Math.random(), Math.random(), Math.random()]);

    return (element)
}

function openjscad_generate(name, extension, strip) {
    const output = openjscad.generateOutput(extension, strip);
    fs.writeFileSync(name + "-" + dim[count] + "." + extension, output.asBuffer());
}

function npm_jscad_generate(name, extension, strip) {
    cad.renderFile(strip, name + "-" + dim[count] + "." + extension);
}

function op_array(target, element) {
    //    console.log(target, element);
    if (target == null) {
        target = [element];
    } else {
        target.push(element);
    }
    return target;
}

function op_union(target, element) {
    if (target == null) {
        target = element;
    } else {
        target = target.union(element);
    }
    return target;
}
