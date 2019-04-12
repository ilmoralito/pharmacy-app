let clients = null;

async function getClients() {
    const response = await fetch('clients', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    if (response.ok) {
        clients = await response.json();

        return;
    }

    console.error(response.status);
}

getClients();
