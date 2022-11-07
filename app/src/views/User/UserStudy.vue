<template>
  <div>
    <van-nav-bar title="My favorite" left-arrow @click-left="$router.back()" />
    1.组件原子化<br />
    2.可扩展<br />
    3.数据管理<br />
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