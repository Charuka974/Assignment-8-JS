import { customersArray } from '../db/DB.js';
import { itemsArray } from '../db/DB.js';
import { ordersArray } from '../db/DB.js';

export function updateCounts() {
    $("#customerCont").text(customersArray.length);
    $("#itemCont").text(itemsArray.length);
    $("#ordersCont").text(ordersArray.length);
}
