// const axios = require('axios');
// const $ = require('jquery');

$(document).ready(function () {
    $('select').material_select();
});

$("#remember_button").on("click", function (e) {
    e.preventDefault();
    axios.post("/api/check_user",
        {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val()
        })
        .then(function (response) {
            if (response.data === "N") {
                $("#user_err")
                    .removeClass("green-text")
                    .addClass("red-text")
                    .html("Sorry, we have not found you :(");
            } else {
                let obj = response.data[0];
                $("#user_err")
                    .removeClass("red-text")
                    .addClass("green-text")
                    .html("We found your last order :)");
                $("#first_name").val(obj.user_f_name);
                $("#last_name").val(obj.user_l_name);
                $("#city").val(obj.city);
                $("#postal_code").val(obj.postal_code);
                $("#phone").val(obj.phone_number);
                $("#province").val(obj.province);
                $("#food_select").val(obj.combo_id);
                if (obj.delivery === "T"){
                    $("#pickup").click();
                } else {
                    $("#delivery").click();
                }
                $("#comments").val(obj.comments);

                $("#province").material_select();
                $("#food_select").material_select();
            }
        })
});


$("#submit_order").on("click", function (e) {
    e.preventDefault();
    axios.post("/api/new_order",
        {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            city: $("#city").val(),
            postal_code: $("#postal_code").val(),
            phone_number: $("#phone").val(),
            province: $("#province").val(),
            food: $("#food_select").val(),
            delivery: $("input[name='group1']:checked").val(),
            comments: $("#comments").val(),
            order_date: Date.now()
        })
        .then(function () {
            console.log("Province", $("#province").val());
            console.log("Food", $("#food_select").val());

            $("#user_err").addClass("green-text").html("Your order has been sent");
            $("#first_name").val("");
            $("#last_name").val("");
            $("#city").val("");
            $("#postal_code").val("");
            $("#phone").val("");
            $("#comments").val("");
            $("#province").val(1);
            $("#food_select").val(1);
            $("#province").material_select();
            $("#food_select").material_select();
            setTimeout(() => {
                window.location.href = "/"
            }, 2000);
        });
});