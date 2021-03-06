<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><g:layoutTitle default="Registro de Usuarios"/></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<r:layoutResources/>
</head>
<body  id="background">
	<div class="container" id="cont">
		<div class="row">
			<div class="col-md-4 col-md-offset-2">
				<g:render template="/layouts/appInfo"/>
			</div>
			
			<div class="col-md-4">
				<g:layoutBody/>
				<br>
				<g:if test="${flash.message}">
					<div class="alert alert-info">
						<a class="close" data-dismiss="alert" href="#">&times;</a>
						${flash.message}
					</div>
				</g:if>

				<g:hasErrors bean="${userInstance}">
					<div class="alert alert-info">
						<a class="close" data-dismiss="alert" href="#">&times;</a>
						<g:eachError bean="${userInstance}" var="us">
							<li id="err">
					 	 		<g:message error="${us}"/>
					 		</li>
						</g:eachError>
					</div>
				</g:hasErrors>
			</div>
		</div>
	</div>

	<g:render template="/layouts/footer"/>
	<r:layoutResources/>
</body>
</html>
