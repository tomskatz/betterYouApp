// 0 defult 1 is yes 2 no
// הגדרת משתנים  
// הפלס הראשון הוא היום!
// הגדרת משתנים  

var chestCount = 0;
var score = 0;
var newTile = "";
var dirt = "green";
var stone = "stone";
var water = "piano";
var gemText = "Nice!";
var chestText = "Wow!!";
var startText = "Go!";
var endText = "Yay!";
var globalBonus = 0;
// ///////////////////////////////////////////////////
var myHabit = "play"
var defaultTile = "grass";
var failTile = "fail";
var doneTile = "done";
habitTile();
scoreCalc(score);

function habitTile() {
    if (myHabit === "play") {
        doneTile = "piano";
    } else if (myHabit === "knit") {
        doneTile = "knit";
    } else if (myHabit === "paint") {
        doneTile = "paint";
    }
}



//
var bigList = [
    [
        ["today", 0, ".tile00"],
        ["future", 0, ".tile01"],
        ["future", 0, ".tile02"],
        ["future", 0, ".tile03"],
        ["future", 0, ".tile04"]
    ],
    [
        ["future", 0, ".tile10"],
        ["future", 0, ".tile11"],
        ["future", 0, ".tile12"],
        ["future", 0, ".tile13"],
        ["future", 0, ".tile14"]
    ],
    [
        ["future", 0, ".tile20"],
        ["future", 0, ".tile21"],
        ["future", 0, ".tile22"],
        ["future", 0, ".tile23"],
        ["future", 0, ".tile24"]
    ],

    [
        ["future", 0, ".tile30"],
        ["future", 0, ".tile31"],
        ["future", 0, ".tile32"],
        ["future", 0, ".tile33"],
        ["future", 0, ".tile34"]
    ],

    [
        ["future", 0, ".tile40"],
        ["future", 0, ".tile41"],
        ["future", 0, ".tile42"],
        ["future", 0, ".tile43"],
        ["future", 0, ".tile44"]
    ]
]
$("#bonus").on('click', function () {
  bonusPoints(globalBonus,bigList);
})
///////// //////////////////////////////////////////
// function chest(tile) {
//     changeUITile(tile, stone);
//     $(tile).append("<div class='chest chest-closed'></div>");
//     chestCount = 1;
//     // sndEffects(0);
//     $(".chest").click(function () {
//         $(this).unbind();
//         $(this).addClass('chest-open').removeClass('chest-closed');
//         $(this).append("<img class='star' src='http://adrianpayne.me/game/assets/images/star.png' />");
//         $(this).find('.star').animate({
//             top: "-40px",
//             opacity: "0"
//         }, 800);
//         $('.starcount').text(1);
//         // speechText(chestText, 300);
//         // sndEffects(1);
//         // scoreCalc(chestPoints);
//         // $(this).delay(200).fadeOut("slow");
//     });
// }

$("#prize").on("click", function () {
    chest($(".tile00"));
})

$("#UI").on('click', function () {
    bonusPoints(curBonus, bigList)
    changeBoard();

})

function changeBoard() {
    // bonusPoints();
    for (list in bigList) {
        for (evar in bigList[list]) {
            changeUITile(bigList[list][evar])
            // console.log("Adi");
        }
    }
    // console.log("ui");
}


function reverseBoard() {
    // bonusPoints();
    for (list in bigList) {
        for (evar in bigList[list]) {
            reverseUITile(bigList[list][evar])
            // console.log("Adi");
        }
    }
    // console.log("ui");
}

function changeUITile(tileList) {

    // console.log(tileList);
    // // removing all the classes
    $(tileList[2]).removeClass("grass").removeClass("fail").removeClass("done");
    // add class by number
    if (tileList[1] === 0) {
        $(tileList[2]).addClass("grass");
    }
    if (tileList[1] === 1) {
        $(tileList[2]).addClass(doneTile);
    }
    if (tileList[1] === 2) {
        $(tileList[2]).addClass("fail");
    }

}


function reverseUITile(tileList) {

    // console.log(tileList);
    // // removing all the classes
    $(tileList[2]).removeClass("grass").removeClass("fail").removeClass("done");
    // add class by number
    if (tileList[1] === 0) {
        $(tileList[2]).addClass("grass");
    }
    if (tileList[1] === 1) {
        $(tileList[2]).addClass(doneTile);
    }
    if (tileList[1] === 2) {
        $(tileList[2]).addClass("fail");
    }

}

//מחכה שמישהו ילחץ על כפתור דן
$("#done").on('click', function () {
    // אם מישהו לוחץ על הכפתור דן אז מודפס דן ומופעלת הפונקציה 
    scoreCalc(1);
    console.log("done");
    switch2one();

})

//מחכה שמישהו ילחץ על כפתור דן
$("#undone").on('click', function () {
    // אם מישהו לוחץ על הכפתור דן אז מודפס דן ומופעלת הפונקציה 
    scoreCalc(-1);
    console.log("undone");
    switch2zero();

})

$("#gameover").on('click', function () {
    // אם מישהו לוחץ על הכפתור דן אז מודפס דן ומופעלת הפונקציה 

    switch2two();

})


$("#print").on('click', function () {
    // אם מישהו לוחץ על הכפתור דן אז מודפס דן ומופעלת הפונקציה 
    console.log(bigList);


})


// פונקציה שאם לוחצים עליה משנה את האיבר ברשימה ל1                        
function switch2one() {
    loop1:
     for (list in bigList) {
        for (evar in bigList[list]) {
            if (bigList[list][evar][0] === "today") {
                bigList[list][evar][1] = 1;
                changeBoard();
                break loop1;
            }
            // console.log("Adi");
        }
    }



    // מדפיסים רשימה
    // bigList.splice(1, 0, "1");
}


// פונקציה שאם לוחצים עליה משנה את האיבר ברשימה ל0                        
function switch2zero() {
    loop1:
     for (list in bigList) {
        for (evar in bigList[list]) {
            if (bigList[list][evar][0] === "today") {
                bigList[list][evar][1] = 0;
                changeBoard();
                break loop1;
            }
            // console.log("Adi");
        }
    }



    // מדפיסים רשימה
    // bigList.splice(1, 0, "1");
}

// //////////////////////////////////////////////////////////////


function switch2two() {
    //
    dailyTip();
    loop2: for (list in bigList) {
        for (subList in bigList[list]) {
            if (bigList[list][subList][0] === "today") {
                bigList[list][subList][0] = "past";
                if (bigList[list][subList][1] === 0) {
                    bigList[list][subList][1] = 2
                    console.log(subList);
                }
                // else if(bigList[list][subList][1] === 1){

                // }

                if (Number(subList) < 4) {
                    bigList[list][Number(subList) + 1][0] = "today";
                } else if (Number(subList) === 4) {
                    if (Number(list) === 4) {
                        console.log("finish!")
                    } else {
                        bigList[Number(list) + 1][0][0] = "today";
                    }
                }
                console.log(bigList);
                changeBoard();
                break loop2;
            }


        }

    }
}

////////////////////////////////////////////////////////////////
// פונקציה שמעדכנת נקודות


function scoreCalc(points) {
    score += points;
    $('.score').text(score);
}

// ///////////////////////////////////////////////////////////////
// פונקציה שבודקת האם מגיע לי בונוס או לא !!!

function checkRow(bigList, curBonus) {
    console.log("first")
    console.log(curBonus)
    for (list in bigList) {
        for (subList in bigList[list]) {
            if (bigList[list][subList][1]!=1) {break}
            if (subList == 4 && bigList[list][subList][1]==1) {
              curBonus += 1
            }
        }
    }
    console.log(curBonus)
    console.log("ffirst")
    return curBonus
}


function checkColumn(bigList, curBonus) {
    console.log("second")
    console.log(curBonus)
    for (list in bigList) {
        for (subList in bigList[list]) {
            if (bigList[subList][list][1]!=1) {
              
              break;
              console.log("what?");
              }
            if (subList == 4 && bigList[subList][list][1]==1) {
              console.log("yep")
              curBonus += 1
            }
        }
    }
    console.log(curBonus)
    console.log("ssecond")
    return curBonus
}


function checkFirstDiagnol(bigList, curBonus) {
    console.log("third")
    console.log(curBonus)
    for (list in bigList) {
      if (bigList[list][list][1]!=1) {break}
      if (list == 4 && bigList[list][list][1]==1) {curBonus+=1}
    }
    console.log(curBonus)
    console.log("tthird")
    return curBonus
}


function checkSecondDiagnol(bigList, curBonus) {
    console.log("fourth")
    console.log(curBonus)
    for (list in bigList) {
      if (bigList[list][4-list][1]!=1) {break}
      if (list == 4 && bigList[list][4-list][1]==1) {curBonus+=1}
    }
    console.log(curBonus)
    console.log("ffourth")
    return curBonus
}

function bonusPoints(curBonus, bigList) {
    var bonus = 0;
    //console.log("#hethalnu")
    console.log(bonus)
    //console.log(typeof bonus)
    var bonus = checkRow(bigList, bonus);
    //console.log(typeof bonus)
    console.log(bonus)
    var bonus = checkColumn(bigList, bonus);
    //console.log(typeof bonus)
    console.log(bonus)
    var bonus = checkFirstDiagnol(bigList, bonus);
    //console.log(typeof bonus)
    console.log(bonus)
    var bonus = checkSecondDiagnol(bigList, bonus);
    //console.log(typeof bonus)
    console.log(bonus)
    var curScores = bonus - curBonus;
    //console.log(typeof curScores)
    console.log("what is the bonus?")
    console.log(curScores)
    scoreCalc(curScores);
    globalBonus += curScores;

    }
    
    
// var tipList = ['Do','Act','Be']  
    
// function extractTip() {
  
//   var randInd = 1
//   var randTip = tipList[randInd]
//   tipList[randInd]
  
// }

var tipList = [['Do','your best'],['Act','like you own it'],['Be','your own role model']]

function pickRandTip(){
    const randomInd = Math.floor(Math.random() * tipList.length);
    var randTip = tipList[randomInd]
    tipList.splice(randomInd,1)
    console.log(randTip);
    return randTip
}

// pickRandTip();
function dailyTip(){

  if (tipList === undefined || tipList.length == 0){
    console.log("hi")
  }else{
    var dailyTip1 = pickRandTip();
    $(".kotert").text(dailyTip1[0]);
    $(".smalltext").text(dailyTip1[1]);
  }

}

    
    // var bonus = 0;
    // ///Checks rows
    // for (list in bigList) {
    //     var numOne = 0;
    //     for (subList in bigList[list]) {
    //         numOne += Number(bigList[list][subList][1])
    //     }
    //     if (numOne === 5) {bonus += 1}
    // }

    // ///Checks columns
    // for (list in bigList) {
    //     var numOne = 0;
    //     for (subList in bigList[list]) {
    //         numOne += Number(bigList[subList][list][1])

    //     }
    //     if (numOne === 5) {bonus += 1}
    // }

    ///Checks first diagonal
    // var numOne = 0;
    // var range = [0, 1, 2, 3, 4];
    // for (i in range) {
    //   var index = Number(i);
    //   console.log(typeof i);
    //   numOne += Number(bigList[index][index][1]);
      
    //   }
    //   if (numOne === 5) {bonus += 1}

    ///Checks second diagonal
    // / numOne = 0
    // for (i of range) {
    //   numOne += Number(bigList[i][4-i][1])}
    //   if (numOne === 5) {bonus += 1}

    




// פונקציה שאם עובר זמן מסוים משנה את האיבר הבא ברשימה ל-1

// כל אינטרוול מסוים של זמן
// לחפש את הפלס הראשון
// אם יש בו 0 תחליף ל2
// תחליף את הפלס לטרו
// Calendar today = Calendar.getInstance();
// today.set(Calendar.HOUR_OF_DAY, 0);
// today.set(Calendar.MINUTE, 0);
// today.set(Calendar.SECOND, 0);

// // every night at 12am you run your task
// Timer timer = new Timer();
// timer.schedule(new switch2two(), today.getTime(), TimeUnit.MILLISECONDS.convert(1, TimeUnit.DAYS)); // period: 1 day





// var TimerFunCall = setInterval(myTimer, 10000);

//   // מחכים שהמשתמש ילחץ על משהו במסך
//   $(document).on('click',function(){
//     // אם מישהו לוחץ על הכפתור אז מודפסת הרשימה


//   })
// // לחצנו על הכפתור דן

// })



//SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
//Date date = new Date(System.currentTimeMillis());
//System.out.println(formatter.format(date));
//2020-02-05 at 10:11:33 UTC

// var HTMLTagA= document.getElementsByClassName(" _6a-y _6qw5 _77yo");
// // var HTMLTagA= document.getElementsByClassName("_4sxc _42ft");
// var cnt=0;
// var i=0;