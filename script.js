// Check Login Status (Login Page સિવાયના બધા પેજ માટે)
function checkAuth() {
    const user = localStorage.getItem('username');
    if (!user && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Login Logic
function login() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if (u === "admin" && p === "1234") {
        localStorage.setItem('username', 'admin');
        window.location.href = 'dashboard.html';
    } else {
        alert("ખોટું યુઝરનેમ અથવા પાસવર્ડ!");
    }
}

// Logout Logic
function logout() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Add Student Logic
function addStudentData(event) {
    event.preventDefault(); // ફોર્મ સબમિટ થતા રોકો
    
    // ડેટા ભેગો કરો
    const student = {
        id: Date.now(), // Unique ID
        name: document.getElementById('name').value,
        faculty: document.getElementById('faculty').value,
        sem: document.getElementById('sem').value,
        roll: document.getElementById('roll').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value
    };

    // જૂનો ડેટા લાવો અને નવો ઉમેરો
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    alert("વિદ્યાર્થીનો ડેટા સફળતાપૂર્વક ઉમેરાયો!");
    window.location.href = 'view_data.html';
}

// View Data Logic (Table માં ડેટા બતાવવા)
function loadTable() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    if(students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">કોઈ ડેટા નથી.</td></tr>';
        return;
    }

    students.forEach((stu, index) => {
        let row = `<tr>
            <td>${stu.roll}</td>
            <td><strong>${stu.name}</strong></td>
            <td>${stu.faculty}</td>
            <td>${stu.sem}</td>
            <td>${stu.dob}</td>
            <td>${stu.mobile}</td>
            <td>${stu.address}</td>
            <td><button class="btn btn-danger" style="padding: 5px 10px; font-size:12px;" onclick="deleteStudent(${index})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Delete Logic
function deleteStudent(index) {
    if(confirm("શું તમે ખરેખર આ ડેટા ડિલીટ કરવા માંગો છો?")) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        loadTable(); // ટેબલ રિફ્રેશ કરો
    }
}

// Dashboard Counts
function updateDashboard() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    document.getElementById('totalCount').innerText = students.length;
}
