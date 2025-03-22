import { updateCounts } from '../controller/HomeController.js';
import { updateItemTableAfterOrder } from '../controller/ItemController.js';

import { orderModel } from '../model/Orders.js';
import { orderDetailsModel } from '../model/OrderDetails.js';
import { customerModel } from '../model/Customer.js';
import { itemModel } from '../model/Item.js';
 

$(document).ready(function () {
    loadNextOrderId();

    $("#orderIdTxt").on("input", function () {
        let orderId = $(this).val().trim();  
        if (orderId) {
            searchOrder(orderId);  
        }
    });

    $("#customerChoice").click(function () {
        let select = $("#customerChoice");
    
        let customers = customerModel.getCustomerIds();
        let selectedValue = select.val();  // Get the currently selected value
    
        select.empty();
        select.append('<option value="">-- Select Customer --</option>');
    
        // Check if customers is an array
        if (!customers || !Array.isArray(customers)) {
            console.error("Error: customerIDs is not an array");
            return;
        }
    
        // Append options to the dropdown
        customers.forEach(id => {
            let customer = customerModel.findCustomerById(id);
            let option = $(`<option value="${id}">${customer.cusName}</option>`);  // Display customer name
    
            // If the customer id matches the selected value, set as selected
            if (id === selectedValue) {
                option.attr("selected", "selected");
            }
            select.append(option);
        });
    });
    $("#customerChoice").on("change", function () {
        let selectedValue = $(this).val();
    
        if (selectedValue) {
            $(this).find("option:selected").text(selectedValue);  // Change displayed text to the selected customer name
            setCusDetails(selectedValue);  
        } 
    });
    function setCusDetails(id) {
        let cusDetails = customerModel.findCustomerById(id);
        if (cusDetails) {
            $('#customerIdTxt').val(cusDetails.cusId);
            $('#customerNameTxt').val(cusDetails.cusName);
            $('#orderCusAddressTxt').val(cusDetails.cusAddress);
            $('#orderCusSalaryTxt').val(cusDetails.cusSalary);
        }
    }


    $("#itemChoices").click(function () {
    let select = $("#itemChoices");

    let items = itemModel.getItemCodes();
    let selectedValue = select.val(); 

    select.empty();
    select.append('<option value="">-- Select Item --</option>'); 

    if (!items || !Array.isArray(items)) {
        console.error("Error: itemCodes is not an array");
        return;
    }
    items.forEach(code => {
        let item = itemModel.findItemByCode(code);
        let option = $(`<option value="${code}">${item.itemName}</option>`); 

        if (code === selectedValue) {
            option.attr("selected", "selected");
        }

            select.append(option);
        });
    });
    $("#itemChoices").on("change", function () {
        let selectedValue = $(this).val();

        if (selectedValue) {
            $(this).find("option:selected").text(selectedValue);  
            setItemDetails(selectedValue); 
        }
    });
    function setItemDetails(code) {
        let itemDetails = itemModel.findItemByCode(code);
        if (itemDetails) {
            $('#orderItemCodeTxt').val(itemDetails.itemCode);
            $('#orderitemNameTxt').val(itemDetails.itemName);
            $('#orderItemPriceTxt').val(itemDetails.itemPrice);
            $('#onhandItemQtyTxt').val(itemDetails.itemQtyOnHand);
        }
    }

    // --------------- order process ----------------

    $('#addItem').click(function (event) {
        event.preventDefault();

        if (isOrderValidated()) {
            let orderItem = {
                orderId: $('#orderIdTxt').val(),
                itemCode: $('#orderItemCodeTxt').val(),
                itemName: $('#orderitemNameTxt').val(),
                itemPrice: parseFloat($('#orderItemPriceTxt').val()),
                itemQty: parseInt($('#orderQtyTxt').val()),
                total: parseFloat($('#orderItemPriceTxt').val()) * parseInt($('#orderQtyTxt').val())
            };

            orderDetailsModel.saveOrderDetails(orderItem);
            addToOrderTable(orderItem);
            updateTotal();
            clearOrderItemFields();
        }
    });

    $('#discountTxt').on('input', function () {
        updateTotal(); // Update total when discount changes
        updateBalance(); // Recalculate balance
    });

    $('#cashTxt').on('input', function () {
        updateBalance(); // Update balance when cash changes
    });

    $('#purchase').click(function (event) {
        event.preventDefault();
    
        if (isOrderFinalized()) {
            let order = {
                orderId: $('#orderIdTxt').val(),
                orderDate: $('#orderDateTxt').val(),
                customerId: $('#customerIdTxt').val(),
                cash: parseFloat($('#cashTxt').val()),
                discount: parseFloat($('#discountTxt').val()) || 0,
                balance: parseFloat($('#balanceTxt').val())
            };
    
            let isSaved = orderModel.saveOrder(order);
    
            if (isSaved) {
                // Reduce stock quantities for ordered items
                $('#ordersTable tbody tr').each(function () {
                    let itemCode = $(this).find('td:eq(0)').text();
                    let orderedQty = parseInt($(this).find('td:eq(3)').text());
    
                    let item = itemModel.findItemByCode(itemCode);
                    if (item) {
                        let newQtyOnHand = item.itemQtyOnHand - orderedQty;
                        
                        if (newQtyOnHand < 0) {
                            alert(`Not enough stock for item ${itemCode}`);
                            return;
                        }
    
                        // Update item quantity
                        itemModel.updateItem({
                            ...item,
                            itemQtyOnHand: newQtyOnHand
                        });
                    }
                });
    
                updateItemTableAfterOrder(itemModel.getUpdatedArray());
                alert("Order Placed Successfully!");
                resetOrderForm();
                updateCounts();
            }
        }
    });
    




});

function loadNextOrderId() {
    let nextOrderId = orderModel.getNextOrderId();
    $("#orderIdTxt").val(nextOrderId).prop("readonly", false);
}

function addToOrderTable(orderItem) {
    let newRow = `<tr>
        <td>${orderItem.itemCode}</td>
        <td>${orderItem.itemName}</td>
        <td>${orderItem.itemPrice.toFixed(2)}</td>
        <td>${orderItem.itemQty}</td>
        <td>${orderItem.total.toFixed(2)}</td>
    </tr>`;

    $("#ordersTable tbody").append(newRow);
}

function clearOrderItemFields() {
    $('#orderItemCodeTxt').val('');
    $('#orderitemNameTxt').val('');
    $('#orderItemPriceTxt').val('');
    $('#orderQtyTxt').val('');
}


function updateTotal() {
    let subtotal = orderDetailsModel.calculateSubtotal();
    let discount = parseFloat($('#discountTxt').val()) || 0;
    let total = subtotal - discount;

    $('#subTotal').text(total.toFixed(2)); // Subtotal should be Total - Discount
    $('#total').text(subtotal.toFixed(2)); // Total remains unchanged before discount

    updateBalance(); // Ensure balance updates when discount changes
}

function updateBalance() {
    let totalAfterDiscount = parseFloat($('#subTotal').text()) || 0;
    let cash = parseFloat($('#cashTxt').val()) || 0;
    let balance = cash - totalAfterDiscount;

    $('#balanceTxt').val(balance.toFixed(2)); // Auto-update balance field
}

function isOrderValidated() {
    let isValid = true;

    if (!$('#orderItemCodeTxt').val()) {
        $("#orderItemCodeTxtError").text("Enter Item Code");
        isValid = false;
    } else {
        $("#orderItemCodeTxtError").text("");
    }
    if (!$('#orderQtyTxt').val()) {
        $("#orderQtyTxtError").text("Enter Quantity");
        isValid = false;
    } else {
        $("#orderQtyTxtError").text("");
    }
    if (!$('#orderIdTxt').val()) {
        $("#orderIdError").text("Enter Order ID");
        isValid = false;
    } else {
        $("#orderIdError").text("");
    }

    return isValid;
}

function isOrderFinalized() {
    let isValid = true;

    if (!$('#orderIdTxt').val()) {
        $("#orderIdError").text("Enter Order ID");
        isValid = false;
    } else {
        $("#orderIdError").text("");
    }
    if (!$('#customerIdTxt').val()) {
        $("#customerIdTxtError").text("Select Customer");
        isValid = false;
    } else {
        $("#customerIdTxtError").text("");
    }
    if (!$('#orderDateTxt').val()) {
        $("#dateTxtError").text("Select the Date");
        isValid = false;
    } else {
        $("#dateTxtError").text("");
    }
    if (parseFloat($('#total').text()) <= 0) {
        $("#totalError").text("Total amount must be greater than 0");
        isValid = false;
    } else {
        $("#totalError").text("");
    }
    if (parseFloat($('#subTotal').text()) <= 0) {
        $("#subTotalError").text("SubTotal must be greater than 0");
        isValid = false;
    } else {
        $("#subTotalError").text("");
    }
    if (!$('#cashTxt').val()) {
        $("#cashTxtError").text("Enter Cash Amount");
        isValid = false;
    } else {
        $("#cashTxtError").text("");
    }
    if (!$('#balanceTxt').val()) {
        $("#balanceTxtError").text("Enter Balance");
        isValid = false;
    } else {
        $("#balanceTxtError").text("");
    }

    return isValid;
}

function resetOrderForm() {
    $('#order-section input').val('');

    $('#customerChoice').val('option0');
    $('#itemChoices').val('option0');

    $('#total').text('00.0');
    $('#subTotal').text('00.0');
    $('#balanceTxt').val('');

    $('.validateError').text('');

    $('#ordersTable tbody').empty();

}

function searchOrder(orderId) {
    let order = orderModel.findOrderById(orderId);  // Find order by ID
    if (order) {
        // If order is found, populate the order form fields
        $("#orderIdTxt").val(order.orderId);
        $("#orderDateTxt").val(order.orderDate);
        $("#customerIdTxt").val(order.customerId);

        console.log("Order found:", order);

        // Fetch the order details and display them
        let orderDetails = orderDetailsModel.findOrderDetailsByOrderId(orderId);
        if (orderDetails.length > 0) {
            console.log("Order Details:", orderDetails);

            // Clear the table before populating it
            $('#ordersTable tbody').empty();

            // Loop through order details and populate the table
            orderDetails.forEach(orderItem => {
                let item = itemModel.findItemByCode(orderItem.itemCode);
                let itemName = item ? item.itemName : "Item Not Found"; // Default value if item is not found
            
                let newRow = `<tr>
                    <td>${orderItem.itemCode}</td>
                    <td>${itemName}</td>
                    <td>${orderItem.itemPrice.toFixed(2)}</td>
                    <td>${orderItem.itemQty}</td>
                    <td>${orderItem.total.toFixed(2)}</td>
                </tr>`;
                $("#ordersTable tbody").append(newRow);
            });
            
            loadCustomerforOrderSearch(order.customerId);
            setTotalAndBalance(order);
        } else {
            console.log("No order details found.");
        }
    } else {
        console.log(`Order with ID ${orderId} not found.`);
    }
}

function setTotalAndBalance(order){
    $("#cashTxt").val(order.cash);
    $("#discountTxt").val(order.discount);
    $("#balanceTxt").val(order.balance);
}

function loadCustomerforOrderSearch(cusId){
    let customerId = cusId;

        if (customerId) {
            let customer = customerModel.findCustomerById(customerId);
            if (customer) {
                $('#customerNameTxt').val(customer.cusName);
                $('#orderCusAddressTxt').val(customer.cusAddress);
                $('#orderCusSalaryTxt').val(customer.cusSalary);
            } else {
                $('#customerNameTxt').val('');
                $('#orderCusAddressTxt').val('');
                $('#orderCusSalaryTxt').val('');
            }
        } else {
            $('#customerNameTxt').val('');
            $('#orderCusAddressTxt').val('');
            $('#orderCusSalaryTxt').val('');
        }
}
 