import { ordersArray } from '../db/DB.js';
import { updateCounts } from '../controller/HomeController.js';

export const orderModel = {
    saveOrder
}; 

function saveOrder(order) {
    let existingOrder = ordersArray.find(o => o.orderId.toString() === order.orderId.toString());

    if (existingOrder) {
        console.log(`Order with ID ${order.orderId} already exists. Cannot save duplicate.`);
        alert(`Order with ID ${order.orderId} already exists!`);
        return false;
    }

    ordersArray.push(order);
    console.log("Order saved:", order);
    updateCounts();
    return true;
}
