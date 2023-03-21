table "todos" {
  schema = schema.todo_atlas
  column "title" {
    null = true
    type = varchar(41)
  }
  column "description" {
    null = true
    type = text
  }
  column "id" {
    null           = false
    type           = bigint
    unsigned       = true
    auto_increment = true
  }
  column "completed" {
    null = true
    type = bool
  }
  primary_key {
    columns = [column.id]
  }
  index "todos_UN" {
    unique  = true
    columns = [column.title]
  }
}
schema "todo_atlas" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
