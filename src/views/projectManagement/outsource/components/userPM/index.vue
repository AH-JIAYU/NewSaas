<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import apiDep from "@/api/modules/department";
import apiUser from "@/api/modules/configuration_manager";
import apiPos from "@/api/modules/position_manage";
import DictionaryItemDia from "@/views/configuration/user/components/dictionaryItemDialog/index.vue";
import role from "@/mock/role";
const drawerisible = ref<boolean>(false);
const departmentId = ref<any>([]);
// 部门数据
const departmentList = ref<any>([]);
const treeRef = ref();
const data = ref<any>({
  type: 1,
  tenantStaffList: [], // 员工列表
  roleList: [], //选择的员工
  title: "",
  project: [], //选中的项目
  form: {
    chargeUserId: null,
    chargeUserName: "",
  },
});
const radio1 = ref<any>('all')
const positionList = ref<any>([])
// 查询参数
const queryForm = reactive<any>({
  // 分页页码
  page: 1,
  // 每页数量
  limit: 10,
  id: null,
  // 职位名称
  name: "",
  // 是否启用 1启用 2停用
  active: null,
});
const queryUserForm = reactive<any>({
  page: 1,
  limit: 10,
  id: "",
  userName: "",
  active: null,
  departmentId: null,
  positionId: null,
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
const rules = reactive<any>({
  chargeUserId: [{ required: true, message: "请选择负责人", trigger: "change" }],
});
const dictionaryItemVisible = ref<any>(false); // PM组件显隐
// 显隐 ,row,回显的勾选数据，name为弹出框名称，project为选中的项目名称数据
async function showEdit(row: any, name: any, project: any) {
  data.value.form.chargeUserId = project[0].userId
  await getTenantStaffList();
  data.value.type = 1;
  drawerisible.value = true;
  departmentId.value = [];
  data.value.title = name;
  data.value.invitationType = 1;  //员工
  //项目外包-接收项目-接收选中的项目
  if (project) {
    data.value.project = project;
    // data.value.chargeUserName =project.chargeUserName;
    // data.value.chargeUserId = project.chargeUserId;
  }
}
const handerRadioChange = async (val: any) => {
  if (val !== 'all') {
    queryUserForm.positionId = val
    const res = await apiUser.list(queryUserForm)
    if (res.data) {
      data.value.tenantStaffList = res.data.data
    }
  } else {
    const res = await apiUser.getTenantStaffList()
    if (res.data) {
      data.value.tenantStaffList = res.data
    }
  }
}
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  data.value.tenantStaffList = res.data;
};

// 关闭
function close() {
  drawerisible.value = false;
  formRef.value.resetFields();
  Object.assign(data.value, {
    type: 1,
    tenantStaffList: [], // 员工列表
    roleList: [], //选择的员工
    title: "",
    project: [], //选中的项目
    form: {
      chargeUserId: null,
      chargeUserName: "",
    },
  })
  Object.assign(queryUserForm, {
    page: 1,
    limit: 10,
    id: "",
    userName: "",
    active: null,
    departmentId: null,
    positionId: null,
  })
  Object.assign(queryForm, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    id: null,
    // 职位名称
    name: "",
    // 是否启用 1启用 2停用
    active: null,
  })
  // 同步选中的路由id
  // departmentId.value = treeRef.value.getCheckedKeys(false);
}

const emit = defineEmits(["userData"]);
const formRef = ref<any>(); // Ref
//点击确定，把值传给父元素
function submit() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      let chargeUserName = '';
      let findData = data.value.tenantStaffList.find(
        (item: any) => item.id === data.value.form.chargeUserId
      );
      chargeUserName = findData.userName;
      let obj = {
        chargeUserId: data.value.form.chargeUserId, //负责人UserId
        chargeUserName: chargeUserName, //负责人用户姓名
        invitationType: data.value.invitationType, //类型，1员工，2部门
        // departmentId: departmentId.value[0], //邀请方部门id
        // departmentName:departmentName,
      };
      close()
      emit("userData", obj);
    }
  });
}
const activeNames = ref([]);
const handleChange = (val: any) => {
  activeNames.value = val;
};
onMounted(async () => {
  const res = await apiPos.list(queryForm);
  if (res.data) {
    positionList.value = res.data.data
  }
})
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="drawerisible" :close-on-click-modal="false" destroy-on-close draggable width="30%"
      :title="data.title" class="userClass">
      <div v-if="data.project.length != 0" style="margin-top: -2.1875rem">
        <el-collapse v-model="activeNames" @change="handleChange" v-if="data.project.length > 1">
          <el-collapse-item name="1">
            <template #title>
              <span class="project-name">项目</span>
              <el-badge :value="data.project.length" :max="99" class="item">
              </el-badge>
            </template>
            <div class="project-content">
              <div v-for="item in data.project" :key="item.id">
                <div style="display: flex">
                  <span style="font-weight: 500">{{ item.tenantName }}</span>
                  <span style="margin-left: 10px">ID:{{ item.tenantId }}</span>
                  <copy :content="item.tenantId" />
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <ElForm ref="formRef" :rules="rules" :model="data.form" label-width="100px">
        <el-form-item label="负责人" prop="chargeUserId">
          <el-select v-model="data.form.chargeUserId" value-key="" placeholder="请选择负责人" clearable filterable>
            <template #header>
              <el-radio-group v-model="radio1" size="large" style="max-width: 34.375rem" @change="handerRadioChange">
                <el-radio-button label="全部" value="all" />
                <el-radio-button v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id" />
              </el-radio-group>
            </template>
            <el-option v-for="item in data.tenantStaffList" :key="item.id" :label="item.userName" :value="item.id" />
            <el-button class="buttonClass" @click="dictionaryItemVisible = true" size="small">
              快捷新增
              <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
            </el-button>

            <template #empty>
              <div style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 1rem;
                ">
                暂无数据
                <el-button type="primary" link @click="dictionaryItemVisible = true" size="small">
                  快捷新增
                  <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                </el-button>
              </div>
            </template>
          </el-select>
        </el-form-item>
      </ElForm>

      <template #footer>
        <div class="flex-c">
          <el-button @click="close"> 取消 </el-button>
          <el-button type="primary" @click="submit"> 确认 </el-button>
        </div>
      </template>
      <DictionaryItemDia v-if="dictionaryItemVisible" v-model="dictionaryItemVisible" @success="getTenantStaffList" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.buttonClass {
  text-align: center;
  margin: 0.75rem;
  width: 100%;
  height: 2rem;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 0.875rem;
  color: #409eff;
  line-height: 16px;
  background: #f4f8ff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #e9eef3;
}

/* 使按钮在下拉框展开时自适应宽度 */
.el-select-dropdown .buttonClass {
  width: calc(100% - 24px);
  /* 减去两边的 padding */

}

.checkBox {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 1.25rem;
}

:deep(.userClass .el-tabs__content) {
  height: 12.5rem;
  overflow: auto;
}

:deep(.userClass .el-collapse) {
  border-top: none !important;
}

.project-name {
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}

.tabs-user {
  margin-top: 0.9375rem;
}

.project-content {
  // margin-top: .625rem;
  height: 150px;
  overflow: auto;
}

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.userClass .el-tabs__nav-wrap {
  .el-tabs__item {
    .custom-tab-label {
      /* 字体样式 */
      background: #c6c6c6;
      border-radius: 4px 4px 4px 4px;
      color: #fff;
      display: inline-block;
      padding: 0.3125rem 0.9375rem;
      /* 内边距 */
    }
  }
}

.userClass .el-tabs__item.is-top:nth-child(2) {
  margin-left: 0 !important;
}

:deep(.userClass .el-tree-node.is-checked > .el-tree-node__content) {
  background: #e3f1ff;
  font-weight: 400;
  font-size: 14px;
  color: #409eff;
}

:deep(.userClass .el-tree-node) {
  margin-top: 8px;
}

:deep(.userClass .el-tabs__active-bar) {
  background-color: transparent !important;
}

:deep(.userClass .el-tabs__item) {
  padding: 0px 0rem;
}

/* 选中状态下的样式 */
.userClass .el-tabs__nav-wrap {
  .el-tabs__item.is-active {
    .custom-tab-label {
      margin-left: 2px;
      border-radius: 4px 4px 4px 4px;

      /* 蓝色背景图 */
      /* 去掉选中后的下划线 */
      background: #409eff;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 29px;
    }
  }
}

:deep(.el-popper) {
  width: 25.375rem;
}

:deep(.el-radio-button__inner) {
  border: none !important;
}

:deep(.el-select-dropdown__header) {
  width: 416px !important;
  border-bottom: none !important;
}

:deep(.el-radio-button__inner) {
  height: 1.875rem;
  width: 4.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  border-radius: 20px !important;
}
</style>
