<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
const emit = defineEmits(["fetch-data"]);
import apiDep from "@/api/modules/department";
const drawerisible = ref<boolean>(false);
const formRef = ref<any>(); // Ref

const validateNumberRange = (rule: any, value: any, callback: any) => {
  const regex = /^(100|[1-9]?\d)$/;
  if(regex.test(value) == false){
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
  },
});
// 部门数据
const departmentList = ref<any>([]);
// 显隐
async function showEdit(row: any) {
  data.value.form.id = row.id;
  data.value.form.priceRatio = row.priceRatio;
  data.value.form.sendProjectType = row.sendProjectType ? [row.sendProjectType]:null;
  data.value.form.receiveProjectType = row.receiveProjectType ? [row.receiveProjectType]:null;
  data.value.form.chargeUserName = row.userName;
  data.value.form.invitationType = row.invitationType;
  data.value.form.chargeUserId = row.userId;

  // if (data.value.form.invitationType == 1) {
  //   //获取员工
  //   // 部门
  //   const res = await apiDep.list({ name: "" });
  //   if (res.data) {
  //     departmentList.value = res.data;
  //   }
  //   const findData1 = departmentList.value.find(
  //     (item: any) => item.id === data.value.form.departmentId
  //   );
  //   data.value.form.departmentName = findData1.name;
  // } else if(data.value.form.invitationType == 2){
  //   //获取部门
  // }
  // data.value.form.name =(data.value.form.departmentName ? data.value.form.departmentName :'') + (data.value.form.chargeUserName ? ','+ data.value.form.chargeUserName:'')
  drawerisible.value = true;
}

// 关闭
function close() {
  drawerisible.value = false;
  data.value.form = {};
  formRef.value.resetFields();
}
//选择部门人
const userRef = ref();
function openUserDialog() {
  userRef.value.showEdit(data.value.form,'请选择负责部门/人');
}

async function BindUser(obj:any) {
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

      obj.sendProjectType =
        data.value.form.sendProjectType.length != 0
          ? data.value.form.sendProjectType[0]
          : null;
      obj.receiveProjectType =
        data.value.form.receiveProjectType.length != 0
          ? data.value.form.receiveProjectType[0]
          : null;
      if (obj.receiveProjectType == 2) {
        //手动
        data.value.form.chargeUserId = null; //负责人UserId
        data.value.form.chargeUserName = ""; //负责人用户姓名
        data.value.form.departmentId = ""; //邀请方部门id
        obj.chargeUserId = null; //负责人UserId
        obj.chargeUserName = ""; //负责人用户姓名
        obj.invitationType = ""; //邀请类型
      }
      BindUser(obj);
      updatePri();
      emit("fetch-data");
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
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog
      v-model="drawerisible"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="40%"
      title="合作配置"
    >
      <ElForm
        ref="formRef"
        :rules="data.rules"
        :model="data.form"
        label-width="7rem"
        labelPosition="left"
      >
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.form.priceRatio" clearable
            ><template #append>%</template></el-input
          >
        </el-form-item>

        <el-form-item
          label-width="7rem"
        >
        <template #label>
          <span style="font-weight: 700;font-size: 15px;">项目分配方式</span>
        </template>
        </el-form-item>

        <div
          style="display: flex"
          class="inviteDialog"
        >
          <el-form-item prop="sendProjectType" label-width="7rem">
            <template #label >
                <span>
                <el-tooltip
                  effect="dark"
                  content=""
                  placement="top-start"
                >
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                发送项目
              </span>

              </template>

            <el-checkbox-group
              v-model="data.form.sendProjectType"
              @change="handleCheckboxChange1"
            >
              <el-checkbox :value="1"> 自动 </el-checkbox>
              <el-checkbox :value="2"> 手动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="receiveProjectType" style="margin-left: 40px">
            <template #label >
                <span>
                <el-tooltip
                  effect="dark"
                  content=""
                  placement="top-start"
                >
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                接收项目
              </span>

              </template>

            <el-checkbox-group
              v-model="data.form.receiveProjectType"
              @change="handleCheckboxChange2"
            >
              <el-checkbox :value="1"> 自动 </el-checkbox>
              <el-checkbox :value="2"> 手动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <el-input
          placeholder="请选择接收项目负责人"
          @keydown="handleKeydown"
          @click="openUserDialog"
          v-if="
            data.form.receiveProjectType && data.form.receiveProjectType[0] == 1
          "
          v-model="data.form.chargeUserName"
        >
        </el-input>
      </ElForm>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 确认 </el-button>
      </template>
    </el-dialog>
    <userDialog ref="userRef" @userData="userData"/>
  </div>
</template>

<style scoped lang="scss">
:deep(.inviteDialog .el-form-item__content) {
  margin-left: 0 !important;
}
:deep(.el-form label,.el-tree-node__label,.checkbox__label){
  color: #333333;
}
</style>
