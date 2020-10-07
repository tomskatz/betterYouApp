
var adifinishgallery = false;

const setupID = (user) => {
  if (user) {
    userid = user.uid;
    setUpGallery(userid)
  } else {
    userid = "";
  }
};

let month = new Map()
month.set("January", "01");
month.set("February", "02");
month.set("March", "03");
month.set("April", "04");
month.set("May", "05");
month.set("June", "06" );
month.set("July", "07");
month.set("August", "08");
month.set("September", "09");
month.set("October", "10");
month.set("November",  "11");
month.set("December12", "12");




function setUpGallery(userid)
{
   db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        
        document.getElementById("placeUp").style.visibility = "hidden";
        document.getElementById("placeDown").style.visibility = "hidden";
        document.getElementById("newTip-gal").style.visibility = "hidden"
        if(doc.data().placeUp) document.getElementById("placeUp").style.visibility = "visible";
        if(doc.data().placeDown)document.getElementById("placeDown").style.visibility = "visible";
        if(doc.data().new_tip) document.getElementById("newTip-gal").style.visibility = "visible";
      });
  })
  
    db.collection('users').where('user_id', '==', userid).get().then((snapshot) =>{
      snapshot.docs.forEach(doc => {
            var game_code = doc.data().game_code;
            db.collection('users').doc(doc.id).update({new_pic: false});
            db.collection('create_game').where('game_code', '==', game_code).get().then((snapshot) =>{
              snapshot.docs.forEach(doc => {
                    var startDate = doc.data().start_date;
                    uploadToG(startDate, doc)
                    
                  });
              })
      });
  })
  adifinishgallery = true;
}

function uploadToG(startDate, doc)
{
  var game_code = doc.data().game_code;
  var pathStart = game_code + "/";
  var path = "";
  let date = new Date(startDate);
  
  for(var i = 0; i < 25; i++)
  {
    
    var month = date.getMonth() + 1;
    var monthStr = month;
    if (month < 10) monthStr = "0" + month;
    var day = date.getDate();
    if (date.getDate() < 10) day = "0" + day;
    findUserId(game_code, pathStart, monthStr, day, date);
    date.setDate(date.getDate()+1);


  }
}

function findUserId(game_code, pathStart, monthStr, day, date)
{
      document.getElementById("gallery_div").innerHTML = ""; 
      db.collection('users').where('game_code', '==', game_code).get().then((snapshot) =>{
      snapshot.docs.forEach(doc => {
        var userid = doc.data().user_id;
        path = pathStart + monthStr + day + date.getFullYear() + "/" + userid;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        storageRef.child(path).getDownloadURL().then(function(url) {
          $("#gallery_div").append("<img src=" + url + "></img>");
      
            }).catch(function(error) {
            console.log("err");
          });
                  });
              });
}

