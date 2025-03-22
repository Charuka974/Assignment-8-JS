import { customersArray } from '../db/DB.js';
import { updateCounts } from '../controller/HomeController.js';

export const customerModel = {
    saveCustomer,
    deleteCustomer,
    updateCustomer,
    findCustomerById,
    getCustomerIds

};

function saveCustomer(customer) {
    // Check if the customer ID already exists
    let existingCustomer = customersArray.find(c => c.cusId.toString() === customer.cusId.toString());

    if (existingCustomer) {
        console.log(`Customer with ID ${customer.cusId} already exists. Cannot save duplicate.`);
        alert(`Customer with ID ${customer.cusId} already exists!`);
        return false;
    }

    customersArray.push(customer);
    console.log(customersArray);
    updateCounts();
    console.log(`Customer with ID ${customer.cusId} saved.`);
    return true;
}


function deleteCustomer(cusId) {
    let index = customersArray.findIndex(customer => customer.cusId === cusId);

    if (index !== -1) {
        customersArray.splice(index, 1); // Remove customer from the array
        console.log(`Customer with ID ${cusId} removed.`);
        console.log(customersArray);
        updateCounts();
        return true;
    } else {
        console.log(`Customer with ID ${cusId} not found.`);
        return false;
    }
}

function updateCustomer(customer) {
    function matchCustomer(c) {
        return c.cusId === customer.cusId;
    }

    let existingCustomer = customersArray.find(matchCustomer);

    if (existingCustomer) {
        Object.assign(existingCustomer, customer);

        console.log(`Customer with ID ${customer.cusId} updated.`);
        console.log(customersArray);
        updateCounts();
        return true;
    } else {
        console.log(`Customer with ID ${customer.cusId} not found.`);
        return false;
    }
}

function findCustomerById(customerId) {
    customerId = customerId.toString().trim();

    let existingCustomer = customersArray.find(c => c.cusId.toString() === customerId);

    if (existingCustomer) {
        // console.log(`Customer with ID ${customerId} found.`);
        // console.log(existingCustomer);
        return existingCustomer;
    } else {
        console.log(`Customer with ID ${customerId} not found.`);
        return false;
    }
}

function getCustomerIds() {
    if (!Array.isArray(customersArray)) {
        console.error("Error: customersArray is not an array");
        return [];
    }
    return customersArray.map(customer => customer.cusId);
}