// ======================================================
// AKS TERMINAL QUERY
// Terminal Logic
// ======================================================

const input = document.getElementById("command");
const outputBox = document.getElementById("output");

// --------------------------
// Utility
// --------------------------

const wait=(ms)=>new Promise(r=>setTimeout(r,ms));

async function typeLine(text, speed = 18, color = "") {

    const div = document.createElement("div");

    if (color)
        div.style.color = color;

    outputBox.appendChild(div);

    for (let c of text) {

        div.innerHTML += c;

        outputBox.scrollTop = outputBox.scrollHeight;

        await wait(speed);

    }

}

function printPrompt(text){

    const div=document.createElement("div");

    div.innerHTML=`<span style="color:#8af6ff;">QUERY ></span> ${text}`;

    outputBox.appendChild(div);

}

// --------------------------
// Dialogue Database
// --------------------------


// --------------------------
// Fake Archive Search
// --------------------------

async function archiveSearch(term){

    await typeLine("Searching Crystal Archive...",12);

    await sleep(500);

    await typeLine("Searching Incident Reports...",12);

    await sleep(700);

    await typeLine("Searching Personnel Database...",12);

    await sleep(900);

    switch(term){

        case "found":

            await typeLine("");

            await typeLine("No Records Located.");

            await sleep(1800);

            await typeLine("...");

            await sleep(1800);

            await typeLine("Correction.",20,"#8af6ff");

            await sleep(1200);

            await typeLine("One Restricted Record Located.",18);

            await sleep(1500);

            await typeLine("ACCESS DENIED",20,"#ff8888");

            await sleep(1800);

            await typeLine("Forget that name.",18);

            break;

        case "medea":

            await typeLine("");

            await typeLine("Searching...");

            await sleep(2500);

            await typeLine("No Results.");

            break;

        case "eter":

            await typeLine("");

            await typeLine("Archive Restricted.");

            break;

        case "glasswright":

            await typeLine("");

            await typeLine("728 Results Found.");

            await sleep(1200);

            await typeLine("Displaying Public Records...");

            break;

        default:

            await typeLine("");

            await typeLine("0 Matching Records.");

    }

}

// --------------------------
// Handle Input
// --------------------------

input.addEventListener("keydown", async (e)=>{

    if(e.key!="Enter") return;

    const cmd=input.value.trim();

    if(cmd==="") return;

    input.disabled=true;

    printPrompt(cmd);

    input.value="";

    outputBox.scrollTop=outputBox.scrollHeight;

    const split=cmd.toLowerCase().split(" ");

    const base=split[0];

    switch(base){

        case "help":

            for(const line of responses.help){

                await typeLine(line);

            }

            break;

        case "clear":

            outputBox.innerHTML="";

            break;

        case "status":

            for(const line of responses.status){

                await typeLine(line);

            }

            break;

        case "who":

            for(const line of responses.who){

                await typeLine(line);

            }

            break;

        case "disconnect":

            for(const line of responses.disconnect){

                await typeLine(line);

            }

            break;

        case "query":

            if(split.length==1){

                await typeLine("Usage: query [term]");

            }else{

                await archiveSearch(split.slice(1).join(" "));

            }

            break;

        default:

            await typeLine("Unknown Command.");

            await sleep(900);

            await typeLine("Type HELP");

    }

    outputBox.scrollTop=outputBox.scrollHeight;

    input.disabled=false;

    input.focus();
function addOutput(text){

    const div=document.createElement("div");

    div.textContent=text;

    outputBox.appendChild(div);

    outputBox.scrollTop=outputBox.scrollHeight;

}
});
