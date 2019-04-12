let dataset = [];

function fetchDataset() {
    fetch('getDatasetToFilter')
        .then(response => response.json())
        .then(json => dataset = json)
        .catch(error => console.error(error.message));
}
