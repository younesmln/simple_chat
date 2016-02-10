// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("rooms:test", {})
let channel2 = socket.channel("position:broadcast", {})

$(".send-message").on("submit", function(e){
  e.preventDefault();
  var username = $(this).find("#username"),
  message = $(this).find("#message");
  channel.push("new_msg", {username: username.val(), message: message.val()});
  message.val("");
  return false;
})

$(".send-message").on("submit", function(e){
  e.preventDefault();
  var username = $(this).find("#username"),
  message = $(this).find("#message");
  channel.push("new_msg", {username: username.val(), message: message.val()});
  message.val("");
  return false;
})

$(".send-message").on("keyup", function(e){
  e.preventDefault();
  var username = $(this).find("#username"),
  message = $(this).find("#message");
  channel.push("new_msg", {username: username.val(), message: message.val()});
  message.val("");
  return false;
})

channel.on("new_msg", function(data){
  console.log("from server with "+data);
  var message = $(document.createElement("blockquote"));
  message.append("<p>"+data.username+"<p>");
  message.append("<wsmall>"+data.message+"<small>");
  message.appendTo(".messages")
  console.log(message);
});

$("body").on("keyup", function(e){
	console.log(e.keyCode);
    var off = 12;
    var x = obj.position().left;
    var y = obj.position().top;
    console.log(x+"  "+y)
    switch(e.keyCode) {
      case 37:
        console.log("left");
        x-=off;
        break;
      case 38:
        console.log("up");
        y-=off;
        break;
      case 39:
        console.log("right");
        x+=off;
        break;
      case 40:
        console.log("down");
        y+=off;
        break;
      default:
        console.log(".");
    }
    //channel2.push("position_change", {x: obj.position().left, y: obj.position().top});
    channel2.push("position_change", {x: x, y: y});
});

channel2.on("position_change", function(data){
  console.log("from server with "+data);
  obj.animate({left: data.x+"px", top: data.y+"px"},100)
});

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel2.join()
    .receive("ok", resp => {
      console.log("Joined successfully position", resp)
      var obj = $(document.createElement("div"));
      obj.attr("class", "obj");
      $("body").append(obj);
      window.obj = $(".obj");
     })
    .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
