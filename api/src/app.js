require("dotenv").config();
const app = require("./config/server");
const db = require("./config/database");

db.getConnection().then(() => {
    console.log("database successfully connected");
    app.listen(process.env.APP_PORT, () => {
        console.log(`server started at http://localhost:${process.env.APP_PORT}`);
    });
});