// const cur_game_code = document.querySelector('#game_code');



// const set_admin = document.querySelector('#setadmin');
// set_admin.addEventListener('submit', (e) => {
//   // alert("dfsdffsd");
//   e.preventDefault();
//   alret("setadmin")
// }

function setAdmin()
{
  
  const setupID = (user) => {
  if (user) {
    userid = user.uid;
    setAdminAtGame(userid);
  } else {
    userid = "";
  }
};
}

function setAdminAtGame(userid)
// {
//   alert("setAdminAtGame")
// }

// function setAdmin(userid)
{
  console.log("setadmin")
  db.collection("create_game").where("game_code","==",cur_game_code.value).set({
     admin: userid
  }).then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}