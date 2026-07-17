// ======================================================
// Glasswright Module Launcher
// modules.js
// ======================================================

const modules = document.querySelectorAll(".module");

const moduleWindows = {

    query(){

        console.log("Query Terminal already active.");

    },

    archive(){

        if(!WindowManager.exists("archiveWindow")){

            WindowManager.create(
                "archiveWindow",
                "Crystal Archive",
                `
                <div class="placeholder">
                    <h2>Crystal Archive</h2>
                    <p>Archive system not installed.</p>
                </div>
                `
            );

        }

        WindowManager.open("archiveWindow");

    },

    personnel(){

        Personnel.open();

    },

    research(){

        if(!WindowManager.exists("researchWindow")){

            WindowManager.create(
                "researchWindow",
                "Research Database",
                `
                <div class="placeholder">
                    <h2>Research Database</h2>
                    <p>No research database available.</p>
                </div>
                `
            );

        }

        WindowManager.open("researchWindow");

    },

    logs(){

        if(!WindowManager.exists("logsWindow")){

            WindowManager.create(
                "logsWindow",
                "Incident Archive",
                `
                <div class="placeholder">
                    <h2>Incident Archive</h2>
                    <p>No recovered incidents.</p>
                </div>
                `
            );

        }

        WindowManager.open("logsWindow");

    },

    network(){

        if(!WindowManager.exists("networkWindow")){

            WindowManager.create(
                "networkWindow",
                "Crystal Network",
                `
                <div class="placeholder">
                    <h2>Crystal Network</h2>
                    <p>No connected nodes.</p>
                </div>
                `
            );

        }

        WindowManager.open("networkWindow");

    },

    diagnostics(){

        if(!WindowManager.exists("diagnosticsWindow")){

            WindowManager.create(
                "diagnosticsWindow",
                "Diagnostics",
                `
                <div class="placeholder">
                    <h2>Diagnostics</h2>
                    <p>Diagnostic tools unavailable.</p>
                </div>
                `
            );

        }

        WindowManager.open("diagnosticsWindow");

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
