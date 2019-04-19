document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');
    const form = document.forms.form;

    root.addEventListener('click', handleClick);

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        saveUser();
    }

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName === 'A') {
            const row = target.closest('tr');
            const [username, email, fullName, enabled, authority] = [
                ...row.cells
            ];

            if (target.textContent === 'Editar') {
                target.textContent = 'Confirmar';

                username.innerHTML = createInput({
                    id: 'username',
                    defaultValue: username.textContent
                });
                email.innerHTML = createInput({
                    id: 'email',
                    defaultValue: email.textContent
                });
                fullName.innerHTML = createInput({
                    id: 'fullName',
                    defaultValue: fullName.textContent
                });
                enabled.innerHTML = createSelect({
                    values: ['Activo', 'No activo'],
                    id: 'enabled',
                    defaultValue: enabled.textContent
                });
                authority.innerHTML = createSelect({
                    values: ['ROLE_ADMIN', 'ROLE_USER'],
                    id: 'authority',
                    defaultValue: authority.textContent
                });

                return;
            }

            const newUsername = username.querySelector('input').value;
            const newEmail = email.querySelector('input').value;
            const newFullName = fullName.querySelector('input').value;
            const newEnabled = enabled.querySelector('select').value;
            const newAuthority = authority.querySelector('select').value;

            const formData = new FormData();

            formData.append('username', newUsername);
            formData.append('email', newEmail);
            formData.append('fullName', newFullName);
            formData.append('enabled', newEnabled);
            formData.append('authority', newAuthority);

            const options = {
                method: 'POST',
                body: formData
            };

            fetch(`users/${target.id}`, options)
                .then(response => response.json())
                .then(json => {
                    if (json.ok) {
                        username.innerHTML = json.user.username;
                        email.innerHTML = json.user.email;
                        fullName.innerHTML = json.user.fullName;
                        enabled.innerHTML = json.user.enabled;
                        authority.innerHTML = json.user.authority;

                        target.textContent = 'Editar';

                        return;
                    }

                    alertErrors(json.errors.errors);
                });
        }
    }

    function saveUser() {
        const formData = new FormData(form);
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('users', options)
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    fetchResource('users')
                        .then(users => {
                            cleanInputs(form, 'authority');

                            renderUsers(users);

                            cleanErrors();
                        })
                        .catch(error => console.error(error.message));

                    return;
                }

                renderErrors(json.errors.errors);
            });
    }

    function renderUsers(users) {
        const table = createTable(users);

        root.innerHTML = table;
    }

    function createTable(users) {
        const rows = users.map(userToRowView).join('');

        return `<table class="table table-hover table-bordered">
            <col width="20%">
            <col width="20%">
            <col width="33%">
            <col width="7%">
            <col width="10%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Autoridad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
    }

    function userToRowView(user) {
        return `<tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.fullName}</td>
            <td>${user.enabled}</td>
            <td>${user.authority}</td>
            <td class="text-center">
                <a href="#" id="${user.id}">Editar</a>
            </td>
        </tr>`;
    }
});
