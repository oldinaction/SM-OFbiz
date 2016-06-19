package cn.aezo.ls.remote.server;

import java.io.IOException;
import java.net.Socket;

import com.lightstreamer.adapters.remote.DataProviderException;
import com.lightstreamer.adapters.remote.ExceptionHandler;
import com.lightstreamer.adapters.remote.MetadataProviderException;
import com.lightstreamer.adapters.remote.RemotingException;
import com.lightstreamer.adapters.remote.Server;
import com.lightstreamer.adapters.remote.log.Logger;


public class ServerStarter implements ExceptionHandler, Runnable {
    private static Logger _log = OutPrintLog.getInstance().getLogger("LS_demos_Logger.StockQuotes.ServerStarter");

    private Server _server;
    private boolean _closed;

    private String _host;
    private int _rrPort;
    private int _notifPort;

    public ServerStarter(String host, int rrPort, int notifPort) {
        _host = host;
        _rrPort = rrPort;
        _notifPort = notifPort;
    }

    public final void launch(Server server) {
        _server = server;
        _closed = false;
        _server.setExceptionHandler(this);
        Thread t = new Thread(this);
        t.start();
    }

    public final void run() {
        Socket _rrSocket = null;
        Socket _notifSocket = null;

        do {
            _log.info("Connecting...");

            try {
                _log.info("Opening connection on port " + _rrPort + "...");
                _rrSocket = new Socket(_host, _rrPort);
                if (_notifPort >= 0) {
                    _log.info("Opening connection on port " + _notifPort + "...");
                    _notifSocket = new Socket(_host, _notifPort);
                }

                _log.info("Connected");
                
                _server.setRequestStream(_rrSocket.getInputStream());
                _server.setReplyStream(_rrSocket.getOutputStream());
                if (_notifSocket != null) {
                    _server.setNotifyStream(_notifSocket.getOutputStream());
                }

                break;
            } catch (IOException e) {
                _log.warn("Connection failed, retrying in 10 seconds...");
                try {
                    if (_rrSocket != null) {
                        _rrSocket.close();
                    }
                } catch (IOException e1) {
                }
                if (_notifSocket != null) {
                    try {
                        if (_notifSocket != null) {
                            _notifSocket.close();
                        }
                    } catch (IOException e1) {
                    }
                }
                
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e1) {
                }
            }

        } while (true);

        

        try {
            _server.start();
        } catch (DataProviderException | MetadataProviderException
                | RemotingException e) {
           
            _log.fatal("Exception caught while starting the server: " + e.getMessage() + ", aborting...", e);
            _server.close();
            System.exit(1);
        }
    }
    @Override
    public boolean handleIOException(IOException exception) {
        _log.error("Connection to Lightstreamer Server closed",exception);
        _closed = true;
        _server.close();
        System.exit(0);
        return false;
    }

    @Override
    public boolean handleException(RemotingException exception) {
        if (!_closed) {
            _log.error("Caught exception: " + exception.getMessage(), exception);
            _server.close();
            System.exit(1);
        }
        return false;
    }

    // Notes about exception handling.
    // 
    // In case of exception, the whole Remote Server process instance
    // can no longer be used;
    // closing it also ensures that the Proxy Adapter closes
    // (thus causing Lightstreamer Server to close)
    // or recovers by accepting connections from a new Remote
    // Server process instance.
    // 
    // Keeping the process instance alive and replacing the Server
    // class instances would be possible.
    // This would issue new connections with Lightstreamer Server.
    // However, new instances of the Remote Adapters would also be needed
    // and a cleanup of the current instances should be performed,
    // by invoking them directly through a custom method.
}