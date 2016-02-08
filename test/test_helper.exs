ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Chat2.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Chat2.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Chat2.Repo)

