// update desktop date n time
function updateClock(){
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
        weekday:"long",
        day: "numeric",
        month:"long"
    });

    const time = now.toLocaleTimeString("en-US", {
        hour:"2-digit",
        minute: "2-digit",
        hour12: "true"
    });

    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
}

updateClock();
setInterval(updateClock,1000);

// application window management 
const windowContainer = document.getElementById("window-container");

//open application windows
document.addEventListener("click", function (e) {
    const app = e.target.closest("[data-app]");

    if(app) {
        openWindow(app.dataset.app);
    }

    //minimise window
    const minimisebutton= e.target.closest(".minimize-window");

    if(minimisebutton) {
        minimisebutton.closest(".app-window").style.display = "none";
    }

    // close application window

    if(e.target.classList.contains("close-window")) {
        e.target.closest(".app-window").remove();
    }
});

function openWindow(appName) {
    // prevent duplicate for now
    const existingwindow = document.querySelector (
        `.app-window[data-window="${appName}"]`
    );

    if (existingwindow) {
        existingwindow.style.display = "block";
        return;
    }

    const windowelement = document.createElement("div");

    windowelement.className = "app-window";
    windowelement.dataset.window = appName;

    windowelement.innerHTML = `
    <div class="window-header">
     <span>${appName}</span>
     <div class="window-controls">
     <button class="minimize-window">-</button>
     <button class="close-window">&times;</button>
     </div>
    </div>
    
    <div class="window-content"
    <h2>${appName}</h2>
    <p>Welcome to SHADOW OS ${appName}.</p>
    </div>
    `;

    windowContainer.appendChild(windowelement);
    makedraggable(windowelement);
}

// make windows draggable
function makedraggable(windowelement) {
    const header= windowelement.querySelector(".window-header");

    header.addEventListener("mousedown", function (e) {
        if (e.target.closest("button")) return;
        const rect= windowelement.getBoundingClientRect();

        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // switch from centered to movable
        windowelement.style.transform = "none";
        windowelement.style.left = rect.left + "px";
        windowelement.style.top = rect.top + "px";

        function movewindow(e) {
            windowelement.style.left = (e.clientX - offsetX) + "px";
            windowelement.style.top = (e.clientY - offsetY) + "px";
        }

        function stopdrag() {
            document.removeEventListener("mousemove",movewindow);
            document.removeEventListener("mouseup",stopdrag);
        }

        document.addEventListener("mousemove",movewindow);
        document.addEventListener("mouseup",stopdrag);
    });
}