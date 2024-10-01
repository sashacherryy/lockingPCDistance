document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const lockButton = document.getElementById('lockButton');

    const serverUrl = 'http://192.168.x.x:3001/lock'; // local ipv4 + server port + /lock *local ipv4 you can find in Win + r -> CMD -> ipconfig

    lockButton.addEventListener('click', function() {
        fetch(serverUrl, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    statusDiv.textContent = 'Status: Workstation Locked';
                } else {
                    statusDiv.textContent = 'Status: Error locking workstation';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusDiv.textContent = 'Status: Error occurred';
            });
    });
});
