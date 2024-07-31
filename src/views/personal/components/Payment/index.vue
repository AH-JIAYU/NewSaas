<script setup lang="ts">
import { ref } from "vue";

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
    { mode: "微信", icon: "wechat", value: "1" },
    { mode: "支付宝", icon: "alipay", value: "2" },
  ],
});
// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() {}
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
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      width="50%"
      :before-close="closeHandler"
    >
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
              <el-radio class="timeRadio" :value="7" size="large" border
                >月</el-radio
              >
              <el-radio class="timeRadio" :value="30" size="large" border
                >季度</el-radio
              >
              <el-radio class="timeRadio" :value="90" size="large" border
                >年</el-radio
              >
              <el-radio class="timeRadio" :value="180" size="large" border
                >终身</el-radio
              >
            </el-radio-group>
          </div>
          <div class="personal">
            <p class="title">| 扫码支付</p>
            <div class="payment">
              <img
                class="qrCode"
                src="../../../../assets/images/erCode.png"
                alt=""
              />
              <div class="paymentMethod">
                <div>
                  <div> <span class="money">9999</span> /月</div>

                  <el-select
                    v-model="form.paymentMethod"
                    placeholder="支付方式"
                    size="small"
                    style="width: 100px; min-width: 100px !important"
                  >
                    <el-option
                      v-for="item in data.paymentMethodList"
                      :key="item.value"
                      :label="item.mode"
                      :value="item.value"
                    >
                      <div
                        style="margin-right: 5px"
                        :class="'w-1em h-1em i-bi:' + item.icon"
                      ></div>
                      {{ item.mode }}
                    </el-option>
                  </el-select>
                </div>

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
  margin: 20px 0;
}

.whole {
  display: flex;
  width: 100%;
  height: 600px;
  // border: 1px solid #9c9c9c;
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

    .programme {
      margin-bottom: 20px;
      justify-content: space-between;
      width: 100%;

      :deep() {
        .el-radio {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 16px;
          margin: 0;
          padding: 0;
          width: 32%;
          height: 5.5rem;
          border-radius: 9px !important;
        }

        // .el-radio__input {
        //   display: none;
        // }
        // .el-radio__label {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   flex-wrap: wrap;
        //   width: 100%;
        //   padding: 0;
        // }
        // .radiusP {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   width: 100%;
        //   height: 1.875rem;
        //   background-color: #cbd8ee;
        //   margin-top: 1.25rem;
        // }
        // 选中 高亮
        .is-checked {
          border: none !important;
          box-shadow: 0 0 0 2px #fff, 0 0 4px 4px #fece93;
          .el-radio__label {
            color: #fff;
          }
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
      width: 100%;
      height: 150px;
      .payment {
        display: flex;

        img {
          aspect-ratio: 1/1;
          width: 150px;
        }
        .paymentMethod {
          height: 150px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;

          .money {
            margin-bottom: 10px;
            display: inline-block;
            color: #ff3713;
            font-weight: 700;
            font-size: 22px;
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
  margin-right: 20px;
}
:deep(.el-radio--large) {
  margin-right: 20px;
}
// .radiobutton {
//   display: flex !important;
//   justify-content: space-between !important;
//   align-content: space-between !important;
// }
</style>
