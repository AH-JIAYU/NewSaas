<script lang="ts" setup>
//事件
const countDown = ref<any>(0)
// 倒计时
const getPhoneInterval = ref<any>(null);

// 倒计时
const loginCountdown = () => {
  let n = 5;
  countDown.value = 5
  getPhoneInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      countDown.value = n;
    } else {
      clearInterval(getPhoneInterval.value);
      countDown.value = 0;
      getPhoneInterval.value = null;
      closePage()
    }
  }, 1000);
};
// 关闭页面
const closePage = () => {
  window.open("about:blank", "_self");
  window.close();
}
onMounted(() => {
  loginCountdown()
})
</script>

<template>
  <div class="page">
    <div class="paymentSuccess">
      <div class="icon">
        <SvgIcon name="i-ep:success-filled" size="60px" color="#70b61b" />
      </div>
      <!-- 支付状态 -->
      <div class="paymentStatus">
        <div class="status ">支付成功</div>
        <!-- 倒计时 -->
        <div class="countDown">
          倒计时{{ countDown }}秒关闭页面 . . .&emsp;
          <div class="closePage">
            <el-button type="primary" link @click="closePage">
              关闭页面
            </el-button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  .paymentSuccess {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;

    .icon {
      margin-right: 16px;
    }

    .paymentStatus {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      height: 50px;

      .status {
        font-size: 18px;
        font-weight: 600;
        font-family: '黑体';
      }

      .countDown {
        .closePage {
          display: inline-block;
        }
      }
    }


  }
}
</style>
