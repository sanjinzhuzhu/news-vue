<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="inputFn"
        @search="searchFn"
      />
    </div>
    <!-- 搜索建议列表  -->
    <div class="sugg-list">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="highLightFn(str, kw)"
      >
        <!-- {{hightLightFn(str,kw) }} -->
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          >{{ str }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from "@/api";

export default {
  name: "Search",
  data() {
    return {
      kw: "", // 搜索关键字
      timer: null, //防抖定时器
      suggestList: [],
      history: ["API", "java", "css", "前端", "后台接口", "python"], // 搜索历史
    };
  },
  methods: {
    inputFn() {
      clearTimeout(this.timer);
      if (this.kw.length === 0) {
        this.suggestList = [];
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keywords: this.kw,
          });
          console.log(res);
          this.suggestList = res.data.data.options;
        }, 300);
      }
    },
    //匹配全局、忽略大小写、返回的结果不会被替换，可以返回一个函数
    highLightFn(originStr, target) {
      //记得返回 return给 hightLightFn
      const reg = new RegExp(target, "ig"); // i忽略大小写,g全局匹配，如果使用变量，做正则的匹配条件
      return originStr.replace(
        //target,(1)
        // /target/i,(2)x，
        reg,
        //match表示还用原来的字符，不会被替换掉，replace的替换结果，返回的是一个函数
        (match, p1, p2, p3) => {
          // console.log(match,p1,p2,p3);
          return `<span style="color:skyblue;">${match}</span>`;
        }
        // `<span style="color:red;">${target}</span>`
      );
    },
    // 输入框搜索事件
    searchFn() {
      this.$router.push({
        path: `/search_result/${this.kw}`,
      });
    },
  },
};
</script>
<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>