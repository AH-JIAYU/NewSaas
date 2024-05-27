<script setup lang="ts">
import Payment from './components/Payment/index.vue'
const editRef = ref()
// 新增
function payment() {
  editRef.value.showEdit()
}
</script>
<template>
  <div>
    <PageMain>
      <div class="personal">
        <div class="avater">
          <el-avatar style="margin-right: 15px;" :size="50" src="" />
          <div class="top">
            <p class="user">代替用户名<span class="icon">icon基础版本</span></p>
            <p class="us"><span class="bule">美国</span>18803336@163.com</p>
            <p class="cn"><span class="bule">中国</span>15212345678</p>
          </div>
        </div>
        <ElButton style="margin-left: 95%;" type="primary" link>编辑个人信息>></ElButton>
      </div>
      <div class="center">
        <div class="version">
          <h2>ICON 基础版</h2>
          <h1>￥ 999 <span class="yare">/ 年</span></h1>
          <el-button class="btn" type="info" size="default" @click="">已开通</el-button>
          <div class="time">
            <p>到期时间</p>
            <p>2029-09-09 10:10:10</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
        </div>
        <div class="version">
          <h2 style="color: #f6403f;">ICON 高级版</h2>
          <h1>￥ 9999 <span class="yare">/ 年</span></h1>
          <el-button class="butn" size="default" @click="payment">立即开通</el-button>
          <div class="time">
            <p>每日只需：￥9999元</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
          <ElButton style="margin-left: 26%;" type="primary" link>功能特权,了解特权及对比>></ElButton>
        </div>
        <div class="version">
          <h2 style="color: #d9a550;">ICON 旗舰版</h2>
          <h1>￥ 99999 <span class="yare">/ 年</span></h1>
          <el-button class="buttn" size="default" @click="payment">立即开通</el-button>
          <div class="time">
            <p>每日只需：￥9999元</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
          <ElButton style="margin-left: 26%;" type="primary" link>功能特权,了解特权及对比>></ElButton>
        </div>
      </div>
      <Payment ref="editRef" />
    </PageMain>
  </div>
</template>
<style scoped lang="scss">
li {
  list-style-type: none;
}

.personal {
  width: 600px;
  margin-bottom: 50px;
  .avater {
    display: flex;
    align-items: self-start;
    margin-left: 30px;
    .top {
      margin-top: -6px;
      .user {
        font-size: 18px;
        margin-bottom: 15px;
        .icon {
          margin-left: 8px;
          width: 70px;
          color: #fff;
          font-size: 12px;
          background-color: #8400ff;
        }
      }
      .us {
        font-size: 12px;
        margin-bottom: 13px;
      }

      .cn {
        font-size: 12px;
      }

      .bule {
        margin-right: 5px;

        color: #fff;
        background-color: #0b6ebd;
      }
    }
  }
}
.center {
  display: flex;
  justify-content: space-between;
}
.version {
  width: 30%;
  height: 100%;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    color: #4c99ff;
    background-color: #aaaaaa;
    margin-bottom: 20px;
  }

  h1 {
    margin-left: 45px;
    margin-bottom: 20px;

    .yare {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .btn {
    width: 80%;
    height: 50px;
    margin-left: 10%;
    margin-bottom: 15px;
    font-size: 16px;
    background-color: #555555;
    border: none;
  }
  .time {
    text-align: center;
    font-size: 14px;
    margin-bottom: 30px;
  }
  ul {
    width: 100%;
    height: 100%;
    padding: 0 10%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 18%;
    li {
      width: 50%;
      margin-bottom: 20px;
    }
  }
}
.butn {
    width: 80%;
    height: 50px;
    margin-left: 10%;
    margin-bottom: 15px;
    font-size: 16px;
    color: #f6403f;
    border: 1px solid #f6403f;
}
.buttn {
    width: 80%;
    height: 50px;
    margin-left: 10%;
    margin-bottom: 15px;
    font-size: 16px;
    color: #c18537;
    border: 1px solid #c18537;
}


</style>
