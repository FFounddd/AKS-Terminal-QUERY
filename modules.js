// ======================================================
// Glasswright Module Launcher
// modules.js
// ======================================================

const modules = document.querySelectorAll(".module");

const moduleWindows = {

    query(){

        // Query Terminal is always open for now.
        console.log("Query Terminal already active.");

    },

    archive(){

        Archive.open();

    },

    personnel(){

        Personnel.open();

    },

    research(){

        Research.open();

    },

    logs(){

        Logs.open();

    },

    network(){

        Network.open();

    },

    diagnostics(){

        Diagnostics.open();

    }

};

// ------------------------------------------------------
// Sidebar Buttons
// ------------------------------------------------------

modules.forEach(button => {

    button.addEventListener("click", () => {

        modules.forEach(b => b.classList.remove("active"));

        button.classList.add("active");

        const module = button.dataset.window;

        if(moduleWindows[module]){

            moduleWindows[module]();

        }

    });

});
