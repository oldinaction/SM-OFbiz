package cn.aezo.service;

import java.util.List;
import java.util.Map;

import javolution.util.FastList;

import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.ServiceUtil;

public class Eca {
	// 新增用户
	public static Map<String, Object> createSmPersonOfServiceSeca(DispatchContext ctx, Map<String, ? extends Object> context) throws GenericEntityException {
		Map<String, Object> results = ServiceUtil.returnSuccess();
		Delegator delegator = ctx.getDelegator();
		
		String id = delegator.getNextSeqId("SmPerson");
		GenericValue gv = delegator.makeValue("SmPerson", UtilMisc.toMap("id", id));
		gv.setNonPKFields(context);
		
		GenericValue newGv = delegator.create(gv);
		results.put("id", newGv.getString("id"));
		
		return results;
	}
	
	// 新增用户的默认爱好
	public static Map<String, Object> createSmPersonHobbyOfServiceSeca(DispatchContext ctx, Map<String, ? extends Object> context) throws GenericEntityException {
		Map<String, Object> results = ServiceUtil.returnSuccess();
		Delegator delegator = ctx.getDelegator();
		
		List<GenericValue> hobbyList = FastList.newInstance();
		if("boy".equals((String) context.get("smPersonSex"))) {
			hobbyList = delegator.findByAnd("SmHobby", UtilMisc.toMap("name", "game"), null, false);
		} else {
			hobbyList = delegator.findByAnd("SmHobby", UtilMisc.toMap("name", "book"), null, false);
		}
		if(null != hobbyList && hobbyList.size() == 1) {
			String smPersonHobbyId = delegator.getNextSeqId("SmPersonHobby");
			GenericValue gv = delegator.makeValue("SmPersonHobby", UtilMisc.toMap("smPersonHobbyId", smPersonHobbyId));
			gv.set("smPersonId", (String) context.get("smPersonId"));
			gv.set("hobbyId", hobbyList.get(0).getString("hobbyId"));
			
			GenericValue newGv = delegator.create(gv);
			results.put("smPersonHobbyId", newGv.getString("smPersonHobbyId"));
		}
		
		return ServiceUtil.returnFailure();
	}
	
	// 新增用户日志表
	public static Map<String, Object> createSmPersonLogOfServiceEeca(DispatchContext ctx, Map<String, ? extends Object> context) throws GenericEntityException {
		Delegator delegator = ctx.getDelegator();
		
		String smPersonCreateLogId = delegator.getNextSeqId("SmPersonCreateLog");
		GenericValue gv = delegator.makeValue("SmPersonCreateLog", UtilMisc.toMap("smPersonCreateLogId", smPersonCreateLogId));
		gv.set("username", (String) context.get("username"));
		gv.set("description", (String) context.get("description"));
		gv.set("smPersonId", (String) context.get("smPersonId"));
		
		delegator.create(gv);
		
		return ServiceUtil.returnFailure();
	}
}
