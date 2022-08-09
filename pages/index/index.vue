<template>
  <view class="content">
    <view class="input-box">
      <input type="text" class="input" v-model="user" placeholder="用户名(选填)">
      <input type="text" class="input" v-model="content" placeholder="留言">
    </view>

    <button type="primary" @click="publish()" size="default" class="btn">发布</button>

    <!-- <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>

    </view>
    <view class="text-area">
      <text class="title">{{time}}</text>
    </view> -->
    <!-- @click和bindtap一样 -->
    <!-- <button type="primary" @click="changeTime()">时间</button> -->
  </view>
  <view v-for="(item,index) in list" :key="item._id">

    <view class="box" :class="'list-'+index%2">

      <view>用户：{{item.user}}</view>
      <view>留言：{{item.content}}</view>

    </view>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello 张思哲',
        time: "",
        content: "",
        list: [],
        user: "",
        message: "Hello Vue!"
      }
    },
    onLoad() {
      uni.showToast({
          title: "加载",


        }),
        this.timer = setInterval(() => this.changeTime(), 1000),
        uniCloud.callFunction({
          name: 'fun',
          data: {
            api: "getMessages",
          }
        }).then((res) => {
          // 异步返回数据
          this.list = res.result.data
        }),
        uniCloud.callFunction({
          name: "fun",
          data: {
            api: "check",
          }
        }).then((res) => {
          console.log(res)
        })
    },

    onUnload() {

      // 清楚定时器，免得影响性能
      clearInterval(this.timer);
    },

    methods: {
      changeTime() {
        //this指向页面对象，title就是data里头的title
        this.time = new Date().toLocaleString()
      },
      publish() {
        if (!this.user) {
          this.user = "匿名";
        }
        if (!this.content) {
          uni.showToast({
            title: "请填写留言",
            icon: "error"
          })
          this.user = "";
          this.content = "";
          return;
        }
        uniCloud.callFunction({
          name: "fun",
          data: {
            api: "publish",
            content: this.content,
            user: this.user,
          }
        }).then((res) => {
          console.log(res),
            // list里加一个数据
            this.list.push({
              _id: res.result.id,
              content: this.content,
              user: this.user
            })
          // 输入框清空
          this.content = "";
          this.user = ""

        })
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    margin: 40rpx;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .input-box {


    flex: 1;
  }

  .input {
    border-bottom: 1px solid #ccc;
    padding: 6rpx;
    flex: 1;
  }



  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .box {
    /* margin: 40rpx;*/
    margin: 0 40rpx;
    line-height: 1.7;
    /* border-bottom: 1px solid #ccc; */
    /* padding: 20rpx 0; */
  }

  .list-0 {
    background-color: lightgray;
  }

  .list-1 {
    background-color: #fff;
  }

  .box:last-of-type {
    border-bottom: 1px solid lightgray;
  }
</style>
