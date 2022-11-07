<template>
  <div>
    <van-nav-bar title="前端学习" left-arrow @click-left="$router.back()" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="HTML" name="1" 
        >
          <van-collapse-item title="基础知识" name="a1">内容</van-collapse-item>
          <van-collapse-item title="面试题" name="a2">内容</van-collapse-item>
          <van-collapse-item title="思维导图" name="a3">内容</van-collapse-item>
        </van-collapse-item
      >
      <van-collapse-item title="CSS" name="2">内容</van-collapse-item>
      <van-collapse-item title="Javascript" name="3">内容</van-collapse-item>
    </van-collapse>
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