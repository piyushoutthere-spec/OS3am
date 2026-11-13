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
