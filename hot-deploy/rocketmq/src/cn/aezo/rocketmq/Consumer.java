package cn.aezo.rocketmq;

import java.sql.Timestamp;
import java.util.List;

import org.ofbiz.base.container.Container;
import org.ofbiz.base.container.ContainerException;
import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.entity.DelegatorFactory;
import org.ofbiz.entity.GenericDelegator;
import org.ofbiz.entity.GenericEntityException;

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
            consumer.setNamesrvAddr("198.168.17.224:9876");
            
            /**
             * 设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费<br>
             * 如果非第一次启动，那么按照上次消费的位置继续消费
             */
            consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
            
			consumer.subscribe("RegistTopic", "*");
			
			consumer.registerMessageListener(new MessageListenerConcurrently() {
					
	            @Override
	            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
	            	System.out.println(Thread.currentThread().getName() + " Receive New Messages: " + msgs);
	            	
	            	MessageExt msg = msgs.get(0);
	            	if(msg.getTopic().equals("RegistTopic")) {
	            		if(null != msg.getTags() && msg.getTags().equals("CreateContactTag")) {
	            			try {
	            				GenericDelegator delegator = (GenericDelegator) DelegatorFactory.getDelegator("default");
	            				
								delegator.create("SmPersonContact", UtilMisc.toMap(
										"contactId", delegator.getNextSeqId("SmPersonContact"), 
										"personId", msg.getUserProperty("personId"), 
										"telephone", msg.getUserProperty("telephone"), 
										"address", msg.getUserProperty("address"),
										"inputTm", new Timestamp(System.currentTimeMillis())));
							} catch (GenericEntityException e) {
								e.printStackTrace();
							}
	            		}
	            	}
	            	
	                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
	            }
	        });
			
			/**
	         * Consumer对象在使用之前必须要调用start初始化，初始化一次即可<br>
	         */
	        consumer.start();
	        
	        System.out.println("Test_Consumer_001 Started.");
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
