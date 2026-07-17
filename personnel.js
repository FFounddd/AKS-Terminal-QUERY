// ======================================================
// Personnel Database
// personnel.js
// ======================================================

let personnelData = {};

async function loadPersonnel(){

    const response = await fetch("personnel.json");

    personnelData = await response.json();

}

const Personnel = {

    async open(name = null){

        if(Object.keys(personnelData).length === 0){

            await loadPersonnel();

        }

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

            button.onclick = () => this.show(person);

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

                ${file.notes.map(n => `<li>${n}</li>`).join("")}

            </ul>

        `;

    }

};

loadPersonnel();
