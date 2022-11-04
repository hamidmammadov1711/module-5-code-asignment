$(function () { // Same as document.addEventListener("DOMContentLoaded"...)
     //**Bu funksiya ile mobil versiyanin cokmesinin qarsisini almiw oluruq...
     
     // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
     $("#navbarToggle").blur(function (event) {
          var screenWidth = window.innerWidth;
          if (screenWidth < 768) {
               $("#bs-example-navbar-collapse-1").collapse('hide');
          }
     });     
});

(function (global) {
     var dc = {};

     var homeHtmlUrl = "snippets/home-snippet.html";
     var allCategoriesUrl = "https//davids-restaurant.herokuapp.com/categories.json";
     var categoriesTitleHtml = "snippets/categories-title-snippet.html";
     var categoryHtml = "snippets/category-snippet.html";
     var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
     var menuItemHtml = "snippets/menu-item.html";

     // Convinience function for inserting innerHTML for 'select'
     var insertHtml = function (selector, html) {
          var targetElem = document.querySelector(selector);
          targetElem.innerHTML = html;
     };

     // Show loading icon inside element identified by 'selector'.
     var showHtml = function (selector) {
          var targetElem = document.querySelector(selector);
          targetElem.innerHTML = html;
     };

     // Show loading icon inside element identified by 'selector'.
     var showLoading = function (selector) {
          var html = "<div class='text-center'>";
          html += "<img src='images/ajax-loader.gif'></div>";
          insertHtml(selector, html);
     }; //**Caliwmadigi ucun qeyd sekline alindi!

     // Return substitute of '{{propName}}'
     // with propValue in given 'string'
     var insertProperty = function (string, propName, propValue) {
          var propToReplace = "{{" + propName + "}}";
          string = string.replace(new RegExp(propToReplace, "g"), propValue);
          return string;
     }


     // Remove the class 'active' from home and switch to Menu button
     var switchMenuToActive = function () {
          // Remove 'active' from home button
          var classes = document.querySelector(#navHomeButton).className;
          classes = classes.replace(new RegExp("active", "g"), "");
          document.querySelector("#navMenuButton").className = classes;

          // Add 'active' to menu button if not already there
          classes = document.querySelector("#navMenuButton").className;
          if (classes.indexOf("active") == -1) {
               classes += " active";
               document.querySelector("#navMenuButton").className = classes;
          }
     };


     // On page load (before images or CSS)
     document.addEventListener("DOMContentLoaded", function (event) {

          // On first load, show home view
          showLoading("#main-content");
          $ajaxtils.sendGetRequest(homeHtml, function (responseText) {
               document.querySelector("#main-content").innerHTML = responseText;
          }, 
          false);
     });


// Load the menu categories view
// 'categoryShort' is a short_name for a category
dc.loadMenuItems = function (categoryShort) {
     showLoading("#main-content");
     $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort, buildAndShowMenuItemsHTML);
};


// Builds HTML for the categories page based on the data
// from the server
function buildAndShowMenuItemsHTML (categoryMenuItems) {
     // Load title snippet of categories page
     $ajaxUtils.sendGetRequest(menuItemsTitleHtml, 
          function (menuItemsTitleHtml) {
               // Retrieve single category snippets
               $ajaxUtils.sendGetRequest(menuItemHtml, function (menuItemHtml) {
                    var menuItemsViewHtml = buildMenuItemsViewHtml(          categoryMenuItems,              menuItemsTitleHtml,
                    menuItemHtml);
                    insertHtml("#main-content", menuItemsViewHtml);
               }, 
               false);
                        
     }, 
     false);
}


// Using categories data and snippets HTML
// build categories view HTML to be inserted page
function buildMenuItemsViewHTML(categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
     menuItemsTitleHtml = insertProperty(menumenuItemsTitleHtml, "name", categoryMenuItems.category.name);
     menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);

     var finalHtml = menuItemsTitleHtml;
     finalHtml += "<section class='row'>";

     // Loop over menu items
     var menuItems = categoryMenuItems.menu_items;
     var catShortName = categoryMenuItems.category.short_name;

     for (var i = 0; i <menuItems.length; i++){
          // Insert menu item values
          var html = menuitemHtml;

          html = insertProperty(html, "short_name", menuItems[i].short_name);

          html = insertProperty(html, "catShortName", catShortName);

          html = insertItemPrice(html, "price_small", menuItems[i].price_small);

          html = 
          insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);

          html = insertProperty(html, "description", menuItems[i].description);

     //     Add clearfix after every second menu item
          if (i % 2 != 0) {
               html += 
                    "<div class='clearfix visible-lg-block visible-md-block'></div>"
          }
          finalHtml += html;
     }

     finalHtml += "</section>";
     return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html, pricePropName, priceValue) {
     // if not specified, replace with empty string
     if (!priceValue) {
          return insertProperty(html, pricepropName, "");
     }

     priceValue = "$" + priceValue.toFixed(2);
     html = insertProperty(html, pricePropName, priceValue);
     return html;
}

// Appends portion name in parents if it exists


global.$dc = dc;
})(window);