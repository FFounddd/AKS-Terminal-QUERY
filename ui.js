// =========================================
// AKS UI Manager
// =========================================

let currentWindow = "query";

function openWindow(name){

    currentWindow = name;

    switch(name){

        case "query":

            document.getElementById("output").innerHTML="";

            terminalIntro();

            break;

        case "archive":

            archiveWindow();

            break;

        case "logs":

            logsWindow();

            break;

        case "personnel":

            personnelWindow();

            break;

        case "network":

            networkWindow();

            break;

    }

}

function terminalIntro(){

    addOutput("AKS Remote Query Terminal");
    addOutput("");
    addOutput("Awaiting Input...");

}

function archiveWindow(){

    addOutput("Crystal Archive");
    addOutput("--------------------");
    addOutput("Type QUERY [TERM]");

}

function logsWindow(){

    addOutput("Recovered Logs");
    addOutput("--------------------");
    addOutput("No logs recovered.");

}

function personnelWindow(){

    addOutput("Personnel Database");
    addOutput("--------------------");
    addOutput("Awaiting Search");

}

function networkWindow(){

    addOutput("Crystal Network");
    addOutput("--------------------");
    addOutput("Remote Node Connected");

}
