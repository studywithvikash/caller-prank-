const setup = document.getElementById("setup");
const callScreen = document.getElementById("callScreen");

const callerName = document.getElementById("callerName");
const delay = document.getElementById("delay");
const callerImage = document.getElementById("callerImage");

const nameText = document.getElementById("name");
const photo = document.getElementById("photo");

const ringtone = document.getElementById("ringtone");

const startBtn = document.getElementById("startBtn");
const acceptBtn = document.getElementById("accept");
const declineBtn = document.getElementById("decline");

let imageURL = "https://via.placeholder.com/200";

// Image Preview
callerImage.addEventListener("change", () => {
    const file = callerImage.files[0];
    if (file) {
        imageURL = URL.createObjectURL(file);
    }
});

// Start Fake Call
startBtn.addEventListener("click", () => {

    const caller = callerName.value.trim() || "Unknown Caller";
    const seconds = parseInt(delay.value) || 10;

    startBtn.disabled = true;
    startBtn.innerText = "Waiting...";

    setTimeout(() => {

        setup.classList.add("hidden");
        callScreen.classList.remove("hidden");

        nameText.innerText = caller;
        photo.src = imageURL;

        ringtone.currentTime = 0;

        ringtone.play().catch(() => {
            console.log("Autoplay blocked by browser.");
        });

        // Vibrate (if supported)
        if (navigator.vibrate) {
            navigator.vibrate([500, 300, 500, 300, 500]);
        }

    }, seconds * 1000);

});

// Accept Call
acceptBtn.addEventListener("click", () => {

    ringtone.pause();
    ringtone.currentTime = 0;

    alert("📞 Call Connected");

});

// Decline Call
declineBtn.addEventListener("click", () => {

    ringtone.pause();
    ringtone.currentTime = 0;

    callScreen.classList.add("hidden");
    setup.classList.remove("hidden");

    startBtn.disabled = false;
    startBtn.innerText = "Start Fake Call";

});
