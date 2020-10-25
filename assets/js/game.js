// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is "+ name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >=7){
            window.alert("Refilling player's health by 10 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading")
            this.attack += 6;
            this.money -+ 7;
        }
        
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[1]);
console.log(enemyInfo[2]);
console.log(enemyInfo.length);

for(var i = 0; i < enemyInfo.length; ++i)  {
    console.log(enemyInfo[i]);
    console.log(i);
    console.log(enemyInfo[i] + " is at " + i + " index ");
}

var fightOrSkip = function() {
    // ask player if they'e like to fight or skip using the fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Enter the conditional recursive function call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.")
        return fightOrSkip();
    }


    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit");

        // if yes (true), leave the fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money form playerMoney for skipping
            playerInfo.playerMoney = playerInfo - 10;
            

            // return true if the player wants to leave
            return true;
        }
    }
}

var fight = function(enemy) {
    console.log
    

    // repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining "
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " heath left");
        }

        //generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack -3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " heath remaining "
        );

        // check player's health
        if  (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left ");
        }
               
        
    }

    
    
};
// function to start a new game
var startGame = function() {
    // reser player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; ++i) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have added 1 to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.Health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);



            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnenmyName variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() fuction
                if (storeConfirm) {
                    shop();
                }
            }
        }

        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }  

    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};


// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            // restart the game
            startGame();
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    
}

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerInfo.money >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.")

                // increase health and decrease money
                playerInfo.health = playerInfo.health + 20;
                playerInfo.money = playerInfo.money -7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        
        case "UPGRADE": // new case
        case "upgrade":
            if (playerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars");

                // increase attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
                playerInfo.money = playerInfo.money -7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;

        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store");

            // do nothing, so the function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};


// start tha game when the page loads
startGame(); 




// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less



