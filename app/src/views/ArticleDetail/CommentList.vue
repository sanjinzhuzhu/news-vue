<template>
  <div>
    <!-- 评论列表    -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtBox,
        'art-cmt-container-2': !isShowCmtBox,
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了, 请发表评论"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="obj in commentList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="obj.is_liking === true"
                @click="likeFn(true, obj)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="likeFn(false, obj)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 发表评论的容器 -->
    <div>
      <!-- 底部添加评论区域 - 1 (短) -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtBox === true">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="toggleShowFn">发表评论</div>
        <div class="icon-box">
          <van-badge :content="totalCount === 0 ? '' : totalCount" max="99">
            <van-icon
              name="comment-o"
              size="0.53333334rem"
              @click="commentClickFn"
            />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea
          placeholder="友善评论、理性发言、阳光心灵"
          v-fofo
          @blur="blurFn"
          v-model.trim="comText"
        ></textarea>
        <van-button
          type="default"
          :disabled="comText.length === 0"
          @click="sendFn"
          >发布</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  commentArticleAPI,
  commentDisLikingAPI,
  commentLikingAPI,
  commentSendAPI,
} from "@/api";
import { timeAgo } from "@/utils/date.js";
export default {
  data() {
    return {
      commentList: [], //评论列表
      totalCount: 0,
      offset: null, // 下一页(偏移id), 一定初始值null(第一页不需要传, axios遇到null忽略此参数)
      isShowCmtBox: true,
      comText: "",
      loading: false,
      finished: false,
      lastId: null, // 分页
    };
  },
  async created() {
    const res = await commentArticleAPI({
      id: this.$route.query.art_id,
    });
    console.log(res);
    this.commentList = res.data.data.results;

    if (res.data.data.results.length === 0) {
      this.finished = true;
    }
  },
  methods: {
    timeAgo,
    // 评论小心心, 点赞/取消点赞
    async likeFn(bool, commentObj) {
      if (bool === true) {
        // 用户点在了 "红心" 身上
        // 显示 -> "灰色的心"
        commentObj.is_liking = false;
        await commentDisLikingAPI({
          comId: commentObj.com_id,
        });
      } else {
        // 用户点在了 "灰心" 身上
        commentObj.is_liking = true;
        await commentLikingAPI({
          comId: commentObj.com_id,
        });
      }
    },
    //显示评论
    toggleShowFn() {
      this.isShowCmtBox = false;
    },
    commentClickFn() {
      document.querySelector(".like-box").scrollIntoView({
        behavior: "smooth", // 设置出现的滑动效果->平滑的动画
      });
    },
    async sendFn() {
      const res = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.comText,
      });
      console.log(res);
      this.commentList.unshift(res.data.data.new_obj);
      this.totalCount++;
      this.comText = "";
      this.commentClickFn(); // 让第一条评论滚动到屏幕上
    },
    // 输入框失去焦点
    blurFn() {
      setTimeout(() => {
        this.isShowCmtBox = true;
      }, 0);
    },
    async onLoad() {
      if (this.commentList.length > 0) {
        // 请求下一页数据
        const res = await commentArticleAPI({
          id: this.$route.query.art_id, // 文章id
          offset: this.lastId,
        });
        this.commentList = [...this.commentList, ...res.data.data.results];
        this.totalCount = res.data.data.total_count; // 总数量
        this.lastId = res.data.data.last_id; // 分页
        if (res.data.data.last_id === null) {
          // 没有下一页了
          // 如果finished为true, 以后触底不再执行load事件
          this.finished = true;
        }
        this.loading = false;
      } else {
        // 4. 如果不加immediate-check, 上来走一次onLoad, loading状态为true, 但是if又进不去
        // 等created数据回来撑开高度, 滚动到底部时, loading为true就不会重新执行onLoad方法了
        // 效果: 一直转圈
        // 解决: if进不去, 进else里把状态关闭掉
        this.loading = false;
      }
    },
    // async getCommentListFn () {
    //   const res = await commentListAPI({
    //     artId: this.$route.query.aid,
    //     offset: this.offset // 把offset偏移量带给后台
    //   })
    //   this.commentList = res.data.data.results
    //   this.totalCount = res.data.data.total_count || ''
    //   this.offset = res.data.data.last_id // 保存起来为了做分页
    // }
  
  },
};
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>

