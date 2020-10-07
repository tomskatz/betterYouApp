var gameCode = window.location.href.split("=").pop();

db.collection('users').onSnapshot(snapshot =>{
  let winners = new Array();
   snapshot.docs.forEach(doc => {
     if(doc.data().place == 1 && doc.data().game_code == gameCode) winners.push(doc.data().name);
    
  });
  document.getElementById("winnersName").innerHTML = "Good job " + winners[0] + " and " + winners[1] + " you won the challenge!";
  
  })