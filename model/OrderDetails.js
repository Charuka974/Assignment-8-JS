import { orderDetailsArray } from '../db/DB.js';

export const orderDetailsModel = {
    saveOrderDetails,
    calculateSubtotal
};

function saveOrderDetails(orderDetails) {
    orderDetailsArray.push(orderDetails);
    console.log(orderDetailsArray);
}

function calculateSubtotal() {
    return orderDetailsArray.reduce((sum, item) => sum + item.total, 0);
}