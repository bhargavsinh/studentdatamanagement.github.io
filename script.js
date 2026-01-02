/* script.js */

// 1. Anti-Hacker / Anti-AI Security Features
document.addEventListener('contextmenu', event => event.preventDefault()); // Right click disable
document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U disable
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.keyCode == 85)) {
        e.preventDefault();
        alert("⚠️ Security Alert: Developer Tools are disabled for security reasons.");
    }
});

// 2. Authentication Logic
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const alertBox = document.getElementById('alert');

    // Hardcoded credentials for Demo (In real life, use Database)
    if (user === "admin" && pass === "secure123") {
        sessionStorage.setItem("isLoggedIn", "true"); // Session start
        window.location.href = "dashboard.html";
    } else {
        alertBox.style.display = "block";
        alertBox.innerHTML = "🚫 Access Denied: Invalid Credentials!";
    }
}

function checkAuth() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html"; // Redirect if not logged in
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// 3. Database Logic (Using LocalStorage to simulate C structure)
function addStudent() {
    let name = document.getElementById('sName').value;
    let roll = document.getElementById('sRoll').value;
    let marks = document.getElementById('sMarks').value;

    // Input Validation (Sanitization)
    if(name === "" || roll === "" || marks === "") {
        alert("All fields are required!");
        return;
    }

    // XSS Protection (Basic)
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let students = JSON.parse(localStorage.getItem('studentDB')) || [];
    students.push({ name: name, roll: roll, marks: marks });
    localStorage.setItem('studentDB', JSON.stringify(students));
    
    alert("✅ Data Saved Encrypted Successfully!");
    window.location.href = "view_data.html";
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem('studentDB')) || [];
    let table = document.getElementById('studentTable');
    
    students.forEach((s, index) => {
        let row = table.insertRow();
        row.innerHTML = `<td>${index + 1}</td><td>${s.name}</td><td>${s.roll}</td><td>${s.marks}</td>`;
    });
}
