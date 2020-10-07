 var bigList0 = [
    [
        ["today", 0, ".tile00"],
        ["future", 0, ".tile01"],
        ["future", 0, ".tile02"],
        ["future", 0, ".tile03"],
        ["future", 0, ".tile04"]
    ],
    [
        ["future", 0, ".tile10"],
        ["future", 0, ".tile11"],
        ["future", 0, ".tile12"],
        ["future", 0, ".tile13"],
        ["future", 0, ".tile14"]
    ],
    [
        ["future", 0, ".tile20"],
        ["future", 0, ".tile21"],
        ["future", 0, ".tile22"],
        ["future", 0, ".tile23"],
        ["future", 0, ".tile24"]
    ],

    [
        ["future", 0, ".tile30"],
        ["future", 0, ".tile31"],
        ["future", 0, ".tile32"],
        ["future", 0, ".tile33"],
        ["future", 0, ".tile34"]
    ],

    [
        ["future", 0, ".tile40"],
        ["future", 0, ".tile41"],
        ["future", 0, ".tile42"],
        ["future", 0, ".tile43"],
        ["future", 0, ".tile44"]
    ]
]

var bigList1 = JSON.stringify(bigList0);




// listen for auth status changes 
//  /////////////////////////////////////////////////////////////////////////

  let month1 = new Map()
  month1.set("01", "January");
  month1.set("02", "February");
  month1.set("03", "March");
  month1.set("04", "April");
  month1.set("05", "May");
  month1.set("06", "June" );
  month1.set("07", "July");
  month1.set("08", "August");
  month1.set("09", "September");
  month1.set("10", "October");
  month1.set("11",  "November");
  month1.set("12", "December");

auth.onAuthStateChanged(user => {
  // if the user log in show this contect
  if (user) {
    db.collection('users').where("user_id", "==", user.uid).onSnapshot((snap) =>{
       snap.docs.forEach(doc => {
         if(doc.data().new_pic) document.getElementById("newPic").style.visibility = "visible";
             else document.getElementById("newPic").style.visibility = "hidden";
          if(doc.data().new_tip) document.getElementById("newTip").style.visibility = "visible";
      else document.getElementById("newTip").style.visibility = "hidden";
          changeDate(doc);
       })})


    db.collection('guides').onSnapshot(snapshot => {
      console.log("user is login");
      console.log(user.uid);

    db.collection('users').where("user_id", "==", user.uid).get().then(snap =>{
       snap.docs.forEach(doc => {
         var game_code = doc.data().game_code;
         db.collection('create_game').where("game_code", "==" ,game_code).get().then(snap1=>{
           snap1.docs.forEach(doc => {
             goToWinner(doc);

           });
         });
       });
    });
      setupID(user);
    }, err => console.log(err.message));

    

    // if the user is log out show this : log out null!
  } else {
    
    console.log("user is logout and its null")
    
    setupID();
  
  }
});




var urladi = window.location.href;
var gameCode = "";


///////////////////////////////////////////// signup-new

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  // alert(signupForm['signup-email'].value);
  const password = signupForm['signup-password'].value;
  // sign up the user & add firestore data for ex the name of the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return db.collection('users').doc(cred.user.uid).set({

      name: signupForm['signup-name'].value,
      my_status: false,
      game_code: gameCode,
      game_points: 0,
      habit: "",
      partner_id: "",
      partner_name: "",
      user_id: cred.user.uid,
      prize_idea: "",
      paired: false,
      place: 5,
      partner_status:false,
      poke:false,
      placeUp:false,
      placeDown:false,
      new_pic:false,
      today:getTodayString(),
      dayIndex:0,
      new_tip: false,
      mygame: bigList1
    });
    
  }).then(() => {
    signupForm.reset();
    signupForm.querySelector(".erroradi").innerHTML = "";
    window.location.replace("indexold.html");

  }).catch(err => {
    signupForm.querySelector(".erroradi").innerHTML = err.message;
  });
});

function changeDate(doc)
{

  if(doc.data().today == getTodayString()) return;
  
  db.collection('users').doc(doc.id).update({

      my_status: false,
      partner_status:false,
      today:getTodayString(),
      new_tip:true,
    });

}

function getTodayString()
{
  Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
  };

  var date = new Date();
  return date.yyyymmdd();
}


function gamePin(){

    var inputVal = document.getElementById("game-pin").value;
    check(inputVal);
}

function check(inputVal)
{     var a = "";
      db.collection('create_game').orderBy("start_date", "asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.data().game_code == inputVal)
             {
               get_true("t", inputVal)
               a = "t"
             }
             else if(doc.data().end == true && a !="t") alert("the code is not correct!")
             

        });
    })

}

function get_true(v, inputVal)
{


  if(v == "t") {
        window.document.location = "./forms-invited.html" + "?codeGame=" + inputVal;
  } 
  
  
}


function goToWinner(doc)
{

  var str = doc.data().start_date;

  var res = str.split("-");

  var year = res[0];
  var month1_in_num = res[1];
  var day = res[2];

  var month1_in_str = month1.get(month1_in_num);

  var the_start_date = month1_in_str + " " + day + ", " + year + " 00:00:00";
  // Set the date we're counting down to
  let start_date = new Date(the_start_date);
  
  let win_date = new Date(start_date);
  win_date.setDate(win_date.getDate() + 25)

  let now = new Date();

  if(win_date.toDateString() == now.toDateString())
  { 
    //move to this page the day after the end of the chllenge
    window.location.replace("winner.html" + "?codeGame=" + doc.data().game_code);
  }

}


