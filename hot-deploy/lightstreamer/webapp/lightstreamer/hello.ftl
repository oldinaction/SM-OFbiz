<!DOCTYPE html>

<html>
  <head>
    <title>Hello World with Lightstreamer</title>
    <!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/1.0.7/require.min.js"></script> -->
  </head>

  <body>
    <div data-source="lightstreamer" data-grid="hellogrid" data-item="greetings" data-field="message">loading...</div>
    <div data-source="lightstreamer" data-grid="hellogrid" data-item="greetings" data-field="timestamp">loading...</div>
	
	<script src="/tomahawk/lightstreamer/js/require.js"></script>
    <script src="/tomahawk/lightstreamer/js/lightstreamer.js"></script>
    <script>
      require(["LightstreamerClient","Subscription","StaticGrid"],function(LightstreamerClient,Subscription,StaticGrid) {
        var client = new LightstreamerClient("http://localhost:6080","HELLOWORLD");
        client.connect();
         
        var grid = new StaticGrid("hellogrid",true);
        
        var subscription = new Subscription("MERGE",grid.extractItemList(),grid.extractFieldList());
        subscription.addListener(grid);
        
        client.subscribe(subscription);
      });
    </script>
  </body>
</html>




