import express from "express"
import cors from "cors"
import { getDatabaseConnection } from "./database"

const PORT = process.env.PORT ?? 3000
const app = express()
const debug = true
const debugTime = 2

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROTA PRINCIPAL
app.get("/", (req, res) => res.send("Hello World!"))

// BUSCAR TODAS OS DADOS
app.get("/item", async (req, res) => {
  const db = await getDatabaseConnection()
  const resp = await db.all("SELECT * FROM todo ORDER BY id DESC")
  debug
    ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
    : res.json(resp)
})

// BUSCAR DADOS POR ID
app.get("/item/:id", async (req, res) => {
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.all("SELECT * FROM todo WHERE id=?", id)
  debug
    ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
    : res.json(resp)
})

// CRIAR DADOS
app.post("/item", async (req, res) => {
    const { todo } = req.body
    const db = await getDatabaseConnection()

    function formatTimestamp(timestamp: number): string {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      const milliseconds = ("00" + date.getMilliseconds()).slice(-3);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    // Uso
    const date = formatTimestamp(Date.now());
    const resp = await db.run("INSERT INTO todo (text, date) VALUES (?, ?)", todo, date)
    debug
      ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
      : res.json(resp)
  })

// ATUALIZAR DADOS
app.put("/item/:id", async (req, res) => {
  const { todo } = req.body
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.run("UPDATE todo SET text = ? WHERE id = ?", todo, id)
  debug
    ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
    : res.json(resp)
})

// ATUALIZAR DADOS (coluna)
app.patch("/item/:id", async (req, res) => {
  const { id } = req.params
  const keys = Object.keys(req.body)
  const values = Object.values(req.body)
  const permitedColumns = ["text", "date"]
  const isValidOperation = keys.every(c => permitedColumns.includes(c))
  if (!isValidOperation)
    return res
      .status(400)
      .json({ error: `Invalid Column, permited '${permitedColumns.join(', ')}', received '${keys.join(', ')}'` })
  const sql = `UPDATE todo SET ${keys.map(c => `${c}=?`).join(", ")} WHERE id=?`
  const db = await getDatabaseConnection()
  const resp = await db.run(sql, ...values, id)
  debug
    ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
    : res.json(resp)
})

// DELETAR DADOS
app.delete("/item/:id", async (req, res) => {
  const { id } = req.params
  const db = await getDatabaseConnection()
  const resp = await db.run("DELETE FROM todo WHERE id = ?", id)
  debug
    ? setTimeout(() => { res.json(resp) }, 1000 * debugTime)
    : res.json(resp)
})

// ⚡🔥☄️🌑🌚🌞☀️⭐💧
app.listen(PORT, () => console.log(`⚡ Server listening on port ${PORT}`))