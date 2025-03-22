import { itemModel } from '../model/Item.js';

$(document).ready(function () {
    handleRowClick();
    loadNextItemId();
    loadAllItems();

    $('#item-save').click(function (event) {
        event.preventDefault();

        if (isItemValidated()) {
            let item = {
                itemCode: $('#itemCode').val(),
                itemName: $('#itemName').val(),
                itemQtyOnHand: $('#itemQty').val(),
                itemPrice: $('#itemPrice').val()
            };

            let isSaved = itemModel.saveItem(item);

            if (isSaved) {
                addToTable(item);
                $(".item-form")[0].reset();
            }
        }
    });

    $('#item-remove').click(function (event) {
        event.preventDefault();
        let itemCode = $('#itemCode').val().trim();

        if (!itemCode) {
            $("#itemCodeError").text("Please enter the Item Code to delete.");
            return;
        } else {
            $("#itemCodeError").text("");
        }

        let isDeleted = itemModel.deleteItem(itemCode);

        if (isDeleted) {
            removeFromTable(itemCode);
            console.log("Item deleted successfully!");
            $(".item-form")[0].reset();
        } else {
            alert("Item Code not found!");
        }
    });

    $('#item-update').click(function (event) {
        event.preventDefault();

        if (codeValidated()) {
            let item = {
                itemCode: $('#itemCode').val(),
            };

            let itemName = $('#itemName').val();
            let itemQtyOnHand = $('#itemQty').val();
            let itemPrice = $('#itemPrice').val();

            if (itemName) item.itemName = itemName;
            if (itemQtyOnHand) item.itemQtyOnHand = itemQtyOnHand;
            if (itemPrice) item.itemPrice = itemPrice;

            let isUpdated = itemModel.updateItem(item);

            if (isUpdated) {
                updateTable(item);
                console.log("Item updated successfully!");
                $(".item-form")[0].reset();
            } else {
                alert("Item Code not found! Unable to update.");
            }
        }
    });

    $('#item-clear-all').click(function (event) {
        event.preventDefault();
        $(".item-form")[0].reset();
    });

    $('#item-get-all').click(function (event) {
        event.preventDefault();

        if (codeValidated()) {
            let itemCode = $('#itemCode').val().trim();

            let foundItem = itemModel.findItemByCode(itemCode);

            if (foundItem) {
                console.log("Item Found!", foundItem);
                $("#itemCode").val(foundItem.itemCode);
                $("#itemName").val(foundItem.itemName);
                $("#itemQty").val(foundItem.itemQtyOnHand);
                $("#itemPrice").val(foundItem.itemPrice);
            } else {
                alert("Item Code not found!");
            }
        }
    }); 


    //------------------ validate Regex -------------

    function validateField(inputElement, pattern, errorSpanId, errorMessage) {
        let value = inputElement.val().trim();
        let errorSpan = $("#" + errorSpanId);

        if (!pattern.test(value)) {
            inputElement.css("border", "2px solid red");
            errorSpan.text(errorMessage);
        } else {
            inputElement.css("border", "2px solid green");
            errorSpan.text("");
        }
    }

    // Attach validation on input
    $("#itemCode").on("input", function () {
        validateField($(this), /^I\d{2}-\d{3}$/, "itemCodeError", "Invalid format! (e.g., I00-001)");
    });

    $("#itemName").on("input", function () {
        validateField($(this), /^[A-Za-z\s]+$/, "itemNameError", "Only letters and spaces allowed.");
    });

    $("#itemQty").on("input", function () {
        validateField($(this), /^\d+$/, "itemQtyError", "Only whole numbers allowed.");
    });

    $("#itemPrice").on("input", function () {
        validateField($(this), /^\d+(\.\d{1,2})?$/, "itemPriceError", "Enter a valid price (e.g., 50000.00).");
    });



});

function loadNextItemId() {
    let nextId = itemModel.getNextItemId();
    $("#itemCode").val(nextId).prop("readonly", false);
}

function handleRowClick() {
    $(document).on("click", "#itemTable tbody tr", function () {
        let itemCode = $(this).find("td:eq(0)").text();
        let itemName = $(this).find("td:eq(1)").text();
        let itemQtyOnHand = $(this).find("td:eq(2)").text();
        let itemPrice = $(this).find("td:eq(3)").text();

        $("#itemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemQty").val(itemQtyOnHand);
        $("#itemPrice").val(itemPrice);
    });
}

function addToTable(item) {
    let newRow = `<tr>
        <td>${item.itemCode}</td>
        <td>${item.itemName}</td>
        <td>${item.itemQtyOnHand}</td>
        <td>${item.itemPrice}</td>
    </tr>`;

    $("#itemTable tbody").append(newRow);
}

function removeFromTable(itemCode) {
    $("#itemTable tbody tr").each(function () {
        let rowCode = $(this).find("td:first").text();
        if (rowCode === itemCode) {
            $(this).remove();
        }
    });
}

//----------------------------
function loadAllItems() {
    const items = itemModel.getAllItems(); // Get items from the model
    displayItems(items); // Display the items in the table
}

function displayItems(items) {
    const tbody = $("#itemTable tbody");
    tbody.empty(); // Clear the existing table rows

    items.forEach(item => {
        let row = `<tr>
            <td>${item.itemCode}</td>
            <td>${item.itemName}</td>
            <td>${item.itemQtyOnHand}</td>
            <td>${item.itemPrice}</td>
        </tr>`;

        tbody.append(row); // Append the row to the table body
    });
}
//----------------------------

function updateTable(item) {
    $("#itemTable tbody tr").each(function () {
        let rowCode = $(this).find("td:first").text();

        if (rowCode === item.itemCode) {
            $(this).find("td:eq(1)").text(item.itemName);
            $(this).find("td:eq(2)").text(item.itemQtyOnHand);
            $(this).find("td:eq(3)").text(item.itemPrice);
        }
    });
}

function codeValidated() {
    let isValid = true;
    let itemCode = $('#itemCode').val();
    if (!itemCode) {
        $("#itemCodeError").text("Please enter the Item Code");
        isValid = false;
    } else {
        $("#itemCodeError").text("");
    }
    return isValid;
}

function isItemValidated() {
    let isValid = true;

    let itemCode = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let itemQtyOnHand = $('#itemQty').val();
    let itemPrice = $('#itemPrice').val();

    if (!itemCode) {
        $("#itemCodeError").text("Please enter the Item Code");
        isValid = false;
    } else {
        $("#itemCodeError").text("");
    }
    if (!itemName) {
        $("#itemNameError").text("Please enter the Item Name");
        isValid = false;
    } else {
        $("#itemNameError").text("");
    }
    if (!itemQtyOnHand) {
        $("#itemQtyError").text("Please enter the Item Quantity");
        isValid = false;
    } else {
        $("#itemQtyError").text("");
    }
    if (!itemPrice) {
        $("#itemPriceError").text("Please enter the Item Price");
        isValid = false;
    } else {
        $("#itemPriceError").text("");
    }

    return isValid;
}


export function updateItemTableAfterOrder(updatedItems) {
    // Loop through each item and update the quantity in the table while leaving other details unchanged
    updatedItems.forEach(updatedItem => {
        // Find the table row corresponding to this item based on itemCode
        let row = $("#itemTable tbody tr").filter(function() {
            return $(this).find("td").first().text() === updatedItem.itemCode.toString();
        });

        // If the item row exists, update the itemQtyOnHand column (third column so eq(2))
        if (row.length > 0) {
            row.find("td").eq(2).text(updatedItem.itemQtyOnHand);
        }
    });

    console.log("Item table updated with latest item quantities.");
}



