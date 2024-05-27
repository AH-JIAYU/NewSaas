<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Edit',
})

// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() {

}
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()

  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" width="50%" :before-close="closeHandler">
      <div class="whole">
        <div class="left">
          <h2>ICON</h2>
          <h1>高级版</h1>
          <p class="vip">会员尊享<span class="quantity">30+</span>项权益</p>
          <ul>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
            <li>代替权益名称</li>
          </ul>
        </div>
        <div class="right">
          <div class="userTop">
            <div class="name">用户名<span class="jichu">ICON基础版</span></div>
            <el-button link type="primary" size="default" @click="">ICON联系客服</el-button>
          </div>
          <div class="select">
            <p class="p">|方案选择</p>
            <ul>
              <li>
                <div class="selectTop">基础版</div>
                <span class="selectbtm">500元/月</span>
              </li>
              <li>
                <div class="selectTop">高级版</div>
                <span class="selectbtm">80%用户选择</span>
              </li>
              <li>
                <div class="selectTop">旗舰版</div>
                <span class="selectbtm">低至4.5元/天</span>
              </li>
            </ul>
          </div>
          <div class="selects">
            <p class="p">|时长选择</p>
            <div class="ul">
              <div class="selectTops">代替区间</div>
              <div class="selectTops">代替区间</div>
              <div class="selectTops">代替区间</div>
              <div class="selectTops">代替区间</div>
              <div class="selectTops">代替区间</div>
            </div>
          </div>
          <div class="personal">
            <div class="personalLeft">
              <p style="margin-bottom: 20px;">|扫码支付</p>
              <img src="../../../../assets/images/erCode.png" alt="">
            </div>
            <div class="bottom">
              <div class="money">￥ <span class="size">9999</span> 元</div>
              <div class="zhifu">
                <div style="margin-right: 5px; color: #439deb;" class="i-bi:alipay w-1em h-1em"></div>
                <div style="margin-right: 5px; color: #57cb00;" class="i-bi:wechat w-1em h-1em"></div>
                支持微信/支付宝扫码
              </div>
              <div class="protocol">服务协议 | 购买须知</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
li {
  list-style-type: none;
}

.whole {
  display: flex;
  width: 100%;
  height: 600px;
  border: 1px solid #9c9c9c;
  color: #333333;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 100%;
    text-align: center;
    border-right: 1px solid #d5d5d5;

    h2 {
      width: 100%;
      height: 78px;
      text-align: center;
      line-height: 78px;
    }

    h1 {
      width: 80%;
      height: 66px;
      text-align: center;
      line-height: 66px;
      border-bottom: 1px solid #d5d5d5;
      background-color: white;
    }

    .vip {
      width: 100%;
      margin: 18px 0;

      .quantity {
        font-size: 16px;
        font-weight: 700;
        color: #f0ae50;
      }
    }

    ul {
      width: 100%;
      height: 260px;
      display: flex;
      flex-direction: column;
      justify-content: space-between
    }
  }

  .right {
    padding: 20px;
    width: 75%;
    height: 100%;

    .userTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      margin-bottom: 20px;

      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        font-size: 16px;
        font-weight: 500;

        .jichu {
          margin-left: 1.875rem;
        }
      }
    }

    .select {
      margin-bottom: 20px;

      .p {
        margin-bottom: 15px;
      }

      ul {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 120px;
        background-color: #fff;

        li {
          width: 30%;
          height: 100%;
          border: 1.5px solid #5681c8;
          border-radius: 3px;

          .selectTop {
            width: 100%;
            height: 75%;
            text-align: center;
            line-height: 120px;
            color: #6087cb;
          }

          .selectbtm {
            display: block;
            width: 100%;
            height: 25%;
            text-align: center;
            line-height: 30px;
            background-color: #cbd8ee;
          }
        }
      }
    }

    .selects {
      width: 100%;
      height: 100px;
      margin-bottom: 15px;

      .p {
        margin-bottom: 15px;
      }

      .ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 70px;

        .selectTops {
          width: 100px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          border-radius: 5px;
          border: 1.5px solid #7e9ed5;
        }
      }
    }

    .personal {
      display: flex;
      width: 100%;
      height: 200px;
      .bottom {
        width: 100%;
        height: 100%;
        margin-left: 20px;
        padding-top: 100px;
        .money {
          color: #d10027;
          margin-bottom: 5px;
          .size {
            font-weight: 700;
            font-size: 22px;
          }
        }
        img {
          width: 155px;
          height: 155px;
        }
        .zhifu {
          margin-bottom: 10px;
        }


      }
    }
  }
}
</style>
