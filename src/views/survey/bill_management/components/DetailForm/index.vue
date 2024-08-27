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
});
// 获取最低结算金额
const getList = async () => {
  try {
    loading.value = true;
    const res = await api.getMemberBillAvailableBalance({});
    data.value.memberSettlementInfoList =
      res.data.memberBillAvailableBalanceInfoList;
    form.value.minimumAmount = res.data.minimumAmount;
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
};
// 修改换指定会员
const changeMemberSettlement = (val: any) => {
  const selectArray = data.value.memberSettlementInfoList.filter((item: any) =>
    val.includes(item.id)
  );
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
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="6.25rem" >
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
        <ElFormItem label="结算金额">
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
          <ElInput disabled placeholder="" value="111" />
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
