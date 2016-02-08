defmodule Chat2.PageController do
  use Chat2.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
