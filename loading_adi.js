var loadadiui = false;
var load1 = false;
var load2 = false;

var loader1 = false;
console.log("adi finish game");


// timer function evry sec!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function timedAlert(n,a,b,c) {
    document.querySelector("#loader").style.visibility = "visible"; 
    if (a === true && b === true && c === true) {
        loadpage();
    } else if (n < 10) {
        setTimeout(function () {
            console.log("Count = " + n);
            console.log(a);
            rectime(++n);
            // timedAlert(++n,a,b,c);
        }, 1000);
    } else if (n === 10){
      loadpage();
    } else {
        console.log("imloading");
        timedAlert(n,a,b,c);
    }
}

timedAlert(0,true,true,true);
function rectime(n){
    if (window.location.pathname == "/adi_gallery.html"){
    timedAlert(n,adifinishgallery,true,true);
  } else if (window.location.pathname == "/adi_home3.html"){
    timedAlert(n,adifinishhome,true,true);
  }   else if (window.location.pathname == "/prize-tom.html"){
    timedAlert(n,adifinishprize,true,true);
  }   else if (window.location.pathname == "/trygame.html"){
    timedAlert(n,adifinishgame,true,true);
  }   else if (window.location.pathname == "/start-game.html"){
    timedAlert(n,adifinishstart,true,true);
  }
}

function mainfunc(){
  if (window.location.pathname == "/adi_gallery.html"){
    timedAlert(0,adifinishgallery,true,true);
  } else if (window.location.pathname == "/adi_home3.html"){
    timedAlert(0,adifinishhome,true,true);
  }   else if (window.location.pathname == "/prize-tom.html"){
    timedAlert(0,adifinishprize,true,true);
  }   else if (window.location.pathname == "/trygame.html"){
    timedAlert(0,adifinishgame,true,true);
  }   else if (window.location.pathname == "/start-game.html"){
    timedAlert(0,adifinishstart,true,true);
  }
}


document.onreadystatechange = function() { 
            if (document.readyState !== "complete") { 
                  document.querySelector( 
                  "#loader").style.visibility = "visible"; 
                document.querySelector( 
                  "body").style.visibility = "hidden"; 

            } else { 
              mainfunc();
            } 
        }; 

function loadpage() {
            // document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
            loader();
}

function loader(){
    if (document.readyState !== "complete") { 
                  document.querySelector( 
                  "#loader").style.visibility = "visible"; 
            } else { 
            console.log("loader ready");
            var myobj = document.querySelector("#loader");
            myobj.remove();
            } 
}
