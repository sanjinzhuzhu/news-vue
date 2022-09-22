<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/toutiao_logo.png" alt="" />
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#fff" />
        </template>
      </van-nav-bar>
      <!-- tab栏导航 -->
      <div class="main">
        <van-tabs v-model="active" animated sticky offset-top="1.226667rem">
          <van-tab
            :title="obj.name"
            v-for="obj in userChannelList"
            :key="obj.id"
            ><ArticleIist :list="articleList"></ArticleIist>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllArticleListAPI } from "@/api";
import ArticleIist from "./components/ArticleIist";
export default {
  data() {
    return {
      active: 0,
      userChannelList: [],
      articleList:[]
    };
  },
  async created() {
    //频道列表
    const res = await getUserChannelsAPI();
    console.log(res);
    this.userChannelList = res.data.data.channels;

    //文章列表
    const res2 = await getAllArticleListAPI({
      channel_id: 0,
      timestamp: (new Date()).getTime()
    })
    console.log(res2);
    this.articleList = res2.data.data.results
  },
  components: {
    ArticleIist,
  },
};
</script>

<style>
.logo {
  width: 100px;
  height: 30px;
}

.main {
  padding-top: 46px;
}
</style>