defmodule Chat2.ChatController do
  use Chat2.Web, :controller

  def index(conn, _params) do
    conn |> render("chat.html")
  end
end
