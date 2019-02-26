let presentations;

function fetchPresentations() {
    fetch('presentations?format=json')
        .then(response => response.json())
        .then(json => presentations = json)
        .catch(error => console.error(error.message()));
}