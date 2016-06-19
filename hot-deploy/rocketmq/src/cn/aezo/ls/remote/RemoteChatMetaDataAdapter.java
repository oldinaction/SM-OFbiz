package cn.aezo.ls.remote;

import java.util.Map;

import cn.aezo.ls.remote.server.OutPrintLog;

import com.lightstreamer.adapters.remote.NotificationException;
import com.lightstreamer.adapters.remote.log.Logger;
import com.lightstreamer.adapters.remote.metadata.LiteralBasedProvider;

public class RemoteChatMetaDataAdapter extends LiteralBasedProvider {
	
    private volatile RemoteChatDataAdapter RCFeed;

    /**
     * Unique identification of the related Messenger Data Adapter instance;
     * see feedMap on the RemoteChatDataAdapter.
     */
    private String adapterSetId;

    private static Logger _log = OutPrintLog.getInstance().getLogger("LS.RemoteChatMetaDataAdapter");

    public RemoteChatMetaDataAdapter() {
    	
    }
    
    @Override
    public void init(Map map, String configDir) {
        try {
            super.init(map, configDir);
            this.adapterSetId = (String) map.get("adapters_conf.id");
            
            _log.info("==>RemoteChatMetaDataAdapter ready. adapterSetId==>" + this.adapterSetId);
        } catch (Exception e) {
            _log.warn("Error:" + e.getMessage());
        }
    }
    
    @Override
    public String[] getItems(String user, String session, String id) {
        try {
            String[] broken = super.getItems(user, session, id);
            System.out.println(this.adapterSetId);
            System.out.println("getItems==>" + broken.length);
            if(broken.length > 0) System.out.println("getItems==>" + broken[0]);
            
            return broken;
        } catch (Exception e) {
        	_log.warn("Error:" + e.getMessage());
            return null;
        }
    }

    /**
     * Triggered by a client "sendMessage" call.
     * The message encodes an instant message from the client.
     */
    @Override
    public void notifyUserMessage(String user, String session, String message) {
        if (message == null) {
            _log.warn("Null message received");
            try {
				throw new NotificationException("Null message received");
			} catch (NotificationException e) {
				e.printStackTrace();
			}
        }

        System.out.println("notifyUserMessage==>" + message);
        System.out.println(this.adapterSetId); // 变成了null??????????
        System.out.println(RemoteChatDataAdapter.feedMap);
        this.RCFeed = RemoteChatDataAdapter.feedMap.get("PROXY_SOCKET_ROBUST");
        this.RCFeed.sendMessage(message); // 发送消息给订阅者

    }

}
