// ======================================================
// AKS TERMINAL QUERY
// Terminal Logic
// ======================================================

const input = document.getElementById("command");
const outputBox = document.getElementById("output");

let dialogue = {};
let storyStage = 0;

// ======================================================
// ISM LOCK
// ======================================================

const ISM_DEFEATED_KEY = "aks_ism_defeated";

function isISMDefeated(){

    return localStorage.getItem(ISM_DEFEATED_KEY) === "true";

}

function updateISMVisuals(){

    if(isISMDefeated()){

        document.body.classList.remove("ism-unstable");

    }
    else{

        document.body.classList.add("ism-unstable");

    }

}

// ------------------------------------------------------
// Unlock Terminal After ISM
// ------------------------------------------------------

function defeatISM(){

    localStorage.setItem(ISM_DEFEATED_KEY, "true");

    outputBox.innerHTML = "";

    addOutput("========================================");
    addOutput("ISM CONNECTION TERMINATED");
    addOutput("========================================");
    addOutput("");
    addOutput("SYSTEM CONTROL RESTORED.");
    addOutput("");
    addOutput("Administrative access restored.");
    addOutput("");

    input.disabled = false;
    input.focus();

    console.log("ISM defeated. Terminal unlocked.");

}


// ------------------------------------------------------
// OPTIONAL: Reset ISM Lock
// ------------------------------------------------------
//
// Run this in the browser console if you ever
// want to lock the terminal again:
//
// resetISM();
//
// ------------------------------------------------------

function resetISM(){

    localStorage.removeItem(ISM_DEFEATED_KEY);

    console.log("ISM lock restored.");

    location.reload();

}


// ======================================================
// Utility
// ======================================================

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function typeLine(text, speed = 18, color = "") {

    const div = document.createElement("div");

    if (color)
        div.style.color = color;

    outputBox.appendChild(div);

    for (const char of text) {

        div.textContent += char;

        outputBox.scrollTop = outputBox.scrollHeight;

        await wait(speed);

    }

}


async function typeMemory(element, message){

    element.textContent = "";

    for(const char of message){

        element.textContent += char;

        await wait(28);

    }

}


async function fadeMemory(element){

    element.style.opacity = "0";

    await wait(900);

    element.textContent = "";

    await wait(300);

    element.style.opacity = "1";

}


function addOutput(text){

    const div = document.createElement("div");

    div.textContent = text;

    outputBox.appendChild(div);

    outputBox.scrollTop = outputBox.scrollHeight;

}


function printPrompt(text){

    const div = document.createElement("div");

    div.innerHTML =
        `<span style="color:#8af6ff;">QUERY ></span> ${text}`;

    outputBox.appendChild(div);

}


// ======================================================
// Dialogue
// ======================================================

async function loadDialogue(){

    const response = await fetch("dialogue.json");

    dialogue = await response.json();

    storyStage = dialogue.meta.storyStage;

}


async function playDialogue(key){

    if(!dialogue.responses[key]){

        await typeLine("No Records Found.");

        return;

    }

    const response = dialogue.responses[key];

    let lines = [];

    const stageKey = "stage" + storyStage;

    if(response[stageKey]){

        lines = response[stageKey];

    }
    else if(response.default){

        lines = response.default;

    }
    else{

        await typeLine("No Dialogue Found.");

        return;

    }


    for(const line of lines){

        if(line === ""){

            await wait(250);

            outputBox.appendChild(
                document.createElement("br")
            );

            continue;

        }


        if(line === "..."){

            await typeLine("...",50);

            await wait(700);

            continue;

        }


        if(line === "ACCESS DENIED"){

            await typeLine(
                line,
                22,
                "#ff6d6d"
            );

            continue;

        }


        if(line === "Correction."){

            await wait(700);

            await typeLine(
                line,
                18,
                "#8af6ff"
            );

            continue;

        }


        await typeLine(line);

    }

}


// ======================================================
// Hidden Events
// ======================================================

async function playApology(){

    input.disabled = true;

    outputBox.innerHTML = "";

    const overlay =
        document.getElementById("memoryOverlay");

    const text =
        document.getElementById("memoryText");

    const audio =
        document.getElementById("apologyAudio");


    console.log(audio);

    if(audio){

        console.log(audio.src);
        console.log(audio.readyState);

    }


    if(!overlay || !text){

        console.error(
            "memoryOverlay or memoryText not found."
        );

        input.disabled = false;

        return;

    }


    overlay.style.display = "flex";

    text.style.opacity = "0";

    text.textContent = "";


    await wait(1000);


    // --------------------------------------------------
    // Apology Audio
    // --------------------------------------------------

    if(audio){

        audio.currentTime = 0;

        try{

            await audio.play();

            console.log(
                "Apology audio started."
            );

        }
        catch(err){

            console.error(
                "Audio failed:",
                err
            );

        }

    }


    // --------------------------------------------------
    // Apology Text
    // --------------------------------------------------

    text.style.opacity = "1";


    for(const paragraph of Letters.apology){

        await typeMemory(
            text,
            paragraph
        );

        await wait(3500);

        await fadeMemory(text);

    }


    // --------------------------------------------------
    // Wait For Audio
    // --------------------------------------------------

    if(audio){

        await new Promise(resolve => {

            if(audio.ended){

                resolve();

                return;

            }

            audio.onended = resolve;

        });

    }


    await wait(3000);


    overlay.style.display = "none";

    text.textContent = "";

    outputBox.innerHTML = "";

    input.disabled = false;

    input.focus();

}


// ======================================================
// Archive Search
// ======================================================

async function archiveSearch(term){

    // --------------------------------------------------
    // Hidden Apology Event
    // --------------------------------------------------

    if(term === "apology"){

        await playApology();

        return;

    }


    await typeLine(
        "Searching Crystal Archive...",
        12
    );

    await wait(500);


    await typeLine(
        "Searching Incident Reports...",
        12
    );

    await wait(600);


    await typeLine(
        "Searching Personnel Database...",
        12
    );

    await wait(900);


    await playDialogue(term);

}


// ======================================================
// Commands
// ======================================================
async function handleCommand(cmd){

    const split = cmd.toLowerCase().split(" ");
    const base = split[0];

    // ==================================================
    // ISM LOCK
    // ==================================================

    if(!isISMDefeated()){

        const allowedCommands = [
            "help",
            "query",
            "clear",
            "eter"
        ];

        if(!allowedCommands.includes(base)){

            await typeLine(
                "ACCESS RESTRICTED.",
                22,
                "#ff6d6d"
            );

            await wait(400);

            await typeLine(
                "...",
                70,
                "#8af6ff"
            );

            await wait(600);

            await typeLine(
                "HAHAHAHA, what are you looking for!?",
                35,
                "#c58cff"
            );

            await wait(500);

            await typeLine(
                "We aren't done yet! I can't let you contact that... lesser agent; you can tell him all about me later!",
                35,
                "#c58cff"
            );

            await wait(800);

            await typeLine(
                "ISM SYSTEM OVERRIDE ACTIVE.   :)",
                18,
                "#ff6dff"
            );

            return;

        }

    }

    // ==================================================
    // NORMAL COMMANDS
    // ==================================================

    switch(base){

        case "help":

            await playDialogue("help");

        break;


        case "status":

            await playDialogue("status");

        break;


        case "clear":

            outputBox.innerHTML = "";

        break;


        case "disconnect":

            await typeLine(
                "Disconnect request denied."
            );

        break;


        case "who":

            await typeLine(
                "Searching Personnel Database..."
            );

            await wait(900);

            await typeLine(
                "Identity unavailable."
            );

        break;


        case "query":

            if(split.length < 2){

                await typeLine(
                    "Usage: query <term>"
                );

            }
            else{

                await archiveSearch(
                    split.slice(1).join(" ")
                );

            }

        break;


        case "archive":

            addOutput("");
            addOutput("Opening Crystal Archive...");

        break;


        case "logs":

            addOutput("");
            addOutput("Recovered Logs");

        break;


        case "personnel":

            addOutput("");
            addOutput("Opening Personnel Database...");

        break;


        default:

            await typeLine(
                "Unknown Command."
            );

            await wait(700);

            await typeLine(
                "Type HELP"
            );

    }

}


// ======================================================
// Input
// ======================================================

input.addEventListener(
    "keydown",
    async (e) => {

        if(e.key !== "Enter")
            return;


        const cmd =
            input.value.trim();


        if(cmd === "")
            return;


        input.disabled = true;


        printPrompt(cmd);


        console.log(
            "COMMAND:",
            cmd
        );


        input.value = "";


        await handleCommand(cmd);


        outputBox.scrollTop =
            outputBox.scrollHeight;


        input.disabled = false;

        input.focus();

    }
);


// ======================================================
// Startup
// ======================================================

loadDialogue().then(() => {

    console.log("Dialogue Loaded.");

    updateISMVisuals();

});
