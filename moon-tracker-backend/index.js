/* server to handle inbound API reqs */

const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());

// - body parser to handle json input
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);



// - get the entries from the symptom log
app.get('/api/log', (req, res) => {
	connection.query('SELECT * FROM tracker', (err, results) => {
		if (err) {
			res.status(500).send('You have not logged any symptoms');
			console.log(results)
		} else {
			res.status(200).send(results);
			console.log(results)
		}
	});
});


app.post('/api/log/create', (req, res) => {
	connection.query(`INSERT INTO tracker (date, note) VALUES ("${req.body.date}", "${req.body.note}")`, function(err, results) {
		console.log(req.body)
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send("Log created");
		}
	});
});


// - start the server
app.listen(port, (err) => {
	if (err) {
		throw new err('Something bad happened...');
	}
	console.log(`Server is listening on ${port}`);
});
