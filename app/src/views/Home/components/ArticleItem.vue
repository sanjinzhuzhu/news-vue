<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图片 -->
          <img
            v-if="artObj.cover.type === 1"
            class="thumb"
            :src="artObj.cover.images[0]"
            alt=""
          />
        </div>
        <!-- 多图片  用遍历-->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img
            v-for="(imgUrl, index) in artObj.cover.images"
            :key="index"
            class="thumb"
            :src="imgUrl"
            alt=""
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @close="closeFn"
      @cancel="cancelFn"
      :cancel-text="bottomText"
      get-container="body"
    />
  </div>
</template>

<script>
//1、点击按钮 反馈垃圾内容  数据切换
// 点击select 区分用户点击哪一个。切换actions数组里数据

import { timeAgo } from "@/utils/date.js"; //这个方法vue模版里没有所以，需要返回给data/method。才能在vue模版中使用
import { zeroActions, fristActions } from "@/api/report.js";
export default {
  props: {
    artObj: Object, //文章对象
  },
  data() {
    return {
      show: false, //反馈面板显示/隐藏
      actions: zeroActions,
      bottomText: "取消",
    };
  },
  methods: {
    formatTime: timeAgo,

    onSelect(action, item) {
      console.log(action);
      console.log(item);
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false;
      if (action.name === "反馈垃圾内容") {
        this.actions = fristActions;
        this.bottomText = "返回";
      } else if (action.name === "不感兴趣") {
        this.$emit("disLikeE", this.artObj.art_id);
        this.show = false;
      }else{//二级反馈fristActions
        this.$emit("reportE", this.artObj.art_id,action.value)
        this.show=false;
      }
    },
    cancelFn() {
      if (this.bottomText === "返回") {
        this.show = true;
        this.actions = zeroActions;
        this.bottomText = "取消";
      }
    },
    closeFn(){
      this.actions =zeroActions
      this.bottomText ='取消'
    }
  },
};
</script>

<style lang="less" scoped>
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>>

