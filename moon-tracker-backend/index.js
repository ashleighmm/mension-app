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
			console.log(err);
			res.status(500).send('You have not logged any symptoms');
			console.log(results)
		} else {
			res.status(200).send(results);
			console.log(results)
		}
	});
});

// create a new cycle 

app.post('/api/cycles/create', (req, res) => {
	if (req.body.start && req.body.end !== null || undefined) {
	connection.query(`INSERT INTO cycles (start, end) VALUES ("${req.body.start}", "${req.body.end}")`, function(err, results) {
		console.log(req.body)
		if (err) {
			console.log(err)
			res.status(500).send(err);
		} else if (req.body.start || req.body.end === null || undefined) {
			console.log("forbidden")
			res.status(403).send(err);
		} else {
			res.status(200).send("Cycle created");
		}
	});
}});
// create a new symptom log entry
app.post('/api/log/create', (req, res) => {
	console.log("hello from the backend");
	if (req.body.start && req.body.title !== null || undefined) {
	console.log("backend validation passed");
	connection.query(`INSERT INTO tracker (start, end, title) VALUES ("${req.body.start}", "${req.body.end}", "${req.body.title}")`, function(err, results) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else if (req.body.start || req.body.title === null || undefined) {
			console.log("forbidden", req.body)
			console.log(err);
			res.status(403).send(err);
		} else {
			res.status(200).send("log created");
		}
	});
}});

// get the list of cycles
app.get('/api/cycles', (req, res) => {
	connection.query('SELECT * FROM cycles', (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('You have not logged any symptoms');
			console.log(results)
		} else{
			res.status(200).send(results);
			console.log(results)
		}
	});
});

// Delete the logs
app.delete('/api/delete/logs', (req, res) => {
	connection.query(`TRUNCATE tracker`, function(err, results) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send("logs deleted");
		}
	});
	
});

// Delete the cycles
app.delete('/api/delete/cycles', (req, res) => {
connection.query(`TRUNCATE cycles`, function(err, results) {
	if (err) {
		console.log(err);
	} else {
		res.status(200).send("cycles deleted");
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
