$(document).ready(function () {
    // Hide all sections except home on page load
    $(".main-section").hide();
    $("#home-section").show();

    $(".nav-bar-btn").click(function () {
        let buttonName = $(this).text();

        if (buttonName === "Home") {
            $(".logo span").text("POS");
        }
        if (buttonName === "Customers") {
            $(".logo span").text("Customer Manage");
        }
        if (buttonName === "Items") {
            $(".logo span").text("Item Manage");
        }
        if (buttonName === "Orders") {
            $(".logo span").text("Order Manage");
        }
    });

    $("nav ul li a").click(function(event){
        event.preventDefault();
        let target = $(this).attr("href"); 
        $("html, body").animate({
            scrollTop: $(target).offset().top
        }, 800);
    });

    
    // Click event for navigation buttons
    $(".nav-bar-btn").click(function () {
        let target = $(this).parent().attr("href"); // Get target section
        $(".main-section").hide(); // Hide all sections
        $(target).show(); // Show selected section
        
        // Update the logo text based on the section
        let buttonName = $(this).text();
        if (buttonName === "Home") {
            $(".logo span").text("POS");
        } else if (buttonName === "Customers") {
            $(".logo span").text("Customer Manage");
        } else if (buttonName === "Items") {
            $(".logo span").text("Item Manage");
        } else if (buttonName === "Orders") {
            $(".logo span").text("Order Manage");
        }

        // Disable scrolling when a section is shown
        // $("html, body").css("overflow", "hidden");
    });

    $(".home-container a").click(function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        let target = $(this).attr("href"); // Get target section ID

        $(".main-section").hide();
        $(target).show();

        if (target === "#settings-section") {
            $(".logo span").text("Settings");
        } else if (target === "#customer-section") {
            $(".logo span").text("Customer Manage");
        } else if (target === "#item-section") {
            $(".logo span").text("Item Manage");
        } else if (target === "#order-section") {
            $(".logo span").text("Order Manage");
        }

        // $("html, body").css("overflow", "hidden");
    });

});