<div class="form-group">
    <label for="username">Nombre de usuario</label>
    <g:textField name="username" class="form-control" />
</div>
<div class="form-group">
    <label for="email">Email</label>
    <g:textField name="email" class="form-control" />
</div>
<div class="form-group">
    <label for="fullName">Nombre y apellido</label>
    <g:textField name="fullName" class="form-control" />
</div>
<div class="form-group">
    <label for="authority">Autoridad</label>
    <g:select name="authority" from="${authorities}" class="form-control" />
</div>
