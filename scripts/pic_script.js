
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function saveImg(file)
{
  const setupID = (user) => {
    
    if (user) {
      userid = user.uid;
     
      saveImgToStorage(userid, file);
    } else {
      userid = "";
    }
  };
}

$('#imageUpload').on("change", function(event){
  var selectedfile = event.target.files[0];
  uploadFile(selectedfile)
});

function uploadFile(selectedfile)
{
  
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userid = user.uid;
    getGameCode(userid, selectedfile);
    
  } else {
     userid = "";
  }
  });
 
}

function getGameCode(userid, selectedfile)
{

   //get game code
  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
    
    snapshot.docs.forEach(doc => {
      var game_code = doc.data().game_code;
      uploadFile2(userid ,selectedfile, game_code)
      });
   })

}

function uploadFile2(userid , selectedfile, game_code)
{
  
  var filename = userid;

  //get date in string
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + dd + yyyy;
  
  // Create a root reference
  var storageRef = storage.ref('/' + game_code + '/' + today + '/' + filename);
  var uploadTask = storageRef.put(selectedfile);

  uploadTask.on('state_changed', function(snapshot){

  }, 
  function(error){

  },
  function(){
    var downloadURL = uploadTask.snapshot.downloadURL; 
  });
 

}
