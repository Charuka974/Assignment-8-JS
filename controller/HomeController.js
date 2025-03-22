import { customersArray } from '../db/DB.js';
import { itemsArray } from '../db/DB.js';
import { ordersArray } from '../db/DB.js';

$(document).ready(function () {
    updateCounts();
});

export function updateCounts() {
    $("#customerCount").text(customersArray.length);
    $("#itemCount").text(itemsArray.length);
    $("#ordersCount").text(ordersArray.length);
}



