import { theadForEmployees, createDropDown, createDropDownWithSearch, searchInDom, addClickEventOnDropdownElements } from "../Scripts/exporter.js";

$(function () {
    let click = 0;
    let currentRows = [];
    let rows = 100;
    let objectToSend = [];
    let dropdowns = [];
    let editedRowsUniqueClassNames = [];
    let temp;
    const dataTable = document.getElementById("dataTable");
    const tblSetup = `<table>
                        ${theadForEmployees()}
                        <tbody id="tableBody">
                        </tbody>
                    </table>`;

    dataTable.innerHTML += tblSetup;

    const userParams = (rows) => {
        rows = click === 0 ? rows : (rows += 50);
        click++;
    };

    const uiUtitlityManager = (empArray = [], updatedStatus = null) => {
        const rowsEditedStatus = document.getElementById("rowsEdited");
        if (objectToSend.length === 0) {
            document.getElementById("saveBtn").disabled = true;
            rowsEditedStatus !== null ?
                (rowsEditedStatus.innerHTML = ``) :
                rowsEditedStatus;
        }
        if (objectToSend.length > 0) {
            document.getElementById("saveBtn").disabled = false;
            rowsEditedStatus.innerHTML = `<span style="font-weight: bold; float: right">${objectToSend.length} employee(s) edited.</span>`;
        }

        if (empArray !== null) {
            currentRows = [];
            empArray.forEach((employee) => currentRows.push(employee));
        }

        if (updatedStatus !== null) {
            document.querySelectorAll("#dataTable tr").forEach((tr) => {
                tr.classList.remove("active");
            });
        }
    };

    let makeTable = (data) => {
        document.getElementById("tableBody").innerHTML = null;
        let employees = data.employees;
        uiUtitlityManager(employees, null);
        // objectToSend = [];
        document.getElementById("resultOrError").innerHTML = `Loading records...`;
        setTimeout(() => {
            document.getElementById("resultOrError").innerHTML = `<div>
            <span style="float: left;width: 50%;">
                Result for top ${currentRows.length} rows.<button id="loadMore" class="c-mat-button">Load More</button>
            </span>    
            <span id="rowsEdited"></span>    
        </div>`;

            employees.forEach((emp) => {
                let tr = ``;
                tr += `<tr id="${"a_" + emp.EmployeeId}">
            <td><input id="EmployeeId" value="${emp.EmployeeId
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="EMPFunctionalAreaName_VW" value="${emp.EMPFunctionalAreaName_VW}" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="Sex_VW" value="${emp.Sex_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="FatherName" value="${emp.FatherName
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="MotherName" value="${emp.MotherName
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="JoinningDate" value="${emp.JoinningDate
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="ConfirmationDate" value="${emp.ConfirmationDate
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="PresentAddress" value="${emp.PresentAddress
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="CellPhone" value="${emp.CellPhone
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="DateOfBirth" value="${emp.DateOfBirth
                    }" class="dbl-click-input" readonly="readonly" t class="dbl-click-input" disabledype="text"/></td>
            <td><input id="NationalityId" value="${emp.NationalityId
                    }" type="text"/></td>
            <td><input id="Department_VW" value="${emp.Department_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="Designation_VW" value="${emp.Designation_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="EmploymentType_VW" value="${emp.EmploymentType_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="BloodGroup_VW" value="${emp.BloodGroup_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="JobStatus" value="${emp.JobStatus
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
            <td><input id="ReportTo_VW" value="${emp.ReportTo_VW
                    }" class="dbl-click-input" readonly="readonly" type="text"/></td>
       </tr>`;
                document.getElementById("tableBody").innerHTML += tr;
            });

            attachEventsOnTableInputs();



            document.getElementById("loadMore").addEventListener("click", () => {
                uiUtitlityManager(currentRows, null);
                getAllEmployees();
            });
        }, 1000);
    };


    let objectBuilder = (obj) => {
        if (objectToSend.length === 0) {
            objectToSend.push(obj);
        } else {
            let isExist = objectToSend.filter((x) => x.EmployeeId === obj.EmployeeId);
            if (isExist.length > 0) {
                let index = objectToSend
                    .map((x) => x.EmployeeId === obj.EmployeeId)
                    .indexOf(obj.EmployeeId === obj.EmployeeId);
                if (index !== -1) {
                    let updatedObj = Object.assign(objectToSend[index], obj);
                    objectToSend.splice(index, 1);
                    objectToSend.push(updatedObj);
                }
            } else {
                objectToSend.push(obj);
            }
        }
    };

    const attachSearchEvents = (filterInputs, inputParent) => {
        for (const fi of filterInputs) {
            fi.addEventListener('keyup', (e) => {
                let query = e.target.value;
                searchInDom(document.getElementById('searchDropDownDiv'), query, inputParent);
            });
        }
    }

    const getDropdown = dropdownName => {
        let dropdown = null;
        for (const key in dropdowns) {
            if (dropdowns[key].name === dropdownName)
                dropdown = dropdowns[key].dropdown;
        }
        return dropdown;
    }

    const setDropdownFunctionalities = (input, id, dropdownName) => {
        let inputParent;
        let inputParentElementId;
        let className = 'dbl-clicked-input_' + Math.ceil(Math.random() * 99999);
        id += "_" + Math.ceil(Math.random() * 99999);

        editedRowsUniqueClassNames.push(className);

        inputParent = input.parentElement;
        input.setAttribute('readonly', 'readonly');
        inputParent.setAttribute('id', id);
        input.classList.add(className);
        inputParentElementId = inputParent.getAttribute('id');
        document.getElementById(inputParentElementId).innerHTML += getDropdown(dropdownName);

        document.getElementsByClassName('dropdownWithSearchWrapper')[0].classList.add('active');
        addClickEventOnDropdownElements('searchDropDownDiv', input, className);

        const filterInputs = document.getElementsByClassName('search-dropdown-input');
        attachSearchEvents(filterInputs, input.parentElement);
    };

    const attachEventsOnTableInputs = () => {
        let inputs = document.querySelectorAll(".dbl-click-input");
        inputs.forEach((input) => {
            input.addEventListener("dblclick", () => {
                input.removeAttribute("readonly");
                let id = input.getAttribute("id").trim();
                let isEmpFunationalAreaId = id === "EMPFunctionalAreaName_VW";
                let isDepartmentId = id === "Department_VW";
                let isDesignationId = id === "Designation_VW";
                let isEmploymentTypeId = id === "EmploymentType_VW";
                let isBloodGroupId = id === "BloodGroup_VW";
                let isJobStatusId = id === "JobStatus";
                let isReportToId = id === "ReportTo_VW";

                if (isEmpFunationalAreaId)
                    setDropdownFunctionalities(input, 'EMPFunctionalAreaName_VW', 'empFunctionalAreaNames');

                if (isDepartmentId)
                    setDropdownFunctionalities(input, 'Department_VW', 'departments');

                if (isDesignationId)
                    setDropdownFunctionalities(input, 'Designation_VW', 'designations');

                if (isEmploymentTypeId)
                    setDropdownFunctionalities(input, 'EmploymentType_VW', 'employmentTypes');

                if (isBloodGroupId)
                    setDropdownFunctionalities(input, 'BloodGroup_VW', 'bloodGroups');

                // if (isJobStatusId)
                //     setDropdownFunctionalities(input, 'JobStatus', 'departments');
                // if (isReportToId)
                //     setDropdownFunctionalities(input, 'ReportTo_VW', 'departments');
            });

            input.addEventListener("blur", () => {
                input.setAttribute("readonly", true);
                let employeeId = input.parentElement.parentElement.getAttribute("id");
                let changedInputs = document.querySelectorAll(
                    "#" + employeeId + " td input"
                );
                document.getElementById(employeeId).classList.add("active");
                let dynamicObject = {};
                changedInputs.forEach((cinput) => {
                    dynamicObject[cinput.getAttribute("id")] = cinput.value;
                });
                objectBuilder(dynamicObject);
                uiUtitlityManager();
            });

            input.addEventListener('change', () => {
                alert('You have')
            })
        });
    };



    const getAllEmployees = () => {
        userParams(currentRows.length === 0 ? rows : (rows += 50));
        $.get(`/hr/GetAllEmployees?recordNumber=${rows}`, (data) => {
            if (data) {
                makeTable(data);
                document.getElementById('isSMGBusiness').innerHTML = data.ISSMGBUSINESS;

                for (const x in data)
                    dropdowns.push({
                        name: x,
                        dropdown: createDropDownWithSearch(data[x]),
                    });

                console.log(dropdowns);
            }
        });
    };

    getAllEmployees();
    $("#previewEmployeesBtn").click(getAllEmployees);

    const updateEditedEmployees = () => {
        $.ajax({
            method: "POST",
            url: "/hr/updateEditedEmployees",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(objectToSend),
            dataType: "json",
            success: (data) => {
                if (data) {
                    objectToSend = [];
                    uiUtitlityManager([], data);
                    getAllEmployees();
                } else { }
            },
            error: () => {
                alert("Oops! There Is An Error");
            },
        });
    };
    $("#saveBtn").click(updateEditedEmployees);
});