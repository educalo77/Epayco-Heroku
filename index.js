const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(5432, () => {
    console.log("%s listening at 5432"); // eslint-disable-line no-console
  });
});
