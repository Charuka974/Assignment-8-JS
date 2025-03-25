import { ordersArray } from '../db/DB.js';
import { updateCounts } from '../controller/HomeController.js';

export const orderModel = {
    saveOrder,
    getNextOrderId,
    findOrderById
}; 

function saveOrder(order) {
    let existingOrder = ordersArray.find(o => o.orderId.toString() === order.orderId.toString());

    if (existingOrder) {
        console.log(`Order with ID ${order.orderId} already exists. Cannot save duplicate.`);
        alert(`Order with ID ${order.orderId} already exists!`);
        return false;
    }

    
    if (!order.cash) order.cash = 0.00; 
    if (!order.discount) order.discount = 0.00;
    if (!order.balance) order.balance = 0.00; 

    ordersArray.push(order);
    console.log("Order saved:", order);
    updateCounts();
    return true;
}



function getNextOrderId() {
    if (ordersArray.length === 0) {
        return "OID-001";
    }

    let maxId = Math.max(
        ...ordersArray.map(order => parseInt(order.orderId.split("-")[1], 10))
    );

    let nextId = maxId + 1; 
    return `OID-${String(nextId).padStart(3, "0")}`; 
}  

function findOrderById(orderId) {
    let order = ordersArray.find(o => o.orderId === orderId);
    return order || null;  
}
