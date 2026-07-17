// ======================================================
// GLASSWRIGHT WINDOW MANAGER
// windows.js
// ======================================================

const WindowManager = (() => {

    let highestZ = 100;

    const windows = {};

    function register(id){

        const win = document.getElementById(id);

        if(!win)
            return;

        windows[id] = {

            element: win,
            minimized: false

        };

        win.addEventListener("mousedown", () => focus(id));

    }

    function registerAll(){

        document.querySelectorAll(".window").forEach(win => {

            register(win.id);

        });

    }

    function focus(id){

        if(!windows[id])
            return;

        highestZ++;

        windows[id].element.style.zIndex = highestZ;

    }

    function open(id){

        if(!windows[id])
            return;

        windows[id].element.classList.remove("hidden");

        windows[id].minimized = false;

        focus(id);

    }

    function close(id){

        if(!windows[id])
            return;

        windows[id].element.classList.add("hidden");

    }

    function minimize(id){

        if(!windows[id])
            return;

        windows[id].element.classList.add("hidden");

        windows[id].minimized = true;

    }

    function toggle(id){

        if(!windows[id])
            return;

        if(windows[id].element.classList.contains("hidden"))
            open(id);
        else
            close(id);

    }

    function exists(id){

        return windows[id] !== undefined;

    }

    function create(id, title, html){

        if(exists(id))
            return windows[id];

        const win = document.createElement("div");

        win.className = "window hidden";

        win.id = id;

        win.innerHTML = `
            <div class="windowTitleBar">

                <div class="windowTitle">${title}</div>

                <div class="windowButtons">

                    <button class="minBtn">—</button>
                    <button class="closeBtn">✕</button>

                </div>

            </div>

            <div class="windowBody">

                ${html}

            </div>
        `;

        document.body.appendChild(win);

        register(id);

        win.querySelector(".closeBtn")
            .addEventListener("click", () => close(id));

        win.querySelector(".minBtn")
            .addEventListener("click", () => minimize(id));

        return windows[id];

    }

    return {

        registerAll,
        register,
        open,
        close,
        minimize,
        toggle,
        focus,
        create,
        exists

    };

})();

document.addEventListener("DOMContentLoaded", () => {

    WindowManager.registerAll();

});
