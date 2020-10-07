
var finishadi = false;
var finishprize = false;
var pokefriend = false;


// pokeing!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function notification() {
  console.log("adidas2");
    document.querySelector('.home-noti-btn').click();
    setTimeout(function () {
        document.querySelector('.home-noti-btn').click();
    }, 7000);
}

// when the user is log in print the user id
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
        findingDoc(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});




function findingDoc(useridadi) {


    db.collection('users').where('user_id', '==', useridadi).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
           
            changeBack(doc);
           
            pokepoke(doc);
                 if (window.location.pathname == "/adi_home3.html") {
              
                $(".myFriendButt").click(function () {
                    pokefriend = true;
                });

                changeMyPic(doc);
                var friendid = doc.data().partner_id;
                friendidfunc(friendid);

            }


        });

    })
}





function pokepoke(doc) {
    if (doc.data().poke) {
        notification();
        db.collection('users').doc(doc.id).update({
            poke: false
        });
 
    }
}

function changeBack(doc) {
    var habit = doc.data().habit;
    if (habit === "knit") {
        //    chanhe backroung pic
        console.log("knit");
        finishadi = true;
    } else if (habit === "paint") {
        $('.page-wrapper').removeClass("apppage").addClass("apppage-paint");
        finishadi = true;
        // change backround pic
    } else {
        // change backround pic
        $('.page-wrapper').removeClass("apppage").addClass("apppage-piano");
        finishadi = true;
    }
}

function friendidfunc(useridadi2) {
    console.log("test1");
    db.collection('users').where('user_id', '==', useridadi2).get().then((snapshot) => {
        snapshot.docs.forEach(frienddoc => {
            changeFriendPic(frienddoc);
            pokemyfriend(frienddoc);
        })

    });
}



function changeMyPic(doc) {
    var habit = doc.data().habit;
    //  alert(habit);
    if (habit === "knit") {
        //chanhe backroung pic
        $('.myimg').addClass("knit-img");
        console.log("knit");
    } else if (habit === "paint") {
        $('.myimg').addClass("paint-img");
        // change backround pic
    } else {
        // change backround pic
        $('.myimg').addClass("piano-img");
    }
}

function pokemyfriend(doc) {
    if (pokefriend === true) {
        db.collection('users').doc(doc.id).update({
            poke: true
        });
        pokefriend = false;

    }
}

function changeFriendPic(doc) {
 
    var habit = doc.data().habit;
    // todo find my friend habit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    alert(str);
    if (habit === "knit") {
        //chanhe backroung pic
        $('.friendimg').addClass("knit-img");
        console.log("knit");
    } else if (habit === "paint") {
        $('.friendimg').addClass("paint-img");
        // change backround pic
    } else {
        // change backround pic
        $('.friendimg').addClass("piano-img");
    }
}

function changePrize(doc) {
    var habit = doc.data().habit;
    //    alert(str);
    if (habit === "knit") {
        //    chanhe backroung pic
        console.log("knit");
    } else if (habit === "paint") {
        $('.page-wrapper').removeClass("apppage").addClass("apppage-paint");
        // change backround pic
    } else {
        // change backround pic
        $('.page-wrapper').removeClass("apppage").addClass("apppage-piano");
    }
}