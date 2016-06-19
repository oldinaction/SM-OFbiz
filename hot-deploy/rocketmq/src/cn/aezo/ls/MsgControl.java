package cn.aezo.ls;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.aezo.rocketmq.Producer;

import com.alibaba.rocketmq.client.exception.MQBrokerException;
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.common.message.Message;
import com.alibaba.rocketmq.remoting.exception.RemotingException;

public class MsgControl {
	
	public static String sendMessageToMQ(HttpServletRequest request, HttpServletResponse response) {
		String message = request.getParameter("message");
		System.out.println("message==>" + message + " sessionId==>" + request.getSession().getId());
		
		try {
			Message msg = new Message("MQLS", "LightStreamer", message.getBytes());
			msg.putUserProperty("sessionId", request.getSession().getId()); // 设置用户参数
			
			DefaultMQProducer producer = Producer.getProducer();
	        SendResult sendResult = producer.send(msg);
	        
			System.out.println(sendResult);
		} catch (MQClientException e) {
			e.printStackTrace();
		} catch (RemotingException e) {
			e.printStackTrace();
		} catch (MQBrokerException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        
		
		return "success";
	}

}
