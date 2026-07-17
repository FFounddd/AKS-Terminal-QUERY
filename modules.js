// ======================================================
// Glasswright Module Launcher
// ======================================================

const modules = document.querySelectorAll(".module");

// -------------------------------------------
// Window Definitions
// -------------------------------------------

const moduleWindows = {

    query(){

        WindowManager.open("terminalWindow");

    },

    archive(){

        if(!document.getElementById("archiveWindow")){

            WindowManager.create(
                "archiveWindow",
                "Crystal Archive",
                `
                <div class="placeholder">
                    <h2>Crystal Archive</h2>
                    <p>No archive mounted.</p>
                </div>
                `
            );

        }

        WindowManager.open("archiveWindow");

    },

    personnel(){

        if(!document.getElementById("personnelWindow")){

            WindowManager.create(
                "personnelWindow",
                "Personnel Database",
                `
                <div class="placeholder">
                    <h2>Personnel Database</h2>
                    <p>No personnel selected.</p>
                </div>
                `
            );

        }

        WindowManager.open("personnelWindow");

    },

    research(){

        if(!document.getElementById("researchWindow")){

            WindowManager.create(
                "researchWindow",
                "Research Database",
                `
                <div class="placeholder">
                    <h2>Research</h2>
                    <p>No research loaded.</p>
                </div>
                `
            );

        }

        WindowManager.open("researchWindow");

    },

    logs(){

        if(!document.getElementById("logsWindow")){

            WindowManager.create(
                "logsWindow",
                "Recovered Logs",
                `
                <div class="placeholder">
                    <h2>Recovered Logs</h2>
                    <p>No logs recovered.</p>
                </div>
                `
            );

        }

        WindowManager.open("logsWindow");

    },

    network(){

        if(!document.getElementById("networkWindow")){

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

        if(!document.getElementById("diagnosticsWindow")){

            WindowManager.create(
                "diagnosticsWindow",
                "Diagnostics",
                `
                <div class="placeholder">
                    <h2>Diagnostics</h2>
                    <p>No diagnostics available.</p>
                </div>
                `
            );

        }

        WindowManager.open("diagnosticsWindow");

    }

};

// -------------------------------------------
// Sidebar Buttons
// -------------------------------------------

modules.forEach(button=>{

    button.addEventListener("click",()=>{

        modules.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        const module = button.dataset.window;

        if(moduleWindows[module]){

            moduleWindows[module]();

        }

    });

});
