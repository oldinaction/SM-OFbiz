package cn.aezo.rocketmq;

import org.ofbiz.base.container.Container;
import org.ofbiz.base.container.ContainerException;

import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;

public class Producer implements Container {
	
	private static DefaultMQProducer producer;

	public static DefaultMQProducer getProducer() {
		return producer;
	}

	public static void setProducer(DefaultMQProducer producer) {
		Producer.producer = producer;
	}

	@Override
	public void init(String[] args, String name, String configFile)
			throws ContainerException {
		// 定义关闭线程
		Thread shutdownThread = new Thread() {
			public void run() {
				try {
					Producer.this.stop();
				} catch (ContainerException e) {
					e.printStackTrace();
				}
			}
		};
		// jvm关闭的时候先执行该线程钩子
		Runtime.getRuntime().addShutdownHook(shutdownThread);

	}

	@Override
	public boolean start() throws ContainerException {
		producer = new DefaultMQProducer("Test_Producer_001");
        producer.setNamesrvAddr("127.0.0.1:9876");
        try {
			producer.start();
			System.out.println("Test_Producer_001 start==>" + producer);
		} catch (MQClientException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public void stop() throws ContainerException {
		producer.shutdown();
		System.out.println("Test_Producer_001 stop");
	}

	@Override
	public String getName() {
		return null;
	}

}
