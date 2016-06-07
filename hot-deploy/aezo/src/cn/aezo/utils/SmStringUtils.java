package cn.aezo.utils;  
  
import java.io.BufferedReader;  
import java.io.InputStream;  
import java.io.InputStreamReader;  
import java.net.URL;  
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;  

import org.ofbiz.base.util.Debug;

import net.sf.json.JSONArray;  
import net.sf.json.JSONObject;  

/**
 * 
 * @author smalle Email:oldinaction@qq.com
 * @date 2015年12月10日 上午11:27:31
 */
public class SmStringUtils {
	private static final String module =  SmStringUtils.class.getName();
	
    public static List<Map<String, Object>> parseJsonStr2List(String jsonStr){
    	List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    	try {
    		JSONArray jsonArr = JSONArray.fromObject(jsonStr);
    		list = new ArrayList<Map<String,Object>>();  
    		Iterator<JSONObject> it = jsonArr.iterator();  
    		while(it.hasNext()){  
    			JSONObject json2 = it.next();  
    			list.add(parseJsonStr2Map(json2.toString()));  
    		}  
    	} catch (Exception e) {
    		Debug.logError("json字符串解析出错！", module);
    	}
    	return list; 
    }  
     
    public static Map<String, Object> parseJsonStr2Map(String jsonStr){  
        Map<String, Object> map = new HashMap<String, Object>();  
        //最外层解析  
        JSONObject json = JSONObject.fromObject(jsonStr);  
        for(Object k : json.keySet()){  
            Object v = json.get(k);   
            //如果内层还是数组的话，继续解析  
            if(v instanceof JSONArray){  
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();  
                Iterator<JSONObject> it = ((JSONArray)v).iterator();  
                while(it.hasNext()){  
                    JSONObject json2 = it.next();  
                    list.add(parseJsonStr2Map(json2.toString()));  
                }  
                map.put(k.toString(), list);  
            } else {  
                map.put(k.toString(), v);  
            }  
        }  
        return map;  
    }  
      
    public static List<Map<String, Object>> getListByUrl(String url){  
        try {  
            //通过HTTP获取JSON数据  
            InputStream in = new URL(url).openStream();  
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));  
            StringBuilder sb = new StringBuilder();  
            String line;  
            while((line=reader.readLine())!=null){  
                sb.append(line);  
            }  
            return parseJsonStr2List(sb.toString());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
     
    public static Map<String, Object> getMapByUrl(String url){  
        try {  
            //通过HTTP获取JSON数据  
            InputStream in = new URL(url).openStream();  
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));  
            StringBuilder sb = new StringBuilder();  
            String line;  
            while((line=reader.readLine())!=null){  
                sb.append(line);  
            }  
            return parseJsonStr2Map(sb.toString());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }

      
    //test  
    public static void main(String[] args) throws Exception {  
    	/*    	
		String url = "http://apistore.baidu.com/microservice/cityinfo?cityname=%E5%8C%97%E4%BA%AC";//北京的天气接口
    	
    	Map<String,Object> map = getMapByUrl(url);
    	System.out.println(map.get("retMsg"));
        //List<Map<String,Object>> list = getListByUrl(url);
    	
    	System.out.println(map);
    	*/

		List<Map<String, Object>> list = parseJsonStr2List("-[{'Status':'F','Message':'非法操作'}]");
		if (list.size() > 0) {
			JSONObject  jsonData = JSONObject.fromObject(list.get(0));
			System.out.println(jsonData);
			System.out.println(jsonData.getString("Status"));
		} else {
			System.out.println("出错");
		}
    	
    }  
}
