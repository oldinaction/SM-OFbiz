package cn.aezo.mytest;

import java.util.List;
import java.util.Map;

import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.ServiceUtil;

public class Test {
	
	public static Map<String, Object> createSmPersonOfTestJava(DispatchContext ctx, Map<String, ? extends Object> context) throws GenericEntityException {
		Map<String, Object> results = ServiceUtil.returnSuccess();
		Delegator delegator = ctx.getDelegator();
		
		String username = (String) context.get("username");
		System.out.println("传入进来的用户名为：" + username);
		
		String flag = "";
		if(null != username && !"".equals(username)) {
			List<GenericValue> personList = delegator.findByAnd("SmPerson", UtilMisc.toMap("username", username), null, false);
			if(null == personList || personList.size() <= 0) {
				String id = delegator.getNextSeqId("SmPerson");
				GenericValue gv = delegator.makeValue("SmPerson", UtilMisc.toMap("id", id));
				gv.setNonPKFields(context);
				delegator.create(gv);
				flag = "false";
			} else {
				flag = "true";
			}
		}
		
		results.put("flag", flag);
		return results;
	}
}
