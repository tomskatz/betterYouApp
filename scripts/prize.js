//get reference from html
const pairs_point_status = document.querySelector('#pairs_point_status'); 

const winPrize = document.querySelector('#the_big_prize');

const pairsSet = new Set();

var adifinishprize = false;

let userid = ""
var finishpair = false;

const setupID = (user) => {
  if (user) {
    userid = user.uid;
    setUp(userid);
  } else {
    userid = "";
  }
};



function renderPairs(doc, g_code, user_name){
    if (doc.data().game_code != g_code) return;
    if (!doc.data().paired) return;

    //creats the pair names in the list
    let pair = document.createElement('div');
    pair.className = "mb-0";

    let img = document.createElement('img');
    img.src = setPictureSrc(doc); 
    img.alt = "";
    img.className = "thumb-sm mr-1";
    pair.appendChild(img);

    let span = document.createElement('span');
    let text = document.createElement('strong');
    text.setAttribute('data-id', doc.id);
    pairsSet.add(doc.data().name);
    pairsSet.add(doc.data().partner_name);
    text.innerHTML = doc.data().name + " &amp; " + doc.data().partner_name;
    if (doc.data().name == user_name || doc.data().partner_name == user_name)text.style.color = "#CC5CA2";
    span.appendChild(text);
    pair.appendChild(span);
    pairs_point_status.appendChild(pair);
    

    // set the currect points
    let points = document.createElement('small');
    points.className = "float-right text-muted ml-3 font-14";
    points.innerHTML = doc.data().game_points;
    pairs_point_status.appendChild(points);

    //set bar
    let bar_out = document.createElement('div');
    bar_out.className = "progress mt-2 mb-4  bg-white";
    bar_out.setAttribute("style", "height:6px;");
    
    let progress = document.createElement('progress');
    progress.className = "progress-bar bg-pink";
    var size = doc.data().game_points / 960 ;
    size = size * 100;
    progress.setAttribute("style", "width:" + size + "%; border-radius:5px;");   
    bar_out.appendChild(progress);
    pairs_point_status.appendChild(bar_out);   
   finishpair = true;
}

function setPictureSrc(doc)
{
  if(doc.data().my_status && doc.data().partner_status)
  {
    return "assets/images/Star.png"
  }
  else 
  {
    return "assets/images/poop.png"
  }
}



function setUp(userid)
{
  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
  snapshot.docs.forEach(doc => {
    if(doc.data().new_tip) document.getElementById("newTip-prize").style.visibility = "visible";
      else document.getElementById("newTip-prize").style.visibility = "hidden";
       if(doc.data().new_pic) document.getElementById("newPic-prize").style.visibility = "visible";
      else document.getElementById("newPic-prize").style.visibility = "hidden";
    var g_code = doc.data().game_code;
    var user_n = doc.data().name;
     db.collection('users').doc(doc.id).update({placeDown: false});
    db.collection('users').doc(doc.id).update({placeUp: false});
    callByOrder(g_code, user_n, userid);
      });
  })

    db.collection('users').onSnapshot(function(snapshot){
      snapshot.docChanges().forEach(function(change){
        db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
          snapshot.docs.forEach(doc => {
            var g_code = doc.data().game_code;
            var user_n = doc.data().name;
          
            callByOrder(g_code, user_n, userid);
          });
        })
    });
  })

  

  //set prize
   db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
          var g_code = doc.data().game_code;
          let prize = new Map()
          prize.set("Pizza", 0);
          prize.set("Hamburger", 0);
          prize.set("Movie&Popcorn", 0);
          db.collection('users').where("game_code", "==",g_code).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
              if(doc.data().prize_idea == "Pizza") prize.set("Pizza", prize.get("Pizza") + 1);
              if(doc.data().prize_idea == "Movie&Popcorn") prize.set("Movie&Popcorn", prize.get("Movie&Popcorn") + 1);
              if(doc.data().prize_idea == "Hamburger") prize.set("Hamburger", prize.get("Hamburger") + 1);
              
              var winnigPrize = findThePrize(prize);
              winPrize.innerHTML = "The big prize - " + winnigPrize + " :)";
                });
                
              })
        
          });
         
          })




  adifinishprize = true;
}

function findThePrize(prize){
  var max = 0;
  var wininigPrize = "";
  for (let [key, value] of  prize.entries()) {
    if (value > max)
    {
      max = value;
      wininigPrize = key;
    }
  }

  return wininigPrize; 
}

function callByOrder(g_code, user_n, userid)
{
      pairs_point_status.innerHTML= "";
      pairsSet.clear();

      db.collection('users').orderBy('place', 'asc').onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        
        if(!pairsSet.has(doc.data().name) && doc.data().paired && doc.data().game_code == g_code && doc.data().user_id != userid)
        {
          console.log(doc.data().game_points + " " + doc.data().name + " " + doc.data().place)

          renderPairs(doc, g_code, user_n);
        } 
         
         
    }); 
    
  })
}
  