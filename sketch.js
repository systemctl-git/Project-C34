var coordinates = [];
var canvas;
var database;

function setup() {
    canvas = createCanvas(800, 400);
    database = firebase.database();
}

function draw() {
    sync();
}

function mouseDragged() {
    coordinates.push([mouseX, mouseY]);
    database.ref('array').set(coordinates);
    for (var i = 0; i < coordinates.length; i++) {
        var x = coordinates[i][0];
        var y = coordinates[i][1];
        //console.log(i);
        if (i >= 1) {
            line(x, y, coordinates[i - 1][0], coordinates[i - 1][1])
        }
    }
    endShape();
}

function mouseReleased() {
    coordinates = [];
}

function sync() {
    var array;
    var drawCoords = database.ref('array');
    drawCoords.on('value', function (data) {
        array = data.val()
    })
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        var x = array;
        var y = array;
        //console.log(i);
        if (i >= 1) {
            line(x, y, array[i - 1][0], array[i - 1][1])
        }
    }
}