// update desktop date n time
function updateClock(){
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
        weekday:"long",
        day: "numeric",
        month:"long"
    });

    const time = now.toLocaleDateString("en-US", {
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
    const app = e.target.closest("[dataapp]");

    if(app) {
        openWindow(app.dataset.app);
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

    if (existingwindow) return;

    const windowelement = document.createElement("div");

    windowelement.className = "app-window";
    windowelement.dataset.window = appName;

    windowelement.innerHTML = `
    <div class="window-header">
    <span>${appName}</span>
    <button class="close-window">&times;</button>
    </div>
    
    <div class="window-content"
    <h2>${appName}</h2>
    <p>Welcome to SHADOW OS ${appName}.</p>
    </div>
    `;

    windowContainer.appendChild(windowelement);
}
