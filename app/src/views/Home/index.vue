<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/toutiao_logo.png" alt="" />
        </template>
        
        <template #right>
          <van-icon name="search" size="18" color="#fff" @click="moveSearchPageFn" />
        </template>
      </van-nav-bar>
      <!-- tab栏导航 -->
      <div class="main">
        <van-tabs
          v-model="channel_id"
          @change="channelChangeFn"
          animated
          sticky
          offset-top="1.226667rem"
        >
          <van-tab
            :title="obj.name"
            v-for="obj in userChannelList"
            :key="obj.id"
            :name="obj.id"
          >
            <ArticleIist :channelId="channel_id"></ArticleIist>
          </van-tab>
        </van-tabs>
        <!-- 编辑频道图标 -->
        <van-icon
          name="plus"
          size="0.37333334rem"
          class="Obj"
          @click="showPopup"
        />
      </div>
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body"
      ><ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelE="addChannelFn"
        @removeChannelE="removeChannelFn"
        @closeE="closeFn"
        ref="editRef"
        v-model="channel_id"
      ></ChannelEdit
    ></van-popup>
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeChannelAPI,
} from "@/api";
import ArticleIist from "./components/ArticleIist";
import ChannelEdit from "./ChannelEdit.vue";

export default {
  data() {
    return {
      channel_id: 0, //默认id是0，推荐
      userChannelList: [],
      allChannelList: [],
      //   articleList: [],
      show: false,
    };
  },
  async created() {
    //用户频道列表
    const res = await getUserChannelsAPI();
    console.log(res);
    this.userChannelList = res.data.data.channels;
    // this.channelChangeFn();

    //所有频道
    const res2 = await getAllChannelsAPI();
    console.log(res2);
    this.allChannelList = res2.data.data.channels;
  },
  methods: {
    async channelChangeFn() {
      //每次切换频道都需要重新请求数据
      //文章列表
      // const res2 = await getAllArticleListAPI({
      //   channel_id: this.channel_id,
      //   timestamp: new Date().getTime(),
      // });
      // console.log(res2);
      // this.articleList = res2.data.data.results;
    },
    showPopup() {
      this.show = true;
    },
    async addChannelFn(ChannelObj) {
      this.userChannelList.push(ChannelObj);
      //添加完后还需要发请求带上添加的参数返回给后台，后台在接受到所有用户添加的在返回给用户端
      const res = await updateChannelsAPI(this.userChannelList);

      // const newArr = this.userChannelList.filter(
      //   (Obj) => Obj.id !== 0
      // );
      // const theNewArr = newArr.map((Obj, index) => {
      //   const newObj = { ...Obj }; // 拷贝(浅拷贝)
      //   delete newObj.name;
      //   newObj.seq = index;

      //   return newObj; // 让map方法把新对象收集起来形成一个新数组
      // });
      // const res = await updateChannelsAPI({
      //   channels: theNewArr,
      // });
      // console.log(res);
    },

    async removeChannelFn(ChannelObj) {
      let index = this.userChannelList.findIndex(
        (Obj) => Obj.id === ChannelObj.id
      );
      this.userChannelList.splice(index, 1);

      const res = await removeChannelAPI({
        channelId: ChannelObj.id,
      });
      console.log(res);
    },
    closeFn() {
        this.show = false
        this.$refs.editRef.isEdit= false
     
    },
    moveSearchPageFn(){
        this.$router.push('/search')
    }
  },
  components: {
    ArticleIist,
    ChannelEdit,

  },

  computed: {
    unCheckChannelList() {
      //收集更多频道 【遍历所有的频道，然后对比用户已选频道，如果没在已选频道出现的
      //，就建立一个新数组，在filter方法收集。】
      //filter 方法 【array.filter(function(currentValue,index,arr), thisValue)】
      //   const newArr = this.allChannelList.filter(bigObj=> {
      //     const index = this.userChannelList.findIndex(smallObj => {
      //       return smallObj.id === bigObj.id;
      //     })
      //     if (index > -1) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   })
      //   return newArr;

      return this.allChannelList.filter(
        (bigObj) =>
          this.userChannelList.findIndex(
            (smallObj) => smallObj.id === bigObj.id
          ) === -1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}

.main {
  padding-top: 46px;
}
/* 设置 tabs 容器的样式 */
/deep/ .van-tabs__wrap {
  padding-right: 60px;
  background-color: #fff;
}

/* // 设置小图标的样式 */
.Obj {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>