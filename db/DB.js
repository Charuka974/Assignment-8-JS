// export let customersArray = [];
// window.customersArray = customersArray; //Makes it accessible globally

// export let itemsArray = [];
// window.itemsArray = itemsArray;

// export let ordersArray = [];
// window.ordersArray = ordersArray;

// export let orderDetailsArray = [];
// window.orderDetailsArray = orderDetailsArray;



// Static arrays (no global window assignment)
export let customersArray = [
    { cusId: "C01-001", cusName: "John Doe", cusAddress: "123 Main St, Cityville, 10001", cusSalary: 50000 },
    { cusId: "C01-002", cusName: "Jane Smith", cusAddress: "456 Oak St, Townsville, 20002", cusSalary: 55000 },
    { cusId: "C01-003", cusName: "Bob Johnson", cusAddress: "789 Pine St, Villagetown, 30003", cusSalary: 60000 },
    { cusId: "C01-004", cusName: "Alice Brown", cusAddress: "101 Maple St, Springfield, 40004", cusSalary: 45000 },
    { cusId: "C01-005", cusName: "Charlie Davis", cusAddress: "202 Birch St, Greenfield, 50005", cusSalary: 52000 },
    { cusId: "C01-006", cusName: "Eve Wilson", cusAddress: "303 Cedar St, Riverside, 60006", cusSalary: 47000 },
    { cusId: "C01-007", cusName: "David Taylor", cusAddress: "404 Elm St, Lakeside, 70007", cusSalary: 63000 },
    { cusId: "C01-008", cusName: "Fiona Martinez", cusAddress: "505 Fir St, Seaside, 80008", cusSalary: 48000 },
    { cusId: "C01-009", cusName: "George Moore", cusAddress: "606 Willow St, Hilltop, 90009", cusSalary: 55000 },
    { cusId: "C01-010", cusName: "Hannah Lee", cusAddress: "707 Redwood St, Baytown, 10010", cusSalary: 51000 }
];

export let itemsArray = [
    { itemCode: "I00-001", itemName: "Laptop", itemQtyOnHand: 50, itemPrice: 1500.00 },
    { itemCode: "I00-002", itemName: "Smartphone", itemQtyOnHand: 200, itemPrice: 800.00 },
    { itemCode: "I00-003", itemName: "Tablet", itemQtyOnHand: 120, itemPrice: 600.00 },
    { itemCode: "I00-004", itemName: "Headphones", itemQtyOnHand: 150, itemPrice: 150.00 },
    { itemCode: "I00-005", itemName: "Smartwatch", itemQtyOnHand: 80, itemPrice: 250.00 },
    { itemCode: "I00-006", itemName: "Keyboard", itemQtyOnHand: 300, itemPrice: 100.00 },
    { itemCode: "I00-007", itemName: "Mouse", itemQtyOnHand: 500, itemPrice: 25.00 },
    { itemCode: "I00-008", itemName: "Monitor", itemQtyOnHand: 70, itemPrice: 350.00 },
    { itemCode: "I00-009", itemName: "Printer", itemQtyOnHand: 40, itemPrice: 120.00 },
    { itemCode: "I00-010", itemName: "USB Drive", itemQtyOnHand: 250, itemPrice: 20.00 }
];

export let ordersArray = [
    { orderId: "OID-001", customerId: "C01-001", orderDate: "2025-03-15", totalAmount: 3200.00 },
    { orderId: "OID-002", customerId: "C01-002", orderDate: "2025-03-16", totalAmount: 2000.00 },
    { orderId: "OID-003", customerId: "C01-003", orderDate: "2025-03-17", totalAmount: 1800.00 },
    { orderId: "OID-004", customerId: "C01-004", orderDate: "2025-03-18", totalAmount: 1500.00 },
    { orderId: "OID-005", customerId: "C01-005", orderDate: "2025-03-19", totalAmount: 2500.00 },
    { orderId: "OID-006", customerId: "C01-006", orderDate: "2025-03-20", totalAmount: 1200.00 },
    { orderId: "OID-007", customerId: "C01-007", orderDate: "2025-03-21", totalAmount: 4000.00 },
    { orderId: "OID-008", customerId: "C01-008", orderDate: "2025-03-22", totalAmount: 2200.00 },
    { orderId: "OID-009", customerId: "C01-009", orderDate: "2025-03-23", totalAmount: 2900.00 },
    { orderId: "OID-010", customerId: "C01-010", orderDate: "2025-03-24", totalAmount: 2100.00 }
];

export let orderDetailsArray = [
    { orderId: "OID-001", itemCode: "I00-001", quantity: 2, itemPrice: 1500.00, total: 3000.00 },
    { orderId: "OID-001", itemCode: "I00-002", quantity: 1, itemPrice: 800.00, total: 800.00 },
    { orderId: "OID-001", itemCode: "I00-003", quantity: 1, itemPrice: 600.00, total: 600.00 },
    { orderId: "OID-002", itemCode: "I00-003", quantity: 3, itemPrice: 600.00, total: 1800.00 },
    { orderId: "OID-002", itemCode: "I00-004", quantity: 2, itemPrice: 150.00, total: 300.00 },
    { orderId: "OID-003", itemCode: "I00-005", quantity: 1, itemPrice: 250.00, total: 250.00 },
    { orderId: "OID-003", itemCode: "I00-006", quantity: 1, itemPrice: 100.00, total: 100.00 },
    { orderId: "OID-004", itemCode: "I00-007", quantity: 3, itemPrice: 150.00, total: 450.00 },
    { orderId: "OID-004", itemCode: "I00-008", quantity: 2, itemPrice: 350.00, total: 700.00 },
    { orderId: "OID-004", itemCode: "I00-009", quantity: 1, itemPrice: 120.00, total: 120.00 },
    { orderId: "OID-005", itemCode: "I00-009", quantity: 2, itemPrice: 120.00, total: 240.00 },
    { orderId: "OID-005", itemCode: "I00-010", quantity: 1, itemPrice: 20.00, total: 20.00 },
    { orderId: "OID-006", itemCode: "I00-001", quantity: 4, itemPrice: 1500.00, total: 6000.00 },
    { orderId: "OID-006", itemCode: "I00-002", quantity: 2, itemPrice: 800.00, total: 1600.00 },
    { orderId: "OID-006", itemCode: "I00-003", quantity: 1, itemPrice: 600.00, total: 600.00 },
    { orderId: "OID-007", itemCode: "I00-003", quantity: 2, itemPrice: 600.00, total: 1200.00 },
    { orderId: "OID-007", itemCode: "I00-008", quantity: 3, itemPrice: 350.00, total: 1050.00 },
    { orderId: "OID-007", itemCode: "I00-007", quantity: 1, itemPrice: 25.00, total: 25.00 },
    { orderId: "OID-008", itemCode: "I00-005", quantity: 1, itemPrice: 250.00, total: 250.00 },
    { orderId: "OID-008", itemCode: "I00-006", quantity: 2, itemPrice: 100.00, total: 200.00 },
    { orderId: "OID-009", itemCode: "I00-007", quantity: 2, itemPrice: 25.00, total: 50.00 },
    { orderId: "OID-009", itemCode: "I00-008", quantity: 2, itemPrice: 350.00, total: 700.00 },
    { orderId: "OID-009", itemCode: "I00-009", quantity: 1, itemPrice: 120.00, total: 120.00 },
    { orderId: "OID-010", itemCode: "I00-009", quantity: 5, itemPrice: 120.00, total: 600.00 },
    { orderId: "OID-010", itemCode: "I00-010", quantity: 3, itemPrice: 20.00, total: 60.00 },
    { orderId: "OID-010", itemCode: "I00-001", quantity: 2, itemPrice: 1500.00, total: 3000.00 }
];
