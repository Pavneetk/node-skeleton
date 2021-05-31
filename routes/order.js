const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let query = `SELECT menu_items.name, quantity, price FROM menu_items_orders JOIN menu_items ON menu_items.id = menu_item_id WHERE order_id = $1;`
    console.log(query);
    db.query(query, [req.params.id])
      .then(data => {
        const order = data.rows;
        res.json({ order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/", (req, res) => {
  // CHANGE THE USER ID TO COOKIES (REQ.SESSION?)
  let query = ` INSERT INTO menu_items_orders (order_id, menu_item_id, quantity) VALUES((SELECT orders.id FROM orders JOIN users ON users.id = user_id WHERE status = 'open' AND users.id = $1), (SELECT menu_items.id FROM menu_items GROUP BY menu_items.id HAVING menu_items.id = $2), $3) RETURNING order_id; `
  let options = [req.session.user_id, Object.keys(req.body)[0], req.body[Object.keys(req.body)[0]]];
  console.log("options: ", options);
  console.log("query: ", query);
  db.query(query, options)
    .then(data => {
      console.log(data);
      const addToOrder = data.rows;
      res.json({ addToOrder });
    })
    .catch(err => {
      console.log(err.message)
      res
        .status(500)
        .json({ error: err.message });
    });
});
  return router;
};


