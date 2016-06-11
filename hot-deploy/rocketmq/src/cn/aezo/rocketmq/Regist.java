package cn.aezo.rocketmq;

import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericEntityException;

import com.alibaba.rocketmq.client.exception.MQBrokerException;
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.common.message.Message;
import com.alibaba.rocketmq.remoting.exception.RemotingException;

public class Regist {
	
	public static String regist(HttpServletRequest request , HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute("delegator");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String description = request.getParameter("description");
		String telephone = request.getParameter("telephone");
		String address = request.getParameter("address");
		
		try {
			String personId = delegator.getNextSeqId("SmPerson");
			delegator.create("SmPerson", UtilMisc.toMap(
					"personId", personId, 
					"username", username, 
					"password", password, 
					"description", description,
					"inputTm", new Timestamp(System.currentTimeMillis())));
			
			// 发送消息到MQ
			Message msg = new Message("RegistTopic", "CreateContactTag", ("Hello").getBytes());
			msg.putUserProperty("personId", personId);
			msg.putUserProperty("telephone", telephone);
			msg.putUserProperty("address", address);
			DefaultMQProducer producer = Producer.getProducer();
            SendResult sendResult = producer.send(msg);
            System.out.println(sendResult);
			
		} catch (GenericEntityException e) {
			e.printStackTrace();
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
