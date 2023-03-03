const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // 拿到全部的Todo 資料
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) // 反序 desc 也可用Mogodb自動生成的_id
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router