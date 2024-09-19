const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'b2f8c8e9b6c7e0d4f3b2d6e8a7e0c4a5b9f3c8d7e2f9b3c7a5d8e9a0f2b6c7e8d',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

function ensureAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        return next();
    }
    res.redirect('/');
}

const validUsername = 'BobAdmin';
const validPassword = 'Y0uG0tMe#Unlock!';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUsername && password === validPassword) {
        req.session.authenticated = true;
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
});

app.get('/protected/*', ensureAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, 'protected', req.params[0]);
    res.sendFile(filePath);
});

app.get('/backup/files', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'backup', 'files.html'));
});

app.get('/backup/file.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'backup', 'file.txt'));
});

app.get('/Downloads/network', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Downloads', 'network.html'));
});

app.get('/Downloads/passwords', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Downloads', 'passwords.html'));
});

app.get('/security/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'security', 'admin.html'));
});

app.get('/security/key', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'security', 'key.html'));
});

app.get('/security/logs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'security', 'logs.html'));
});

app.get('/uploads/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'uploads', 'file.html'));
});

app.get('/uploads/photo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'uploads', 'photo.html'));
});

app.get('/uploads/image.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'uploads', 'image.png'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});