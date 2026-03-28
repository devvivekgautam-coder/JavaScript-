let student = JSON.parse(localStorage.getItem("stuData")) || [];

let stuForm = document.getElementById("stuForm");

let editId = null;

stuForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let stuName = document.getElementById("stuName").value;
    let stuAge = document.getElementById("stuAge").value;
    let stdClass = document.getElementById("stdClass").value;
    let stuEmail = document.getElementById("stuEmail").value;

    if (editId !== null) {
        student = student.map(stu => {
            if (stu.id === editId) {
                return {
                    ...stu,
                    stuName,
                    stuAge,
                    stdClass,
                    stuEmail
                };
            }
            return stu;
        });

        editId = null;
    }
    else {
        let stuObj = {
            id: Date.now(),
            stuName,
            stuAge,
            stdClass,
            stuEmail
        };

        student.push(stuObj);
    }

    localStorage.setItem("stuData", JSON.stringify(student));
    DisplayStu();
    stuForm.reset();
});

function DisplayStu() {
    let stuData = document.getElementById("stuData");
    let str = "";

    student.forEach((stu, idx) => {
        str += `
        <tr>
                    <td>${idx + 1}</td>
                    <td>${stu.stuName}</td>
                    <td>${stu.stuAge}</td>
                    <td>${stu.stdClass}</td>
                    <td>${stu.stuEmail}</td>
            <td>
                <button onclick="editStu(${stu.id})">Edit</button>
                <button>Delete</button>
            </td>
        </tr>`;
    });

    stuData.innerHTML = str;
}

function editStu(id) {
    let stu = student.find(stu => stu.id === id);

    document.getElementById("stuName").value = stu.stuName;
    document.getElementById("stuAge").value = stu.stuAge;
    document.getElementById("stdClass").value = stu.stdClass;
    document.getElementById("stuEmail").value = stu.stuEmail;

    editId = id;
}

DisplayStu();