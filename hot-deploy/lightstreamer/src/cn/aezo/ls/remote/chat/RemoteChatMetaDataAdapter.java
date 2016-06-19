package cn.aezo.ls.remote.chat;

import java.util.Map;

import cn.aezo.ls.remote.server.OutPrintLog;

import com.lightstreamer.adapters.remote.CreditsException;
import com.lightstreamer.adapters.remote.NotificationException;
import com.lightstreamer.adapters.remote.log.Logger;
import com.lightstreamer.adapters.remote.metadata.LiteralBasedProvider;

public class RemoteChatMetaDataAdapter extends LiteralBasedProvider {
	
    private volatile RemoteChatDataAdapter RCFeed;

    /**
     * Unique identification of the related Messenger Data Adapter instance;
     * see feedMap on the IMDataAdapter.
     */
    private String adapterSetId;

    /**
     * Private logger; a specific "LS_demos_Logger.Messenger" category
     * should be supplied by log4j configuration.
     */
    private static Logger _log = OutPrintLog.getInstance().getLogger("LS.RemoteChatMetaDataAdapter");

    public RemoteChatMetaDataAdapter() {
    	
    }
    
    @Override
    public void init(Map map, String configDir) {
        try {
            super.init(map, configDir);
            this.adapterSetId = (String) map.get("adapters_conf.id");

            _log.info("RemoteChatMetaDataAdapter ready");
        } catch (Exception e) {
            _log.warn("Error:" + e.getMessage());
        }
    }
    
    public String[] getItems(String user, String session, String id) {
        try {
            String[] broken = super.getItems(user, session, id);
            System.out.println("getItems==>" + broken.length);
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
    public void notifyUserMessage(String user, String session, String message) {
        try {
            if (message == null) {
                _log.warn("Null message received");
                throw new NotificationException("Null message received");
            }

            System.out.println("notifyUserMessage==>" + message);

            this.RCFeed = RemoteChatDataAdapter.feedMap.get(this.adapterSetId);
            this.RCFeed.sendMessage(message);
        } catch (Exception e) {
        	_log.warn("Error:" + e.getMessage());
        }

    }

}
