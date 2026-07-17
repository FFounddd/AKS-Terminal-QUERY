// ======================================================
// Crystal Archive
// archive.js
// ======================================================

const Archive = {

    files: {

       noonday:{

    title:"NOONDAY",

    classification:"BIOLOGICAL ENTITY",

    clearance:"BLACK",

    status:"ACTIVE",

    contents:`

GLASSWRIGHT INTERNAL DOSSIER
==============================================

SUBJECT:
NOONDAY

DESIGNATION:
Minor Sin

STATUS:
ACTIVE

THREAT LEVEL:
OMEGA

----------------------------------------------

SUMMARY

Subject was believed terminated following the
First Infection Event.

Remains were recovered from the primary crystal
formation beneath Site-01.

Revival was considered impossible.

----------------------------------------------

CURRENT INTELLIGENCE

Glasswright confirms the entity is active.

Current physical location remains unknown.

Current host remains unknown.

Evidence strongly suggests the subject is being
transported by a small independent group.

Do NOT engage without House authorization.

----------------------------------------------

NOTES

Noonday demonstrates none of the expected
behavior exhibited by previous Minor Sins.

Motives remain unknown.

Repeated attempts to track crystal resonance
have failed.

Unknown interference detected.

The subject appears to WANT to remain hidden.

PLEASE NOTE:
The Noonday Devil is not to be trusted; they do not harbor good intentions. Any information circulated by this entity about prior house operations is likely falsehoods. 

----------------------------------------------

LAST INTERNAL MEMO

"Someone is protecting him."

"They know we're looking."

"If they give him what we think he wants..."

"It's over."

Transmission ends.

==============================================

`
},
            );

        }

        WindowManager.open("archiveWindow");

        this.populate();

        this.show(file);

    },

    populate(){

        const sidebar = document.getElementById("archiveSidebar");

        if(!sidebar) return;

        sidebar.innerHTML = "";

        Object.keys(this.files).forEach(id=>{

            const file = this.files[id];

            const button = document.createElement("button");

            button.className = "archiveFile";

            button.textContent = file.title;

            button.onclick = ()=>this.show(id);

            sidebar.appendChild(button);

        });

    },

    show(id){

        const viewer = document.getElementById("archiveViewer");

        if(!viewer) return;

        const file = this.files[id];

        if(!file){

            viewer.innerHTML = "<h2>File Missing</h2>";

            return;

        }

        viewer.innerHTML = `

            <div class="archiveDocument">

                <h1>${file.title}</h1>

                <hr>

                <p>
                <strong>Classification:</strong>
                ${file.classification}
                </p>

                <p>
                <strong>Clearance:</strong>
                ${file.clearance}
                </p>

                <p>
                <strong>Status:</strong>
                ${file.status}
                </p>

                <hr>

                <pre>${file.contents}</pre>

            </div>

        `;

    }

};
