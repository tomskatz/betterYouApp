// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

let userid = "";
let inputprize = "";
let inputhabit = "";
var gameCode ="";
var urladi = window.location.href;


const setupID = (user) => {
  if (user) {
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
  if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}

 

  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
         db.collection("create_game").where("game_code", "==", gameCode).onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
              db.collection("create_game").doc(doc.id).update({admin: userid})
              });
         });
      db.collection('users').doc(doc.id).update({
        habit: inputhabit,
        prize_idea: inputprize,
        game_code : gameCode
      }).then(() => {

       setTimeout(window.location.replace("start-game.html"), 3000);
        
      });
    });
  });

}

function enterAdmin(){
     db.collection("create_game").where("game_code", "==", gameCode).onSnapshot(snapshot => {
      snapshot.docs.forEach(doc => {
         db.collection("create_game").doc(doc.id).update({admin: userid})
      });
    });
    

}





$(document).ready(function () {
    var el = $("#standalone").emojioneArea({
        standalone: true,
        autocomplete: false
    });
  
});

////////////////////////////////////////////////////////////////////////////////
// seting habit and prize idea in firestoer creator //////////////////////////////////////////////////////



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