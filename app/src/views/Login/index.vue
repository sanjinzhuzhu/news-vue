<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        required
        :rules="[
          {
            required: true,
            message: '请输入11位手机号',
            pattern: /^1[2-9]\d{9}$/,
          },
        ]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[
          { required: true, message: '请填写6位数密码', pattern: /^\d{6}$/ },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
        :disabled="isloading"
        :loading="isloading"
        loading-text="登录中..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
import { Notify } from 'vant';
import{setToken} from '@/utils/token.js'
export default {
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      isloading:false//因为这个默认是true，这样一上来就会加载，所以默认先不加载
    };
  },
  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      console.log(this.user);
      this.isloading= true
      try {
         const res = await loginAPI(this.user);
      console.log(res);
      Notify({ type: 'success', message: '登录成功啦' });
      setToken(res.data.data.token)
      } catch (error) {
        Notify({ type: 'danger', message: '账户或密码不正确' });
      }
     this.isloading=false
     
    },
  },
};
</script>

<style scoped lang="less">
// .van-nav-bar{
//     background-color: #007bff;

// }
//修改组件内样式的话，需要加/deep/
/deep/ .van-nav-bar__title {
  color: white;
}
</style>