<template>
    <div>
        <ul class="ToDoList">
            <toDoItem v-for="todoObj in todos" 
            :key="todoObj.id" 
            :todo="todoObj" 
            :checkTodo="checkTodo"
            :del="del"
            />
         
            <!-- <toDoItem />
            <toDoItem />
            <toDoItem /> -->
        </ul>
    </div>

</template>

<script>
import toDoItem from './toDoItem.vue';
export default {
    name: 'toDoList',
    components: { toDoItem },
    //3.接收index传过来的数据todos
    props:['todos','checkTodo','del']
    //子传父 通过函数的方式  （vuex 全局事件总线 消息订阅发布 ）
    // data() {
    //     return {
    //         todos:[
    //             {id:'001',title:'健康',done:false},
    //             {id:'002',title:'家庭',done:true},
    //             {id:'003',title:'工作',done:false},
    //             {id:'004',title:'学习',done:true},
    //             {id:'005',title:'爱好',done:false},
    //             {id:'006',title:'财务',done:false},
    //             {id:'007',title:'人脉',done:true},
    //             {id:'008',title:'心灵',done:false},
    //             {id:'009',title:'计划外',done:true},
    //         ]
    //     }
    // },
}
</script>

<style>

</style>