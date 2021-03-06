<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><g:message code='spring.security.ui.forgotPassword.title'/></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="layout" content="register"/>
	<r:require modules="bootstrap-css, app"/>
</head>
<body>
	<g:form action='forgotPassword' name="forgotPasswordForm" autocomplete='off'>
		<g:if test='${emailSent}'>
			<div>
				<h2>Importante:</h2>
				<p>
					Se a enviado un correo electrónico para cambiar su contraseña puede revisar su cuenta de correo 
					para continuar con el proceso de recuperacción de su clave de acceso al sistema
				</p>
				<g:link controller="login" action="index" class="btn btn-info">
					<span class="glyphicon glyphicon-chevron-left"></span>
					Regresar
				</g:link>
			</div>
		</g:if>
		<g:else>
			<h3>Recuparación de Contraseña</h3>
			<p>
				Debe ingresar su <strong>correo electronico</strong> correctamente
				para poder iniciar el proceso de restauración de su contraseña Olvidada.
			</p>

			<div class="form-group">
				<g:textField name="username" size="35" class='form-control' placeholder="Correo Electrónico" autofocus="true"/>
			</div>

			<input type="submit" id="submit" class="btn btn-primary" value="Restaurar Contraseña"/>
			
			<g:link controller="login" action="index" class="btn btn-default">
				<span class="glyphicon glyphicon-chevron-left"></span>
				Regresar
			</g:link>

		</g:else>
	</g:form>
</body>
</html>
