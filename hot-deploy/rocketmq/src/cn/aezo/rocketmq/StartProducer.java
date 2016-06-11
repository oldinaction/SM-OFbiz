package cn.aezo.rocketmq;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.common.message.Message;


public class StartProducer {
    public static String producer(HttpServletRequest request,HttpServletResponse response) throws MQClientException, InterruptedException {
        /**
         * 一个应用创建一个Producer，由应用来维护此对象，可以设置为全局对象或者单例<br>
         * 注意：ProducerGroupName需要由应用来保证唯一<br>
         * ProducerGroup这个概念发送普通的消息时，作用不大，但是发送分布式事务消息时，比较关键，
         * 因为服务器会回查这个Group下的任意一个Producer
         */
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName");
        producer.setNamesrvAddr("127.0.0.1:9876");
        producer.setInstanceName("Producer");
        
        /**
         * Producer对象在使用之前必须要调用start初始化，初始化一次即可<br>
         * 注意：切记不可以在每次发送消息时，都调用start方法
         */
        producer.start();
        
        DefaultMQProducer producer1 = new DefaultMQProducer("ProducerGroupName1");
        producer1.setNamesrvAddr("192.168.17.224:9876");
        producer1.setInstanceName("Producer1");
        producer1.start();
        
        DefaultMQProducer producer2 = new DefaultMQProducer("ProducerGroupName2");
        producer2.setNamesrvAddr("192.168.17.50:9876");
        producer2.setInstanceName("Producer2");
        producer2.start();

        /**
         * 下面这段代码表明一个Producer对象可以发送多个topic，多个tag的消息。
         * 注意：send方法是同步调用，只要不抛异常就标识成功。但是发送成功也可会有多种状态，<br>
         * 例如消息写入Master成功，但是Slave不成功，这种情况消息属于成功，但是对于个别应用如果对消息可靠性要求极高，<br>
         * 需要对这种情况做处理。另外，消息可能会存在发送失败的情况，失败重试由应用来处理。
         */
        for (int i = 0; i < 1; i++)
            try {
                {
                    Message msg = new Message("TopicTest1",// topic
                        "TagA",// tag
                        "OrderID188",// key
                        ("Hello MetaQ").getBytes());// body
                    SendResult sendResult = producer.send(msg);
                    System.out.println(sendResult);
                    
                    SendResult sendResult1 = producer1.send(msg);
                    System.out.println(sendResult1);
                    SendResult sendResult2 = producer2.send(msg);
                    System.out.println(sendResult2);
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }

        /**
         * 应用退出时，要调用shutdown来清理资源，关闭网络连接，从MetaQ服务器上注销自己
         * 注意：我们建议应用在JBOSS、Tomcat等容器的退出钩子里调用shutdown方法
         */
        producer.shutdown();
        producer1.shutdown();
        producer2.shutdown();
        
        
        
        return "success";
    }
}
