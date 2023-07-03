const express = require('express');
const app = express();
const port = 5000;

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTablePeople = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(createTablePeople);

const sql = `INSERT INTO people(name) values('João Vitor Ianuci')`;
connection.query(sql);
connection.end();

app.get('/', (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection(config);
    connection.query('SELECT * FROM people', (err, result) => {
        if (err) throw err;
        connection.end();
        console.log(result);
        let html = "<h1>Full Cycle Rocks!</h1>";
        html += "<ul>";
        result.forEach(element => {
            html += "<li>" + element.name + "</li>";
        });
        html += "</ul>";
        res.status(200).send(html);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));