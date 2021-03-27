/*
::
::--CREATED BY MD. TOWHIDUL ISLAM
::
*/

import * as Helpers from '../scripts/exporter-helpers.js';

export const toggleDisplay = element => {
    const currentState = element.style.display;
    (currentState === "none") ? element.style.display = "block": element.style.display = "none";
}

export const theadForEmployees = () => {
    return `
        <thead>
            <tr id="tbleTh">
                <th class="slTH">Sl.</th>
                <th class="table-scroll-hr-sticky">Employee Id</th>
                <th class="table-scroll-hr-sticky">Employee Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Joinning Date</th>
                <th>Job Status</th>
                <th>Confirmation Date</th>
                <th>Employment Type</th>
                <th class="table-scroll-hr-sticky">User Name</th>
                <th>Device User Id</th>
                <th>Leave Group</th>
                <th>Shift Name</th>
                <th>Shift Effective From Date</th>
                <th>Shift Effective To Date</th>
                <th>Shift Until Effective</th>
            </tr>
        </thead>
    `;
};

export const configurableCustomDropDown = (dropdownObj = {}) => {
    if (dropdownObj.options) {
        const drpOptions = dropdownObj.options;
        let options = ``;
        let dropdown = ``;

        for (const key in drpOptions) {
            if (!(Helpers.isObjectHasKey('id', drpOptions[key]) &&
                    Helpers.isObjectHasKey('value', drpOptions[key]) &&
                    Helpers.isObjectHasKey('forSelectElement', dropdownObj)))
                break;
            if (!dropdownObj.forSelectElement)
                options += `<p id="${drpOptions[key].id}">${drpOptions[key].value}</p>`;
            else
                options += `<option id="${drpOptions[key].id}">${drpOptions[key].value}</option>`;
        }

        // if (dropdownObj.forSelectElement)
        //     return `<select>${options}</select>`;

        if (!dropdownObj.forSelectElement)
            dropdown += `<div class="hr-dynamic-dropdown" id="configurableCustomDropDown">${options}</div>`;
        else {
            if (dropdownObj.onlyOptions) {
                return options;
            }
        }


        return dropdown;
    }

    // let options = ``;
    // dropdownObj.forEach((opt) => {
    //     options += `<option value="${opt.FileCode}">${opt.FileName}</option>`;
    // });
    // return `<select name="" id="EMPFunctionalAreaName_VW" class="dynamic-dropdown">${options}</select>`;
};

export const createMultipleSelectableDropdown = (params = []) => {
    if (params.length === 0)
        return;
    let options = params.options;
    let classes = params.attributes.classes != undefined ? params.attributes.classes : '';
    let id = params.attributes.id != undefined ? params.attributes.id : '';
    let o = ``;
    for (const key in options) {
        o += `<div class="${classes}"><span>${options[key]}</span></div>`
    }
    return o;
}

export const multipleSelectableDropdownFunctionalities = (params = []) => {
    const id = params.id;
    let triggerRef = params.triggerRef;
    let resultantArray = params.resultantArray;
    if (id === undefined || resultantArray === undefined)
        console.log('1');

    const options = document.getElementById(id).childNodes;

    if (options.length === 0)
        console.log('2');

    options.forEach(option => {
        option.addEventListener('click', e => {
            let text = e.target.innerText;
            let index = resultantArray.indexOf(text);

            if (index === -1) {
                option.classList.add('active');
                resultantArray.push(text);
            } else {
                option.classList.remove('active');
                resultantArray.splice(index, 1);
            }

            if (triggerRef)
                triggerRef.value = f();
        });
    });
    Helpers.winddowFunctionalities({ module: 'hr-mul-drop' });

    let f = () => {
        triggerRef.value = '';
        let t = '';
        resultantArray.forEach(txt => {
            t += txt + ',';
        });

        t = t.substr(0, (t.length - 1));

        return t;
    }



    return resultantArray;
}

export const createDropDownWithSearch2 = (configurableObj = []) => {
    let dropdownWithSearchWrapper = ``;
    let input = `<input type="text" class="search-dropdown-input" placeholder="search"/>`;
    let dropdownElelmentsWrapper = ``;
    let dropdownElelments = ``;
    for (const opt in configurableObj[2]) {
        let pId = configurableObj[2][opt][configurableObj[0]];
        let pText = configurableObj[2][opt][configurableObj[1]];
        let isObjectHasKey = Helpers.isObjectHasKey(configurableObj[0], configurableObj[2][opt]);

        if (!isObjectHasKey)
            break;

        if (configurableObj[0] === 'TextBox2') {
            dropdownElelments += `<p id="${pId}">${pId} | ${pText}</p>`;
        } else {
            dropdownElelments += `<p id="${pId}">${pText}</p>`;
        }

        // if (configurableObj.length === 4) {
        //     dropdownElelments += `<p id="${pId}">${pId} | ${pText}</p>`;
        //     continue;
        // }

        // if (configurableObj.length === 3)
        //     dropdownElelments += `<p id="${pId}">${pText}</p>`;
        // else
        //     dropdownElelments += `<p id="${pId}">${pText}</p>`;
    }

    dropdownElelmentsWrapper = `<div id="searchDropDownDiv">${dropdownElelments}</div>`;
    dropdownWithSearchWrapper = `<div class="dropdownWithSearchWrapper">
        ${Helpers.closerHTML('span', '&times;')}
        ${input}
        ${dropdownElelmentsWrapper}
    </div>`;
    return dropdownWithSearchWrapper;

};

export const createDropDownWithSearch = (dropdownObj = [], configurableObj = []) => {
    let dropdownWithSearchWrapper = ``;
    let input = `<input type="text" class="search-dropdown-input" placeholder="search"/>`;
    let dropdownElelmentsWrapper = ``;
    let dropdownElelments = ``;

    for (const opt in dropdownObj) {
        let isObjectHasKey = Helpers.isObjectHasKey('FileCode', dropdownObj[opt]);
        if (!isObjectHasKey)
            break;
        if (dropdownObj[opt].FileCode === undefined)
            return null;

        dropdownElelments += `<p id="${dropdownObj[opt].FileCode}">${dropdownObj[opt].FileName}</p>`;
    }

    for (const opt in dropdownObj) {
        let isObjectHasNodeTextKey = Helpers.isObjectHasKey('NodeText', dropdownObj[opt]);
        if (!isObjectHasNodeTextKey)
            break;
        // if (dropdownObj[opt].FileCode === undefined)
        //     return null;
        dropdownElelments += `<p id="${dropdownObj[opt].NodeText}">${dropdownObj[opt].NodeText}</p>`;
    }

    for (const opt in configurableObj[2]) {
        let isObjectHasKey = Helpers.isObjectHasKey(configurableObj[0], configurableObj[2][opt]);
        if (!isObjectHasKey)
            break;
        let pId = configurableObj[2][opt][configurableObj[0]];
        let pText = configurableObj[2][opt][configurableObj[1]];

        if (configurableObj.length === 4) {
            dropdownElelments += `<p id="${pId}">${pId} | ${pText}</p>`;
            continue;
        }

        if (configurableObj.length === 3)
            dropdownElelments += `<p id="${pId}">${pText}</p>`;
        else
            dropdownElelments += `<p id="${pId}">${pText}</p>`;
    }

    dropdownElelmentsWrapper = `<div id="searchDropDownDiv">${dropdownElelments}</div>`;
    dropdownWithSearchWrapper = `<div class="dropdownWithSearchWrapper">
        ${Helpers.closerHTML('span', '&times;')}
        ${input}
        ${dropdownElelmentsWrapper}
    </div>`;
    return dropdownWithSearchWrapper;
};

export const searchInDom = (
    domObjRoot,
    searchQuery = ""
) => {
    if (domObjRoot == null || undefined || !domObjRoot instanceof HTMLElement)
        return;
    const rootId = domObjRoot.getAttribute("id");
    const rootClass = domObjRoot.getAttribute("class");
    const tagName = domObjRoot.tagName;
    let childNodes;
    console.log(tagName);
    if (tagName === "DIV" || undefined) {
        childNodes =
            rootId !== null ?
            document.getElementById(rootId).childNodes :
            document.getElementsByClassName(rootClass).childNodes;

        Helpers.search(childNodes, searchQuery);
    }
    if (tagName === "TBODY" || undefined) {
        const tr = document.querySelectorAll(`#${rootId} tr`);
        let td;
        const inputs = document.querySelectorAll(`#${rootId} tr td input`);
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[i];
            console.log(td);
        }
    }
};

export const addClickEventOnDropdownElements = (
    dropdownElelmentsId,
    resultantDom,
    uniqueClassName,
    forConfigDropdown = false
) => {
    let dropdownElelments = document.getElementById(dropdownElelmentsId);
    // let parentDropdownElelmentsClass = dropdownElelments.parentElement
    //     .getAttribute("class")
    //     .split(" ")[0];
    let childs = dropdownElelments.childNodes;
    let tagName = resultantDom.tagName;

    childs.forEach((el) => {
        el.addEventListener("click", () => {
            if (tagName.toLowerCase() === "input") {
                document.getElementsByClassName(uniqueClassName)[0].setAttribute('value', el.innerText);
            }
            if (!forConfigDropdown)
                dropdownElelments.parentElement.remove();
            else
                dropdownElelments.remove();
        });
    });
};

export const makeTree = (
    isSMGBusiness = true,
    FileTypeCode = 82,
    LevelId = 1,
    param = 1
) => {
    var vIsSMGBusiness = isSMGBusiness;
    var IsEmployeeWithUserCode = false;
    if (IsEmployeeWithUserCode == true && param == "1") return false;

    if (FileTypeCode == 10 && vIsSMGBusiness == true) {
        callModal(
            "../Common" + vRewriteURL + "/GetItemHierarchyWithOutParenSelectOption",
            "pFileTypeCode=" + FileTypeCode + "&pLevelId=" + LevelId
        );
    } else {
        callModal(
            "../Common" + vRewriteURL + "/GetItemHierarchy",
            "pFileTypeCode=" + FileTypeCode + "&pLevelId=" + LevelId
        );
    }
};

function callModal(vURL, vDATA) {
    var vModal = document.getElementById("ModalView");
    var vSpan = document.getElementsByClassName("close")[0];

    $.ajax({
        type: "GET",
        url: vURL,
        data: vDATA,

        dataType: "html",
        success: function(data) {
            document.getElementById("tempCheck").innerHTML = data;
            console.log(data);
            //   $("#DivNew").html(data);
            //   vModal.style.display = "block";
        },
    });
}

export const nodeMaker = (pNodes, cNodes = []) => {
    let parentNodes = [];
    let childNodes = [];

    for (const node of pNodes) parentNodes.push(node);

    if (cNodes.length > 0)
        for (const node of cNodes) childNodes.push(node);

    return {
        parentNodes,
        childNodes,
    };
};

export const addDropDownToDom = (domElem) => {
    let inputParent = domElem.parentElement;
    inputParent.setAttribute(
        "id",
        "EMPFunctionalAreaName_VW_" + Math.ceil(Math.random() * 99999)
    );
    let inputParentElementId = inputParent.getAttribute("id");
    document.getElementById(inputParentElementId).innerHTML = dropdown;
};


export const inputTypeChanger = (input, type = 'text') => {
    input.setAttribute('type', type);
    input.setAttribute('class', 'hr-dynamic-date-type');
}

export const createDataList = (input, list = [], keys = {}) => {
    if (list.length <= 0 || !input instanceof HTMLElement)
        return;

    const id = input.getAttribute('id');
    input.removeAttribute("readonly");
    const classes = input.getAttribute('class').split(' ');
    const uniqueClass = classes.length >= 1 ? classes[1] : classes;
    let options = ``;
    input.setAttribute("list", uniqueClass);

    for (const key in list) {
        options += `<option value="${list[key][keys.name]}"/>`
    }

    document.getElementsByClassName(uniqueClass)[0].parentElement.innerHTML += `<datalist id="${uniqueClass}">${options}</datalist>`;

    return `<datalist id="${uniqueClass}">${options}</datalist>`;
}

const closersOnclick = (className = "closer") => {
    const closers = document.getElementsByClassName(className);
    for (const closer of closers) {
        closer.addEventListener("click", () => {
            console.log(className);
            console.log("fjdkjfkdjfk");
        });
    }
};

export const createDynamicClass = (name = "dynamic-class") => name + `_` + Math.ceil(Math.random() * 999999999);
export const createDynamicId = (name = "dynamic-id") => name + `_` + Math.ceil(Math.random() * 999999999);

export const searchInObject = (params) => {
    let o = [];
    let objValue = ``;
    let isExist = ``;
    let objects = params.objects;
    let query = params.query;

    if (objects == undefined || query == undefined)
        return;

    query = query.toLowerCase().trim();
    let paginatedValue = +params.paginatedValue === undefined || null || 0 ? 50 : +params.paginatedValue;

    for (let i = 0; i < objects.length; i++) {
        for (const key in objects[i]) {
            objValue = (objects[i][key] !== null || undefined || '') ? objects[i][key].toString().trim() : '';
            if (objValue.length === 0)
                continue;

            isExist = objValue.toLowerCase().includes(query);
            if (isExist)
                o.push(objects[i]);
        }
    }

    return (query.length > 0) ? o : objects.slice(0, paginatedValue);
}

export const getEmployeesFromLocalStorage = () => {
    let emps = JSON.parse(localStorage.getItem('employees'));
    return (emps !== null | undefined) ? emps : [];
}

export const createOverlayWithModal = (overlayOptions = {}) => {
    const header = overlayOptions.header;
    const content = overlayOptions.content;
    const closerIcon = overlayOptions.closerIcon;
    const isFixed = overlayOptions.isFixed;
    const isDisplayNoneWhenOverlayClick = overlayOptions.isDisplayNone;
    const classes = overlayOptions.classes !== undefined ? overlayOptions.classes : ' ';
    const isAutoHide = overlayOptions.isAutoHide;
    // const hidingTime = overlayOptions.hidingTime;

    if (header === undefined || content === undefined)
        return;
    let styles = (isFixed && isFixed != undefined) ? "position: fixed" : "position: absolute";
    return `<div class="${classes}" id="dynamicOverlay" style="${styles}">
        <div id="modal">
            <h4>${header}</h4>
            <div>${content}</div>
        </div>
    </div>`;
}


let hrEmployeeModelArray = ["ActionDate",
    "ActionType",
    "BasicSalary",
    "BloodGroupCode_FK",
    "BloodGroup_VW",
    "CellPhone",
    "ChangedEmployeeId_VW",
    "CompanyCode_FK",
    "Company_VW",
    "ConfirmationDate",
    "ContactNumber",
    "ContactPerson",
    "ContactPersonAddress",
    "DateOfBirth",
    "DepartmentCode_FK",
    "DepartmentHeadCode_VW",
    "DepartmentHeadName_VW",
    "Department_VW",
    "DesignationCode_FK",
    "Designation_VW",
    "DeviceUserId_VW",
    "DrivingLicenseNo",
    "EMPFunctionalAreaCode_FK",
    "EMPFunctionalAreaName_VW",
    "EligibleForOT",
    "EligibleForOT_VW",
    "Email",
    "EmployeeCode_PK",
    "EmployeeId",
    "EmployeeName_VW",
    "EmploymentTypeCode_FK",
    "ExpectedConfirmDate",
    "ExpiryDate",
    "FatherName",
    "GovtAdministrativeAreaCode_FK",
    "GovtAdministrativeArea_VW",
    "IsAutoMailGenerator",
    "IsAutoMailGenerator_VW",
    "IsDeleted",
    "IsDirty",
    "IsMandatoryBloodGroup_VW",
    "IsMandatoryJoiningBatch_VW",
    "IsMandatoryNationality_VW",
    "IsNew",
    "IssueDate",
    "IssuePlace",
    "JobStatus",
    "JobStatusChangedDate",
    "JobStatusDesc_VW",
    "JoinBatchCode_FK",
    "JoinBatch_VW",
    "JoinningDate",
    "LastPromotionCode",
    "LastTransferCode",
    "LeaveGroup_VW",
    "MaritalStatusCode_FK",
    "MaritalStatus_VW",
    "MarriageDate",
    "MotherName",
    "Name",
    "NationalityCode_FK",
    "NationalityId",
    "Nationality_VW",
    "PFMemberId",
    "PassportNo",
    "PerAddDistrictCode_FK",
    "PerAddDistrict_VW",
    "PermanentAddress",
    "PreAddDistrictCode_FK",
    "PreAddDistrict_VW",
    "PresentAddress",
    "ReligionCode_FK",
    "Religion_VW",
    "ReportToCode_FK",
    "ReportTo_VW",
    "ResidencePhone",
    "Sex",
    "Sex_VW",
    "StringMatchOptionValue_VW",
    "TableNm_TBL",
    "TinNo",
    "TotalRow_VW",
    "UserCode",
    "UserName_VW",
    "WorkingPlaceName",
    "WorkingUnitCode_FK",
    "WorkingUnit_VW",
];

export const excludeRedundentObectItems = (objects = [], items = []) => {
    let shapedObjects = [];

    for (const key in objects) {
        let o = Helpers.excludeObjectItems(objects[key], items);
        shapedObjects.push(o);
    }
    return shapedObjects;
}

export const objectBuilderFromInputId = (inputIds = []) => {
    if (!Array.isArray(inputIds) && inputIds.length === 0)
        return;
    let obj = {};

    inputIds.forEach(inputId => {
        let value = document.getElementById(inputId).value;
        obj[inputId] = (value !== null) ? value : '';
    });

    return obj;
}

export const validateInputFildsWithInputId = (validatiesInputId = []) => {
    let error = false;
    for (let i = 0; i < validatiesInputId.length; i++) {
        const inputElem = document.getElementById(validatiesInputId[i]);
        const val = inputElem.value.length;

        if (val === 0) {
            inputElem.focus();
            error = true;
            inputElem.classList.add('error');
        }
    }
    return error ? error : false;
}

export const resetFormWithErrors = function(id = '') {
    var inputs = document.querySelectorAll(`#${id} input`);
    inputs.forEach(function(input) {
        input.value = '';
        if (input.classList.contains('error')) {
            input.classList.remove('error')
        }
    });
}

export const makeTableFromArrayOfObjects = (arrayOfObjects = [], configs = {}) => {
    if (!Array.isArray(arrayOfObjects) && typeof arrayOfObjects[0] !== 'object')
        return;

    let keys = Object.keys(arrayOfObjects[0]);
    let tableRows = ``;
    let table = ``;
    let header = ``;


    if (keys.length === 0 || undefined)
        return table;

    if (configs.withActionsHeader) {
        keys.push('Actions');
    }
    header = makeTableHeaderByArray(keys, configs);
    for (let i = 0; i < arrayOfObjects.length; i++) {
        tableRows += makeTableRowFromObj(arrayOfObjects[i], Object.assign(configs, { index: i }))
    }

    if (configs.isWithLegend) {
        table += `
            <fieldset>
                <legend>${configs.legendText}</legend>
                <table id="theTable" class="table table-bordered table-hover table-condensed table-striped">
                    <tr>
                        ${header}     
                    </tr>
                    ${tableRows}
                </table>
            </fieldset>
        `;
    } else {
        table += `
            <table id="theTable" class="table table-bordered table-hover table-condensed table-striped">
                <tr>
                    ${header}     
                </tr>
                ${tableRows}
            </table>
        `;
    }

    return table;
}

export const makeTableRowFromObj = (obj = {}, configs = {}) => {
    let row = ``;
    let tr = ``;
    let removeButton = ``;

    if (configs.hide_PK_FK) {
        for (const key in obj) {
            if (key.includes('_PK') || key.includes('_FK')) {
                continue;
            }
            row += `<td>${obj[key]}</td>`;
        }
    } else {
        for (const key in obj) {
            row += `<td>${obj[key]}</td>`;
        }
    }

    if (configs.isWithRemoveButton) {
        let index = configs.hasOwnProperty('index') ? configs.index : '';
        removeButton += `<td>
            <button 
                id="${index}"
                style="color: #fff;height: 27px;border-radius: 4px;line-height: 30px;"
                class="btn btn-sm btn-danger btn-remove">
                Remove
            </button>
        </td>`;
    }
    tr += `<tr>
                ${row}
                ${removeButton}
           </tr>`;
    return tr;
}

export const makeTableHeaderByArray = (array = [], configs = {}) => {
    if (!Array.isArray(array) && array.length === 0)
        return;

    let th = ``;

    if (configs.hide_PK_FK) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].includes('_PK') || array[i].includes('_FK'))
                continue;
            th += `<th>${array[i]}</th>`;
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            th += `<th>${array[i]}</th>`;
        }
    }
    return th;
}

export const saveAll = (values, url, callback = {}) => {
    if (typeof values !== 'string') {
        values = JSON.stringify(values);
    }
    let { callbackFunc, objectsToSend, configs } = callback;
    let status = false;
    let success = '';
    let error = '';

    $.ajax({
        url: `${url+1}`,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: values,
        success: (data) => {
            status = true;
            success = data;
        },
        error: (err) => {
            error = err
        }
    });

    return status ? success : error;
}

export const removeItemFromListByIndexAndGetUpdatedTable = (items = [], index, ...configs) => {
    if (!Array.isArray(items) && !Number.isInteger(index))
        return;

    const config = configs[0];
    let table = ``;
    let arrayOfObjects = items.splice(index, 1);
    if (items.length > 0 && config.forEmployeeList) {
        table += config.callback(arrayOfObjects, config);
    }

    return table;
}