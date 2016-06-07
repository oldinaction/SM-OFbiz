package cn.aezo.mytest; // 包名最好不要起名为test，可能生成jar包失败

import java.util.Map;

import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.service.testtools.OFBizTestCase;

//继承的OFBizTestCase中含有dispatcher和delegator两个对象，且最终继承了Junit的TestCase类
public class SmPersonTest extends OFBizTestCase {
	
	protected GenericValue userLogin = null;

    public SmPersonTest(String name) {
        super(name);
    }

    @Override
    protected void setUp() throws Exception {
    	System.out.println("===setUp===");
    	// userLogin = delegator.findOne("UserLogin", UtilMisc.toMap("userLoginId", "system"), false);
    }

    @Override
    protected void tearDown() throws Exception {
    	System.out.println("===tearDown===");
    }
    
    // 测试方法命名必须以test开头。程序进到该测试类后会运行所有test开头的方法
    public void testCreateSmPerson() throws Exception {
    	System.out.println("===testCreateSmPerson===");
    	
    	// 判断数据库是否存在username=smalleTestJava的数据，flag=true表示存在
    	Map<String, Object> ctx = UtilMisc.<String, Object>toMap("username", "smalleTestJava", "password", "12345678", "description", "这是ofbiz test的测试数据");
        // ctx.put("userLogin", userLogin);
        Map<String, Object> resp = dispatcher.runSync("createSmPersonOfTestJava", ctx);
        
        String flag = (String) resp.get("flag");
        System.out.println("flag===>" + flag);
        
        assertNotNull(flag);
        assertEquals("true", flag);
    }
    
    public void testMyTest() throws Exception {
    	myTest("smalleTestJava1");
    }
    
    
    public void myTest(String username) throws Exception {
    	Map<String, Object> ctx = UtilMisc.<String, Object>toMap("username", username, "password", "12345678", "description", "这是ofbiz test的测试数据");
    	// ctx.put("userLogin", userLogin);
    	Map<String, Object> resp = dispatcher.runSync("createSmPersonOfTestJava", ctx);
    	
    	String flag = (String) resp.get("flag");
    	
    	assertEquals("false", flag);
    }
    
}
