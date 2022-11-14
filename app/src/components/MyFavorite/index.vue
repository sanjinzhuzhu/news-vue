<template>
  <div>
    <van-nav-bar title="生活九宫格" left-arrow @click-left="$router.back()" />
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <addEvent :addTodo="addTodo" />
          <ToDoList :todos="todos" :checkTodo="checkTodo"/>
          <StatesEvent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AddEvent from './Object/addEvent.vue';
import StatesEvent from './Object/statesEvent.vue';
import ToDoList from './Object/toDoList.vue';

export default {
  name: 'Object',
  components: { AddEvent, StatesEvent, ToDoList },
  //3.data从list剪切过来后记得到list组件props接收
  data() {
    return {
      todos: [
        { id: '001', title: '健康', done: false },
        { id: '002', title: '家庭', done: true },
        { id: '003', title: '工作', done: false },
        { id: '004', title: '学习', done: true },
        { id: '005', title: '爱好', done: false },
        { id: '006', title: '财务', done: false },
        { id: '007', title: '人脉', done: true },
        { id: '008', title: '心灵', done: false },
        { id: '009', title: '计划外', done: true },
      ]
    }
  },
  //4.爷爷自己发一个函数功能 把参数供给儿子，在到孙子，index-->list--->item
  methods: {
    //添加一个doto
    addTodo(todoObj) {
      // console.log('我是index组件,我收到数据', 'x');
      this.todos.unshift(todoObj)
    },
    //修改todo状态，收到id，然后取反done值
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    }
  }
}

</script>

<style scoped>
body {
  background-color: #fff;
  font-size: 14px;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  line-height: 20px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600;
  margin: 0 auto;
}

.todo-container .toto-wrap {
  padding: 10px;
  border: 1 solid #ddd;
  border-radius: 5px
}
</style>