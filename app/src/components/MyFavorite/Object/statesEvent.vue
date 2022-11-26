<template>
  <van-cell>
    <div class="StatesEvent">
      <label>
        <input type="checkbox">
      </label>
      <span>
        <span>已完成{{ doneTotal }}</span>全部{{ todos.length }}
      </span>
      <button class="btn btn-danger">清除已完成任务</button>
    </div>
  </van-cell>
</template>

<script>


export default {
  name: 'statesEvent',
  props: ['todos'],
  computed: {
    // doneTotal() {
    //   let i = 0
    //   this.todos.forEach((todo) => {
    //     if (todo.done) i++
    //   })
    //   return i
    // }
    doneTotal() {
      // const x = this.todos.reduce((pre, current) => {
      //   console.log('@', pre, current);
      //   return pre + (current.done ? 1 : 0)
      // }, 0)
      return this.todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
    }
  }

}

</script>

<style>

</style>