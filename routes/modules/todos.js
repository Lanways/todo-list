const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name          // 從 req.body 拿出表單裡的 name 資料
  // const todo = new Todo({ name })  // 存入資料庫            
  // return todo.save()
  //   .then(() => res.redirect('/')) // 新增完成後導回首頁
  //   .catch(error => console.log(error))
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  //解構賦值
  const { isDone, name } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === "on") {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exoorts = router