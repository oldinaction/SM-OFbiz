package cn.aezo.utils;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 
 * @author smalle Email:oldinaction@qq.com
 * @date 2015年12月8日 下午6:14:42
 */
public class SmDateUtils {
	/**
	  * 清单产生时间是否超过限定微秒数
	  * @param createtime 开始时间。格式：2012-8-21 17:53:20.000
	  * @param timeInterval 间隔时间微秒数，如一分钟：1000*60
	  * @return true|false 清单产生产生时间大于24h则返回true
	  */
	public static boolean isOverTime(String createtime, long timeInterval) { //传入的时间格式必须类似于2012-8-21 17:53:200.000这样的格式
		createtime = createtime.substring(0, 19);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        ParsePosition pos = new ParsePosition(0);  
        Date d1 = (Date) dateFormat.parse(createtime, pos);  
        //用现在距离1970年的时间间隔new Date().getTime()减去以前的时间距离1970年的时间间隔d1.getTime()得出的就是以前的时间与现在时间的时间间隔  
        long time = new Date().getTime() - d1.getTime();// 得出的时间间隔是毫秒  
        if(time < timeInterval && time >= 0) {  
        	return false; 
        } else {  
        	return true;
        } 
    }
	
	public static String getInterval(String createtime) { //传入的时间格式必须类似于2012-8-21 17:53:20这样的格式  
        String interval = null;  
          
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        ParsePosition pos = new ParsePosition(0);  
        Date d1 = (Date) sd.parse(createtime, pos);  
          
        //用现在距离1970年的时间间隔new Date().getTime()减去以前的时间距离1970年的时间间隔d1.getTime()得出的就是以前的时间与现在时间的时间间隔  
        long time = new Date().getTime() - d1.getTime();// 得出的时间间隔是毫秒  
          
        if(time/1000 < 10 && time/1000 >= 0) {  
        //如果时间间隔小于10秒则显示“刚刚”time/10得出的时间间隔的单位是秒  
            interval ="刚刚";  
              
        } else if(time/3600000 < 24 && time/3600000 >= 0) {  
        //如果时间间隔小于24小时则显示多少小时前  
            int h = (int) (time/3600000);//得出的时间间隔的单位是小时  
            interval = h + "小时前";  
              
        } else if(time/60000 < 60 && time/60000 > 0) {  
        //如果时间间隔小于60分钟则显示多少分钟前  
            int m = (int) ((time%3600000)/60000);//得出的时间间隔的单位是分钟  
            interval = m + "分钟前";  
              
        } else if(time/1000 < 60 && time/1000 > 0) {  
        //如果时间间隔小于60秒则显示多少秒前  
            int se = (int) ((time%60000)/1000);  
            interval = se + "秒前";  
              
        }else {  
            //大于24小时，则显示正常的时间，但是不显示秒  
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");  
  
            ParsePosition pos2 = new ParsePosition(0);  
            Date d2 = (Date) sdf.parse(createtime, pos2);  
  
            interval = sdf.format(d2);  
        }  
        return interval;  
    }
	
	public static void main(String[] args) {

	}
	
}
