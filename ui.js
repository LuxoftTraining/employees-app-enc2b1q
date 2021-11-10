const PLACEHOLDER = 'employeesPlaceholder';

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");

    for (let employee of employees) {
        const li = document.createElement("li");
        ul.appendChild(li);

        li.innerHTML = employee.name + " " + employee.surname;

        let managerHTML = "";
        if (employee.managerRef) {
            li.innerHTML = employee.name + " " + employee.surname;
            let manager = findById(employee.managerRef);
            managerHTML = " <b>Руководитель:</b> " + manager.name + " " + manager.surname;

            const managerSpan = document.createElement("span");
            const managerSelect = document.createElement("select");
            fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
            managerSelect.addEventListener('change', () => employee.managerRef = managerSelect.value);
            managerSpan.innerHTML = " <b>Руководитель:</b> " + manager.name + " " + manager.surname
            li.appendChild(managerSpan);
            li.appendChild(managerSelect);

        }
        // li.innerHTML = employee.name + " " + employee.surname + managerHTML;

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Удалить";
        removeButton.addEventListener('click', () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);
    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
}

function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}

function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue == option.value) option.selected = true;
        select.appendChild(option);
    }
}

function getEmployeesOptions() {
    let options = [];
    for (let e of DATA.employees) {
        options.push({ text: e.name + ' ' + e.surname, value: e.id });
    }
    return options;
}


function runUI() {
    showEmployees(DATA.employees);
    fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
}

function addEmployeeUI() {
    let errorHTML = "";
    const name = document.getElementById("name").value;
    if (name == "") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
    }
    const surname = document.getElementById("surname").value;
    if (surname == "") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
    }
    document.getElementById("addEmployeeFormErrorMessage").innerHTML = errorHTML;
    if (errorHTML.length != 0) return;

    const id = addEmployee(name, surname);
    const managerId = document.getElementById("managerSelect").value;
    setEmployeeManager(id, managerId);

    showEmployees(DATA.employees);

    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
}


