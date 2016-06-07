package cn.aezo.entity;

import java.util.Map;

import org.ofbiz.base.util.Debug;
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.jdbc.SQLProcessor;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.ServiceUtil;

public class RunOriginalSqlService {
	public static final String module = RunOriginalSqlService.class.getName();
	
	//返回的result对象中要放service所有的OUT参数
	public static Map<String, Object> runOriginalSql(DispatchContext ctx, Map<String, ? extends Object> context) {
		Map<String, Object> result = ServiceUtil.returnSuccess();
		String status = null;
		String resultMessage = null;

		Delegator delegator = ctx.getDelegator();
		SQLProcessor sqlProcessor = new SQLProcessor(delegator.getGroupHelperInfo("org.ofbiz"));
		String sqlCommand = (String) context.get("sqlCommand");
		
		try {
			sqlProcessor.prepareStatement(sqlCommand);
			int numOfAffectedRows = sqlProcessor.executeUpdate();
			status = "success";
			resultMessage = "成功改变了" + numOfAffectedRows + "条数据";
		} catch (Exception e) {
			status = "error";
			resultMessage = "runOriginalSql运行出错";
			Debug.logError(e.getMessage(), module);
			e.printStackTrace();
		}
		
	    result.put("status", status);
	    result.put("resultMessage", resultMessage);
        return result;
	}
	
	
	/*public static Map<String, Object> runOriginalSqlBak(DispatchContext ctx, Map<String, ? extends Object> context) {
		Map<String, Object> result = ServiceUtil.returnSuccess();
		String resultMessage = null;
		FastList columns = FastList.newInstance();
    	FastList records = FastList.newInstance();
        
		Delegator delegator = ctx.getDelegator();
		SQLProcessor sqlProcessor = new SQLProcessor(delegator.getGroupHelperInfo("org.ofbiz"));
		String sqlCommand = (String) context.get("sqlCommand");
		int rowNum = 10;
		Integer rowLimit =  (Integer) context.get("rowLimit");
		if(null != rowLimit) {
			rowNum = rowLimit.intValue();
		}
		
	    try {
	        if (sqlCommand.toUpperCase().startsWith("SELECT")) {
	            ResultSet rs = sqlProcessor.executeQuery(sqlCommand);
	            if (null != rs) {
	                ResultSetMetaData rsmd = rs.getMetaData();
	                int numberOfColumns = rsmd.getColumnCount();
	                for (int i = 1; i <= numberOfColumns; i++) {
	                    columns.add(rsmd.getColumnName(i));
	                }
	                boolean rowLimitReached = false;
	                while (rs.next()) {
	                    if (records.size() >= rowNum) {
	                        resultMessage = "最多返回 " + rowNum + "条数据";
	                        rowLimitReached = true;
	                        break;
	                    }
	                    FastList record = FastList.newInstance();
	                    for (int i = 1; i <= numberOfColumns; i++) {
	                        record.add(rs.getObject(i));
	                    }
	                    records.add(record);
	                }
	                resultMessage = "返回了 " + (rowLimitReached? "最多" + rowNum : "" + records.size()) + "条数据";
	                rs.close();
	            }
	        } else {
	            sqlProcessor.prepareStatement(sqlCommand);
	            int numOfAffectedRows = sqlProcessor.executeUpdate();
	            resultMessage = "改变了" + numOfAffectedRows + "条数据";
	        }
	    } catch (Exception e) {
	        resultMessage = e.getMessage();
	        return ServiceUtil.returnFailure();
	    }
		
	    result.put("resultMessage", resultMessage);
	    result.put("columns", columns);
	    result.put("records", records);
        return result;
	}*/
}