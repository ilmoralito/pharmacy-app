$(document).ready(function() {
    $("#from").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $("#to").datepicker({
        dateFormat: "yy-mm-dd"
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const applyFilterButton = document.querySelector('#applyFilter');
    const filterButton = document.querySelector('#filterButton');
    const toddler = document.querySelector('#toddler');

    applyFilterButton.addEventListener('click', handleApplyFilter);

    filterButton.addEventListener('click', toggle);

    function handleApplyFilter(event) {
        event.preventDefault();

        const formData = getFormData();
        const data = new FormData(document.forms.form)

        fetch('/pharmacyApp/sale/filter', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(json => {
            if (!json.length) {
                alert('Sin resultados que mostrar');

                filterButton.textContent = 'Filtrar';

                return;
            }

            filterButton.textContent = 'Filtrar ...';

            syncTable(json);
        })
        .catch(error => console.error(error));
    }

    function syncTable(sales) {
        const root = document.querySelector('table tbody');
        const rows = sales.map(toRow).join('');

        root.innerHTML = rows;
    }

    function toRow(sale, index) {
        return `<tr>
            <td>
                <a href="show/${sale.id}">${index + 1}</a>
            </td>
            <td>${sale.hour}</td>
            <td>${sale.client ? sale.client.fullName : ''}</td>
            <td>${sale.balance}</td>
            <td>${sale.typeOfPurchase}</td>
            <td>${sale.canceled ? 'Si' : ''}</td>
            <td>${sale.user.fullName}</td>
        </tr>`;
    }

    function getFormData() {
        const formData = new FormData();
        const form = document.forms.form;
        const elements = [...form.elements].filter(element => element.nodeName !== 'BUTTON' && element.getAttribute('type') !== 'hidden');

        elements.forEach(element => {
            if (element.type === 'checkbox') {
                formData.append(element.name, element.checked);
            } else if (element.nodeName === 'SELECT') {
                formData.append(element.name, [...element.selectedOptions].map(option => option.value));
            } else {
                formData.append(element.name, element.value);
            }
        });

        return formData;
    }

    function toggle() {
        const toddler = document.querySelector('.toddler');

        toddler.style.left = toddler.style.left === '0px' ? '-400px' : '0px';
    }
});
