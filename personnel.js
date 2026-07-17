// ======================================================
// Personnel Database
// personnel.js
// ======================================================

const personnelData = {

    Found: {

        status: "Missing",

        house: "Unknown",

        classification: "Ionian",

        clearance: "BLACK",

        summary: "Former Glasswright employee. Personnel record heavily restricted.",

        notes: [

            "Subject disappeared during the AKS Incident.",
            "Most records have been deleted.",
            "Further access denied."

        ]

    },

    Ori: {

        status: "No Official Record",

        house: "Unknown",

        classification: "Unknown",

        clearance: "NONE",

        summary: "No personnel file exists for this individual.",

        notes: [

            "Database returned inconsistent results."

        ]

    },

    Medea: {

        status: "Deceased",

        house: "Glasswright",

        classification: "Research Division",

        clearance: "RED",

        summary: "Research assistant assigned to Project AKS.",

        notes: [

            "Cause of death classified."

        ]

    },

    Noonday: {

        status: "Destroyed",

        house: "Sin Construct",

        classification: "Minor Sin",

        clearance: "BLACK",

        summary: "Recovered construct remains unstable.",

        notes: [

            "Soul integrity unknown."

        ]

    }

};

const Personnel = {

    open(name = null){

        if(!WindowManager.exists("personnelWindow")){

            WindowManager.create(

                "personnelWindow",

                "Personnel Database",

                `
                <div id="personnelApp">

                    <div id="personnelList"></div>

                    <div id="personnelViewer">

                        <h2>Select a Personnel File</h2>

                    </div>

                </div>
                `

            );

        }

        WindowManager.open("personnelWindow");

        this.populateList();

        if(name){

            this.show(name);

        }

    },

    populateList(){

        const list = document.getElementById("personnelList");

        if(!list) return;

        list.innerHTML = "";

        Object.keys(personnelData).forEach(person => {

            const button = document.createElement("button");

            button.className = "personButton";

            button.textContent = person;

            button.onclick = () => Personnel.show(person);

            list.appendChild(button);

        });

    },

    show(name){

        const viewer = document.getElementById("personnelViewer");

        if(!viewer) return;

        const file = personnelData[name];

        if(!file){

            viewer.innerHTML = "<h2>Personnel File Missing</h2>";

            return;

        }

        viewer.innerHTML = `

            <h1>${name}</h1>

            <hr>

            <p><strong>Status</strong><br>${file.status}</p>

            <p><strong>House</strong><br>${file.house}</p>

            <p><strong>Classification</strong><br>${file.classification}</p>

            <p><strong>Clearance</strong><br>${file.clearance}</p>

            <p><strong>Summary</strong><br>${file.summary}</p>

            <h3>Notes</h3>

            <ul>

                ${file.notes.map(note => `<li>${note}</li>`).join("")}

            </ul>

        `;

    }

};
