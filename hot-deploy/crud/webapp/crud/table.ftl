<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>查询</title>
  </head>
  <body>
    <a href="create" target="_blank">新增</a>
    <table>
    	<thead>
    		<tr>
    			<th>id</th>
    			<th>用户名</th>
    			<th>密码</th>
    			<th>个人说明</th>
    			<th>操作</th>
    		</tr>
    	</thead>
    	<tbody>
    		<#list crudPersonList?if_exists as item>
    		<tr>
    			<td>${(item.id)!}</td>
    			<td>${(item.username)!}</td>
    			<td>${(item.password)!}</td>
    			<td>${(item.description)!}</td>
    			<td>
    				<a href="update?id=${(item.id)!}" target="_blank">修改</a>&nbsp;
    				<a href="deleteCrudPerson?id=${(item.id)!}">删除</a>
    			</td>
    		</tr>
    		</#list>
    	</tbody>
    </table>
    
  </body>
</html>