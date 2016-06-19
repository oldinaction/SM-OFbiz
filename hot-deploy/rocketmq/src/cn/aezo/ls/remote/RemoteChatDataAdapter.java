package cn.aezo.ls.remote;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import cn.aezo.ls.remote.server.OutPrintLog;

import com.lightstreamer.adapters.remote.DataProvider;
import com.lightstreamer.adapters.remote.ItemEventListener;
import com.lightstreamer.adapters.remote.SubscriptionException;
import com.lightstreamer.adapters.remote.log.Logger;

public class RemoteChatDataAdapter implements DataProvider {

    private volatile ItemEventListener listener;
    
    private Logger logger;
    
    private Map<String, Object> listHandles = new HashMap<String, Object>();
    private Object listMutex = new Object();
    private final Map<String, Map<String, Object>> subscriptions = new HashMap<String, Map<String, Object>>();
    
    public static final ConcurrentHashMap<String, RemoteChatDataAdapter> feedMap =
        new ConcurrentHashMap<String, RemoteChatDataAdapter>();

    public RemoteChatDataAdapter() {
        // myFeed = new MyFeed();
    }

    /**
     * Starts the simulator feed (or connects to the external
     * feed, for a real feed).
     */
    @Override
    public void init(Map<String, String> params, String configFile) {
        
        logger = OutPrintLog.getInstance().getLogger("LS.RemoteChatDataAdapter");
        
        //The feedMap of this adapter is never used
        // Read the Adapter Set name, which is supplied by the Server as a parameter
        String adapterSetId = (String) params.get("adapters_conf.id");
        // Put a reference to this instance on a static map
        // to be read by the Metadata Adapter
        feedMap.put(adapterSetId, this);

        // myFeed.start();
        logger.info("RemoteChatDataAdapter ready.");
        
    }

    @Override
    public void setListener(ItemEventListener listener) {
        this.listener = listener;
        // myFeed.setFeedListener(new MyFeedListener());
    }
    
    @Override
    public void subscribe(String item) {
    	logger.debug("Subscribing to 订阅人" + item);
    	
        if (item.contains("sm")) {
        	String[] usergr = item.split("|");
            String user = usergr[0].substring("sm".length());
            String group = usergr[1];
            Object handle = item;
            Object listHandle = null;
            if (listHandles.containsKey(group))
                listHandle = listHandles.get(group);
            synchronized (listMutex) {
                // Add the new item to the list of subscribed items
                if (!subscriptions.containsKey(group)) {
                    Map<String, Object> userlist = new HashMap<String, Object>();
                    userlist.put(user, handle);
                    subscriptions.put(group, userlist);
                } else {
                    subscriptions.get(group).put(user, handle);
                }
                
                this.updateList("ADD", user, listHandle, false);
            }
        } else {
            try {
				throw new SubscriptionException("Unexpected item name: " + item);
			} catch (SubscriptionException e) {
				e.printStackTrace();
			}
        }
    }

    @Override
    public void unsubscribe(String item) {
        logger.debug("Unsubscribing from " + item);
        if (item.contains("sm")) {
        	String[] usergr = item.split("|");
            String user = usergr[0].substring("sm".length());
            String group = usergr[1];
            Object handle = item;
            Object listHandle = null;
            if (listHandles.containsKey(group))
                listHandle = listHandles.get(group);
        	synchronized (listMutex) {
                if (!subscriptions.containsKey(group)) return;
                if (!subscriptions.get(group).containsKey(user)) return;
                subscriptions.get(group).remove(user);
                this.updateList("DELETE", user, listHandle, false);
            }
        } else {
            try {
				throw new SubscriptionException("Unexpected item name: " + item);
			} catch (SubscriptionException e) {
				e.printStackTrace();
			}
        }
    }

    @Override
    public boolean isSnapshotAvailable(String item) {
    	 return false;
    }

    
    private void updateList(String command, String key, Object listHandles, boolean isForSnapshot) {
        final Object currHandle = listHandles;
        final boolean finalIsForSnapshot = isForSnapshot;
        
        if (currHandle == null) return;
        
        Map<String, String> update = new HashMap<String, String>();
        update.put("command", command);
        update.put("key", key);

		final Map<String, String> finalUpdate = update;
        Thread updateTask = new Thread() {
			public void run() {
				listener.update((String) currHandle, finalUpdate, finalIsForSnapshot);
			}
		};
		
        updateTask.start();
    }
    
    private void sendListEOS(Object listHandle) {
        final Object currHandle = listHandle;
        if (currHandle == null) return;
        
        Thread updateTask = new Thread() {
			public void run() {
				listener.endOfSnapshot((String) currHandle);
			}
		};
        
        updateTask.start();
    }
    
    public void sendMessage(String message) {
    	Date now = new Date();
        String timestamp = new SimpleDateFormat("HH:mm:ss").format(now);
        long raw_timestamp = now.getTime();
    	
    	final HashMap<String, String> update = new HashMap<String, String>();
        update.put("nick", "admin");
        update.put("message", message);
        update.put("timestamp", timestamp);
        update.put("raw_timestamp", String.valueOf(raw_timestamp));
        update.put("IP", "127.0.0.1");
        
        if(message.contains("admin")) {
            final Map<String, String> finalUpdate = update;
            Thread updateTask = new Thread() {
    			public void run() {
    				listener.update((String) "sm_admin", finalUpdate, false);
    				listener.update((String) "sm_smalle", finalUpdate, false);
    			}
    		};
    		updateTask.start();
        } else {
        	final Object currHandle = "sm_admin"; // 给sm_admin这个订阅人发消息
            final Map<String, String> finalUpdate = update;
            Thread updateTask = new Thread() {
    			public void run() {
    				listener.update((String) currHandle, finalUpdate, false);
    			}
    		};
    		
    		updateTask.start();
        }
    	
    }
    
}
