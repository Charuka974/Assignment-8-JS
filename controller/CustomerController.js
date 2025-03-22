import { customerModel } from '../model/Customer.js';

$(document).ready(function () {
    handleRowClick();

    $('#cus-save').click(function (event) {
        event.preventDefault();

        if (isValidated()) {
            let customer = {
                cusId: $('#customerId').val(),
                cusName: $('#customerName').val(),
                cusAddress: $('#customerAddress').val(),
                cusSalary: $('#customerSalary').val()
            };
            
            customerModel.saveCustomer(customer);
            addToTable(customer); 
            $(".customer-form")[0].reset();
        }
    });

    $('#cus-remove').click(function (event) {
        event.preventDefault();
        let cusId = $('#customerId').val();

        if (!cusId) {
            $("#cusIdError").text("Please enter the Customer ID to delete.");
            return;
        } else {
            $("#cusIdError").text("");
        }

        let isDeleted = customerModel.deleteCustomer(cusId);

        if (isDeleted) {
            removeFromTable(cusId); 
            console.log("Customer deleted successfully!");
            $(".customer-form")[0].reset();
        } else {
            alert("Customer ID not found!");
        }
    });

    $('#cus-update').click(function (event) {
        event.preventDefault();
    
        if (idValidated()) {
            let customer = {
                cusId: $('#customerId').val(),
            };
    
            let cusName = $('#customerName').val();
            let cusAddress = $('#customerAddress').val();
            let cusSalary = $('#customerSalary').val();
    
            if (cusName) customer.cusName = cusName;
            if (cusAddress) customer.cusAddress = cusAddress;
            if (cusSalary) customer.cusSalary = cusSalary;
    
            let isUpdated = customerModel.updateCustomer(customer);
    
            if (isUpdated) {
                updateTable(customer);
                console.log("Customer updated successfully!");
                $(".customer-form")[0].reset();
            } else {
                alert("Customer ID not found! Unable to update.");
            }
        }
    });

    $('#cus-clear-all').click(function (event) {
        event.preventDefault();
        $(".customer-form")[0].reset();
    });
    
    $('#cus-get-all').click(function (event) {
        event.preventDefault();
    
        if (idValidated()) {
            let cusId = $('#customerId').val().trim();
    
            let foundCustomer = customerModel.findCustomerById(cusId);
    
            if (foundCustomer) {
                console.log("Customer Found!", foundCustomer);
                $("#customerId").val(foundCustomer.cusId);
                $("#customerName").val(foundCustomer.cusName);
                $("#customerAddress").val(foundCustomer.cusAddress);
                $("#customerSalary").val(foundCustomer.cusSalary);
            } else {
                alert("Customer ID not found!");
            }
        }
    });
    

});

function handleRowClick() {
    $(document).on("click", "#customerTable tbody tr", function () {
        let cusId = $(this).find("td:eq(0)").text();
        let cusName = $(this).find("td:eq(1)").text();
        let cusAddress = $(this).find("td:eq(2)").text();
        let cusSalary = $(this).find("td:eq(3)").text();

        $("#customerId").val(cusId);
        $("#customerName").val(cusName);
        $("#customerAddress").val(cusAddress);
        $("#customerSalary").val(cusSalary);
    });
}

function addToTable(customer) {
    let newRow = `<tr>
        <td>${customer.cusId}</td>
        <td>${customer.cusName}</td>
        <td>${customer.cusAddress}</td>
        <td>${customer.cusSalary}</td>
    </tr>`;

    $("#customerTable tbody").append(newRow);
}

function removeFromTable(cusId) {
    $("#customerTable tbody tr").each(function () {
        let rowId = $(this).find("td:first").text();
        if (rowId === cusId) {
            $(this).remove();
        }
    });
}

function updateTable(customer) {
    $("#customerTable tbody tr").each(function () {
        let rowId = $(this).find("td:first").text();

        if (rowId === customer.cusId) {
            $(this).find("td:eq(1)").text(customer.cusName);
            $(this).find("td:eq(2)").text(customer.cusAddress);
            $(this).find("td:eq(3)").text(customer.cusSalary);
        }
    });
}

function idValidated() {
    let isValid = true;
    let cusId = $('#customerId').val();
    if (!cusId) {
        $("#cusIdError").text("Please enter the Customer ID");
        isValid = false;
    } else {
        $("#cusIdError").text("");
    }
    return isValid;
}

function isValidated() {
    let isValid = true;

    let cusId = $('#customerId').val();
    let cusName = $('#customerName').val();
    let cusAddress = $('#customerAddress').val();
    let cusSalary = $('#customerSalary').val();

    if (!cusId) {
        $("#cusIdError").text("Please enter the Customer ID");
        isValid = false;
    } else {
        $("#cusIdError").text("");
    }
    if (!cusName) {
        $("#cusNameError").text("Please enter the Customer Name");
        isValid = false;
    } else {
        $("#cusNameError").text("");
    }
    if (!cusAddress) {
        $("#cusAddressError").text("Please enter the Customer Address");
        isValid = false;
    } else {
        $("#cusAddressError").text("");
    }
    if (!cusSalary) {
        $("#cusSalaryError").text("Please enter the Customer Salary");
        isValid = false;
    } else {
        $("#cusSalaryError").text("");
    }

    return isValid;
}
