<template>
  <div>
    <van-nav-bar title="My favorite" left-arrow @click-left="$router.back()" />
    <AddEvent/>
    <StatesEvent/>
    <ToDoList/>
  </div>
</template>

<script>

import AddEvent from './Object/addEvent.vue';
import StatesEvent from './Object/statesEvent.vue';
import ToDoList from './Object/toDoList.vue';

export default {
  name: 'Object',
  components: { AddEvent, StatesEvent, ToDoList }
}
</script>

<style>

</style>