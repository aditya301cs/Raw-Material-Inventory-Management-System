// Constants for JsonPowerDB connection
const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const inventoryDBName = "INVENTORY-DB";
const itemRelationName = "ITEMS";
const connToken = "90932104|-31949222274912943|90962111"; // Replace with your actual connection token

$(document).ready(function() {
    $("#itemId").focus();
    $("#saveBtn").on("click", saveItem);
    $("#changeBtn").on("click", changeItem);
    $("#resetBtn").on("click", resetForm);
    $("#itemId").on("blur", checkItemId);
});

function resetForm() {
    $("#itemForm")[0].reset();
    $("#itemId").prop("disabled", false);
    $("#itemName, #openingStock, #uom").prop("disabled", true);
    $("#saveBtn, #changeBtn, #resetBtn").prop("disabled", true);
    $("#itemId").focus();
}

function checkItemId() {
    var itemId = $("#itemId").val();
    if (itemId === "") {
        alert("Item ID is required");
        $("#itemId").focus();
        return;
    }

    var jsonObj = {
        id: itemId
    };
    var reqString = createGET_BY_KEYRequest(connToken, inventoryDBName, itemRelationName, JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(reqString, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) { // Item not found
        $("#itemName, #openingStock, #uom").prop("disabled", false);
        $("#saveBtn, #resetBtn").prop("disabled", false);
        $("#itemName").focus();
    } else if (resultObj.status === 200) { // Item found
        $("#itemId").prop("disabled", true);
        var data = JSON.parse(resultObj.data).record;
        $("#itemName").val(data.name);
        $("#openingStock").val(data.openingStock);
        $("#uom").val(data.uom);
        $("#itemName, #openingStock, #uom").prop("disabled", false);
        $("#changeBtn, #resetBtn").prop("disabled", false);
        $("#itemName").focus();
    }
}

function validateAndGetFormData() {
    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var openingStock = $("#openingStock").val();
    var uom = $("#uom").val();

    if (itemId === "" || itemName === "" || openingStock === "" || uom === "") {
        alert("All fields are required");
        return "";
    }

    var jsonStrObj = {
        id: itemId,
        name: itemName,
        openingStock: openingStock,
        uom: uom
    };
    return JSON.stringify(jsonStrObj);
}

function saveItem() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") return;

    var putRequest = createPUTRequest(connToken, jsonStrObj, inventoryDBName, itemRelationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        alert("Data saved successfully");
    } else {
        alert("Error: " + resultObj.status);
    }
    resetForm();
}

function changeItem() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") return;

    var updateRequest = createUPDATERecordRequest(connToken, jsonStrObj, inventoryDBName, itemRelationName, $("#itemId").val());
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        alert("Data updated successfully");
    } else {
        alert("Error: " + resultObj.status);
    }
    resetForm();
}

// Implement functions for Item Received, Item Issue, and Item Report here

$(document).ready(function() {
    // ... (previous event bindings remain unchanged)
    $("#saveInwardBtn").on("click", saveInward);
    $("#resetInwardBtn").on("click", resetInwardForm);
    $("#saveOutwardBtn").on("click", saveOutward);
    $("#resetOutwardBtn").on("click", resetOutwardForm);
    $("#generateReportBtn").on("click", generateReport);
    $("#inwardItemId").on("blur", checkInwardItemId);
    $("#outwardItemId").on("blur", checkOutwardItemId);
});


function resetInwardForm() {
    $("#inwardForm")[0].reset();
    $("#inwardItemId").prop("disabled", false);
    $("#inwardQuantity").prop("disabled", true);
    $("#saveInwardBtn").prop("disabled", true);
}

function resetOutwardForm() {
    $("#outwardForm")[0].reset();
    $("#outwardItemId").prop("disabled", false);
    $("#outwardQuantity").prop("disabled", true);
    $("#saveOutwardBtn").prop("disabled", true);
}

function checkInwardItemId() {
    var itemId = $("#inwardItemId").val();
    if (itemId === "") {
        alert("Item ID is required");
        $("#inwardItemId").focus();
        return;
    }

    var jsonObj = {
        id: itemId
    };
    var reqString = createGET_BY_KEYRequest(connToken, inventoryDBName, itemRelationName, JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(reqString, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {
        alert("Item not found");
        resetInwardForm();
    } else if (resultObj.status === 200) {
        $("#inwardQuantity").prop("disabled", false);
        $("#saveInwardBtn").prop("disabled", false);
        $("#inwardQuantity").focus();
    }
}

function checkOutwardItemId() {
    var itemId = $("#outwardItemId").val();
    if (itemId === "") {
        alert("Item ID is required");
        $("#outwardItemId").focus();
        return;
    }

    var jsonObj = {
        id: itemId
    };
    var reqString = createGET_BY_KEYRequest(connToken, inventoryDBName, itemRelationName, JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(reqString, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {
        alert("Item not found");
        resetOutwardForm();
    } else if (resultObj.status === 200) {
        $("#outwardQuantity").prop("disabled", false);
        $("#saveOutwardBtn").prop("disabled", false);
        $("#outwardQuantity").focus();
    }
}

function saveInward() {
    var receiptNo = $("#receiptNo").val();
    var receiptDate = $("#receiptDate").val();
    var itemId = $("#inwardItemId").val();
    var quantity = $("#inwardQuantity").val();

    if (receiptNo === "" || receiptDate === "" || itemId === "" || quantity === "") {
        alert("All fields are required");
        return;
    }

    var jsonStrObj = {
        receiptNo: receiptNo,
        receiptDate: receiptDate,
        itemId: itemId,
        quantity: quantity
    };

    var putRequest = createPUTRequest(connToken, JSON.stringify(jsonStrObj), inventoryDBName, "INWARD");
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        alert("Inward entry saved successfully");
        updateItemStock(itemId, quantity, true);
    } else {
        alert("Error: " + resultObj.status);
    }
    resetInwardForm();
}

function saveOutward() {
    var issueNo = $("#issueNo").val();
    var issueDate = $("#issueDate").val();
    var itemId = $("#outwardItemId").val();
    var quantity = $("#outwardQuantity").val();

    if (issueNo === "" || issueDate === "" || itemId === "" || quantity === "") {
        alert("All fields are required");
        return;
    }

    // Check if sufficient stock is available
    var currentStock = getCurrentStock(itemId);
    if (parseFloat(quantity) > currentStock) {
        alert("Insufficient stock. Current stock: " + currentStock);
        return;
    }

    var jsonStrObj = {
        issueNo: issueNo,
        issueDate: issueDate,
        itemId: itemId,
        quantity: quantity
    };

    var putRequest = createPUTRequest(connToken, JSON.stringify(jsonStrObj), inventoryDBName, "OUTWARD");
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        alert("Outward entry saved successfully");
        updateItemStock(itemId, quantity, false);
    } else {
        alert("Error: " + resultObj.status);
    }
    resetOutwardForm();
}

function updateItemStock(itemId, quantity, isInward) {
    var jsonObj = {
        id: itemId
    };
    var getRequest = createGET_BY_KEYRequest(connToken, inventoryDBName, itemRelationName, JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: false});
    var getResult = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (getResult.status === 200) {
        var item = JSON.parse(getResult.data).record;
        var currentStock = parseFloat(item.openingStock) || 0;
        var newStock = isInward ? currentStock + parseFloat(quantity) : currentStock - parseFloat(quantity);

        var updateObj = {
            id: itemId,
            openingStock: newStock.toFixed(3)
        };

        var updateRequest = createUPDATERecordRequest(connToken, JSON.stringify(updateObj), inventoryDBName, itemRelationName, itemId);
        jQuery.ajaxSetup({async: false});
        var updateResult = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});

        if (updateResult.status !== 200) {
            alert("Error updating stock: " + updateResult.status);
        }
    }
}

function getCurrentStock(itemId) {
    var jsonObj = {
        id: itemId
    };
    var getRequest = createGET_BY_KEYRequest(connToken, inventoryDBName, itemRelationName, JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: false});
    var getResult = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (getResult.status === 200) {
        var item = JSON.parse(getResult.data).record;
        return parseFloat(item.openingStock) || 0;
    }
    return 0;
}

function generateReport() {
    var getAllRequest = createGET_ALLRequest(connToken, inventoryDBName, itemRelationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getAllRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        var items = JSON.parse(resultObj.data).records;
        var tableBody = $("#itemReportTable tbody");
        tableBody.empty();

        items.forEach(function(item) {
            var row = $("<tr>");
            row.append($("<td>").text(item.id));
            row.append($("<td>").text(item.name));
            row.append($("<td>").text(item.openingStock));
            tableBody.append(row);
        });
    } else {
        alert("Error generating report: " + resultObj.status);
    }
}