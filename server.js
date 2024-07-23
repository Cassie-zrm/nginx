import express from "express"

const app = express()

app.get("/list", (req, res) => {
  console.log(req.url)
  res.send("Hello World!" + process.argv[2])
})

app.listen(process.argv[2])
