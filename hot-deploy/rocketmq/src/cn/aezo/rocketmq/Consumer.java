package cn.aezo.rocketmq;

import java.nio.charset.Charset;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.ofbiz.base.container.Container;
import org.ofbiz.base.container.ContainerException;
import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.DelegatorFactory;
import org.ofbiz.entity.GenericDelegator;
import org.ofbiz.entity.GenericEntityException;

import cn.aezo.ls.remote.RemoteChatMetaDataAdapter;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.rocketmq.client.consumer.DefaultMQPushConsumer;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.common.consumer.ConsumeFromWhere;
import com.alibaba.rocketmq.common.message.MessageExt;

public class Consumer implements Container{

	@Override
	public void init(String[] args, String name, String configFile)
			throws ContainerException {
		
	}

	@Override
	public boolean start() throws ContainerException {
        try {
        	DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("Test_Consumer_001");
        	consumer.setNamesrvAddr("127.0.0.1:9876");
            
            /**
             * 设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费<br>
             * 如果非第一次启动，那么按照上次消费的位置继续消费
             */
            consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
            
			consumer.subscribe("RegistTopic", "*");
			consumer.subscribe("MQLS", "LightStreamer");
			
			consumer.registerMessageListener(new MessageListenerConcurrently() {
				// 每收到一条消息就会调用此方法，msgs其实是一条消息（里面包含了消息的所有信息）	
	            @SuppressWarnings("unchecked")
				@Override
	            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
	            	System.out.println(Thread.currentThread().getName() + " Receive New Messages: " + msgs);
	            	
	            	MessageExt msg = msgs.get(0);
	            	if(msg.getTopic().equals("RegistTopic")) {
	            		if(null != msg.getTags() && msg.getTags().equals("CreateContactTag")) {
	            			try {
	            				System.out.println(msg.getUserProperty("ticket"));
	            				System.out.println(new String(msg.getBody()));
	            				Map<String, Object> map = (Map<String, Object>) JSONObject.parse(new String(msg.getBody()));
	            				
	            				GenericDelegator delegator = (GenericDelegator) DelegatorFactory.getDelegator("default");
								delegator.create("SmPersonContact", UtilMisc.toMap(
										"contactId", delegator.getNextSeqId("SmPersonContact"), 
										"personId", map.get("personId"), 
										"telephone", map.get("telephone"), 
										"address", map.get("address"),
										"inputTm", new Timestamp(msg.getBornTimestamp())));
							} catch (GenericEntityException e) {
								e.printStackTrace();
							}
	            		}
	            	} else if(msg.getTopic().equals("MQLS")) {
	            		if(null != msg.getTags() && msg.getTags().equals("LightStreamer")) {
	            			String sessionId = msg.getUserProperty("sessionId");
	            			System.out.println("MQ-Consumer==>sessionId" + sessionId + "body==>" + new String(msg.getBody()));
	            			
	            			// 将消息发送给LightStreamer服务器
	            			RemoteChatMetaDataAdapter metaDataAdapter = new RemoteChatMetaDataAdapter();
	            			
	            			metaDataAdapter.notifyUserMessage(null, null, new String(msg.getBody()) + "-MQ");
	            		}
	            	}
	            	
	                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
	            }
	        });
			
			/**
	         * Consumer对象在使用之前必须要调用start初始化，初始化一次即可<br>
	         */
	        consumer.start(); // consumer可多运行几个实例（如多台机器或者一个机器多起几个线程）
	        System.out.println("Test_Consumer_001 Started==>" + consumer);
	        
		} catch (MQClientException e) {
			e.printStackTrace();
		}

		return true;
	}

	@Override
	public void stop() throws ContainerException {
		
	}

	@Override
	public String getName() {
		return null;
	}

}
