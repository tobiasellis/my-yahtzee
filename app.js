/* Classes */
class Die{
    constructor(elem){
        this.elem = elem;
        this.face = elem.innerText;
        this.selected = false;
    }
}
/*  ---------  */
class Cat{
    constructor(elem){
        this.elem=elem; //How to implement categories?
        this.selected = false;
    }
}

/*  Instanciate Variables */
let firstYahtzee = false;
let userTurn = true;
const rollButton = document.querySelector(".roll-button")
let gameOver = false;
let rollsLeft;
let totalScore = 0;
let dice = [];
let userCats = [
    new Cat(document.querySelector(".user.ones-score")), //0
    new Cat(document.querySelector(".user.twos-score")), //1
    new Cat(document.querySelector(".user.threes-score")), //2
    new Cat(document.querySelector(".user.fours-score")), //3
    new Cat(document.querySelector(".user.fives-score")), //4
    new Cat(document.querySelector(".user.sixes-score")), //5
    new Cat(document.querySelector(".user.sum-score")), // 6
    new Cat(document.querySelector(".user.bonus-score")), // 7
    new Cat(document.querySelector(".user.three-of-a-kind-score")),//8
    new Cat(document.querySelector(".user.four-of-a-kind-score")),//9
    new Cat(document.querySelector(".user.full-house-score")),//10
    new Cat(document.querySelector(".user.small-straight-score")),//11
    new Cat(document.querySelector(".user.large-straight-score")),//12
    new Cat(document.querySelector(".user.chance-score")),//13
    new Cat(document.querySelector(".user.yahtzee-score")),//14
]

/*  Sum and Bonus should not be selectable  */
userCats[6].selected = true;
userCats[7].selected = true;


/*  Add click events to categories  */
for(let cat of userCats){
    cat.elem.addEventListener("click", () =>{
        cat.elem.style.color = "black";
        cat.elem.pointerevents = "none";
        cat.selected = true;
        init();
    })
}

/*  Grab all die  */
for(let i = 1; i < 6; i++){
    dice.push(new Die(document.querySelector(`.d${i}`)));
}

/*  Add click events to dice  */
for( let d of dice){
    d.elem.addEventListener("click", () => {
        selectDie(d);
    })
}

/*  Function that returns random number between 1-6  */
function roll(){
    return Math.floor((Math.random() * 6) + 1);
}

/*  Calculates sum of all dice (helper for some categories) */
function sumDice(){
    let sum = 0;
    for(let d of dice){
        sum = sum + Number(d.elem.innerText);
    }

    return sum;
}

/*  Initialize board to be called after every roll/category select  */
function init(){
    let catSum = 0;
    let turnsLeft = 0;
    for(let cat of userCats){
        catSum += Number( cat.elem.innerText );
        if(!cat.selected){
            turnsLeft++;
        }
    }
    console.log(turnsLeft);
    if(turnsLeft == 0){
        document.querySelector(".user.total-score").innerText = catSum;
        document.querySelector(".user.total-score").style.fontweight = "bold";
        return 0;
    }

    rollsLeft = 2;
    
    document.querySelector(".rolls-text").innerText = "Rolls left:"
    document.querySelector(".rolls").innerText = rollsLeft;
    for( let d of dice){
        d.elem.style.transform = "translateY(0px)";
        d.selected = false;
        d.face = roll();
        d.elem.innerText = d.face;
    }
    validateScores();
}

//Initialize dice list
function selectDie(die){
    if(rollsLeft < 3){
        console.log("SELECTING...")
        if(die.selected){
            die.elem.style.transform = "translateY(0px)";
            die.selected = false;
        } else{
            die.elem.style.transform = "translateY(75px)";
            die.selected = true;
        }
    } else{
        console.log('CANNOT SELECT BEFORE FIRST ROLL');
    }
}

/* Validate and Update scorebard */
function validateScores(){
    //Score ones
    let tempScore = 0;
    if(!userCats[0].selected){
        for(let d of dice){
            if(d.face == 1){
                tempScore = tempScore + 1;
            }
        }
        userCats[0].elem.innerText = tempScore;
        tempScore = 0;
    }
    
    //twos
    tempScore = 0;
    if(!userCats[1].selected){
        for(let d of dice){
            if(d.face == 2){
                tempScore = tempScore + 2;
            }
        }
        userCats[1].elem.innerText = tempScore;
        tempScore = 0;
    }


    //threes
    tempScore = 0
    if(!userCats[2].selected){
        for(let d of dice){
            if(d.face == 3){
                tempScore = tempScore + 3;
            }
        }
        userCats[2].elem.innerText = tempScore;
        tempScore = 0;
    }

    
    //fours
    tempScore = 0
    if(!userCats[3].selected){
        for(let d of dice){
            if(d.face == 4){
                tempScore = tempScore + 4;
            }
        }
        userCats[3].elem.innerText = tempScore;
        tempScore = 0;
    }

    //fives
    tempScore = 0
    if(!userCats[4].selected){
        for(let d of dice){
            if(d.face == 5){
                tempScore = tempScore + 5;
            }
        }
        userCats[4].elem.innerText = tempScore;
        tempScore = 0;
    }

    //sixes
    tempScore = 0
    if(!userCats[5].selected){
        for(let d of dice){
            if(d.face == 6){
                tempScore = tempScore + 6;
            }
        }
        userCats[5].elem.innerText = tempScore;
        tempScore = 0;
    }

    
    //sum
    tempScore = 0
    for(let i = 0; i < 6; i++){
        if(userCats[i].selected){
            tempScore += Number(userCats[i].elem.innerText);
        }
    }
    userCats[6].elem.innerText = tempScore;

    //bonus
    if( userCats[6].elem.innerText >= 63){
        userCats[7].elem.innerText = 35;
    }

    //3kind
    tempScore = 0;
    if(!userCats[8].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i of items){
            if(i.length >= 3){
                tempScore = sumDice();
            }
        }
        userCats[8].elem.innerText = tempScore;
    }
    

    //4kind
    tempScore = 0;
    if(!userCats[9].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i of items){
            if(i.length >= 4){
                console.log(items);
                tempScore = sumDice();
            }
        }
        userCats[9].elem.innerText = tempScore;
    }
    

    //fullhosue
    tempScore = 0;
    if(!userCats[10].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i of items){
            if(i.length == 3){
                for(let i of items){
                    if(i.length == 2){
                         tempScore = 25
                    }
                }
            }
        }
        userCats[10].elem.innerText = tempScore;
    }
    

    //smstr8
    tempScore = 0;
    if(!userCats[11].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i = 0; i < 3; i++){
            if(items[0+i].length && items[1+i].length && items[2+i].length && items[3+i].length){
                tempScore = 30;
            }
        }
        userCats[11].elem.innerText = tempScore;
    } 

    //lstr8
    tempScore = 0;
    if(!userCats[12].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i = 0; i < 2; i++){
            if(items[0+i].length && items[1+i].length && items[2+i].length && items[3+i].length && items[4+i].length){
                tempScore = 40;
            }
        }
        userCats[12].elem.innerText = tempScore;
    } 

    //chance
    if(!userCats[13].selected){
        userCats[13].elem.innerText = sumDice();
    }

    //yahtzee
    tempScore = 0;
    if(!userCats[14].selected){
        let items = [ [], [], [], [], [], [] ]
        for(let d of dice){
            items[Number(d.elem.innerText)-1].push(d.elem.innerText)
        }
        for(let i of items){
            if(i.length == 5){
                 tempScore = 50;
                 if(firstYahtzee){
                    userCats[14].elem.innerText = userCats[14].elem.innerText + 100;
                 }
                 firstYahtzee = true;
            }
        }
        userCats[14].elem.innerText = tempScore;
    }
    //total

}

function roll(){
    return Math.floor((Math.random() * 6) + 1);
}

/* Roll Dice */
rollButton.addEventListener("click", () => {

    if(!rollsLeft < 1){

       for( let d of dice){
            if(!d.selected){
                d.face = roll()
                d.elem.innerText = d.face;
            }
        }
        rollsLeft--;
        if(rollsLeft < 1){
            document.querySelector(".rolls-text").innerText = "Please mark a score"
            document.querySelector(".rolls").innerText = ""
        }else{
            document.querySelector(".rolls").innerText = rollsLeft;
        }
    }

    let temp = 0;
    for( let d of dice){
        temp += d.face;
    }
    score = temp;
    validateScores();
}) 

/* Calls init to begin game */
init()

//some random edit