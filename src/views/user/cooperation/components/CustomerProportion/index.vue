<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
import apiDep from "@/api/modules/department";
import useUserStore from "@/store/modules/user";

const userStore: any = useUserStore();
const tenantCurrencyType = userStore.currencyType
const tenantPartnersCurrencyType = ref<any>()
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const formRef = ref<any>(); // Ref
const moneyDefault = ref<any>(1);

const validateNumberRange = (rule: any, value: any, callback: any) => {
  const regex = /^(100|[1-9]?\d)$/;
  if (regex.test(value) == false) {
    return callback(new Error("请输入 0 到 100 之间的数字"));
  }
  callback(); // 校验通过
};
const data = ref<any>({
  form: {},
  rules: {
    priceRatio: [
      { required: true, message: "请输入价格比例", trigger: "blur" },
      {
        type: "number",
        trigger: "blur",
        validator: validateNumberRange,
      },
      //{ min: 0, max: 100, message: '请在0-100范围内输入', trigger: 'blur' },
    ],
    sendProjectType: [
      { required: true, message: "请选择发送项目", trigger: "change" },
    ],
    receiveProjectType: [
      { required: true, message: "请选择接收项目", trigger: "change" },
    ],
    exchangeRate: [
      { required: true, message: '请输入汇率', trigger: 'blur' },
      { pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/, message: '请输入一个有效的数字，不能小于0，最多保留两位小数', trigger: 'blur' }
    ]
  },
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
// 部门数据
const departmentList = ref<any>([]);
const selectTreeRef = ref();
const treeRef = ref();
// 显隐
async function showEdit(row: any) {
  data.value.form.chargeUserId = "";
  data.value.form.id = row.id;
  data.value.form.exchangeRate = row.exchangeRate

  if (row.currencyType === 'USD') {
    tenantPartnersCurrencyType.value = 1
  } else if (row.currencyType === 'CNY') {
    tenantPartnersCurrencyType.value = 2
  }
  data.value.form.priceRatio = row.priceRatio;
  data.value.form.sendProjectType = row.sendProjectType
  sendProjectType.value = row.sendProjectType
  data.value.form.receiveProjectType = row.receiveProjectType
  receiveProjectType.value = row.receiveProjectType
  data.value.form.chargeUserName =row.chargeName
  // data.value.form.chargeUserName = row.userName;
  data.value.form.invitationType = row.invitationType;
  data.value.form.chargeUserId = row.chargeId
  // data.value.form.chargeUserId = row.userId;
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }

  drawerisible.value = true;
}
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取当前所有选中的节点
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        treeRef.value.setChecked(key, false); // 取消选中其他节点
      }
    });
    // 更新当前选中的节点 ID
    data.value.form.chargeUserId = nodeData.id; // 只保留当前选中节点 ID
    // const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.form.chargeUserName = nodeData.name;
    // 关闭下拉框
    // setTimeout(() => {
    //   selectTreeRef.value.blur(); // 失去焦点，关闭下拉框
    // }, 100);
  } else {
    // 如果取消选中节点，更新 chargeUserId
    data.value.form.chargeUserId = [data.value.form.chargeUserId].filter(
      (id: any) => id !== nodeData.id
    );
    if (data.value.form.chargeUserId.length == 0) {
      data.value.form.chargeUserId = "";
    }
  }

  if (!data.value.form.chargeUserId) {
    data.value.form.chargeUserName = "";
  }
};
// 关闭
function close() {
  drawerisible.value = false;
  data.value.form = {};
  formRef.value.resetFields();
}
//选择部门人
const userRef = ref();
function openUserDialog() {
  userRef.value.showEdit(data.value.form, "请选择负责部门/人");
}

async function BindUser(obj: any) {
  const { status } = await api.updateInvitationBindUser({
    id: data.value.form.id,
    chargeUserId: obj.chargeUserId, //负责人UserId
    invitationType: obj.invitationType, //邀请类型
    chargeUserName: obj.chargeUserName, //负责人用户姓名
    sendProjectType: obj.sendProjectType, //邀请方发送项目类型:1:自动 2:手动
    receiveProjectType: obj.receiveProjectType, //邀请方接收项目类型:1:自动 2:手动
  });
}

//修改价格的
async function updatePri() {
  const { status1 } = await api.updateInvitationBind({
    id: data.value.form.id,
    priceRatio: data.value.form.priceRatio,
    exchangeRate: data.value.form.exchangeRate
  });
  ElMessage.success({
    message: "修改成功",
    center: true,
  });
}

// 确定
async function save() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(data.value.form)); //深拷贝，不改变原数据
      if (tenantCurrencyType === tenantPartnersCurrencyType.value) {
        obj.exchangeRate = 1
      }
      //判断如果为数组改为字符串，data.value.form.chargeUserId
      if (Array.isArray(obj.chargeUserId)) {
        obj.chargeUserId = obj.chargeUserId[0];
      }
      if (obj.receiveProjectType == 1 && !obj.chargeUserId) {
        ElMessage.warning({
          message: "请选择部门",
          center: true,
        });
        return;
      }
      obj.sendProjectType = sendProjectType.value
      obj.receiveProjectType = receiveProjectType.value
      obj.invitationType = 2;
      if (obj.receiveProjectType == 2) {
        //手动
        data.value.form.chargeUserId = null; //负责人UserId
        data.value.form.chargeUserName = ""; //负责人用户姓名
        obj.chargeUserId = null; //负责人UserId
        obj.chargeUserName = ""; //负责人用户姓名
        obj.invitationType = ""; //固定传部门
      }
      BindUser(obj);
      updatePri();
      setTimeout(() => {
        emit("fetch-data");
      }, 1000);

      close();
      // api.updateInvitationBind(data.value.form).then(() => {
      //   ElMessage.success({
      //     message: "修改成功",
      //     center: true,
      //   });
      //   emit("fetch-data");
      //   close();
      // });
    }
  });
}
//发送项目勾选
// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange1 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.form.sendProjectType = [newValue[newValue.length - 1]];
  }
};
//接收项目
const handleCheckboxChange2 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.form.receiveProjectType = [newValue[newValue.length - 1]];
  }
};
//勾选部门人回传数据
function userData(data1: any) {
  data.value.form.chargeUserId = data1.chargeUserId; //负责人UserId
  data.value.form.invitationType = data1.invitationType; //邀请类型，1员工，2部门
  data.value.form.chargeUserName = data1.chargeUserName;
}
const handleKeydown = (e: any) => {
  // 阻止键盘输入
  e.preventDefault();
};

// 发送
const sendProjectType = ref<any>(null)
// 接收
const receiveProjectType = ref<any>(null)
//列表切换发送项目状态
const changeSendProjectType = (name: any, row: any) => {
  if (row) {
    if (name === '发送') {
      sendProjectType.value = row
      data.value.form.sendProjectType = row
    } else {
      receiveProjectType.value = row
      data.value.form.receiveProjectType = row
    }
  }
};
// 关闭弹框
const handleClose = () => {
  sendProjectType.value = null
  receiveProjectType.value = null
  data.value.form.sendProjectType = null;
  data.value.form.receiveProjectType = null;
}
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="drawerisible" :close-on-click-modal="false" destroy-on-close draggable width="40%" title="合作配置"
      class="hezuoDrawer" @close="handleClose">
      <ElForm ref="formRef" :rules="data.rules" :model="data.form" label-width="7rem" labelPosition="right">
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.form.priceRatio" clearable><template #append>%</template></el-input>
        </el-form-item>
        <el-form-item label-width="7.5rem">
          <template #label>
            <div style="display: flex;align-items: center;">
              <span
                style="display: inline-block; width: 8px;height: 8px;background: #FF8181;border-radius: 50%; margin-right: 4px;"></span>
              <span style="font-weight: 700; font-size: 0.9375rem">项目分配方式</span>
            </div>
          </template>
        </el-form-item>
        <!-- <el-form-item v-show="tenantCurrencyType !== tenantPartnersCurrencyType" prop="exchangeRate" label-width="7rem">
          <template #label>
            <span style="color: #333;">
              <el-tooltip effect="dark" placement="top-start">
                <template #content>
                  <div>自动：您所创建的项目，自动分配给该合作商</div>
                  <div>手动：您所创建的项目，需要手动分配给该合作商</div>
                </template>
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
              汇率比例
            </span>
          </template>
          <el-row class="radiusInput" style="margin: 0;" :gutter="20">
            <el-col style="padding: 0;" :span="11">
              <el-input v-if="tenantCurrencyType === 2" style="border: none;" v-model="moneyDefault" disabled
                placeholder="">
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Frame">
                      <path id="Vector"
                        d="M10.7144 2.29102L7.86262 6.33368H10.1102V7.22737H7.4919V8.45818H10.1102V9.36304H7.4919V11.1552H6.14483V9.36304H3.43073V8.45818H6.14483V7.22737H3.43073V6.33368H5.74639L2.92188 2.29102H4.44067C5.76051 4.29873 6.56174 5.57235 6.84586 6.11089H6.8731C6.96943 5.88906 7.23309 5.44246 7.66315 4.77109L9.27828 2.29102H10.7144Z"
                        fill="#777777" />
                    </g>
                  </svg>
                </template>
                <template #suffix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="20" viewBox="0 0 48 20" fill="none">
                    <g id="Frame 3476009">
                      <rect x="0.433594" y="0.96875" width="47.5681" height="18.0643" rx="9.03217" fill="#D9D9D9"
                        fill-opacity="0.4" />
                      <g id="äººæ°å¸">
                        <path id="Vector"
                          d="M39.3087 8.27942V12.5804C39.3087 13.0424 39.2097 13.2954 38.8577 13.4274C38.4947 13.5704 37.9117 13.5814 37.0207 13.5704C36.9767 13.3394 36.8447 12.9874 36.7347 12.7564C37.4387 12.7784 38.0547 12.7784 38.2417 12.7674C38.4177 12.7674 38.4727 12.7234 38.4727 12.5584V9.07142H35.8107V14.9564H34.9747V9.07142H32.4337V13.7024H31.6087V8.27942H34.9747V6.48642C33.5997 6.57442 32.2137 6.61842 30.9377 6.64042C30.9267 6.40942 30.8277 6.10142 30.7617 5.90342C33.7977 5.82642 37.5267 5.61742 39.6717 5.23242L40.0017 5.98042C38.8687 6.17842 37.3947 6.32142 35.8107 6.43142V8.27942H39.3087Z"
                          fill="#777777" />
                        <path id="Vector_2"
                          d="M21.4684 10.3361H24.5814C24.4824 9.80809 24.3944 9.25809 24.3614 8.67509H21.4684V10.3361ZM27.5954 6.26609H21.4684V7.90509H27.5954V6.26609ZM29.2234 11.1061H25.6374C26.2094 12.8551 27.2214 14.0541 28.2004 14.0431C28.5194 14.0321 28.6514 13.5921 28.7064 12.4371C28.8934 12.6021 29.2014 12.7561 29.4214 12.8221C29.2894 14.4281 28.9594 14.8461 28.1564 14.8461C26.6824 14.8571 25.4174 13.2951 24.7794 11.1061H21.4684V13.8561L24.1084 13.2181C24.1084 13.4381 24.1524 13.8011 24.1964 13.9661C21.2044 14.7691 20.7974 14.8681 20.5334 15.0331C20.4674 14.8131 20.2914 14.4501 20.1484 14.2851C20.3464 14.1861 20.6324 13.9331 20.6324 13.4821V5.49609H28.4094V8.67509H25.1974C25.2304 9.25809 25.3184 9.80809 25.4394 10.3361H29.2234V11.1061Z"
                          fill="#777777" />
                        <path id="Vector_3"
                          d="M12.9656 4.96875H13.8676C13.8566 5.36475 13.8456 5.91475 13.7906 6.56375C13.9556 7.87275 14.6156 12.4707 18.4986 14.1978C18.2676 14.3848 18.0256 14.6598 17.9046 14.8908C15.1546 13.6038 13.9776 10.8868 13.4496 8.84075C12.9436 11.0408 11.7776 13.5048 9.09359 14.9348C8.95059 14.7148 8.68659 14.4728 8.43359 14.2968C12.9986 11.9868 12.9326 6.64075 12.9656 4.96875Z"
                          fill="#777777" />
                      </g>
                    </g>
                  </svg>
                </template>
              </el-input>
              <el-input v-if="tenantCurrencyType === 1" style="border: none;" v-model="moneyDefault" disabled
                placeholder="">
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Frame">
                      <path id="Vector"
                        d="M8.37697 6.99714L7.83483 6.87143V3.99571C8.65197 4.10571 9.15483 4.61643 9.2334 5.245C9.24126 5.33143 9.31983 5.39429 9.40626 5.39429H10.3648C10.467 5.39429 10.5455 5.30786 10.5377 5.20571C10.4041 3.87 9.31197 3.01357 7.84268 2.87214V2.17286C7.84268 2.07857 7.76411 2 7.66983 2H7.06483C6.97054 2 6.89197 2.07857 6.89197 2.17286V2.88C5.3834 3.01357 4.19697 3.85429 4.19697 5.41786C4.19697 6.86357 5.26554 7.56286 6.38126 7.83L6.90768 7.96357V11.02C5.96483 10.8943 5.43054 10.3914 5.32054 9.70786C5.30483 9.62929 5.23411 9.56643 5.14768 9.56643H4.1734C4.07126 9.56643 3.99268 9.65286 4.00054 9.755C4.09483 10.9336 4.99054 12.0179 6.89197 12.1514V12.8271C6.89197 12.9214 6.97054 13 7.06483 13H7.66983C7.76411 13 7.84268 12.9214 7.84268 12.8271L7.83483 12.1514C9.5084 12.0021 10.7105 11.1064 10.7105 9.49571C10.7105 8.00286 9.76768 7.335 8.37697 6.99714ZM6.91554 6.65143C6.79768 6.62 6.69554 6.58857 6.5934 6.54143C5.87054 6.28214 5.53268 5.85786 5.53268 5.31571C5.53268 4.53786 6.12197 4.09786 6.91554 3.99571V6.65143ZM7.83483 11.02V8.16L8.0234 8.20714C9.03697 8.51357 9.37483 8.94571 9.37483 9.59786C9.37483 10.4386 8.74626 10.9414 7.83483 11.02Z"
                        fill="#C6C6C6" />
                    </g>
                  </svg>
                </template>
                <template #suffix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="20" viewBox="0 0 37 20" fill="none">
                    <g id="Frame 3476010">
                      <rect x="-0.0078125" y="0.972656" width="37.0079" height="18.0543" rx="9.02717" fill="#D9D9D9"
                        fill-opacity="0.4" />
                      <g id="ç¾å">
                        <path id="Vector"
                          d="M27.9111 5.875V6.656H20.1671V5.875H27.9111ZM26.2611 14.081H27.6801C28.1201 14.081 28.1861 13.795 28.2411 12.112C28.4281 12.266 28.7801 12.409 29.0001 12.475C28.9121 14.345 28.6921 14.862 27.7351 14.862H26.1621C25.1831 14.862 24.9191 14.576 24.9191 13.641V9.725H22.8621C22.6531 12.079 22.1251 14.004 19.5951 15.027C19.4961 14.829 19.2651 14.532 19.0781 14.389C21.4211 13.498 21.8281 11.782 21.9931 9.725H19.2101V8.933H28.8351V9.725H25.7441V13.63C25.7441 14.004 25.8321 14.081 26.2611 14.081Z"
                          fill="#777777" />
                        <path id="Vector_2"
                          d="M17.7822 12.1117H13.7782C14.5702 13.3327 16.0112 14.0257 18.0132 14.2677C17.8482 14.4547 17.6172 14.7847 17.5182 15.0267C15.2962 14.6637 13.8112 13.7837 12.9642 12.1997C12.4142 13.6407 11.2372 14.5427 8.42119 15.0267C8.35519 14.8177 8.14619 14.4767 7.99219 14.2897C10.5222 13.9267 11.6002 13.2337 12.0952 12.1117H8.44319V11.3747H12.3372C12.4032 11.1107 12.4472 10.8247 12.4802 10.5277H8.16819V9.80166H12.5792V8.87766H9.15819V8.16266H12.5792V7.27166H8.61919V6.53466H10.8742C10.6982 6.14966 10.3572 5.64366 10.0272 5.25866L10.7312 4.97266C11.1382 5.39066 11.5232 5.96266 11.6992 6.35866L11.3032 6.53466H14.1962C14.5262 6.08366 14.9112 5.43466 15.1422 4.97266L15.9782 5.22566C15.7142 5.67666 15.3842 6.14966 15.0982 6.53466H17.4082V7.27166H13.3932V8.16266H16.9132V8.87766H13.3932V9.80166H17.9142V10.5277H13.3272C13.2942 10.8247 13.2502 11.1107 13.1952 11.3747H17.7822V12.1117Z"
                          fill="#777777" />
                      </g>
                    </g>
                  </svg>
                </template>
              </el-input>
            </el-col>
            <el-col style="display: flex; justify-content: center; align-items: center;padding: 0;" :span="2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g id="Arrow-right (ç®­å¤´å³)">
                  <rect width="20" height="20" rx="10" fill="#409EFF" />
                  <g id="Group 18368">
                    <path id="Vector" d="M15 10H5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path id="Vector_2" d="M11.668 6.66602L15.0013 9.99935L11.668 13.3327" stroke="white"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </g>
              </svg>
            </el-col>
            <el-col style="padding: 0;" :span="11">
              <el-input v-if="tenantPartnersCurrencyType === 1" style="border: none;" v-model="data.form.exchangeRate"
                placeholder="请输入换算金额" clearable>
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Frame">
                      <path id="Vector"
                        d="M8.37697 6.99714L7.83483 6.87143V3.99571C8.65197 4.10571 9.15483 4.61643 9.2334 5.245C9.24126 5.33143 9.31983 5.39429 9.40626 5.39429H10.3648C10.467 5.39429 10.5455 5.30786 10.5377 5.20571C10.4041 3.87 9.31197 3.01357 7.84268 2.87214V2.17286C7.84268 2.07857 7.76411 2 7.66983 2H7.06483C6.97054 2 6.89197 2.07857 6.89197 2.17286V2.88C5.3834 3.01357 4.19697 3.85429 4.19697 5.41786C4.19697 6.86357 5.26554 7.56286 6.38126 7.83L6.90768 7.96357V11.02C5.96483 10.8943 5.43054 10.3914 5.32054 9.70786C5.30483 9.62929 5.23411 9.56643 5.14768 9.56643H4.1734C4.07126 9.56643 3.99268 9.65286 4.00054 9.755C4.09483 10.9336 4.99054 12.0179 6.89197 12.1514V12.8271C6.89197 12.9214 6.97054 13 7.06483 13H7.66983C7.76411 13 7.84268 12.9214 7.84268 12.8271L7.83483 12.1514C9.5084 12.0021 10.7105 11.1064 10.7105 9.49571C10.7105 8.00286 9.76768 7.335 8.37697 6.99714ZM6.91554 6.65143C6.79768 6.62 6.69554 6.58857 6.5934 6.54143C5.87054 6.28214 5.53268 5.85786 5.53268 5.31571C5.53268 4.53786 6.12197 4.09786 6.91554 3.99571V6.65143ZM7.83483 11.02V8.16L8.0234 8.20714C9.03697 8.51357 9.37483 8.94571 9.37483 9.59786C9.37483 10.4386 8.74626 10.9414 7.83483 11.02Z"
                        fill="#C6C6C6" />
                    </g>
                  </svg>
                </template>
                <template #suffix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="20" viewBox="0 0 37 20" fill="none">
                    <g id="Frame 3476010">
                      <rect x="-0.0078125" y="0.972656" width="37.0079" height="18.0543" rx="9.02717" fill="#E3F1FF" />
                      <g id="ç¾å">
                        <path id="Vector"
                          d="M27.9111 5.875V6.656H20.1671V5.875H27.9111ZM26.2611 14.081H27.6801C28.1201 14.081 28.1861 13.795 28.2411 12.112C28.4281 12.266 28.7801 12.409 29.0001 12.475C28.9121 14.345 28.6921 14.862 27.7351 14.862H26.1621C25.1831 14.862 24.9191 14.576 24.9191 13.641V9.725H22.8621C22.6531 12.079 22.1251 14.004 19.5951 15.027C19.4961 14.829 19.2651 14.532 19.0781 14.389C21.4211 13.498 21.8281 11.782 21.9931 9.725H19.2101V8.933H28.8351V9.725H25.7441V13.63C25.7441 14.004 25.8321 14.081 26.2611 14.081Z"
                          fill="#409EFF" />
                        <path id="Vector_2"
                          d="M17.7822 12.1117H13.7782C14.5702 13.3327 16.0112 14.0257 18.0132 14.2677C17.8482 14.4547 17.6172 14.7847 17.5182 15.0267C15.2962 14.6637 13.8112 13.7837 12.9642 12.1997C12.4142 13.6407 11.2372 14.5427 8.42119 15.0267C8.35519 14.8177 8.14619 14.4767 7.99219 14.2897C10.5222 13.9267 11.6002 13.2337 12.0952 12.1117H8.44319V11.3747H12.3372C12.4032 11.1107 12.4472 10.8247 12.4802 10.5277H8.16819V9.80166H12.5792V8.87766H9.15819V8.16266H12.5792V7.27166H8.61919V6.53466H10.8742C10.6982 6.14966 10.3572 5.64366 10.0272 5.25866L10.7312 4.97266C11.1382 5.39066 11.5232 5.96266 11.6992 6.35866L11.3032 6.53466H14.1962C14.5262 6.08366 14.9112 5.43466 15.1422 4.97266L15.9782 5.22566C15.7142 5.67666 15.3842 6.14966 15.0982 6.53466H17.4082V7.27166H13.3932V8.16266H16.9132V8.87766H13.3932V9.80166H17.9142V10.5277H13.3272C13.2942 10.8247 13.2502 11.1107 13.1952 11.3747H17.7822V12.1117Z"
                          fill="#409EFF" />
                      </g>
                    </g>
                  </svg>
                </template>
              </el-input>
              <el-input v-if="tenantPartnersCurrencyType === 2" style="border: none;" v-model="data.form.exchangeRate"
                placeholder="请输入换算金额" clearable>
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Frame">
                      <path id="Vector"
                        d="M10.7144 2.29102L7.86262 6.33368H10.1102V7.22737H7.4919V8.45818H10.1102V9.36304H7.4919V11.1552H6.14483V9.36304H3.43073V8.45818H6.14483V7.22737H3.43073V6.33368H5.74639L2.92188 2.29102H4.44067C5.76051 4.29873 6.56174 5.57235 6.84586 6.11089H6.8731C6.96943 5.88906 7.23309 5.44246 7.66315 4.77109L9.27828 2.29102H10.7144Z"
                        fill="#777777" />
                    </g>
                  </svg>
                </template>
                <template #suffix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="20" viewBox="0 0 48 20" fill="none">
                    <g id="Frame 3476009">
                      <rect x="0.429688" y="0.96875" width="47.5681" height="18.0643" rx="9.03217" fill="#E7F3FF" />
                      <g id="äººæ°å¸">
                        <path id="Vector"
                          d="M39.3048 8.27942V12.5804C39.3048 13.0424 39.2058 13.2954 38.8538 13.4274C38.4908 13.5704 37.9078 13.5814 37.0168 13.5704C36.9728 13.3394 36.8408 12.9874 36.7308 12.7564C37.4348 12.7784 38.0508 12.7784 38.2378 12.7674C38.4138 12.7674 38.4688 12.7234 38.4688 12.5584V9.07142H35.8068V14.9564H34.9708V9.07142H32.4298V13.7024H31.6048V8.27942H34.9708V6.48642C33.5958 6.57442 32.2098 6.61842 30.9338 6.64042C30.9228 6.40942 30.8238 6.10142 30.7578 5.90342C33.7938 5.82642 37.5228 5.61742 39.6678 5.23242L39.9978 5.98042C38.8648 6.17842 37.3908 6.32142 35.8068 6.43142V8.27942H39.3048Z"
                          fill="#409EFF" />
                        <path id="Vector_2"
                          d="M21.4606 10.3361H24.5736C24.4746 9.80809 24.3866 9.25809 24.3536 8.67509H21.4606V10.3361ZM27.5876 6.26609H21.4606V7.90509H27.5876V6.26609ZM29.2156 11.1061H25.6296C26.2016 12.8551 27.2136 14.0541 28.1926 14.0431C28.5116 14.0321 28.6436 13.5921 28.6986 12.4371C28.8856 12.6021 29.1936 12.7561 29.4136 12.8221C29.2816 14.4281 28.9516 14.8461 28.1486 14.8461C26.6746 14.8571 25.4096 13.2951 24.7716 11.1061H21.4606V13.8561L24.1006 13.2181C24.1006 13.4381 24.1446 13.8011 24.1886 13.9661C21.1966 14.7691 20.7896 14.8681 20.5256 15.0331C20.4596 14.8131 20.2836 14.4501 20.1406 14.2851C20.3386 14.1861 20.6246 13.9331 20.6246 13.4821V5.49609H28.4016V8.67509H25.1896C25.2226 9.25809 25.3106 9.80809 25.4316 10.3361H29.2156V11.1061Z"
                          fill="#409EFF" />
                        <path id="Vector_3"
                          d="M12.9617 4.96875H13.8637C13.8527 5.36475 13.8417 5.91475 13.7867 6.56375C13.9517 7.87275 14.6117 12.4707 18.4947 14.1978C18.2637 14.3848 18.0217 14.6598 17.9007 14.8908C15.1507 13.6038 13.9737 10.8868 13.4457 8.84075C12.9397 11.0408 11.7737 13.5048 9.08969 14.9348C8.94669 14.7148 8.68269 14.4728 8.42969 14.2968C12.9947 11.9868 12.9287 6.64075 12.9617 4.96875Z"
                          fill="#409EFF" />
                      </g>
                    </g>
                  </svg>
                </template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item> -->
        <el-form-item prop="sendProjectType" label-width="7rem" style="display: flex;
            flex-wrap: nowrap;
            flex-direction: column;">
          <template #label>
            <span style="display: flex;align-items: center;">
              <el-tooltip effect="dark" placement="top-start">
                <template #content>
                  <div>自动：您所创建的项目，自动分配给该合作商</div>
                  <div>手动：您所创建的项目，需要手动分配给该合作商</div>
                </template>
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
              发送项目
            </span>
          </template>
          <div style="margin-top: 6px;margin-bottom: 0px;">
            <el-button :type="sendProjectType === 1 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('发送', 1)">自动
            </el-button>
            <el-button :type="sendProjectType === 2 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('发送', 2)">手动</el-button>
          </div>
        </el-form-item>
        <div style="display: flex;flex-direction: column;">
          <el-form-item prop="receiveProjectType" label-width="7rem" style="margin-right: 1.5625rem;display: flex;flex-wrap: nowrap;flex-direction: column;">
              <template #label>
                <span style="display: flex;align-items: center;">
                  <el-tooltip effect="dark" placement="top-start">
                    <template #content>
                      <div>自动：合作商分配给您的项目，全部自动接收</div>
                      <div>手动：合作商分配给您的项目，手动选择接收</div>
                    </template>
                    <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                  </el-tooltip>
                  接收项目
                </span>
              </template>
              <div>
                <el-button :type="receiveProjectType === 1 ? 'primary' : ''" size="small"
                  @click="changeSendProjectType('接收', 1)">自动
                </el-button>
                <el-button :type="receiveProjectType === 2 ? 'primary' : ''" size="small"
                  @click="changeSendProjectType('接收', 2)">手动</el-button>
                <el-button :type="receiveProjectType === 3 ? 'primary' : ''" size="small"
                  @click="changeSendProjectType('接收', 3)">拒绝</el-button>
              </div>
            </el-form-item>
          <el-tree-select placeholder="请选择部门" v-if="data.form.receiveProjectType == 1" ref="treeRef"
            v-model="data.form.chargeUserId" :data="departmentList" check-strictly show-checkbox default-expand-all
            node-key="id" :props="defaultProps" @check-change="handleNodeClick" :check-on-click-node="true"
            style="width: 15.625rem;" :expand-on-click-node="false" />
          <!-- <el-select
            v-if="data.form.receiveProjectType == 1"
            v-model="data.form.chargeUserName"
            placeholder="请选择部门"
            ref="selectTreeRef"
            style="width: 15.625rem; margin-left: 1.5625rem"
          >
            <el-option :value="data.form.chargeUserId" style="height: auto">
              <el-tree
                v-if="departmentList.length > 0"
                ref="treeRef"
                :disabled="true"
                :data="departmentList"
                show-checkbox
                check-strictly
                node-key="id"
                :default-expanded-keys="[]"
                :default-checked-keys="[data.form.chargeUserId]"
                default-expand-all
                :props="defaultProps"
                @check-change="handleNodeClick"
                :check-on-click-node="true"
                :expand-on-click-node="false"
              />
              <el-text v-else>暂无数据</el-text>
            </el-option>
          </el-select> -->
        </div>

        <!-- <el-input
          placeholder="请选择接收项目负责人"
          @keydown="handleKeydown"
          @click="openUserDialog"
          v-if="
            data.form.receiveProjectType && data.form.receiveProjectType[0] == 1
          "
          v-model="data.form.chargeUserName"
        >
        </el-input> -->
      </ElForm>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 确认 </el-button>
      </template>
    </el-dialog>
    <userDialog ref="userRef" @userData="userData" />
  </div>
</template>

<style scoped lang="scss">
:deep(.inviteDialog .el-form-item__content) {
  margin-left: 0 !important;
}

:deep(.el-form label, .el-tree-node__label, .checkbox__label) {
  color: #333333;
}

:deep(.hezuoDrawer .el-select-dropdown__item.is-hovering) {
  background: white !important;
}

:deep(.hezuoDrawer .el-select-dropdown__item.is-selected) {
  font-weight: 100 !important;
}

:deep(.radiusInput .el-input__wrapper) {
  height: 2rem;
  border-radius: 20px !important;
  /* 强制应用圆角样式 */
  padding: 5px !important;
  /* 强制修改内边距 */
}

/* 修改 .radiusInput 下的 el-input__wrapper 样式 */
.radiusInput .el-input__wrapper {
  border-radius: 8px !important;
  /* 强制应用圆角样式 */
  border: 1px solid #ccc !important;
  /* 强制应用边框样式 */
  padding: 5px !important;
  /* 强制修改内边距 */
}

/* 修改 .radiusInput 下的 el-input__inner 样式 */
.radiusInput .el-input__inner {
  padding: 10px !important;
  /* 强制修改输入框内的文本区域的内边距 */
  border-radius: 6px !important;
  /* 强制修改输入框内部的圆角 */
}
</style>
