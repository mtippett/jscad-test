var csg = require('csg').CSG
var openjscad = require('openjscad')
var fs = require('fs')

var cad = require('jscad');


//var dim = [2, 5, 10, 15, 25, 50, 75, 85, 100, 115, 125, 150];
//var dim = [2,5,7,10,12,15,17,20,25,30,40];
var dim = [2,5,7,10,14,17,20,22,20,17,14,10,7,5,2];


var calls = [{
        op: op_union,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "x3d"
    }/*, {
        op: op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "x3d"
    }, {
        op: op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_array",
        extension: "stl"
    }, {
        op: op_union,
        gen_output: npm_jscad_generate,
        create_element: npm_jscad_create_element,
        name: "npm_jscad_union",
        extension: "stl"
    }, {
        op: op_array,
        gen_output: openjscad_generate,
        create_element: jscad_csg_create_element,
        name: "jscad_csg_union",
        extension: "x3d"
    }*/
]

for (var index in calls) {
    var op = calls[index].op;
    var gen_output = calls[index].gen_output
    var create_element = calls[index].create_element;
    var name = calls[index].name;
    var extension = calls[index].extension;


    //    console.log(strip);
    for (var count in dim) {
        var strip = null;
        var then = Date.now();
        for (var x = 0; x < dim[count]; x++) {
        for (var y = 0; y < dim[count]; y++) {
                strip = op(strip, create_element(x, y));
        }
        }
        gen_output(name, extension, strip);
        console.log(name+"," + dim[count]*dim[count] + ", "+ (Date.now() - then));
    }
}


function jscad_csg_create_element(x, y) {
    var element = csg.cube({
            corner1: [0, 0, 0],
            corner2: [1, 1, 1]
        })
        .translate([x*1, y*1, 0])
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
