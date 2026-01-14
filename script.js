// Auth Check (Login વગર અંદર ન જવા દે)
function checkAuth() {
    if (!localStorage.getItem('user_login') && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Login
function doLogin(e) {
    e.preventDefault();
    const u = document.getElementById('u').value;
    const p = document.getElementById('p').value;
    if (u === "admin" && p === "1234") {
        localStorage.setItem('user_login', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert("Invalid Username or Password!");
    }
}

// Logout
function doLogout() {
    localStorage.removeItem('user_login');
    window.location.href = 'index.html';
}

// Add Student
function addStudent(e) {
    e.preventDefault();
    const student = {
        id: Date.now(),
        name: document.getElementById('name').value,
        faculty: document.getElementById('faculty').value,
        sem: document.getElementById('sem').value,
        roll: document.getElementById('roll').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value
    };

    let data = JSON.parse(localStorage.getItem('students')) || [];
    data.push(student);
    localStorage.setItem('students', JSON.stringify(data));
    
    alert('Student Added Successfully!');
    window.location.href = 'view_data.html';
}

// View Students
function loadStudents() {
    let data = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.getElementById('tableBody');
    document.getElementById('totalCount').innerText = data.length + " Records";

    tbody.innerHTML = '';
    data.forEach((stu, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${stu.roll}</td>
                <td><strong>${stu.name}</strong></td>
                <td>${stu.faculty}</td>
                <td>Sem-${stu.sem}</td>
                <td>${stu.dob}</td>
                <td>${stu.mobile}</td>
                <td>${stu.address}</td>
                <td>
                    <a href="edit_student.html?id=${index}" class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;">Edit</a>
                    <button onclick="deleteStudent(${index})" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">Del</button>
                </td>
            </tr>
        `;
    });
}

// Delete
function deleteStudent(index) {
    if(confirm('Are you sure you want to delete this record?')) {
        let data = JSON.parse(localStorage.getItem('students')) || [];
        data.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(data));
        loadStudents();
    }
}

// Load Data for Edit
function loadEdit() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let data = JSON.parse(localStorage.getItem('students')) || [];
    
    if(data[id]) {
        document.getElementById('idx').value = id;
        document.getElementById('name').value = data[id].name;
        document.getElementById('faculty').value = data[id].faculty;
        document.getElementById('sem').value = data[id].sem;
        document.getElementById('roll').value = data[id].roll;
        document.getElementById('dob').value = data[id].dob;
        document.getElementById('mobile').value = data[id].mobile;
        document.getElementById('address').value = data[id].address;
    }
}

// Update Student
function updateStudent(e) {
    e.preventDefault();
    const id = document.getElementById('idx').value;
    let data = JSON.parse(localStorage.getItem('students')) || [];
    
    data[id] = {
        name: document.getElementById('name').value,
        faculty: document.getElementById('faculty').value,
        sem: document.getElementById('sem').value,
        roll: document.getElementById('roll').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value
    };

    localStorage.setItem('students', JSON.stringify(data));
    alert('Data Updated!');
    window.location.href = 'view_data.html';
}
