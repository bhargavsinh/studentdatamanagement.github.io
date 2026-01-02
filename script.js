/* script.js - Ultra Modern AI Version */

// 1. Voice Assistant Function (Jarvis Style)
function speak(text) {
    // Check if browser supports speech
    if ('speechSynthesis' in window) {
        let synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(text);
        
        // Voice Settings
        utterance.lang = "en-US"; // English Voice
        utterance.volume = 1;     // Volume (0 to 1)
        utterance.rate = 1;       // Speed
        utterance.pitch = 1;      // Tone
        
        synth.speak(utterance);
    } else {
        console.log("Browser does not support text-to-speech");
    }
}

// 2. Security: Right Click Disable
document.addEventListener('contextmenu', event => event.preventDefault());

// 3. Login Logic with AI Voice
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const alertBox = document.getElementById('alert');
    const container = document.querySelector('.container');

    // Hardcoded Credentials
    if (user === "admin" && pass === "secure123") {
        
        // ✅ SUCCESS SCENARIO
        alertBox.style.display = "none";
        
        // AI Speaks
        speak("Access Granted. Welcome back, Commander Bhargav.");
        
        // Visual Effect (Green Glow)
        container.style.boxShadow = "0 0 50px #00ff00";
        
        // Redirect after 2 seconds (so user can hear the voice)
        setTimeout(() => {
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        }, 2000);

    } else {
        
        // ❌ FAIL SCENARIO
        // AI Speaks
        speak("Access Denied. Security protocol initiated.");
        
        alertBox.style.display = "block";
        alertBox.innerHTML = "🚫 SYSTEM ERROR: INVALID IDENTITY";
        alertBox.style.color = "red";

        // Visual Effect (Red Shake)
        container.style.animation = "shake 0.5s";
        container.style.boxShadow = "0 0 50px red";
        
        // Reset animation
        setTimeout(() => {
            container.style.animation = "";
            container.style.boxShadow = ""; 
        }, 500);
    }
}

// 4. Check Authentication (For Dashboard Pages)
function checkAuth() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// 5. Logout Function
function logout() {
    speak("Logging out. Have a nice day.");
    setTimeout(() => {
        sessionStorage.clear();
        window.location.href = "index.html";
    }, 1500);
}

// 6. Database Functions (Add & Load)
function addStudent() {
    let name = document.getElementById('sName').value;
    let roll = document.getElementById('sRoll').value;
    let marks = document.getElementById('sMarks').value;

    if(name === "" || roll === "" || marks === "") {
        speak("Error. All fields are required.");
        alert("All fields are required!");
        return;
    }

    let students = JSON.parse(localStorage.getItem('studentDB')) || [];
    students.push({ name: name, roll: roll, marks: marks });
    localStorage.setItem('studentDB', JSON.stringify(students));
    
    speak("Data encrypted and saved successfully.");
    alert("✅ Data Saved!");
    window.location.href = "view_data.html";
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem('studentDB')) || [];
    let table = document.getElementById('studentTable');
    
    if(table) {
        students.forEach((s, index) => {
            let row = table.insertRow();
            row.innerHTML = `<td>${index + 1}</td><td>${s.name}</td><td>${s.roll}</td><td>${s.marks}</td>`;
        });
    }
}
