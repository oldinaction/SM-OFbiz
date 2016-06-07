package cn.aezo.utils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonTest {
	public static void main(String[] args) {
        String jsonStr = "{'username':'smalle','head':{'version':'1'},'dataList':{'resCode':'ss','list':[{'name':'file1','type':'0'},{'name':'file2','type':'1'}]}}";
        JSONObject  dataJson=JSONObject.fromObject(jsonStr);
        
        String username = dataJson.getString("username");
        System.out.println(username);
        
        JSONObject  dataList=dataJson.getJSONObject("dataList");
        JSONArray list=dataList.getJSONArray("list");
        JSONObject info=list.getJSONObject(1);
        String name=info.getString("name");
        String type=info.getString("type");
        System.out.println(name + "---" + type);
       
    }
}
