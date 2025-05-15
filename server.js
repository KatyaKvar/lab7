const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();


const buildPath = path.join(__dirname, 'client', 'build');
console.log('Build path:', buildPath); 


if (!fs.existsSync(buildPath)) {
	console.error('Error: Build folder does not exist at', buildPath);
} else {
	console.log('Build folder found!');
}


const indexPath = path.join(buildPath, 'index.html');
if (!fs.existsSync(indexPath)) {
	console.error('Error: index.html not found at', indexPath);
} else {
	console.log('index.html found!');
}


app.use(express.static(buildPath));


app.get('*', (req, res) => {
	console.log('Requested URL:', req.url);
	res.sendFile(indexPath, (err) => {
		if (err) {
			console.error('Error sending index.html:', err);
			res.status(500).send('Server error');
		}
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});