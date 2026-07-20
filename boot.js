// ==========================================================
// AKS TERMINAL QUERY
// Boot Sequence
// ==========================================================

let skipBoot = false;

document.addEventListener("keydown", e => {

    if(e.code === "Space"){

        skipBoot = true;

    }

});

const output = document.getElementById("output");
const command = document.getElementById("command");
const linkBar = document.getElementById("linkBar");
const statusText = document.getElementById("statusText");

command.disabled = true;

function sleep(ms){

    return new Promise(resolve=>{

        if(skipBoot){

            resolve();
            return;

        }

        setTimeout(resolve, ms);

    });

}

async function type(text, speed = 25){

    if(skipBoot) return;

    const line = document.createElement("div");

    output.appendChild(line);

    for(const char of text){

        if(skipBoot) return;

        line.textContent += char;

        output.scrollTop = output.scrollHeight;

        await sleep(speed);

    }

}

async function progress(target){

    while(parseInt(linkBar.style.width || "0") < target){

        if(skipBoot) return;

        const width = parseInt(linkBar.style.width || "0") + 2;

        linkBar.style.width = width + "%";

        await sleep(20);

    }

}

function finishBoot(){

    linkBar.style.width = "100%";

    statusText.textContent = "LINK STABLE";

    output.innerHTML = "";

    const welcome = document.createElement("div");

    welcome.innerHTML = `

╔══════════════════════════════════════════════════════╗

        AKS REMOTE QUERY TERMINAL

Crystal Link.............STABLE

Archive Integrity........UNKNOWN

Administrator...........UNVERIFIED

════════════════════════════════════════════════════════

Type <b>help</b> to list available commands.

`;

    output.appendChild(welcome);

    command.disabled = false;

    command.focus();

}

async function boot(){

    await sleep(500);

    if(skipBoot) return finishBoot();

    await type("GLASSWRIGHT SYSTEMS",40);
    await sleep(300);

    if(skipBoot) return finishBoot();

    await type("AKS REMOTE QUERY NODE",25);

    await sleep(600);

    if(skipBoot) return finishBoot();

    await type("");
    await type("Beginning boot sequence...",18);

    await sleep(700);

    if(skipBoot) return finishBoot();

    await type("Loading Crystal Runtime...");
    await progress(20);

    statusText.textContent = "INITIALIZING";

    await sleep(600);

    if(skipBoot) return finishBoot();

    await type("Synchronizing Neural Lattice...");
    await progress(45);

    await sleep(900);

    if(skipBoot) return finishBoot();

    await type("Verifying Archive Integrity...");
    await progress(60);

    await sleep(700);

    if(skipBoot) return finishBoot();

    await type("Scanning Connected Nodes...");

    await type(".");
    await sleep(350);

    await type("..");
    await sleep(450);

    await type("...");
    await sleep(1000);

    if(skipBoot) return finishBoot();

    await type("");
    await type("REMOTE NODE DETECTED");

    await sleep(1000);

    await type("");
    await type("Node Classification:");

    await sleep(600);

    await type("UNKNOWN");

    await sleep(800);

    await type("");
    await type("Attempting Authentication...");

    await progress(78);

    await sleep(1300);

    if(skipBoot) return finishBoot();

    await type("Authentication Failed.");

    await sleep(800);

    await type("Retrying...");

    await sleep(1200);

    await type("Authentication Failed.");

    await sleep(1200);

    await type("");

    await type("Administrative Override Detected.");

    await sleep(900);

    await type("");

    await type("WARNING");

    await sleep(500);

    await type("Source cannot be verified.");

    await sleep(700);

    await type("");

    await progress(100);

    statusText.textContent = "LINK STABLE";

    await sleep(1200);

    await type("Crystal Link Established.");

    await sleep(800);

    await type("Opening Query Interface...");

    await sleep(1800);

    finishBoot();

}

boot();
