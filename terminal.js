// ======================================================
// AKS TERMINAL QUERY
// Terminal Logic
// ======================================================

const input = document.getElementById("command");
const outputBox = document.getElementById("output");

let dialogue = {};
let storyStage = 0;

// ------------------------------------------------------
// Utility
// ------------------------------------------------------

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeLine(text, speed = 18, color = "") {

    const div = document.createElement("div");

    if (color)
        div.style.color = color;

    outputBox.appendChild(div);

    for (const char of text) {

        div.innerHTML += char;

        outputBox.scrollTop = outputBox.scrollHeight;

        await wait(speed);

    }

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

// ------------------------------------------------------
// Dialogue
// ------------------------------------------------------

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

    }else if(response.default){

        lines = response.default;

    }else{

        await typeLine("No Dialogue Found.");

        return;

    }

    for(const line of lines){

        if(line === ""){

            outputBox.appendChild(document.createElement("br"));
            continue;

        }

        await typeLine(line);

    }



    for(const line of lines){

        if(line === ""){

            await wait(250);

            outputBox.appendChild(document.createElement("br"));

            continue;

        }

        if(line === "..."){

            await typeLine("...",50);

            await wait(700);

            continue;

        }

        if(line === "ACCESS DENIED"){

            await typeLine(line,22,"#ff6d6d");

            continue;

        }

        if(line === "Correction."){

            await wait(700);

            await typeLine(line,18,"#8af6ff");

            continue;

        }

        await typeLine(line);

    }

}

// ------------------------------------------------------
// Archive Search
// ------------------------------------------------------

async function archiveSearch(term){

    await typeLine("Searching Crystal Archive...",12);

    await wait(500);

    await typeLine("Searching Incident Reports...",12);

    await wait(600);

    await typeLine("Searching Personnel Database...",12);

    await wait(900);

    await playDialogue(term);

}

// ------------------------------------------------------
// Commands
// ------------------------------------------------------

async function handleCommand(cmd){

    const split = cmd.toLowerCase().split(" ");
    const base = split[0];

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

            await typeLine("Disconnect request denied.");

        break;

        case "who":

            await typeLine("Searching Personnel Database...");

            await wait(900);

            await typeLine("Identity unavailable.");

        break;

        case "query":

            if(split.length < 2){

                await typeLine("Usage: query <term>");

            }else{

                await archiveSearch(split.slice(1).join(" "));

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

            await typeLine("Unknown Command.");

            await wait(700);

            await typeLine("Type HELP");

    }

}

// ------------------------------------------------------
// Input
// ------------------------------------------------------

input.addEventListener("keydown", async (e)=>{

    if(e.key !== "Enter")
        return;

    const cmd = input.value.trim();

    if(cmd === "")
        return;

    input.disabled = true;

    printPrompt(cmd);

    input.value = "";

    await handleCommand(cmd);

    outputBox.scrollTop = outputBox.scrollHeight;

    input.disabled = false;

    input.focus();

});

// ------------------------------------------------------
// Startup
// ------------------------------------------------------

loadDialogue().then(() => {

    console.log("Dialogue Loaded.");

});
