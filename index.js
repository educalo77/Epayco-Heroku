const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PG_PORT || 5432;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
});
