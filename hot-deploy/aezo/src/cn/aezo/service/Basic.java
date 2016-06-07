package cn.aezo.service;

import java.util.Map;

import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.ServiceUtil;

public class Basic {
	
	public static Map<String, Object> createSmPersonOfServiceBasic(DispatchContext ctx, Map<String, ? extends Object> context) throws GenericEntityException {
		Map<String, Object> results = ServiceUtil.returnSuccess();
		Delegator delegator = ctx.getDelegator();
		System.out.println("传入进来的用户名为：" + context.get("username"));
		
		String id = delegator.getNextSeqId("SmPerson");
		GenericValue gv = delegator.makeValue("SmPerson", UtilMisc.toMap("id", id));
		gv.setNonPKFields(context);
		GenericValue newGv = delegator.create(gv);
		if(null != newGv) {
			return results;
		} else {
			return ServiceUtil.returnFailure();
		}
	}
}
