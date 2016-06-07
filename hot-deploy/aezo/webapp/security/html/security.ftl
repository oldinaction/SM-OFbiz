${hello} <br />

------------<br />
<#if security.hasPermission("AEZO_VIEW", session)>
	您拥有AEZO_VIEW的权限！ 
<#else> 
	您没有AEZO_VIEW的权限！ 
</#if>
<br />

------------<br />
<#if security.hasEntityPermission("AEZO", "_CREATE", session)> 
	您拥有AEZO_CREATE的权限！
<#else> 
	您没有AEZO_CREATE的权限！ 
</#if>
<br />

------------<br />
<#if security.hasRolePermission("ORDERMGR", "_CREATE", "Demo1002", "BILL_FROM_VENDOR", session)> 
	您拥有BILL_FROM_VENDOR的角色权限！ 
<#else> 
	您没有BILL_FROM_VENDOR的角色权限！ 
</#if>
<br />

说明：判断角色权限，只对ORDERMGR、FACILITY、MARKETING可能有效（先判断当前用户有没有ORDERMGR_CREATE的实体权限(hasEntityPermission)，如果没有再使用后面两个参数进行判断）


