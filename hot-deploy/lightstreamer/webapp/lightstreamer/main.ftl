<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Lightstreamer :: Basic Chat Demo</title>
  <link rel="stylesheet" type="text/css" href="/tomahawk/lightstreamer/css/chat.css" />
</head>

<body>
  <a href="https://github.com/Lightstreamer/Lightstreamer-example-chat-client-javascript" target="_blank">GitHub</a>
  <div id="wrap">
    <table width="500" border="0">
      <tr>
        <td><a href="http://www.lightstreamer.com" target="_blank">LIGHTSTREAMER</a></td>
        <td class="demoTitle">BASIC CHAT DEMO</td>
      </tr>
    </table>

    <br />

    <!-- message container; the scrollbar will be handled by Lightstreamer -->
    <div id="message_scroll" class="messagePanel">
      <!-- message row template; will be cloned for each incoming message -->
      <div class="messageContainer" id="messages" data-source="lightstreamer">
        <span class="messageTimestamp" data-source="lightstreamer" data-field="raw_timestamp"></span>
        <span class="messageIP">&nbsp;- From IP address</span>
        <span class="messageIP" data-source="lightstreamer" data-field="IP"></span>
        <br />
        <span class="messageNick">User-Agent: </span>
        <span class="messageNick" data-source="lightstreamer" data-field="nick"></span>
        <div class="messageText" data-source="lightstreamer" data-field="message"></div>
      </div>
    </div>

    <!-- message submission form -->
    <form onSubmit="submitForm(); return false;" class="formPanel">
      <div class="sendTitle">Send a message:</div>
      <div class="formElements">
        <input id="user_message" type="text" size="70" />
        <input id="mex_button" type="submit" disabled value="Send" />
      </div>
    </form>
  </div>

<!-- load Lightstreamer libraries -->
<script src="/tomahawk/lightstreamer/js/require.js"></script>
<script src="/tomahawk/lightstreamer/js/lightstreamer.js"></script>
<script type="text/javascript">

//////////////// Message Submission Form Handling
  var client = null;
  require(["/tomahawk/lightstreamer/js/lsClient.js"],function(lsClient) {
    //save references to the LightstreamerClient to be used to
    //send messages
    client = lsClient;

    //enable/disable form based on the status of the connection
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        if (newStatus.indexOf("CONNECTED") == 0) {
          document.getElementById("mex_button").disabled = false;
        } else {
          document.getElementById("mex_button").disabled = true;
        }
      }
    });
  });

  function submitForm() {
    var textField = document.getElementById("user_message");
    if (window.client && textField) {
      var text = textField.value;
      textField.value = "";
      if (!text) {
        alert("Can't send an empty message");
      } else {
        var mex = "CHAT|" + text;
        // client.sendMessage(mex); // 直接发给Lightstreamer
        
        // 先把消息发送给RocketMQ
        $.ajax({
        	type: "POST",
        	url: "sendMessageToMQ",
        	data: {"message": mex},
        	success: function(data) {
        		console.log("===>" + data);
        	}
        });
      }
    }
  }

//////////////// Message Grid and Subscription Management

  require(["/tomahawk/lightstreamer/js/lsClient.js","DynaGrid","Subscription"],function(lsClient,DynaGrid,Subscription) {
    //  create the DynaGrid
    var chatGrid = new DynaGrid("messages",true);
    chatGrid.setMaxDynaRows("unlimited"); // the grid will expand with no limits
    chatGrid.setAutoScroll("ELEMENT", "message_scroll"); // automatic scrolling for new messages
    chatGrid.setAutoCleanBehavior(true, false);
    chatGrid.addListener({
      associated: {},
      next: 0,
      // background colors to associate to identities
      colors: ["#FFFFE0","#FFEBCD","#F0F8FF","#CCFFCC","#FFF5EE","#E0FFFF","#F0FFF0","#F0E68C","#87CEEB","#E6E6FA","#FFB6C1","#F5FFFA","#FFFAFA","#F5F5DC","#F8F8FF","#FFE4E1","#D8BFD8","#FFF0F5","#EEE8AA"],

      onVisualUpdate: function(key,info,domNode) {
        if (info == null) {
          return;
        }
        console.log(info);
        // associate different colors to the messages from different senders
        var nick = info.getCellValue("nick");
        var ip = info.getCellValue("IP");
        // sender's identity is based on IP address + user agent's session
        var sender_identifier = ip + "_" + nick;
        var color = this.associated[sender_identifier];
        if (!color) {
          this.associated[sender_identifier] = this.colors[this.next];
          this.next = (this.next >= this.colors.length) ? 0 : this.next + 1;
          color = this.associated[sender_identifier];
        }

        //format date

        info.setCellValue("raw_timestamp",formatDate(info.getCellValue("raw_timestamp")));

        info.setHotTime(1000); // message highlighting time
        info.setHotToColdTime(2500); // highlight fading time
        info.setCellAttribute("message", "red", "#000090", "color");

        // set background color for the new row
        domNode.style.backgroundColor = color;

      }

    });

    //  create the Subscription; field names will be extracted from the grid
    var chatSubscription = new Subscription("DISTINCT","chat_room",chatGrid.extractFieldList());
    chatSubscription.setDataAdapter("CHAT_ROOM");
    chatSubscription.setRequestedSnapshot(30);

    chatSubscription.addListener(chatGrid);
	  chatSubscription.addListener({
      onClearSnapshot: function(itemName, itemPos) {
        var ip = document.location.protocol == "file:" ? "localhost" : document.location.hostname;

		    chatGrid.updateRow(1, {raw_timestamp: new Date(), IP: ip, nick: "Administrator", message: "Chat history flushed... Let's keep it clean" });
		  }
	  });
    lsClient.subscribe(chatSubscription);
  });


  var toDay = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var toMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function formatDate(date) {

    date = new Date(Number(date));

    var offset = -date.getTimezoneOffset() / 60;
    var sign = offset > 0 ? "+" : "";

    var dateMs = ""+date.getMilliseconds();
    while (dateMs.length < 3) {
      dateMs = "0"+dateMs;
    }

    return toDay[date.getDay()] + ", "
      + date.getDate() + " "
      + toMonth[date.getMonth()] + " "
      + date.getFullYear() + " "
      + date.getHours() + ":"
      + date.getMinutes() + ":"
      + date.getSeconds() + "."
      + dateMs
      + " GMT" + sign + offset;

  }
</script>

</body>

</html>
