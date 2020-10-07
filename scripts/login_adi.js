
var logout = document.querySelector('.loguotadi');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html");
})
console.log("test log in page");



