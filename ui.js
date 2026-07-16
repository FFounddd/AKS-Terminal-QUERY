const buttons = document.querySelectorAll(".module");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(b=>b.classList.remove("active"));

button.classList.add("active");

openWindow(button.dataset.window);

});

});

function openWindow(name){

output.innerHTML="";

switch(name){

case "query":

addOutput("AKS Remote Query Terminal");
addOutput("");
addOutput("Awaiting Query...");
break;

case "archive":

addOutput("Archive Browser");
addOutput("----------------");
addOutput("Type QUERY [TERM]");
break;

case "logs":

addOutput("Recovered Logs");
addOutput("----------------");
addOutput("No logs recovered.");
break;

case "personnel":

addOutput("Personnel Database");
addOutput("--------------------");
addOutput("Awaiting Search");
break;

case "network":

addOutput("Crystal Network");
addOutput("----------------");
addOutput("Node Stable");
break;

}

}
