// ! ×”×ª×—×‘×¨×•×ª ×œ×•×’ ××™×Ÿ ×œ××¤×œ×™×§×¦×™×”
// login
const loginForm = document.querySelector('#login-form');
// const loginbutt = document.querySelector(".loginadi");

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("login");
  // get user info
  const email = document.querySelector('#username').value;
  const password = document.querySelector('#userpassword').value;

  // // log the user in
  // auth.signInWithEmailAndPassword(email, password).then((cred) => {
  //   // close the signup modal & reset form
  //   const modal = document.querySelector('#modal-login');
  //   M.Modal.getInstance(modal).close();
  //   loginForm.reset();
  // });
    auth.signInWithEmailAndPassword(email, password).then(() => {
    document.querySelector(".erroradi2").innerHTML = "";
    window.location.replace("adi_home3.html");
  }).catch(err => {
    document.querySelector(".erroradi2").innerHTML = err.message;
  });

});

console.log("hi log in");
