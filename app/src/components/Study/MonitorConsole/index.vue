<template>
  <div> <van-count-down ref="countDown" millisecond :time="3600000" :auto-start="false" format="HH:mm:ss" @finish="finish" />
    <van-grid clickable>
      <van-grid-item text="开始" icon="play-circle-o" @click="start" />
      <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
      <van-grid-item text="重置" icon="replay" @click="reset" />
    </van-grid></div>
</template>

<script>
import { Toast } from 'vant';

export default {
  methods: {
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    finish() {
      Toast('倒计时结束');
    },
  },
};
</script>

<style>

</style>