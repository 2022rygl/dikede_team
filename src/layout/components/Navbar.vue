<template>
  <div class="navbar"><img class="logo" src="~@/assets/images/logoone.png" alt="">
    <div class="right-menu">
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <img class="userImg" src="~@/assets/images/user.png" alt="">
        </el-col>
        <el-col :span="14">
          欢迎您，{{ userInfo.userName }}
        </el-col>
        <el-col :span="5">
          <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
            <div @click="logout"><span>退出</span><i class="el-icon-caret-bottom" /></div>
          </el-tooltip>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  components: { },
  props: {},
  data() {
    return {}
  },
  computed: { ...mapGetters(['userInfo']) },
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$store.dispatch('user/getUserInfo', this.userInfo.userId)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
 .navbar{
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1999;
    background-image :url(~@/assets/images/backgroundone.png);
    background-size: cover;
    background-repeat: no-repeat;
    .logo{
    position: relative;
    top: 4px;
    width: 88px;
    margin-top: 6px;
    margin-left: 15px;}
    .right-menu{
    float: right;
    width: 240px;
    height: 100%;
    margin-right: 24px;
    color: #fff;
    cursor: pointer;
    .el-row{
      height: 100%;
    }
    .userImg{vertical-align: middle;}
    }

  }
</style>
