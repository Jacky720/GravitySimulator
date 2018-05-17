var sel = 0;
var a = "orbit_body";
var b = "central_body";
var name = "#" + a;
var planets = [a, b];
var n;


function xcor(ob) {
    var name = "#" + ob;
    return $(name).attr("cx");
}

function ycor(ob) {
    var name = "#" + ob;
    return $(name).attr("cy");
}

function change_color() {
    $("#" + $(".sel option:selected").text()).attr("fill", $(".color").val());
}

function cred() {
    alert("Gravity Simulator\n\nMusic - Calin Avram\nProgramming - Matei Adriel Rafael\nWebsite - Jack Moul");
}

function rem() {
    if (planets.length == 1) {
        alert("Sorry, we cannot remove this element because is the last element avabile. If you want to remove it, create a new element with mass 0, x velocity 0 and y velocity 0, at a y-coordinate of at more than 1000. Then, remove this element. You will still see that element in the element list, but it will be somewhere outside the screen.");
        return 0;
    }
    var a = $(".sel option:selected");
    var b = a.text();
    for (var i = 0; i < planets.length; i++) {
        if (planets[i] == b) {
            //var aa = planets[i];
            planets.splice(i, 1);
        }
    }
    a.remove();
    var aaa = "#" + b;
    $(aaa).remove();
}

function mass(ob) {
    var name = "#" + ob;
    return $(name).attr("data-mass");
}

function selected(ob) {
    var x = Number.parseFloat(xcor(ob)).toFixed(2);
    $("#x").text(x);
    var y = Number.parseFloat(ycor(ob)).toFixed(2);
    $("#y").text(y);
    var name = "#" + ob;
    var ip = Number.parseFloat(Math.sqrt(Math.pow($(name).attr("data-mx"), 2) + Math.pow($(name).attr("data-my"), 2))).toFixed(2);
    $("#v").text(ip);
}

function addPlanet() {
    for (var i = 0; i < planets.length; i++) {
        if (planets[i] == $("#id").val()) {
            alert("The name'" + $("#id").val() + "' is already used");
            return 1;
        }
    }
    var m = parseFloat($("#mass").val());
    var xvl = parseFloat($("#xvl").val());
    var yvl = parseFloat($("#yvl").val());
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    $(g).attr({
            width: "100%",
            height: "100%"
        });
    var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
            cx: $("#xp").val(),
            cy: $("#yp").val(),
            id: $("#id").val(),
            fill: "black",
            r: $("#rrr").val(),
            stroke: "black"
        });
    $(el).attr("data-mass", m);
    $(el).attr("data-mx", xvl);
    $(el).attr("data-my", yvl);
    $(g).append(el);
    var elem = document.getElementById("pr");
    elem.appendChild(g);
    planets[planets.length] = $("#id").val();
    add(planets[planets.length - 1]);
}

function move(ob1, ob2) {
    var x = parseFloat(xcor(ob1)) - parseFloat(xcor(ob2));
    var y = parseFloat(ycor(ob1)) - parseFloat(ycor(ob2));
    var ip = Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2)));
    var grv = parseFloat(mass(ob2)) / (Math.pow(ip, 2));
    var dv1 = grv * x / ip;
    var dv2 = grv * y / ip;
    var name = "#" + ob1;
    var temp = $(name).attr("data-mx");
    temp = parseFloat(temp);
    temp += dv1;
    $(name).attr("data-mx", (temp));
    temp = $(name).attr("data-my");
    temp = parseFloat(temp);
    temp += dv2;
    $(name).attr("data-my", (temp));
}

function up(ob) {
    var name = "#" + ob;
    var temp;
    var mx = $(name).attr("data-mx");
    for (var i = 0; i < accuracy; i++) {
        temp = xcor(ob);
        temp = parseFloat(temp);
        temp -= mx / accuracy;
        $(name).attr("cx", (temp.toString()));
        for (var j = 0; j < planets.length; j++) {
            if ((isCollision(ob, planets[j])) && !(planets[j] == ob)) {
                collide(ob, planets[j]);
            }
        }
    }
    var mxx = $(name).attr("data-my");
    for (var i = 0; i < (accuracy); i++) {
        temp = (parseFloat(ycor(ob))-(mxx/accuracy)).toString();
        //console.log(mxx);
        //console.log(temp);
        $(name).attr("cy", temp);
        for (var j = 0; j < planets.length; j++) {
            if ((isCollision(ob, planets[j])) && !(planets[j] == ob)) {
                collide(ob, planets[j]);
            }
        }
    }
}

function add(ob) {
    var b = "<option value=" + "'" + ob + "'" + ">" + ob + "</option>";
    $(".sel").append(b);
}

function isCollision(ob1, ob2) {
    var x = parseFloat(xcor(ob1)) - parseFloat(xcor(ob2));
    var y = parseFloat(ycor(ob1)) - parseFloat(ycor(ob2));
    var ip = Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2)));
    var name1 = "#" + ob1;
    var name2 = "#" + ob2;
    var rad = parseFloat($(name1).attr("r")) + parseFloat($(name2).attr("r"));
    if (ip < rad) {
        //console.log("iscollision");
        return true;
    }
    return false;
}

function collide(object1, object2) {
    //the ids of the objects
    var name1 = "#" + object1;
    var name2 = "#" + object2;
    //the mass of the new object
    var newmass = 3 * (mass(object1) + mass(object2)) / 4;
    //the new vectors;
    var vectx = (mass(object1) * $(name1).attr("data-mx") + mass(object2) * $(name2).attr("data-mx")) / newmass;
    var vecty = (mass(object1) * $(name1).attr("data-my") + mass(object2) * $(name2).attr("data-my")) / newmass;
    //and finally the name of the new element
    //i made a variable for it because i will use it multiple times
    var newname = object1 + object2;
    //add the new element
    //the container
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    $(g).attr({
            width: "100%",
            height: "100%"
        });
    //chosing the bigger element
    if ($(name1).attr("r") > $(name2).attr("r")) {
        var bigger = object1;
    } else {
        var bigger = object2;
    }
    //the actual body
    var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
            cx: xcor(bigger),
            cy: ycor(bigger),
            fill: "black",
            id: newname,
            r: Math.sqrt(Math.pow(parseFloat($(name1).attr("r")), 2) + Math.pow(parseFloat($(name2).attr("r")), 2)).toString(),
            stroke: "black"
        });
    console.log(((xcor(object1) + xcor(object2)) / 2).toString());
    $(el).attr("data-mass", newmass);
    $(el).attr("data-mx", vectx);
    $(el).attr("data-my", vecty);
    $(g).append(el);
    var elem = document.getElementById("pr");
    elem.appendChild(g);
    planets[planets.length] = newname;
    add(planets[planets.length - 1]);
    removeobject(object1);
    removeobject(object2);
}

function removeobject(name) {
    var a = $("[value=name]");
    for (var i = 0; i < planets.length; i++) {
        if (planets[i] == name) {
            planets.splice(i, 1);
        }
    }
    a.remove();
    var newname = "#" + name;
    $(newname).remove();
}

for (var i = 0; i < planets.length; i++) {
    add(planets[i]);
}

function mn() {
    sel = $(".sel option:selected").text();
    selected(sel);
    for (var i = 0; i < planets.length; i++) {
        for (var a = 0; a < planets.length; a++) {
            if (i != a) {
                move(planets[i], planets[a]);
            }
        }
        up(planets[i]);
    }
    //console.log(y);
}

function run() {
    var warp = parseFloat(prompt("Timewarp:"));
    while (!(warp > 0)) {
        
        warp = parseFloat(prompt("That was invalid. Timewarp should be a positive number.\nTimewarp:"))
    }
    
    var y = 10/warp;
    
    setInterval(function() {
        mn();
    }, y);
    
    var accuracy = parseInt(prompt("Input accuracy:"));
    while (!(accuracy > 0)) {
        accuracy = parseInt(prompt("Either that was not an integer or it was negative. Please try again:"));
    }
}

//run(); //Now used in onload tag for <body>, so script can be loaded in <head>
