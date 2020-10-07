

//get reference from html
const game_code = document.querySelector('#game_code');


var g_code = game_code.value = make_code(4);

function make_code(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function create_game()
{
  var g_name = document.querySelector('#group-name').value;
  var g_start_date = document.querySelector('#example-datetime-local-input').value;
  
  db.collection("create_game").doc(g_name).set({
      name: g_name,
      game_code: g_code,
      start_date: g_start_date,
      admin:""
  }).then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  window.document.location = "./forms-invited-create.html" + "?codeGame=" + g_code;



}



//copy to clipboard func
$('.copyboard').on('click', function(e) {
  e.preventDefault();

  var copyText = g_code;

  var textarea = document.createElement("textarea");
  textarea.textContent = copyText;
  textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy"); 

  document.body.removeChild(textarea);
})
