// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const admin_name = document.querySelector('#adminname');

let userid = "";
let inputprize = "";
let inputhabit = "";
var gameCode ="";
var urladi = window.location.href;

const setupID = (user) => {
    if (user) {

      //chnage page if user logged in
       if (window.location.href == "https://newapp-2.adihd.repl.co/")
       {
         window.location.replace("start-game.html"); 
       }
      userid = user.uid;
      setUpAdmin(userid)
    } else {
      userid = "";
    }
  };

// dropdown coose prize /////////////////////////////////////////////////////
var sel = document.getElementById("prize");

function coosePrize(sel) {
  var text = sel.options[sel.selectedIndex].text;
  console.log(text);
  inputprize = text;
};

// ////////////////////////////// choose habit /////////////////////////////
function chooseHabit(sel) {

  if (document.getElementById('paint_habit').checked) {
  inputhabit = "paint";
  }
  if (document.getElementById('knit_habit').checked) {
  inputhabit = "knit";
  }
  if (document.getElementById('play_instrument_habit').checked) {
  inputhabit = "play instrument";
  }
  console.log(inputhabit);
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});




////////////////////////////////////////////////////////////////////////////////
// seting habit and prize idea in firestoer //////////////////////////////////////////////////////
function setHabitprize() {
  
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
    
    snapshot.docs.forEach(doc => {
      console.log("setHabit");
      if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}
      
      db.collection('users').doc(doc.id).update({
        habit: inputhabit,
        prize_idea: inputprize,
        game_code : gameCode
        
      }).then(() => {
        window.location.replace("start-game.html");
        
     
      });
    });
  });

};



function setHabitprize1() {
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      db.collection('users').doc(doc.id).update({
        habit: inputhabit,
        prize_idea: inputprize

      }).then(() => {
        window.location.replace("forms-invited-create.html");
 
      });
    });
  });

};

function  setUpAdmin(userid)
{
  
  if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}
  console.log(gameCode);

  db.collection('create_game').where('game_code', '==', gameCode).onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    var admin_id = doc.data().admin;
    console.log(admin_id);
    db.collection('users').where('user_id', '==', admin_id).onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    
    admin_name.innerHTML = doc.data().name;

         });
      });
   

         });
      });
}