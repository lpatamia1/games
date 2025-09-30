// Get references to the HTML elements
const artDisplay = document.getElementById('art-display');
const textDisplay = document.getElementById('text-display');
const choicesDisplay = document.getElementById('choices-display');
//const inventoryList = document.getElementById('inventory-list');

// Add an array to hold inventory items
//let inventory = [];
// A variable to track if the player has the secret item
let hasHummingStone = false;


// The entire story is stored in this object.
// Each key is a unique ID for a scene.
const story = {
    start: {
        art: `              ,----------------,              ,---------, 
         ,-----------------------,          ,"        ,"| 
       ,"                      ,"|        ,"        ,"  | 
      +-----------------------+  |      ,"        ,"    | 
      |  .-----------------.  |  |     +---------+      | 
      |  |                 |  |  |     | -==----'|      | 
      |  |  WELCOME TO THE |  |  |     |         |      | 
       -----|  |  FUTURE - 3433  |  |  | ----|'---=   '|      |------ 
          |  |                 |  |  |     |==== ooo |      ;     
    |  |                 |  |  |     |(((([3]))|    / 
   |  '-----------------'  |,'      |((((   ))|  ,' 
   +-----------------------+        |         |,'   
  /_)______________(_/         +---------+ 
_____________________________              
     /  oooooooooooooooo  .o.  oooo /,       ,"----------- 
   /_==__==========__==_ooo__ooo=_/'       /___________,"`,
        text: "You wake up under a strange, purple sky... Gravity feels lighter. Ahead of you is a glowing HOUSE. Behind you is a DARK FOREST. The ground where you lay is slightly disturbed.",
        choices: [
            { text: "Walk towards the house", nextScene: "housePath" },
            { text: "Call out to the house", nextScene: "callOutPath" },
            { text: "Explore the forest", nextScene: "forestPath" },
            { text: "Investigate the spot where you woke up", nextScene: "investigateSpot" }
        ]
    },
    start_noInvestigate: {
        text: "You stand in the strange clearing. Ahead is the glowing HOUSE, behind is the DARK FOREST.",
         choices: [
            { text: "Walk towards the house", nextScene: "housePath" },
            { text: "Call out to the house", nextScene: "callOutPath" },
            { text: "Explore the forest", nextScene: "forestPath" }
        ]
    },
    investigateSpot: {
        art: `
          .           .
   .        '   .        '  .
     .  '     .       '     .
  '    .   ' .   '  .    '
   . '  . \` .  ' . '  . ' .
`,
        text: "You look down at the disturbed patch of alien soil. Half-buried in the dirt is a small, smooth stone that seems to hum with a faint energy.",
        choices: [
            { text: "Pick up the Humming Stone", nextScene: "takeStone" },
            { text: "Leave it and stand up", nextScene: "start_noInvestigate" }
        ]
    },
    takeStone: {
        art: `
        ,
\\ '.  .' /
 '. \\/ .'
   '--'
  .'  '.
 /      \\
'        '
`,
        text: "You pick up the object. It's warm to the touch and the humming sensation is stronger now. You pocket the Humming Stone and stand up.",
        action: "getStone", 
        choices: [
            { text: "Continue", nextScene: "start_noInvestigate" }
        ]
    },
    housePath: {
        art: `
      .------------------------------------.
     /|                                    |\\
    / |                                    | \\
   /  |        SYSTEMS: ONLINE             |  \\
  /   |        QUERY: >>                   |   \\
 /____|____________________________________|____\\
|     |                                    |     |
|     |                                    |     |
|_____|____________________________________|_____|
 \\   |                                    |   /
  \\  |                                    |  /
   \\ |                                    | /
    \\|____________________________________|/
`,
        text: "You walk up to the house. The door slides open silently. Inside is a single, humming SUPERCOMPUTER. A calm, synthesized voice speaks: 'To proceed, answer my riddle.'\n\n'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?'",
        choices: [
            { text: "A map", nextScene: "endingArchivist" },
            { text: "A dream", nextScene: "endingUnworthy" },
            { text: "A computer", nextScene: "endingUnworthy" }
        ]
    },
    callOutPath: {
        art: `
#####################################
# H # H # H # H # H # H # H # H # H #
#####################################
# H # H # H # H # H # H # H # H # H #
#####################################
# H # H # H # H # H # H # H # H # H #
#####################################
`,
        text: "You shout, 'Hello?!' Your voice is swallowed by the silence. Suddenly, the ground beneath you glows with a bright red grid pattern. A voice from the house booms: 'Perimeter breach detected. Subject will be neutralized.'",
        choices: [
            { text: "Stand your ground", nextScene: "endingVaporized" },
            { text: "Run for the forest", nextScene: "endingVaporized" }
        ]
    },
    callOutPath_withStone: {
        art: `
*************************************
* O * O * O * O * O * O * O * O * O *
*************************************
* O * O * O * O * O * O * O * O * O *
*************************************
* O * O * O * O * O * O * O * O * O *
*************************************
`,
        text: "You shout, 'Hello?!'. As you do, the Humming Stone in your pocket glows brightly. The red grid on the ground flickers and turns a calming green. The voice from the house booms: 'Lifeform signature recognized. Welcome, traveler.'",
        choices: [
            { text: "Enter the house cautiously", nextScene: "endingTraveler" }
        ]
    },
    forestPath: {
        art: `          &&& &&  & && 
      && &\\/&\\|& ()|/ @, && 
      &\\/(/&/&||/& /_/)_&/_& 
   &() &\\/&|()|/&\\/ '%'. &() 
  &_\\_&&_\\ |& |&&/&__%_/_& && 
&&   && & &| &| /& & % ()& /&& 
 ()&_---()&\\&|&&-&&--%---()~ 
     &&     \\||| 
             ||| 
             ||| 
             ||| 
       , -=-~'-^-^-'~=-. `,
        text: "You wander into the eerie, bioluminescent forest and discover glowing berries. A small, furry creature with large eyes watches you from a branch.",
        choices: [
            { text: "Eat the berries", nextScene: "endingPoisoned" },
            { text: "Offer a berry to the creature", nextScene: "endingFriendOfForest" }
        ]
    },
    // --- ENDINGS ---
    endingArchivist: {
        art: `
.------------------------------------.
|    ARCHIVE ACCESSED                |
|    ----------------                |
|    > Displaying historical data... |
|    > File: Terran History.dat      |
|    > ...                         . |
'------------------------------------'
`,
        text: "'Correct,' the computer states. 'Your logic is sound. You may access the archive.' You are safe and have access to the knowledge of the past.",
        ending: "====== ENDING 1: THE ARCHIVIST ======"
    },
    endingUnworthy: {
        art: `
       ...
    .'     '.
   /         \\
  |           |
   \\         /
    '.     .'
      |   |
      |   |
       '|'
`,
        text: "'Incorrect. The illogical must be purged.' A high-energy beam envelops you. You disintegrate instantly.",
        ending: "====== ENDING 2: DEEMED UNWORTHY ======"
    },
    endingVaporized: {
        art: `
      )  (  )  (
   ( ) (    ) ( )
    )  (  )  (  )
 ( ( (  )  ( ) ) (
  ) ) ( (  ) ) ( )
 ( ( (  )  ( ) ) (
  ) ) ( (  ) ) ( )
`,
        text: "You are too slow. The defense system is flawless. The light intensifies, vaporizing you instantly.",
        ending: "====== ENDING 3: VAPORIZED BY DEFENSES ======"
    },
    endingPoisoned: {
        art: `
    .-.
   (o.o)
   |=|
   .' '.
  // O \\
  | O O |
  | O O |
  '-----'
`,
        text: "You pop a berry in your mouth. It's incredibly sour! Your vision blurs. The last thing you see is the small creature shaking its head in pity.",
        ending: "====== ENDING 4: POISONED BERRIES ======"
    },
    endingFriendOfForest: {
        art: `
      /\\_/\\
     ( ^.^ )
     /| |>\\
    c U U )
`,
        text: "You hold out a berry. The creature scampers down, sniffs it, and chirps happily. It gestures for you to follow. It leads you to a hidden sanctuary deep in the woods. You have found a new home, protected by the forest's inhabitants.",
        ending: "====== ENDING 5: FRIEND OF THE FOREST ======"
    },
    endingTraveler: {
        art: `
 * .       .            * .      '                        *
     .        '    * .      * .

       * * |
           ------
                                        |                           <>
             *
    .       .'          ..      '  
     .        '    * .                                      * .
                 *                      |
     <>                                -----
                                        |
               .'
    | .  
                        -----                      <>
             |    '     * .

`,
        text: "You enter the house. The supercomputer greets you not with a riddle, but with a vibrant projection of a star map. It seems this place is a galactic waystation, and the stone was your key. You have found a new purpose among the stars.",
        ending: "====== SECRET ENDING: THE STAR NAVIGATOR ======"
    }
};

// This function displays a scene based on its ID
function showScene(sceneId) {
    // Special check for the secret path
    if (sceneId === 'callOutPath' && hasHummingStone) {
        sceneId = 'callOutPath_withStone';
    }

    const scene = story[sceneId];
    
    // Check if the scene has a special action, like getting the stone
    if (scene.action === "getStone") {
        hasHummingStone = true;
    }

    // Update the art and text displays
    artDisplay.textContent = scene.art || '';
    textDisplay.textContent = scene.text;
    
    // Clear old choices
    choicesDisplay.innerHTML = '';
    
    // Check if it's an ending scene
    if (scene.ending) {
        const endingText = document.createElement('p');
        endingText.className = 'ending';
        endingText.textContent = scene.ending;
        choicesDisplay.appendChild(endingText);
        
        // Add a clear "Game Over" message and provide two distinct choices.
        const gameOverTitle = document.createElement('p');
        gameOverTitle.className = 'ending';
        gameOverTitle.textContent = 'SESSION TERMINATED';
        gameOverTitle.style.marginTop = '20px'; // Add some space
        choicesDisplay.appendChild(gameOverTitle);
        
        // Add a "Restart Session" button
        const playAgainBtn = document.createElement('button');
        playAgainBtn.className = 'choice-btn';
        playAgainBtn.textContent = "> Restart Session";
        playAgainBtn.onclick = () => showScene('start');
        choicesDisplay.appendChild(playAgainBtn);

        // Add an "End Session" button
        const endBtn = document.createElement('button');
        endBtn.className = 'choice-btn';
        endBtn.textContent = "> End Session";
        endBtn.onclick = () => {
            choicesDisplay.innerHTML = '<p class="ending">Connection closed. Thank you for playing.</p>';
        };
        choicesDisplay.appendChild(endBtn);
    } else {
        // Create buttons for the choices
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = `> ${choice.text}`;
            button.onclick = () => showScene(choice.nextScene);
            choicesDisplay.appendChild(button);
        });
    }
}

// Start the game at the 'start' scene
showScene('start');