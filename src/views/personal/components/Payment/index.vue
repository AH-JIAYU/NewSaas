<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Edit',
})
const form = ref({
  version:1,
  radio:7,
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
            <el-radio-group v-model="form.version">
              <el-radio :value="1" size="large" border>
                <p class="radius">基础版</p>
                <p class="radiusP">500元/月</p>
              </el-radio>
              <el-radio :value="2" size="large" border>专业版
                <p class="radiusP">80%用户选择</p>
              </el-radio>
              <el-radio :value="3" size="large" border>旗舰版
                <p class="radiusP">低至4.5元/天</p>
              </el-radio>
            </el-radio-group>
          </div>
          <div class="selects">
            <p class="p">|时长选择</p>
            <!-- <el-radio-group v-model="radio" size="large">
              <el-radio-button border label="7天" :value="7" />
              <el-radio-button border label="30天" :value="30" />
              <el-radio-button border label="90天" :value="90" />
              <el-radio-button border label="180天" :value="180" />
              <el-radio-button border label="365天" :value="365" />
            </el-radio-group> -->
            <el-radio-group v-model="form.radio">
              <el-radio :value="7" size="large" border>7天</el-radio>
              <el-radio :value="30" size="large" border>30天</el-radio>
              <el-radio :value="90" size="large" border>90天</el-radio>
              <el-radio :value="180" size="large" border>180天</el-radio>
              <el-radio :value="365" size="large" border>365天</el-radio>
            </el-radio-group>
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

  :deep(.el-radio-group) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-between;

    .el-radio-button {
      width: 6.75rem;
      border-radius: 3px !important;
      border: 1px solid #5681c8;
    }

    .el-radio-button__inner {
      width: 100%;
      height: 100%;
    }

    .el-radio {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      width: 6.75rem;
      border-radius: 3px !important;
    }

    .el-radio__input {
      display: none;
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

      :deep() {
        .el-radio {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          text-align: center;
          margin: 0;
          padding: 0;
          width: 12.75rem;
          height: 7.5rem;
          border-radius: 3px !important;
        }

        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          padding: 0;
        }
        .radiusP {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 1.875rem;
          background-color: #cbd8ee;
          margin-top: 1.25rem;
        }

      }

      .p {
        margin-bottom: 15px;
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
