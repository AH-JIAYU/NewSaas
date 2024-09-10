<script setup lang="ts">
import { ref } from "vue";
import GetIdApi from "@/api/modules/otherFunctions_screenLibrary";// 获取雪花id
import api from '@/api/modules/personal-payment'//支付

defineOptions({
  name: "Edit",
});
const form = ref({
  version: 1,
  radio: 7,
  paymentMethod: "", //支付方式
});
const data = ref<any>({
  paymentMethodList: [
    // { mode: "微信", icon: "i-ant-design:wechat-outlined", color: '#29db70', value: "1" },
    { mode: "支付宝", icon: "i-ant-design:alipay-circle-filled", color: '#1677ff', value: "2" },
  ],
});
const versionList = [
  '基础版',
  '专业版',
  '旗舰版',
]
// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() { }
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()

  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false;
}
// 支付
const payment = async () => {
  const getIdRes = await GetIdApi.getId({})
  const traceNo = getIdRes.data.id//订单编号
  const params = {
    traceNo,
    totalAmount: 9999,
    subject: versionList[form.value.version - 1]
  }
  window.open(`http://47.96.98.102:9100/alipay/pay?subject=${params.subject}&traceNo=${params.traceNo}&totalAmount=${params.totalAmount}`,'_blank')
}

// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" width="50%" :before-close="closeHandler">
      <div class="whole">
        <div class="left">
          <!-- <h2>ICON</h2> -->
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
          <div>
            <p class="title">| 方案选择</p>
            <el-radio-group v-model="form.version" class="programme">
              <el-radio class="radio1" :value="1" size="large" border>
                <p class="radius">基础版</p>
                <!-- <p class="radiusP">500元/月</p> -->
              </el-radio>
              <el-radio class="radio2" :value="2" size="large" border>
                <p class="radius">专业版</p>
                <!-- <p class="radiusP">80%用户选择</p> -->
              </el-radio>
              <el-radio class="radio3" :value="3" size="large" border>
                <p class="radius">旗舰版</p>
                <!-- <p class="radiusP">低至4.5元/天</p> -->
              </el-radio>
            </el-radio-group>
          </div>
          <div class="selects">
            <p class="title">| 时长选择</p>
            <el-radio-group class="radiobutton" v-model="form.radio">
              <el-radio class="timeRadio" :value="7" size="large" border>月</el-radio>
              <el-radio class="timeRadio" :value="30" size="large" border>季度</el-radio>
              <el-radio class="timeRadio" :value="90" size="large" border>年</el-radio>
              <el-radio class="timeRadio" :value="180" size="large" border>终身</el-radio>
            </el-radio-group>
          </div>
          <div class="personal">
            <p class="title">| 扫码支付</p>
            <div class="payment">
              <img class="qrCode" src="../../../../assets/images/erCode.png" alt="" />
              <div class="paymentMethod">
                <div>
                  <div> <span class="money">9999</span> /月</div>

                  <el-select v-model="form.paymentMethod" placeholder="支付方式" size="small">
                    <el-option v-for="item in data.paymentMethodList" :key="item.value" :label="item.mode"
                      :value="item.value" style="">
                      <SvgIcon :name="item.icon" :color="form.paymentMethod === item.value ? item.color : ''" />
                      {{ item.mode }}
                    </el-option>
                  </el-select>
                </div>
                <el-button type="primary" @click="payment" :disabled="!Boolean(form.paymentMethod)">去支付</el-button>
                <div class="protocol">服务协议 | 购买须知</div>
              </div>
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

// 标题 方案、时长、扫码
.title {
  margin: 1.25rem 0;
}

.whole {
  display: flex;
  width: 100%;
  height: 37.5rem;
  // border: .0625rem solid #9c9c9c;
  color: #333333;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 100%;
    text-align: center;
    border-right: .0625rem solid #d5d5d5;

    h2 {
      width: 100%;
      height: 4.875rem;
      text-align: center;
      line-height: 4.875rem;
    }

    h1 {
      width: 80%;
      height: 4.125rem;
      text-align: center;
      line-height: 4.125rem;
      border-bottom: .0625rem solid #d5d5d5;
      background-color: white;
    }

    .vip {
      width: 100%;
      margin: 1.125rem 0;

      .quantity {
        font-size: 1rem;
        font-weight: 700;
        color: #f0ae50;
      }
    }

    ul {
      width: 100%;
      height: 16.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  // 单选框 - 时长选择
  :deep {
    .el-radio__input {
      display: none !important;
    }

    .el-radio.is-bordered.is-checked.el-radio--large.timeRadio {
      background: var(--el-color-primary);

      .el-radio__label {
        color: white !important;
      }
    }
  }

  .right {
    padding: 1.25rem;
    width: 75%;
    height: 100%;

    .userTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 3.125rem;
      margin-bottom: 1.25rem;

      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        font-size: 1rem;
        font-weight: 500;

        .jichu {
          margin-left: 1.875rem;
        }
      }
    }

    .programme {
      margin-bottom: 1.25rem;
      justify-content: space-between;
      width: 100%;

      :deep() {
        .el-radio {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 1rem;
          margin: 0;
          padding: 0;
          width: 32%;
          height: 5.5rem;
          border-radius: .5625rem !important;
        }

        // 选中 高亮
        .is-checked {
          border: none !important;
          box-shadow: 0 0 0 .125rem #fff, 0 0 .25rem .25rem #fece93;

          .el-radio__label {
            color: #fff;
          }
        }
      }

      .p {
        margin-bottom: .9375rem;
      }
    }

    .selects {
      width: 100%;
      height: 6.25rem;
      margin-bottom: .9375rem;

      .p {
        margin-bottom: .9375rem;
      }

      .ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 4.375rem;

        .selectTops {
          width: 6.25rem;
          height: 2.8125rem;
          text-align: center;
          line-height: 2.8125rem;
          border-radius: .3125rem;
          border: .0938rem solid #7e9ed5;
        }
      }
    }

    .personal {
      width: 100%;
      height: 9.375rem;

      .payment {
        display: flex;

        img {
          aspect-ratio: 1/1;
          width: 9.375rem;
        }

        .paymentMethod {
          height: 9.375rem;
          margin-left: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;

          .money {
            margin-bottom: .625rem;
            display: inline-block;
            color: #ff3713;
            font-weight: 700;
            font-size: 1.375rem;
          }

          img {
            width: 9.6875rem;
            height: 9.6875rem;
          }

          .zhifu {
            margin-bottom: .625rem;
          }
        }
      }
    }
  }
}

:deep(.el-radio__label) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.radio1 {
  color: #fff;
  background: linear-gradient(to bottom right, #e49c97, #ef4c2e);
}

.radio2 {
  color: #fff;
  background: linear-gradient(to bottom right, #7a88fe, #6b7dfe);
}

.radio3 {
  color: #fff;
  background: linear-gradient(to bottom right, #575551, #000000);
}

.timeRadio {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-radio-button) {
  margin-right: 1.25rem;
}

:deep(.el-radio--large) {
  margin-right: 1.25rem;
}

:deep {
  .el-select {
    width: 6.25rem;
    min-width: 6.25rem !important;
  }
}

.el-select-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 1rem;

  i {
    margin-right: .3125rem;
  }
}
</style>
