<template>
    <div>
        <van-cell>
            <li>
                <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)">
                <label>
                    <span>{{ todo.title }}</span>
                </label>
                <button class="btn btn-danger" @click="handleDel(todo.id)"
                    style="color: #fff;
                    background-color: #da4f49;
                    border: 1px solid #bd362f;
                    font-size:14px;line-height:15px;
                    text-align: center;vertical-align: middle;box-shadow: inset 0 1px 0 rgba(255,255,255,0.2) rgba(0,0,0,0.5);border-radius: 4px;">删除</button>
            </li>
        </van-cell>
    </div>
</template>

<script>

import { Dialog } from 'vant';
export default {

    name: 'toDoItem',
    props: ['todo', 'checkTodo','del'],
    // mounted(){
    //     console.log(this.todo);
    methods: {
        //勾选
        handleCheck(id) {
            //通知index将对应的todo对象的done值取反
            //1.数据在index页面，那么操作数据的方法也在index的method
            //2.修改todo状态，收到id，然后取反done值
            //3.把参数供给儿子，在到孙子，index-->list--->item
            this.checkTodo(id)
        },
        //删除todo
        handleDel(id) {
            Dialog.alert({
                message: '确定要删除吗？',
            }).then(() => {
                // on close
                this.del(id)
            });
        }
    }
}

</script>

<style>
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li label {
    /* float: left; */
    cursor: pointer;
}

li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li button {
    float: right;
    display: none;
    margin-top: 10px;

}

li:before {
    content: initial;
}

li :last-child {
    border-bottom: none;
}

li:hover {
    background: rgb(238, 240, 240);
}

li:hover button {
    display: block;
}
</style>