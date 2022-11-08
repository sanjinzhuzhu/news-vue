<template>
  <div>
    <van-nav-bar title="My favorite" left-arrow @click-left="$router.back()" />
    1.组件原子化<br />
    2.可扩展<br />
    3.数据管理<br />
    a.用数据描述所有的内容<br>
    b.数据要结构化,易于程序操作(遍历、查找)<br/>
    c.数据要可扩展以便于增加新的功能
  </div>
</template>

<script>
export default {
  name: "UserStudy",
  data() {
    return {
      activeNames: ["1"],
    };
  },
};
</script>

<style>
.demo {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  color: skyblue;
}
</style>