
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors'); 
const app = express();
const port = 3001; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 

app.post('/lock', (req, res) => {
    console.log('Lock request received.');

    const lock = spawn('C:\\Windows\\System32\\rundll32.exe', ['user32.dll,LockWorkStation']);

    lock.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    lock.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    lock.on('error', (error) => {
        console.error(`Error locking workstation: ${error.message}`);
        return res.status(500).json({ message: 'Error locking workstation' });
    });

    lock.on('exit', (code) => {
        console.log(`Lock command exited with code: ${code}`);
        if (code === 0) {
            res.json({ message: 'Workstation locked' });
        } else {
            res.status(500).json({ message: 'Error locking workstation' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
