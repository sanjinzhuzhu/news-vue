<template>
    <div>
        <ul class="ToDoList">
            <toDoItem />
            <toDoItem />
            <toDoItem />
            <toDoItem />
        </ul>
    </div>

</template>

<script>
import toDoItem from './toDoItem.vue';
export default {
    name: 'toDoList',
    components: { toDoItem }
}
</script>

<style>

</style>