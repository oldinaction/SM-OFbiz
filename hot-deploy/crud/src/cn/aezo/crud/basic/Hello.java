package cn.aezo.crud.basic;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Hello {
	/**
	 * controller.xml中url要访问的方法必须以public static修饰，返回字符串，参数为request/response
	 */
	public static String hello(HttpServletRequest request, HttpServletResponse response) {
		
		return "success";
	}
	
	public static String check(HttpServletRequest request, HttpServletResponse response) {
		String flag = request.getParameter("flag");
		
		if("true".equals(flag)) {
			return "success";
		} else {
			return "error";
		}
	}
}

	
