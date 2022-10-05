<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 文章列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="obj in articleList"
          :key="obj.art_id"
          :artObj="obj"
          :searchResultIconShow="false"
          @click.native="itemClickFn(obj.art_id)"
        ></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { saerchResultAPI } from "@/api";
import ArticleItem from "@/components/ArticleItem";
export default {
  name: "SearchResult",
  data() {
    return {
      page: 1,
      articleList: [], //文件列表
      loading: false, //加载状态
      finished: false, //是否全部加载完成

      // per_page:10,
    };
  },
  async created() {
    const res = await saerchResultAPI({
      page: this.page,
      q: this.$route.params.kw,
    });
    console.log(res); //记得将结果保存在vue体系中
    this.articleList = res.data.data.results;
  },
  components: {
    ArticleItem,
  },
  methods: {
    async onLoad() {
      if (this.articleList.length > 0) {
        this.page++;
        const res = await saerchResultAPI({
          page: this.page,
          q: this.$route.params.kw,
        });
        if (res.data.data.results.length === 0) {
          //没有更多数据
          this.finished = true;
          return;
        }
        console.log(res); //记得将结果保存在vue体系中
        this.articleList = [...this.articleList, ...res.data.data.results];
        this.loading = false
      }
    },
    itemClickFn(id) {
      this.$router.push({
        path:`/detail?art_id=${id}`
      })
    },
  },
};
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>