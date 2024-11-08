<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
const emit = defineEmits(["fetch-data"]);
import apiDep from "@/api/modules/department";
const drawerisible = ref<boolean>(false);
const formRef = ref<any>(); // Ref
const data = ref<any>({
  form: {},
  rules: {
    priceRatio: [
      { required: true, message: "请输入价格比例", trigger: "blur" },
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
  console.log(row,'rrrr')
  data.value.form.id = row.id;
  data.value.form.priceRatio = row.priceRatio;
  data.value.form.sendProjectType = row.sendProjectType;
  data.value.form.receiveProjectType = row.receiveProjectType;
  data.value.form.chargeUserName = row.chargeUserName;
  data.value.form.departmentId = row.departmentId;
  data.value.form.chargeUserId = row.chargeUserId;
  if (data.value.form.departmentId) {
    //获取部门名称
    // 部门
    const res = await apiDep.list({ name: "" });
    if (res.data) {
      departmentList.value = res.data;
    }
    const findData1 = departmentList.value.find(
      (item: any) => item.id === data.value.form.departmentId
    );
    data.value.form.departmentName = findData1.name;
  }
  data.value.form.name =(data.value.form.departmentName ? data.value.form.departmentName :'') + (data.value.form.chargeUserName ? ','+ data.value.form.chargeUserName:'')
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
  userRef.value.showEdit();
}

async function BindUser() {
  //
  const { status } = await api.updateInvitationBindUser({
    id:data.value.form.id,
    chargeUserId: data.value.form.chargeUserId, //负责人UserId
    departmentId: data.value.form.departmentId, //邀请方部门id
    chargeUserName: data.value.form.chargeUserName, //负责人用户姓名
    sendProjectType: data.value.form.sendProjectType, //邀请方发送项目类型:1:自动 2:手动
    receiveProjectType: data.value.form.receiveProjectType, //邀请方接收项目类型:1:自动 2:手动
  });
}

//修改价格的
async function updatePri() {

  const { status1 } = await api.updateInvitationBind({
   id:data.value.form.id,
   priceRatio:data.value.form.priceRatio,
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
      if(data.value.form.receiveProjectType ==2) {
        //手动
        data.value.form.chargeUserId = null; //负责人UserId
        data.value.form.chargeUserName = '' //负责人用户姓名
        data.value.form.departmentId = ''//邀请方部门id
      }
      BindUser();
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
      >
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.form.priceRatio" clearable
            ><template #append>%</template></el-input
          >
        </el-form-item>
        <el-form-item
          label="项目分配方式"
          prop="sendProjectType"
          label-width="7rem"
        >
          <div style="display: flex; justify-items: center">
            <span style="margin-right: 15px">发送项目</span>
            <el-radio-group v-model="data.form.sendProjectType">
              <el-radio :value="1">自动</el-radio>
              <el-radio :value="2">手动</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="receiveProjectType">
          <div style="display: flex; justify-items: center">
            <span style="margin-right: 15px">接收项目</span>

            <el-radio-group v-model="data.form.receiveProjectType">
              <el-radio :value="1">自动</el-radio>
              <el-radio :value="2">手动</el-radio>
            </el-radio-group>
          </div>
           <!-- 勾选自动出来 -->
           <el-input
              placeholder="请选择负责部门/PM"
              clearable
              style="width: 200px; margin-left: 25px"
              @click="openUserDialog"
              v-if="data.form.receiveProjectType ==1"
              v-model="data.form.name"
            >
            </el-input>
        </el-form-item>
      </ElForm>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 确认 </el-button>
      </template>
    </el-dialog>
    <userDialog ref="userRef" />
  </div>
</template>

<style scoped lang="scss">
</style>
