<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/survey_billManagement";

const props = withDefaults(defineProps<DetailFormProps>(), {
  id: "",
});

const loading = ref(false);
const formRef = ref<FormInstance>();
const form = ref<any>({
  // id: props.id,
  // title: "",
  // radio: 0,
  minimumAmount: "",
  settlementType: 1, //结算类型: 1:全部结算 2:指定结算
  settlementAmount: "", //	结算类型为全部结算的时候需要填: 结算金额
  addMemberSettlementInfoList: [
    // //结算类型为 指定结算必填
    // {
    //   id: "", //	账单表主键
    //   memberId: "", //	会员id
    //   settlementAmount: "", //	结算金额
    // },
  ],
});
const data = ref<any>({
  memberSettlementInfoList: [], // 指定结算获取会员可用余额列表
  memberSettlementInfoSelect: [], //选择的会员id
});
const formRules = ref<FormRules>({
  // 校验
  settlementAmount: [
    {
      required: true,
      message: '请输入正数，且最多两位小数',
      trigger: 'blur'
    },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,  // 正数且最多两位小数
      message: '请输入有效的正数，且最多两位小数',
      trigger: 'blur'
    }
  ]
});
// 获取最低结算金额
const getList = async () => {
  try {
    loading.value = true;
    const res = await api.getMemberBillAvailableBalance({});
    if (res.data) {
      data.value.memberSettlementInfoList =
        res.data.memberBillAvailableBalanceInfoList;
      form.value.minimumAmount = res.data.minimumAmount;
    }
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
};
// 修改换指定会员
const changeMemberSettlement = (val: any) => {
  // 首先清空 addMemberSettlementInfoList
  form.value.addMemberSettlementInfoList = [];
  // 根据选中的值生成新的 selectArray
  const selectArray = data.value.memberSettlementInfoList.filter((item: any) =>
    val.includes(item.id)
  );
  // 将选中的项目添加到 addMemberSettlementInfoList
  for (let i = 0; i < selectArray.length; i++) {
    form.value.addMemberSettlementInfoList.push(selectArray[i]);
  }
};

onMounted(async () => {
  await getList();
});

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      formRef.value &&
        formRef.value.validate((valid) => {
          // const judge = form.value.addMemberSettlementInfoList.every((item: any) => {
          //   return typeof (item.settlementAmount) === "number" && item.settlementAmount >= form.value.minimumAmount
          // })
          if (form.value.settlementType === 2) {
            for (let item of form.value.addMemberSettlementInfoList) {
              if (!item.settlementAmount) {
                item.settlementAmount = form.value.minimumAmount
              }
              if (item.settlementAmount && item.settlementAmount <= 0) {
                ElMessage.warning({
                  message: "结算金额需要输入正数",
                  center: true,
                });
                return;  // 直接停止整个 submit 函数的执行
              }
              if (item.settlementAmount < form.value.minimumAmount) {
                ElMessage.warning({
                  message: "结算金额 小于 最低结算金额",
                  center: true,
                });
                return;  // 直接停止整个 submit 函数的执行
              }
            }
            form.value.settlementAmount = '';
          } else {
            form.value.addMemberSettlementInfoList = []
            if (!form.value.settlementAmount) {
              form.value.settlementAmount = form.value.minimumAmount
            }
            if (form.value.settlementAmount < form.value.minimumAmount) {
              ElMessage.warning({
                message: "结算金额 小于 最低结算金额",
                center: true,
              });
              return;  // 直接停止整个 submit 函数的执行
            }
          }
          if (valid) {
            try {
              loading.value = true;
              api.create(form.value).then(() => {
                loading.value = false;
                ElMessage.success({
                  message: "新增成功",
                  center: true,
                });
                resolve();
              });
            } catch (error) {

            } finally {
              loading.value = false;
            }
          }
        });
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="9rem">
      <ElFormItem label="结算方式">
        <el-radio-group v-model="form.settlementType">
          <el-radio :value="1" size="large"> 全部结算 </el-radio>
          <el-radio :value="2" size="large"> 指定结算 </el-radio>
        </el-radio-group>
      </ElFormItem>
      <template v-if="form.settlementType === 1">
        <ElFormItem label="最低结算额度">
          <ElInput disabled placeholder="" :value="form.minimumAmount" />
        </ElFormItem>
        <ElFormItem label="结算金额" prop="settlementAmount">
          <ElInput v-model="form.settlementAmount" placeholder="" />
        </ElFormItem>
      </template>
      <template v-else>
        <ElFormItem label="指定会员">
          <el-select placeholder="Select" v-model="data.memberSettlementInfoSelect" clearable filterable multiple
            collapse-tags @change="changeMemberSettlement">
            <el-option v-for="item in data.memberSettlementInfoList" :key="item.id" :value="item.id"
              :label="item.memberName"></el-option>
          </el-select>
        </ElFormItem>
        <ElFormItem label="最低结算额度">
          <ElInput disabled placeholder="" :value="form.minimumAmount" />
        </ElFormItem>
        <template v-for="item in form.addMemberSettlementInfoList">
          <ElFormItem label="">
            <p>
              {{ item.memberId }} - {{ item.memberName }} - 可用余额：{{
    item.availableBalance
  }}
            </p>
          </ElFormItem>
          <ElFormItem label="结算金额">
            <ElInputNumber controls-position="right" v-model="item.settlementAmount" :max="item.availableBalance"
              placeholder="" />
          </ElFormItem>
        </template>
      </template>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-radio.el-radio--large {
    height: 2rem;
  }
}
</style>
