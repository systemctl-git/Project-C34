var coordinates = [];
var canvas;
var database;
var drawing = [];

function setup() {
    canvas = createCanvas(800, 400);
    database = firebase.database();
}

function draw() {
    document.getElementById('clear1').onclick = () => {
        background("white");
        database.ref('array').set(0);
    }
}

function mouseDragged() {
    coordinates.push([mouseX, mouseY]);
    drawing = coordinates;
    for (var i = 0; i < coordinates.length; i++) {
        //console.log(drawing)
        var x = coordinates[i][0];
        var y = coordinates[i][1];
        //console.log(i);
        if (i >= 1) {
            line(x, y, coordinates[i - 1][0], coordinates[i - 1][1])
        }
    }

    var array = database.ref('array');
    var array2;
    array.on("value", (data) => {
        array2 = data.val();
    })
    //console.log(array2);
    if (array2 == 0) {
        array2 = [];
        //console.log('done');
    }
    var array3 = [...array2, ...drawing];
    //console.log(array3);
    database.ref('array').set(array3);
    endShape();
}

function mouseReleased() {
    coordinates = [];
}
