<template>
  <div class="addEvent">
    <input type="text" placeholder="请输入你的任务,按回车键确认">
  </div>
</template>

<script>
export default {
  name: 'addEvent'
}
</script>

<style scoped>
.addEvent input {
  width: 300px;
  height: 18px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin: 2px 20px;
}

.addEvent input :focus {
  outline: none;
  border-color: rgb(138, 241, 244, 0.8);
  box-shadow: inset 0 1px 1px rgb(0, 0, 0, 0.075), 0 0 8px rgb(138, 241, 244, 0.8);
}
</style>