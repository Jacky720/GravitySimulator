var sel = 0;
var ac=-1;
while (!(ac>0)){
	ac = parseInt(prompt("Input accuracy"));
}
function xcor(ob){
	var name = "#" + ob;
	return $(name).attr("cx");
}
function ycor(ob){
	var name = "#" + ob;
	return $(name).attr("cy");
}
function change_color(){
	$("#"+$(".sel option:selected").text()).attr("fill",$(".color").val());
}
function cred(){
	alert("Music - Calin Avram \n Programing - Matei Adriel Rafael");
}
function rem(){
	if (pl.length == 1){
		alert("Sorry, we can't remove this element, because is the last element avabile, if you want to remove it, i recomand you to create a new element with mass 0 , 0 x velocity and 0 y velocity, at 2 random coordonates that are bigger than 1000, and than remove this element, you will still see that element in the element list, but it will be somewhere outside the screen");
		return 0;
	}	
	var a = $(".sel option:selected");
	var b = a.text();
	for (var i = 0;i<pl.length;i++){
		if(pl[i] == b){
			var aa = pl[i];
			pl.splice(i,1);
		}
	}
	a.remove();
	var aaa = "#"+b;
	$(aaa).remove();
}
function mass(ob){
	var name = "#" + ob;
	return $(name).attr("data-mass");
}
function selected(ob){
	var x = xcor(ob);
	$("#x").text(x);
	var y = ycor(ob);
	$("#y").text(y);
	var name  ="#"+ ob;
	var ip = Math.sqrt(Math.pow($(name).attr("data-mx"),2)+Math.pow($(name).attr("data-my"),2));
	$("#v").text(ip.toString());
}
function addd(){
	for (var i = 0;i<pl.length;i++){
		if(pl[i] == $("#id").val()){
			alert("The name'"+$("#id").val()+"' is already used");
			return 1;
		}
	}
	var m = parseFloat($("#mass").val());
	var xvl = parseFloat($("#xvl").val());
	var yvl=parseFloat($("#yvl").val());
	var g=document.createElementNS('http://www.w3.org/2000/svg', 'g')
	$(g).attr({
        width: "100%",
        height: "100%"
    });
	var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
		cx: $("#xp").val(),
		cy: $("#yp").val(),
		id: $("#id").val(),
		fill:"black",
		r: $("#rrr").val(),
		stroke:"black"
	});
	$(el).attr("data-mass",m);
	$(el).attr("data-mx",xvl);
	$(el).attr("data-my",yvl);
	$(g).append(el);
	var elem = document.getElementById("pr");
	elem.appendChild(g);
	pl[pl.length] = $("#id").val();
	add(pl[pl.length-1]);
}
function move(ob1,ob2){
	var x = parseFloat(xcor(ob1))- parseFloat(xcor(ob2));
	var y = parseFloat(ycor(ob1))- parseFloat(ycor(ob2));
	var ip = Math.sqrt((Math.pow(x,2))+(Math.pow(y,2)));
	var grv = parseFloat(mass(ob2))/(Math.pow(ip,2));
	var dv1 = grv*x/ip;
	var dv2 = grv*y/ip;
	var name = "#" + ob1;
	var temp = $(name).attr("data-mx");
	temp = parseFloat(temp);
	temp += dv1;
	$(name).attr("data-mx",(temp));
	temp = $(name).attr("data-my");
	temp = parseFloat(temp);
	temp += dv2;
	$(name).attr("data-my",(temp));	
}
function up(ob){
	var name = "#" + ob;
	var temp;
	var mx = $(name).attr("data-mx");
	for (var i = 0;i<ac;i++){
		temp = xcor(ob);
		temp = parseFloat(temp);
		temp -= mx/ac;
		$(name).attr("cx",(temp.toString()));
		for (var a = 0;a<pl.length;a++){
			if ((isColision(ob,pl[a]))&&!(pl[a]==ob)){
				colide(ob,pl[a]);
			}
		}
	}
	var mxx = $(name).attr("data-my");
	for (var i = 0;i<(ac);i++){
		temp = ycor(ob);
		temp = parseFloat(temp);
		temp -= mxx/ac;
		console.log(mxx);
		console.log(temp);
		$(name).attr("cy",(temp.toString()));
		for (var a = 0;a<pl.length;a++){
			if ((isColision(ob,pl[a]))&&!(pl[a]==ob)){
				colide(ob,pl[a]);
			}
		}
	}
}
function add(ob){
	var b = "<option value="+"'"+ob+"'"+">"+ob+"</option>";
	$(".sel").append(b);
}
function isColision(ob1,ob2){
	var x = parseFloat(xcor(ob1))- parseFloat(xcor(ob2));
	var y = parseFloat(ycor(ob1))- parseFloat(ycor(ob2));
	var ip = Math.sqrt((Math.pow(x,2))+(Math.pow(y,2)));
	var name1 = "#" + ob1;
	var name2 = "#" + ob2;
	var rad = parseFloat($(name1).attr("r")) + parseFloat($(name2).attr("r"));
	if (ip < rad){
		//console.log("iscolision");
		return true;
	}
	return false;
}
function colide(object1,object2){
	//the ids of the objects
	var name1 = "#"+object1;
	var name2 = "#"+object2;
	//the mass of the new object
	var newmass = 3*(mass(object1)+mass(object2))/4;
	//the new vectors;
	var vectx = (mass(object1)*$(name1).attr("data-mx")+mass(object2)*$(name2).attr("data-mx"))/newmass;
	var vecty = (mass(object1)*$(name1).attr("data-my")+mass(object2)*$(name2).attr("data-my"))/newmass;
	//and finally the name of the new element
	//i made a variable for it because i will use it multiple times
	var newname = object1+object2;
	//add the new element
	//the container
	var g=document.createElementNS('http://www.w3.org/2000/svg', 'g')
	$(g).attr({
        width: "100%",
        height: "100%"
    });
	//chosing the bigger element
	if ($(name1).attr("r") > $(name2).attr("r")){
	var bigger = object1;
	}
	else{
	var bigger = object2;
	}
	//the actual body
	var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
		cx:xcor(bigger) ,
		cy:ycor(bigger), 
		fill:"black",
		id: newname,
		r: Math.sqrt(Math.pow(parseFloat($(name1).attr("r")),2)+Math.pow(parseFloat($(name2).attr("r")),2)).toString() ,
		stroke:"black"
	});
	console.log(((xcor(object1)+xcor(object2))/2).toString());
	$(el).attr("data-mass",newmass);
	$(el).attr("data-mx",vectx);
	$(el).attr("data-my",vecty);
	$(g).append(el);
	var elem = document.getElementById("pr");
	elem.appendChild(g);
	pl[pl.length] = newname;
	add(pl[pl.length-1]);
	removeobject(object1);
	removeobject(object2);
}
function removeobject(name){
	var a = $("[value=name]");
	for (var i = 0;i<pl.length;i++){
		if(pl[i] == name){
			pl.splice(i,1);
		}
	}
	a.remove();
	var newname = "#"+name;
	$(newname).remove();
}
a = "orbit_body"
b = "central_body"
var i = 0;
var name = "#"+a;
var pl = [a,b];
var n;
for (var i = 0;i<pl.length;i++){
	add(pl[i]);
}
var y = 10/parseFloat(prompt("Time-warp x..."));
function mn(){
	sel = $(".sel option:selected").text();
	selected(sel);
	for (var i = 0;i<pl.length;i++){
		for (var a = 0;a<pl.length;a++){
			if (i != a){
				move(pl[i],pl[a]);
			}
		}
		up(pl[i]);
	}
	//console.log(y);
}
function run(){
setInterval(function(){
	mn();
},y);
}
run();