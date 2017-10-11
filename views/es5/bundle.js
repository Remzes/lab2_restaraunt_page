/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);