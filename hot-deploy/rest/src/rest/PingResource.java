package rest;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import javolution.util.FastList;
import javolution.util.FastMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.ofbiz.entity.DelegatorFactory;
import org.ofbiz.entity.GenericDelegator;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.entity.jdbc.ConnectionFactory;

import rest.SmStringUtils;

/**
 * 不需要验证登录,程序启动方式不能以start-debug启动,要以start启动？
 * @author smalle Email:oldinaction@qq.com
 * @date 2016年1月28日 下午4:27:20
 */
@Path("/restful")
public class PingResource {
 
    @GET
    @Produces("text/plain")
    @Path("{str}")
    public Response restDemo(@PathParam("str") String str) {
        GenericDelegator delegator = (GenericDelegator) DelegatorFactory.getDelegator("default");
        
        return sqlRequest(delegator, str);

    }
    
    
    /**
     * 使用请求参数为json格式(key:表中的字段，value:字段的值)
     * 访问方式：http://localhost:8080/rest/restful/{"id":"10060"}
     * @param delegator
     * @param jsonStr
     * @return
     */
    @SuppressWarnings("unused")//取消警告
	private static Response jsonRequest(GenericDelegator delegator, String jsonStr) {
    	Map<String, Object> paramMap = SmStringUtils.parseJsonStr2Map(jsonStr);
        try {
			GenericValue gv = delegator.findOne("SmPerson", paramMap, false);
			System.out.println(gv);
			
			if(null != gv){
				String  str = JSONObject.fromObject(gv).toString();
				if(null != str){
					return Response.ok("Response:\n" + str).type("text/plain").build();
				} else {
					return Response.ok("Response:\n" + "null").type("text/plain").build();
				}
			} else {
				return Response.ok("Response:\n" + "null").type("text/plain").build();
			}
		} catch (GenericEntityException e) {
			e.printStackTrace();
			return Response.serverError().entity(e.toString()).build();
		}
	}
    
    /**
     * 使用源生的JDBC方式
     * 访问方式：http://localhost:8080/rest/restful/select * from sm_person
     * @param delegator
     * @param sql
     * @return
     */
    private static Response sqlRequest(GenericDelegator delegator, String sql) {
    	Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
    	//获得gropuHelperName  
        String groupHelperName = delegator.getGroupHelperName("org.ofbiz");//这个org.ofbiz是写在entityengine.xml的文件中的   
		try {
			conn = ConnectionFactory.getConnection(groupHelperName);
	        stmt = conn.createStatement();  
	        rs = stmt.executeQuery(sql);
	        Map<String, Object> map = FastMap.newInstance();
	        List<Map<String, Object>> list = FastList.newInstance();
	        while(rs.next()){
	        	map.put("id", rs.getString("id"));
	        	map.put("username", rs.getString("username"));
	        	map.put("password", rs.getString("password"));
	        	map.put("description", rs.getString("description"));
	        	list.add(map);
	        }
	        
	        if(list.size() > 0){
	        	JSONArray  jsonObj = JSONArray .fromObject(list);
	        	if(null != jsonObj){
	        		return Response.ok("Response:\n" + jsonObj.toString()).type("text/plain").build();
	        	} else {
	        		return Response.ok("Response:\n" + "null").type("text/plain").build();
	        	}
	        } else {
	        	return Response.ok("Response:\n" + "null").type("text/plain").build();
	        }
		} catch (GenericEntityException e) {
			e.printStackTrace();
			return Response.serverError().entity(e.toString()).build();
		} catch (SQLException e) {
			e.printStackTrace();
			return Response.serverError().entity(e.toString()).build();
		}
	}
    
    
}
