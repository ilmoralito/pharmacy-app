document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', showDetail);

    function showDetail(event) {
        const target = event.target;

        if (target.nodeName === 'A' && target.hasAttribute('data-presentations')) {
            event.preventDefault();

            const tr = target.closest('tr');

            if (!tr.nextElementSibling || !tr.nextElementSibling.classList.contains('presentation')) {
                const node = document.createElement('tr');
                const td = document.createElement('td');
                const presentation = parsePresentation(JSON.parse(target.dataset.presentations));

                node.className = 'presentation';
                td.colSpan = 5;

                td.innerHTML = presentation;

                node.appendChild(td);

                tr.parentNode.insertBefore(node, tr.nextSibling);

                return;
            }

            tr.nextElementSibling.remove();
        }

    }

    function parsePresentation(presentations) {
        return presentations.map(presentation => `
            <p>${presentation.name}</p>

            <ul>
                ${presentation.measures.map(measure => `<li>${measure}</li>`).join('')}</ul>
            </ul>`
        ).join('')
    }
});

