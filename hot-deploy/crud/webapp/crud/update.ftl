<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>修改</title>
  </head>
  <body>
    
    <form action="updateCrudPerson" method="post">
    	<input type="text" name="id" value="${(crudPerson.id)!}"/>
    	<input type="text" name="username" value="${(crudPerson.username)!}"/>
    	<input type="text" name="password" value="${(crudPerson.password)!}"/>
    	<input type="text" name="description" value="${(crudPerson.description)!}"/>
    	<input type="submit" value="提交"/>
    </form>
    
  </body>
</html>