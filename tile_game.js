
var adifinishgame = false;

var bigList = [];
var mydoc = 0;
myHabit = 0;

  const setupID = (user) => {
  if (user) {
    userid = user.uid;
    db.collection('users').doc(userid).update({new_tip:false})

      db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        
        document.getElementById("placeUp-game").style.visibility = "hidden";
        document.getElementById("placeDown-game").style.visibility = "hidden";
        if(doc.data().placeUp) document.getElementById("placeUp-game").style.visibility = "visible";
        if(doc.data().placeDown)document.getElementById("placeDown-game").style.visibility = "visible";
      });
  })
    
  
    db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {

         document.getElementById("gamePoints").innerHTML = "GAME POINTS : " + doc.data().game_points;
          listGet(doc);
          mydoc = doc;
          changeBoard();
          myHabit = doc.data().habit;
          habitTile();
          donefunc(doc);
      });
  })

    
  } else {
    userid = "";
  }
  adifinishgame = true;
};

function listGet(doc){
  var dayindex = doc.data().dayIndex;
  var gameboard = doc.data().mygame;
  bigList = JSON.parse(gameboard);
  console.log(bigList);
  updatedate(dayindex)
}

function updatedate(num){
  console.log(num);

}

function listSet(doc){
  var updatelist = bigList;
  db.collection('users').doc(doc.id).update({mygame:updatelist});
}


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
scoreCalc(score);

function habitTile() {
    if (myHabit === "play instrument") {
        doneTile = "piano";
    } else if (myHabit === "knit") {
        doneTile = "knit";
    } else if (myHabit === "paint") {
        doneTile = "paint";
    }
}


var one = [[[0]]]
// from array into jason
var two = JSON.stringify(one);
console.log(two);
// from jason into array:
var arri = JSON.parse(two);
console.log(arri);
//


$("#bonus").on('click', function () {
  bonusPoints(globalBonus,bigList);
})


$("#prize").on("click", function () {
    chest($(".tile00"));
})

$("#UI").on('click', function () {
    bonusPoints(curBonus, bigList)
    changeBoard();

})

function changeBoard() {
    
    for (list in bigList) {
        for (evar in bigList[list]) {
            changeUITile(bigList[list][evar])
           
        }
    }
  
}


function reverseBoard() {
   
    for (list in bigList) {
        for (evar in bigList[list]) {
            reverseUITile(bigList[list][evar])
            
        }
    }
   
}

function changeUITile(tileList) {

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


function donefunc(doc){
  changeBoard();
  var stat = doc.data().my_status;
  var day_index = doc.data().dayIndex;
  if (stat){
    scoreCalc(1);
    switch2one(doc ,day_index);
    
  }
}

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
function switch2one(doc, day_index) {
    loop1:
     var count = 1; 
     for (list in bigList) {
        for (evar in bigList[list]) {
          if(count == day_index)
          {
            bigList[list][evar][1] = 1;
            var bigList1 = JSON.stringify(bigList);
            db.collection('users').doc(doc.id).update({mygame: bigList1});
            changeBoard();
          }
          count++;
        }
    }
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
        }
    }
}

// //////////////////////////////////////////////////////////////


function switch2two() {
    dailyTip();
    loop2: for (list in bigList) {
        for (subList in bigList[list]) {
            if (bigList[list][subList][0] === "today") {
                bigList[list][subList][0] = "past";
                if (bigList[list][subList][1] === 0) {
                    bigList[list][subList][1] = 2
                    console.log(subList);
                }

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
// /////////////////////////////////////////////////////////////////////////////////


var tipList = [
// ["Don\'t stop doing one habit, start doing another.",

["It\'s easier to...", "do something than not to do something else, especially if trying not to do something makes you think about what you aren\'t doing. If you want to eat less junk food, instead of trying not to eat potato chips, eat more fruits, nuts, carrots, and other quick healthy food. Instead of trying to watch less TV or spend less time on Facebook, start doing something else, like join a team or writing a book."],
// ["Make your goal creating emotions you want.",
 ["If you want...", "to start a habit, think about what emotions you can and want to create and work primarily on them. If your habit won\'t create emotional reward, you\'ll eventually stop. If it will create emotional reward, doing it will motivate you to do it again. If you want to get in shape and make your goal just \"going to the gym,\" you won\'t likely create a self-sustaining activity. If you make a goal \"learning to enjoy going to the gym,\" \"finding gym partners you enjoy spending time with,\" or \"finding a team you love to play with,\" you\'ll more likely succeed. Whatever the goal you want to achieve with your desired habit, think of what emotion you could get out of it, usually by looking at what successful people who do it get out of it, and shoot for that. Focus on the emotion coming from it or expect to lose interest."],
// ["Use willpower as starter motor to engage emotions as main engine.",
 ["New habits compete...", "with old activities for your time and other resources. Those old activities bring you some reward, predictably so. New habits you aren\'t sure will bring reward so your emotional system won\'t kick in to motivate you. You can use willpower to start the habit, but willpower takes mental effort that runs out. If you know what desired emotion your habit will create, use willpower to start the habit enough for your emotional system to feel that reward, which will motivate you to keep doing it, now without the mental effort willpower required."],
// ["Start with awareness of current situation.",
 ["If you don\'t...", "know where you are it\'s hard to get to where you want to go. If you want to go to the gym more, know what you\'re doing instead that going to the gym will displace. If it\'s sitting on the couch watching TV, know that that activity creates reward, will motivate you in stressful times, is always available, and is easy. If you don\'t take everything into account when you plan new habits, you won\'t overcome the old habits\' allure."],
// ["Use environment, belief, and behavior.",
["If you only...", "change your environment, only your beliefs, or only your behavior, you\'ll likely miss some parts of your life that motivate the old habits you\'re trying to displace, or miss reward that could motivate the new habit. When your environment, beliefs, and behavior align, you\'ll feel reward and want to continue. When they don\'t, you\'ll feel internal emotional conflict, which will discourage you. So don\'t just say you\'ll go to the gym, which is just behavior and environment. Also include belief, like believing the exercise gives you energy, increases attraction, or something else that will motivate you."],
// ["Notice what you\'re doing, like if you\'re using willpower to do something you don\'t like.",
 ["Many people start...", "habits that don\'t make them happy without realizing it. They force themselves to exercise when they don\'t enjoy it or don\'t eat meat when they love it. Nothing will destroy a habit you want more than feeling emotional punishment when you do it. Nor will anything make you feel more helpless about starting other habits, even ones that would improve your life. Yet people persist in willing themselves to things they don\'t like."],
// ["Practice discipline all the time.",
 ["Whether you\'re doing...", "your habits or not, do things that develop discipline. For me, things like marathon training and cold showers develop my ability to do something even when I don\'t want to. Find things like those that work for you and you\'ll find maintaining habits easy. I weened myself off potato chips by making a game of limiting my eating."],
// ["Find role models.",
 ["Somebody does what...", "you want to. You can learn from them. Find them and get to know them. Learn from their mistakes. Adopt what works -- beliefs, practices, etc. Have them hold you accountable if you can."],
// ["Create accountability, ideally public.",
 ["Few things motivate...", "more effectively than looking bad in front of others. Also, having others see your plans and behavior helps find problems."],
// ["Create reward intrinsic to the habit, not external, and attach it to habit.",
 ["The closer the...", "reward is to your habit, the more your emotional system will motivate you effortlessly and the less you\'ll have to rely on willpower. The reward of feeling stronger will help motivate going to the gym, but not as quickly and directly as seeing your body look how you want it in the gym mirrors while you\'re there. Enjoying a sport and teamwork may be even more direct and intrinsic."],
// ["Share what you love.",
 ["I\'ve written about...", "this at length. The more you share what you love, the more people will bring more of that into your life and the less they\'ll interfere. Once you start enjoying a new habit, tell people about it to attract supportive people and repel discouraging ones. Take responsibility for creating your community."],
// ["Habits aren\'t logical don\'t expect reason to help.",
 ["It\'s nice to...", "know if something you want to eat more of is healthy, but intellectual ideas don\'t motivate. Find a way to make that food delicious if you want to eat more of it. Emotion and reward motivate. Thinking just gets you thinking."],
// ["On success, build more because it\'s a skill, or set of skills.",
 ["When you feel...", "a habit you want take root, start building another habit you want. When you kick a habit you don\'t want, find another and kick it too. Starting and stopping habits uses skills and your skills are sharp when you\'ve just succeeded, as is your motivations."],
// ["If you miss one day you can miss two, if you miss two it\'s all over.",
 ["Read this post...", "on this view that has been one of my most helpful."],
// ["Develop and use tricks that work.",
 ["Talk to people...", "who successfully started habits they like and you\'ll hear lots of little tricks they develop that work for them. As little and ad hoc as the tricks sound, I\'ve come to believe they are integral to success. When I start my burpees, I don\'t think about the whole set. I think about starting one, then when I\'ve done one I finish the remaining 25 because I feel like doing more once I started. My friend who goes to the gym a lot doesn\'t think about going for two hours, he thinks about walking in the door, then stays for two hours. Before starting my cold showers, I start my five-minute-and-ten-second timer because once it starts, I feel like I have ten seconds to start and get in the cold water."],
// ["Do. Act. Start. Try.",
 ["Habits are fundamentally...", "behavioral. If you don\'t start them you\'ll never continue them, nor will you feel what doing them feels like. If you want one to stick you need to feel emotional reward"],
// ["Commit to Thirty Days",
 ["Three to four...", "weeks is all the time you need to make a habit automatic. If you can make it through the initial conditioning phase, it becomes much easier to sustain. A month is a good block of time to commit to a change since it easily fits in your calendar."],
// ["Make it Daily",
 ["Consistency is critical...", "if you want to make a habit stick. If you want to start exercising, go to the gym every day for your first thirty days. Going a couple times a week will make it harder to form the habit. Activities you do once every few days are trickier to lock in as habits."],
// ["Start Simple",
 ["Don’t try to...", "completely change your life in one day. It is easy to get over-motivated and take on too much. If you wanted to study two hours a day, first make the habit to go for thirty minutes and build on that."],
// ["Remind Yourself",
 ["Around two weeks...", "into your commitment it can be easy to forget. Place reminders to execute your habit each day or you might miss a few days. If you miss time it defeats the purpose of setting a habit to begin with."],
// ["Stay Consistent",
 ["The more consistent...", "your habit the easier it will be to stick. If you want to start exercising, try going at the same time, to the same place for your thirty days. When cues like time of day, place and circumstances are the same in each case it is easier to stick."],
// ["Get a Buddy",
 ["Find someone who...", "will go along with you and keep you motivated if you feel like quitting."],
// ["Form a Trigger",
 ["A trigger is...", "a ritual you use right before executing your habit. If you wanted to wake up earlier, this could mean waking up in exactly the same way each morning. If you wanted to quit smoking you could practice snapping your fingers each time you felt the urge to pick up a cigarette."],
// ["Replace Lost Needs",
 ["If you are...", "giving up something in your habit, make sure you are adequately replacing any needs you’ve lost. If watching television gave you a way to relax, you could take up meditation or reading as a way to replace that same need."],
// ["Be Imperfect",
 ["Don’t expect all...", "your attempts to change habits to be successful immediately. It took me four independent tries before I started exercising regularly. Now I love it. Try your best, but expect a few bumps along the way."],
// ["Use “But”",
 ["A prominent habit...", "changing therapist once told me this great technique for changing bad thought patterns. When you start to think negative thoughts, use the word “but” to interrupt it. “I’m no good at this, but, if I work at it I might get better later.”"],
// ["Remove Temptation",
 ["Restructure your environment...", "so it won’t tempt you in the first thirty days. Remove junk food from your house, cancel your cable subscription, throw out the cigarettes so you won’t need to struggle with willpower later."],
// ["Associate with Role Models",
 ["Spend more time...", "with people who model the habits you want to mirror. A recent study found that having an obese friend indicated you were more likely to become fat. You become what you spend time around."],
// ["Run it as an Experiment",
 ["Withhold judgment until...", "after a month has past and use it as an experiment in behavior. Experiments can’t fail, they just have different results so it will give you a different perspective on changing your habit."],
// ["Swish",
 ["A technique from...", "NLP. Visualize yourself performing the bad habit. Next visualize yourself pushing aside the bad habit and performing an alternative. Finally, end that sequence with an image of yourself in a highly positive state. See yourself picking up the cigarette, see yourself putting it down and snapping your fingers, finally visualize yourself running and breathing free. Do it a few times until you automatically go through the pattern before executing the old habit."],
// ["Write it Down",
 ["A piece of...", "paper with a resolution on it isn’t that important. Writing that resolution is. Writing makes your ideas more clear and focuses you on your end result."],
// ["Know the Benefits",
 ["Familiarize yourself with...", "the benefits of making a change. Get books that show the benefits of regular exercise. Notice any changes in energy levels after you take on a new diet. Imagine getting better grades after improving your study habits."],
// ["Know the Pain",
 ["You should also...", "be aware of the consequences. Exposing yourself to realistic information about the downsides of not making a change will give you added motivation."],
// ["Do it For Yourself",
 ["Don’t worry about...", "all the things you “should” have as habits. Instead tool your habits towards your goals and the things that motivate you. Weak guilt and empty resolutions aren’t enough."]
];


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
    $(".maintip").text("Daily tip: " + dailyTip1[0]);
    $(".smalltip").text(dailyTip1[1]);
  }

}

dailyTip();