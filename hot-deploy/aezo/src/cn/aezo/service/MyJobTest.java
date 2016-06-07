package cn.aezo.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javolution.util.FastMap;

import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.GenericServiceException;
import org.ofbiz.service.LocalDispatcher;
import org.ofbiz.service.ServiceUtil;

public class MyJobTest {
	
	// 标准的事件（传入参数为request、response，方法以public static String修饰）
	public static String startMyJobTest (HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute("dispatcher"); 
		String jobName = "myJobTest"; //计划名
    	String poolName = "pool"; //默认方式
    	String serviceName = "createSmPersonOfServiceJob"; // 计划执行的服务名称
    	Map<String, Object> serviceContext = FastMap.newInstance(); // 服务需要的初始数据
		long startTime = System.currentTimeMillis(); // 开始时间
    	long endTime = System.currentTimeMillis() + 1000*60*60L; // 结束时间
    	int frequency = 1; // 频率(单位；RecurrenceRule.SECONDLY=1)
    	int interval = 30; // 间隔(如果频率为RecurrenceRule.SECONDLY=1，则此处表示每30秒执行一次)
    	int count = 5; // 次数
    	int maxRetry = 5; // 最大重试次数
    	try {
        	dispatcher.schedule(jobName, poolName, serviceName, serviceContext,
                startTime, frequency, interval, count, endTime, maxRetry);
    	} catch (GenericServiceException e) {
    		e.printStackTrace();
    	}
    	return "success";
	}
	
	// 标准的服务（传入参数类型为DispatchContext、和Map，方法以public static Map修饰）
	public static Map<String, Object> createSmPersonOfServiceJob(DispatchContext dctx, Map<String, ? extends Object> context ) {
		Delegator delegator = dctx.getDelegator();
		Map<String, Object> map = FastMap.newInstance();
		map.put("id", delegator.getNextSeqId("SmPerson"));
		map.put("username", "smalle");
		map.put("password", "123456");
		map.put("description", "这是定时产生的一条记录哦！");
		try {
			GenericValue gv = delegator.create("SmPerson", map);
			if(null == gv) {
				return ServiceUtil.returnFailure();
			}
		} catch (GenericEntityException e) {
			e.printStackTrace();
		}
		
		return ServiceUtil.returnSuccess();
	}
	
}
