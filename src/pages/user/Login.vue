<template>
<div class="page subpage" id="login">
    
    <app-header title="猫眼电影">
        <span slot="left" class="iconfont icon-zuo" @click="backAction()"></span>
    </app-header>
    <app-content :style="{top: '44px', bottom: 0}">
        <div class="title-tab">
          <p @click="changeTab(0)" :class="{chosen:accountIndex==0}">美团账号登录</p>
          <p @click="changeTab(1)" :class="{chosen:accountIndex==1}">手机验证登录</p>
          <!-- <div class="slide" style="width: 355px; left: 20px;"></div> -->
        </div>
        <p class="inp">
            <input type="text" placeholder="账户名/手机号/Email" ref="user">
        </p>
        <p class="inp">
            <input type="text" placeholder="请输入您的密码" ref="psd">
        </p>
        <p class="inp inp-btn">
            <span @click="loginAction">登录</span>
        </p>
    </app-content>
</div>
</template>

<script>
export default {
  data(){
    return{
      accountIndex:0,
    }
  },
    methods: {
      changeTab(index){
          this.accountIndex = index;
          
          console.log(this.accountIndex)
      },
        backAction(){
            this.$router.back();
        },
        loginAction(){
            console.log(this.$refs.user.value);
            console.log(this.$refs.psd.value);
            //发送ajax请求
            // 将登录成功的结果保存起来
            localStorage.setItem('token', 'afsdjasdfhaos');
            //成功
            this.$router.push('/mine');
        }
    }
}
</script>
<style lang="scss" scoped>
#login{
    background: #eee;
  .title-tab{
    display: flex;
    height: 76px;
    width: 100%;
    position: relative;
    p{
      flex: 1;
      text-align: center;
      line-height: 76px;
      border-bottom: 3px solid #dfdfdf;
    }
    .chosen{
      color: #df2d2d;
      border-bottom: 3px solid #df2d2d;
    }
    
  }
  .inp{
    padding: 5px 20px;
    border-top: 1px solid #f5f5f5;
    input{
      width:100%;
      line-height: 40px;
      outline: none;
      border:none;
    }
  }
  .inp-btn{
    background: #df2d2d;
    span{
      text-align: center;
      line-height: 40px;
      padding: 0 45%;
    }
    
  }
  
}
</style>

