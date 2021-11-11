const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query(
    `select * from urustani.bins limit 5`,
    (err,res) => {
        return console.log(res)
    }
)

