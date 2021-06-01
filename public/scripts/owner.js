// const { user_id } = require('../../server.js');
// const cookieParser = require('cookie-parser');

$(document).ready(function() {

  function createOrderElement(order, orderDetails) {
    let items = ''
    for (let item of orderDetails) {
      items += `<h3>${item.name}: ${item.quantity}<h3>`;
    }
    let seconds = 0;
    if (order.time_in_queue.seconds) {
      seconds = Math.floor(order.time_in_queue.seconds);
    }
    let minutes = 0;

    if (order.time_in_queue.minutes) {
      minutes += Math.floor(order.time_in_queue.minutes);
    }
    const cleanTime = `${minutes}: ${seconds}`

  return $(`
    <section id="order${order.order_id}" class="orders">
      <div class="ordersDiv">
        <h3>Order#${order.order_id}</h3>
        <h3>Time in Queue: ${cleanTime}</h3>
        <h3 class="customerName">${order.name}</h3>
        <p class="phoneNumber">
          ${order.phone_number}
        </p>
      </div>
      <div class="orderDetails">
        ${items}
      </div>
      <div class="control">
      <form id="alert">
        <input type="text" placeholder="Enter Time Alert via SMS">
        <button name="order_id">Send Alert</button>
      </form>
      <form class="completeOrder">
        <button>Bump Order</button>
      </form>
      </div>

   </section>
   <br>
    `)
  };

   function renderOrders(orders) {
          //  console.log('orders:', orders)
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i];
      console.log("orders[i].id", orders[i].id);
      $.ajax({
        url: `/api/order/${element.order_id}`,
        method: "GET"
      }).then((data) =>{
        console.log("element:", element);
        console.log("data:", data)
        const $item = createOrderElement(element, data.order);
        $('div#orders').append($item);
      })
    }
  }

  $.ajax({
    url: `/api/user`,
    method: "GET"
    }).then((data) =>{
      if (data.user.is_owner) {
        console.log("this is the owner");
        $('header').css('display', 'none');
        $('.notOwner').css('display', 'none');
        // $('nav').css('display', 'none')
        $('body').css('background', '#002E45')
        $('.isOwner').css('background', '#002E45');
        $('.login').css('display', 'none');
        $('.logout').css('display', 'none');
        $('.search').css('display', 'none');
        $('#checkoutTime').css('display', 'none');
        $('div#orders').css('display', 'block');

        setInterval(() => {
          $.ajax({
            url: `/api/orders`,
            method: "GET"
          }).then((data2) =>{
            console.log("data2", data2);
              $('div#orders').html('')
              renderOrders(data2.orders);

        })
  }, 5000)
    }
  }).catch((err) => console.log('err:', err.status))


  // $(document).on('submit', '#alert', function() {
  //   $.ajax({
  //     url:'/sendSMS/',
  //     method: 'GET',
  //     data: {
  //       number: result.number,
  //       message: `Your Order ${result.id} is being prepared!`
  //     }
  //   })
  // })




})
