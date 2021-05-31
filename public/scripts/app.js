// const { user_id } = require('../../server.js');
// const cookieParser = require('cookie-parser');

$(document).ready(function () {
  // console.log(user_id);
// console.log(req.session.user_id);
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$("#app").click(function () {
  $('.Appetizers')[0].scrollIntoView({block: 'center'});
});
$("#main").click(function () {
  $('.Mains')[0].scrollIntoView({block: 'center'});
});
$("#desserts").click(function () {
  $('.Desserts')[0].scrollIntoView({block: 'center'});
});
$("#drinks").click(function () {
  $('.Drinks')[0].scrollIntoView({block: 'center'});
});
$("#white").click(function () {
  $('.Whites')[0].scrollIntoView({block: 'center'});
});
$("#red").click(function () {
  $('.Reds')[0].scrollIntoView({block: 'center'});
});
$("#beer").click(function () {
  $('.Beers')[0].scrollIntoView({block: 'center'});
});
$("#cocktails").click(function () {
  $('.Cocktails')[0].scrollIntoView({block: 'center'});
});


//returns full HTML structure a single menu item box
function createMenuElement(menuData) {
  return $(`
    <section id="${menuData.id}" class="menu_item ${menuData.category}">
      <div class="menu_item_img">
        <img src="${menuData.thumbnail_picture_url}">
      </div>
      <div class="nameDescription">
        <h3 class="menu-item-name">${menuData.name}</h3>
        <p class="menu_item_description">
        ${menuData.description}
        </p>
      </div>
      <div class="menu-item-add">
      <form id="${menuData.id}" class="menu-item-form">
      <h3 class="menu-item-price">${menuData.price}</h3>
        <input name="${menuData.id}" placeholder="quantity" type="text"></input>
        <button class="menu-item-button" type="submit">Add To Order</button>
      </form>
      </div>
   </section>
    `)
  };

  //loop through each obj element in the array and add the returned HTML structure to the main container
  function renderMenu(menuData) {

    for (let i = 0; i < menuData.length; i++) {
      const element = menuData[i];

      const $item = createMenuElement(element);
      if ((i>0) && (menuData[i].category !== menuData[i-1].category)){
        if (menuData[i].category === 'Whites') {
          $('div.menu').append(`<h1 class="Drinks">Drinks</h1>`);
        }
        $('div.menu').append(`<h1 class="${menuData[i].category}">${menuData[i].category}</h1>`);
      }
      if (i === 0) {
        $('div.menu').append(`<h1 class="${menuData[i].category}">${menuData[i].category}</h1>`);
      }

      $('div.menu').append($item);
    }

  }

  //ajax get request to server returns menu_items data and call rendermenu functiong with it
  function loadData() {
    $.ajax({
      url: "/api/menu",
      method: "GET",
    }).then((result) => {
      renderMenu(result.menu);
    })
  };

  //initiates menu_items data loading on page load
  loadData();
  let isStarted = false;
  console.log(isStarted);

  const startOrder = () => {
    if (isStarted === false) {
      $.ajax({
        url: "/api/orders",
        method: "POST",
      }).then((result) => {
        console.log("startOrderResult", result);
      })

    }
    isStarted = true;
  }
  startOrder();
  // Object.keys(req.body)[0], req.body[Object.keys(req.body)[0]]

  const addToOrderElement = (orderInfo) => {
    `<div class="menuItemsOrder">
    <h5 class="quantity">${orderInfo[Object.keys(orderInfo)[0]]}</h5>
    <h5 class="nameOfFoodItem">${Object.keys(orderInfo)}</h5>
    <h5 class="price">${'asdf'}</h5>
    </div>`
  }
    // let forms = document.getElementsBy('.menu-item-form');


  $(document).on('submit', 'form.menu-item-form', function(event) {
    console.log('STARTED AJAX',event);
    event.preventDefault();
    let data = $(this).serialize("");
    const text = decodeURIComponent(data)
    console.log("data", text)
    $.ajax({
      url: "/api/order",
      method: "POST",
      data: text
    }).then((result) => {
      console.log("YEAY:", result);
    }).catch((err) => {
      err
    })
  })

//   $(document).on('submit','form.menu-item-form', function(event) {
//     console.log('STARTED AJAX',event);
//   event.preventDefault();
//   let data = $(this).Val();
//   $.ajax({
//     url: "/api/order",
//     method: "POST",
//   }).then((result) => {
//     console.log("YEAY:", result);
//   }).catch((err) => {
//     err
//   })
// })

  // const addToOrder = () => {

    // }

     //ajax request onClick for login button at top of page

    $('.login').on('click', (req) => {
      console.log(req);
      // let user_id = req.session.user_id;
      $.ajax({
       url: `/login/3`,
       method: "GET"
     }).then(() => {
       $('.loginLogout').html('<button class="logout">Logout</button>')
      }).catch((err) => {
        console.log(err);
      })
    })

   $('.logout').on('click', () => {
    $.ajax({
    url: `/logout`,
    method: "GET"
    }).then(
    $('.loginLogout').html('<button class="login">Login</button>')
   )
   })



})
