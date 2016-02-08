require Logger

defmodule Chat2.ChatChannel do
  use Phoenix.Channel

  def join("rooms:test", message, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", %{"username"=> username, "message"=>message} = data, socket) do
    Logger.debug("******************************")
    IO.inspect data
    Logger.debug("******************************")
    broadcast!(socket, "new_msg", data)
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end
