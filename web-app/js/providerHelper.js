async function fetchProviders() {
    const options = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const response = await fetch('providers', options);

    return await response.json();
}

