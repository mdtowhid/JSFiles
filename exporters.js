export const theadForEmployees = () => {
    return `
        <thead>
            <tr id="tbleTh">
                
                <th>Employee Id</th>
                <th>EMP Functional Area Name</th>
                <th>Sex</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Joinning Date</th>
                <th>Confirmation Date</th>
                <th>Present Address</th>
                <th>Cell Phone</th>
                <th>Date Of Birth</th>
                <th>Nationality Id</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Employment Type</th>
                <th>Blood Group</th>
                <th>Job Status</th>
                <th>Report To</th>
            </tr>
        </thead>
    `;
};

export const trForEmployeeDashboards = (employees) => { };

export const createDropDown = (dropdownObj = []) => {
    let options = ``;

    dropdownObj.forEach((opt) => {
        options += `<option value="${opt.FileCode}">${opt.FileName}</option>`;
    });

    return `<select name="" id="EMPFunctionalAreaName_VW" class="dynamic-dropdown">${options}</select>`;
};

export const ids = {};

export const createDropDownWithSearch = (dropdownObj = []) => {
    let dropdownWithSearchWrapper = ``;
    let input = `<input type="text" class="search-dropdown-input" placeholder="search"/>`;
    let dropdownElelmentsWrapper = ``;
    let dropdownElelments = ``;

    for (const opt in dropdownObj) {
        if (dropdownObj[opt].FileCode === undefined)
            return null;

        dropdownElelments += `<p id="${dropdownObj[opt].FileCode}">${dropdownObj[opt].FileName}</p>`;
    }
    // dropdownObj.forEach((opt) => {
    //     dropdownElelments += `<p id="${opt.FileCode}">${opt.FileName}</p>`;
    // });

    dropdownElelmentsWrapper = `<div id="searchDropDownDiv">${dropdownElelments}</div>`;
    dropdownWithSearchWrapper = `<div class="dropdownWithSearchWrapper">
        ${input}
        ${dropdownElelmentsWrapper}
    </div>`;
    return dropdownWithSearchWrapper;
};

export const f = (data) => {
    console.log(data);
};

export const searchInDom = (
    domObjRoot,
    searchQuery = "",
    resultantDom = null
) => {
    const rootId = domObjRoot.getAttribute("id");
    const rootClass = domObjRoot.getAttribute("class");
    const tagName = domObjRoot.tagName;
    let childNodes;

    if (domObjRoot == null || undefined || !domObjRoot instanceof HTMLElement)
        return;

    if (tagName === "DIV" || undefined) {
        childNodes =
            rootId !== null ?
                document.getElementById(rootId).childNodes :
                document.getElementsByClassName(rootClass).childNodes;

        childNodes.forEach((cn) => {
            let childNodeId = cn.getAttribute("id");
            let childNodeText = cn.innerText === undefined ? "" : cn.innerText;
            let isExist = childNodeText
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            if (isExist) {
                cn.style.display = "block";
            } else {
                cn.style.display = "none";
            }
        });
    } else console.log("not-div");
};

export const addClickEventOnDropdownElements = (
    dropdownElelmentsId,
    resultantDom,
    uniqueClassName
) => {
    let dropdownElelments = document.getElementById(dropdownElelmentsId);
    let parentDropdownElelmentsClass = dropdownElelments.parentElement
        .getAttribute("class")
        .split(" ")[0];
    let childs = dropdownElelments.childNodes;
    let tagName = resultantDom.tagName;

    childs.forEach((el) => {
        el.addEventListener("click", () => {
            if (tagName.toLowerCase() === "input") {
                document.getElementsByClassName(uniqueClassName)[0].setAttribute('value', el.innerText);
            }
            dropdownElelments.parentElement.remove();
        });
    });
};

//MakeTree(event,82,1,0,1);

export const makeTree = (
    isSMGBusiness = true,
    FileTypeCode = 82,
    LevelId = 1,
    Flag = 0,
    param = 1
) => {
    var vIsSMGBusiness = isSMGBusiness;

    let VFileTypeCode = FileTypeCode;
    let VLevelId = LevelId;
    let VFlag = Flag;
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
        success: function (data) {
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

export const serverReponseObjNames = {

}