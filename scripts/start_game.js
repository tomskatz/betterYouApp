const pair_selection = document.querySelector('#pairs_selection'); 
const table = document.querySelector('#tbl');

const game_name = document.querySelector('#challengename');
var adifinishstart = false;

var buddy = "";

let userid = "";

let pairsSet = new Set();

let month = new Map()
month.set("01", "January");
month.set("02", "February");
month.set("03", "March");
month.set("04", "April");
month.set("05", "May");
month.set("06", "June" );
month.set("07", "July");
month.set("08", "August");
month.set("09", "September");
month.set("10", "October");
month.set("11",  "November");
month.set("12", "December");



  const setupID = (user) => {
    if (user) {
      userid = user.uid;
      
      setUp(userid);
    } else {
      userid = "";
    }
  };



// userid = temp_userid;


function renderPairs(doc){

    //creats the pair names in the list
    if(doc.data().user_id == userid) return;
    let free_member = document.createElement('option');
    free_member.innerHTML = doc.data().name;
    pair_selection.appendChild(free_member); 
}

function save_buddy()
{
  console.log("arrive to save buddy");
  var ee = document.getElementById("pairs_selection");
  buddy = ee.options[ee.selectedIndex].text;
}

function pair_buddies()
{

  var cur_name = "";
  var par_id = "";
  
   db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
  snapshot.docs.forEach(doc => {
        
        if(buddy != "") db.collection('users').doc(doc.id).update({partner_name: buddy, paired: true})
        cur_name = doc.data().name;

  });
  })

  db.collection('users').where("name", "==", buddy).get().then((snapshot) =>{
  snapshot.docs.forEach(doc => {
        if(buddy != "") {
        db.collection('users').doc(doc.id).update({partner_name: cur_name, partner_id: userid, paired: true})
        par_id = doc.data().user_id;

          db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
          db.collection('users').doc(doc.id).update({partner_id: par_id})
        
          });
          })
      }
  });
  })
}



function  addPairsToList(doc, c)
{
  let pair = document.createElement('tr');
  let index = document.createElement('th');
  let p1 = document.createElement('td');
  let p2 = document.createElement('td');

  index.setAttribute("scope", "row");
  index.innerHTML = c;
  p1.innerHTML = doc.data().name;
  pairsSet.add(doc.data().name);
  p2.innerHTML = doc.data().partner_name;
  pairsSet.add(doc.data().partner_name);

  pair.appendChild(index);
  pair.appendChild(p1);
  pair.appendChild(p2);

  table.appendChild(pair);

}
   var c = 1;

 
 function setUp(userid)
{
  
    // var userid = firebase.auth().currentUser.uid;

      //get users from the same game of the conected user, that are paired
    db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        var g_code = doc.data().game_code;
        if(doc.data().paired)
        { 
          document.getElementById("pairs_selection_div").innerHTML ="";
          document.getElementById("demop").style.visibility = "hidden";
        }
        db.collection('users').where("paired", "==",true).where("game_code", "==",g_code).onSnapshot(snapshot =>{
          snapshot.docs.forEach(doc => {
                if(!pairsSet.has(doc.data().name))
              {
                addPairsToList(doc, c);
                c = c + 1;
              }
              
          });
      })

              });
              })

    //get users from the same game of the conected user, that are not paired
    db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
      snapshot.docs.forEach(doc => {
      var g_code = doc.data().game_code;
      db.collection('users').where("paired", "==",false).where("game_code", "==",g_code).get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            
            renderPairs(doc);
            
            
        });
        
      })
              
            
              });
              })

  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
  snapshot.docs.forEach(doc => {
   
    var g_code = doc.data().game_code;
      if(doc.data().paired){ 
          setCountDown(g_code);
        }
  db.collection('create_game').where("game_code", "==" ,g_code).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
        
        game_name.innerHTML = doc.data().name;
       
        
         
         
    });
    
  })
          });
          })
          adifinishstart = true
}




function setCountDown(g_code)
{
    db.collection('create_game').where("game_code", "==" ,g_code).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
        
        setCountDownContinue(doc)
       
        
         
         
    });
    
  })
}

function setCountDownContinue(doc)

{
  var str = doc.data().start_date;

  var res = str.split("-");

  var year = res[0];
  var month_in_num = res[1];
  var day = res[2];

  var month_in_str = month.get(month_in_num);

  var the_start_date = month_in_str + " " + day + ", " + year + " 00:00:00";
  // Set the date we're counting down to
  var countDownDate = new Date(the_start_date).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  days++;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + " Days left until the challenge begins";
  document.getElementById("demop").innerHTML = "";

  // If the count down is finished, write some text
  if (distance < 0) {
    window.location.replace("adi_home3.html");
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
}












 