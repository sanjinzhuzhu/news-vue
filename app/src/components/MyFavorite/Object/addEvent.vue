<template>
  <div class="addEvent">
    <input type="text" style=" border-color: rgba(103, 130, 131, 0.8);box-shadow: inset 0 1px 1px rgb(0, 0, 0, 0.075), 0 0 8px rgba(66, 75, 76, 0.8);
  " placeholder="请输入你的任务,按回车键确认" v-model="title" @keyup.enter="add">
  </div>
</template>

<script>
import { Notify } from "vant";
import { nanoid } from 'nanoid'
export default {
  name: 'addEvent',
  props: ['addTodo'],
  data() {
    return {
      title: ''
    }
  },
  methods: {
    //业务简单方法 用event
    // add(event){
    //   console.log(event.target.value);
    // }
    add() {
      if (!this.title.trim) return
      Notify({ type: 'warning', message: '输入不能为空' });
      return
      //1.v-model方法实现 获取数据
      //2.因为list的todos数组里面是装的对象，所以用户需要将自己输入的事件包装成一个todo对象
      // console.log(this.title);
      const todoObj = { id: nanoid(), title: this.title, done: false }
      // console.log(todoObj);
      //{id: 'I8gGxh5JRRD9bagN5E4So', title: '学习', done: false}

      //3.将获取的数据放在数组的第一行
      //a->父亲自己定义一个函数，然后通过供儿子使用，
      //b->儿子用props接收父亲传过来的函数获取兄弟addEvent输入的数据
      this.addTodo(todoObj)
      this.title = ''
    }

  }
}
</script>

<style scoped>
.addEvent input {
  width: 325px;
  height: 18px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin: 2px 20px;
}

.addEvent input :focus {
  outline: none;
  border-color: rgba(103, 130, 131, 0.8);
  box-shadow: inset 0 1px 1px rgb(0, 0, 0, 0.075), 0 0 8px rgba(66, 75, 76, 0.8);
}
</style>