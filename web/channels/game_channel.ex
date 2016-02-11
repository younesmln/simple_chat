require Logger

defmodule Chat2.GameChannel do
  use Phoenix.Channel

  def join("position:broadcast", _message, socket) do
    Logger.debug("******************************")
    IO.inspect socket
    Logger.debug("******************************")
    {:ok, socket}
  end

  def handle_in("position_change", %{"x"=> x, "y"=> y} = data, socket) do
    Logger.debug("******************************")
    IO.inspect data
    Logger.debug("******************************")
    broadcast!(socket, "position_change", data)
    {:noreply, socket}
  end
end
