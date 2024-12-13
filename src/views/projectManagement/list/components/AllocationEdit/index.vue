<script setup lang="ts">
import { ElMessage } from "element-plus";
import { submitLoading, obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import cooperationApi from "@/api/modules/user_cooperation"; // 合作合作商
import apiDep from "@/api/modules/survey_vip_department";
import useUserSupplierStore from "@/store/modules/user_supplier"; // 供应商
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const supplierStore = useUserSupplierStore(); // 供应商
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组

defineOptions({
  name: "AllocationEdit",
});
const emits = defineEmits(["fetch-data"]);
// loading
const loading = ref<boolean>(false);
// 弹框
const dialogTableVisible = ref(false);
const formRef = ref<any>(); // ref
// 获取树
const treeRef = ref<any>();
// 树绑定的id
const departmentId = ref<any>([]);
// 部门配置
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
const copyList = ref<any>([]);
const data = ref<any>({
  title: "分配",
  list: [], // 表格
  tenantSupplierList: [], // 供应商
  // vipGroupList: [], // 会员组
  departmentList: [], //会员部门
  tenantList: [], // 合作合作商
  form: {
    projectId: "", // 项目id
    allocationType: 1, //	分配类型:1:自动分配 2:供应商 3:会员组
    groupSupplierIdList: [], //	分配类型为:供应商传供应商id,分配类型为会员组传会员组Id,支持多选
    deleteSet: [],
  },
  // 全选
  selectAll: {
    supplier: false, // 供应商
    member: false, // 会员
    tenant: false, // 合作商
  },
});
const rules = ref<any>({
  groupSupplierIdList: [
    {
      type: "array",
      required: true,
      trigger: "change",
      message: "请选择分配目标",
    },
  ],
});
// 显隐
async function showEdit(row: any, type: string) {
  data.value.list = [{ ...row }]; // 表格
  // 重新分配
  if (type === "reassign") {
    data.value.title = "重新分配";
    const res = await obtainLoading(
      api.getProjectAllocation({ projectId: row.projectId })
    );
    const { groupSupplierIdSet, ...form } = res.data;
    data.value.form = form;
    data.value.form.groupSupplierIdList = groupSupplierIdSet;
    copyList.value = JSON.parse(JSON.stringify(groupSupplierIdSet));
  } else {
    data.value.title = "分配";
    // 分配
    data.value.form.projectId = row.projectId; // 项目id
  }
  // 供应商列表
  data.value.tenantSupplierList = await obtainLoading(
    supplierStore.getTenantSupplierList(row.projectId)
  );
  // // 会员组列表
  // data.value.vipGroupList = await obtainLoading(
  //   surveyVipGroupStore.getGroupNameList()
  // );
  // 会员部门列表
  const resDep = await apiDep.list({ name: "" });
  data.value.departmentList = resDep.data;
  // 合作合作商列表
  const res = await obtainLoading(
    cooperationApi.getAllocationBindList({ projectId: row.projectId })
  );
  // 回显会员部门选中的值
  departmentId.value = [];
  if (
    data.value.form.groupSupplierIdList &&
    data.value.form.allocationType === 3
  ) {
    departmentId.value = data.value.form.groupSupplierIdList;
  }
  data.value.tenantList = res.data.allocationBindInfoList;
  dialogTableVisible.value = true;
}
// 切换分配
function changeRadio() {
  data.value.form.groupSupplierIdList = [];
}
// 合作商全选
function selectAllTenant() {
  data.value.form.groupSupplierIdList = [];
  if (data.value.selectAll.tenant) {
    data.value.tenantList.map((item: any) => {
      data.value.form.groupSupplierIdList.push(item.beInvitationTenantId);
    });
  }
}
// 供应商全选
function selectAllSupplier() {
  data.value.form.groupSupplierIdList = [];
  if (data.value.selectAll.supplier) {
    data.value.tenantSupplierList.map((item: any) => {
      data.value.form.groupSupplierIdList.push(item.tenantSupplierId);
    });
  }
}
// 会员全选
function selectAllMember() {
  data.value.form.groupSupplierIdList = [];
  if (data.value.selectAll.member) {
    data.value.vipGroupList.map((item: any) => {
      data.value.form.groupSupplierIdList.push(item.memberGroupId);
    });
  }
}

// 树的事件
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
    departmentId.value = [nodeData.id]; // 只保留当前选中节点 ID
  } else {
    // 如果取消选中节点，更新 departmentId
    departmentId.value = departmentId.value.filter(
      (id: any) => id !== nodeData.id
    );
  }
  // 同步选中的路由id
  departmentId.value = treeRef.value!.getCheckedKeys(false);
  //  获取选中的所有子节点
  const tree = treeRef.value.getCheckedKeys();
  // 获取所有半选的主节点
  const halltree = treeRef.value.getHalfCheckedKeys();
  // 组合一下
  const organizationalStructureId = tree.concat(halltree);
  // localToptTab.value.organizationalStructureId = organizationalStructureId[0];
  data.value.form.groupSupplierIdList = organizationalStructureId;
};

// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(data.value.form, {
    projectId: "",
    allocationType: 1,
    groupSupplierIdList: [],
    deleteSet: [],
  });
  dialogTableVisible.value = false;
}
// 提交数据
function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        loading.value = true;
        const filteredTenants = copyList.value.filter(
          (item: any) => !data.value.form.groupSupplierIdList.includes(item)
        );
        data.value.form.deleteSet = filteredTenants;
        const { status } = await submitLoading(api.allocation(data.value.form));
        loading.value = false;
        status === 1 &&
          ElMessage.success({
            message: "分配成功",
            center: true,
          });
        closeHandler();
        emits("fetch-data");
      } catch (error) {
      } finally {
        loading.value = false;
      }
    }
  });
}
//供应商，调查站，合作商，没有数据时，跳转-暂时没做
const goRouter=(name:any)=> {
    if(name == '供应商'){
      //供应商列表，新增供应商
    } else if(name == '调查站'){
      //调查系统-部门管理-新增部门
    }else if(name == '合作商'){
      //客商管理-合作租户-邀约公司
    }
}
onMounted(async () => {});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      :title="data.title"
      width="700"
      :before-close="closeHandler"
    >
      <el-table :data="data.list" v-loading="loading" row-key="id">
        <el-table-column
          align="left"
          show-overflow-tooltip
          label="项目名称"
          prop="name"
        />
        <el-table-column
          align="left"
          show-overflow-tooltip
          label="项目编码"
          prop="projectId"
        />
        <el-table-column
          align="left"
          show-overflow-tooltip
          label="客户简称"
          width="100"
          prop="clientName"
        />
      </el-table>
      <!-- <el-form
        ref="formRef"
        label-width="90px"
        :rules="rules"
        :model="data.form"
        :inline="false"
        label-position="left"
        prop="groupSupplierIdList"
      >
        <el-form-item style="margin-top: 1rem">
          <template #label>
            <span class="icon-class">
              <img
                src="@/assets/images/gong.png"
                alt=""
                style="margin-right: 0.25rem"
              />
              供应商</span
            >
          </template>
          <el-select
            v-model="data.form.groupSupplierIdList"
            clearable
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="10"
            placeholder=""
          >
            <template #header>
              <el-checkbox
                v-model="data.selectAll.supplier"
                @change="selectAllSupplier"
                style="display: flex; height: unset"
                >全选</el-checkbox
              >
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="data.tenantSupplierList.length ==0" @click="goRouter('供应商')">
                请先维护供应商数据
                <img
                src="@/assets/images/jiantou.png"
                alt=""
                style="margin-left: 0.25rem"
              />
              </span>
              <span v-if="data.form.groupSupplierIdList.length ==0">请先选择供应商数据</span>
            </template>
            <el-option
              v-for="item in data.tenantSupplierList"
              :label="item.supplierAccord"
              :key="item.supplierAccord"
              :value="item.tenantSupplierId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="icon-class">
              <img
                src="@/assets/images/diao.png"
                alt=""
                style="margin-right: 0.25rem"
              />
              调查站</span
            >
          </template>

          <el-tree-select
            ref="treeRef"
            v-model="data.form.chargeUserId"
            :data="data.departmentList"
            check-strictly
            show-checkbox
            default-expand-all
            node-key="id"
            :props="defaultProps"
            @check-change="handleNodeClick"
            :check-on-click-node="true"
            :expand-on-click-node="false"
            style="width: 37.625rem"
            clearable
            placeholder=""
          >
          <template #prefix>
              <span class="prefix-class" v-if="data.departmentList.length ==0" @click="goRouter('调查站')">
                请先维护调查站数据
                <img
                src="@/assets/images/jiantou.png"
                alt=""
                style="margin-left: 0.25rem"
              />
              </span>
              <span v-if="!data.form.chargeUserId">请先选择调查站数据</span>
            </template>

        </el-tree-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="icon-class">
              <img
                src="@/assets/images/he.png"
                alt=""
                style="margin-right: 0.25rem"
              />
              合作商</span
            >
          </template>
          <el-select
            v-model="data.form.groupSupplierIdList"
            clearable
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="10"
            placeholder=""
          >
            <template #header>
              <el-checkbox
                v-model="data.selectAll.tenant"
                @change="selectAllTenant"
                style="display: flex; height: unset"
                >全选</el-checkbox
              >
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="data.tenantList.length ==0" @click="goRouter('合作商')">
                请先维护合作商数据
                <img
                src="@/assets/images/jiantou.png"
                alt=""
                style="margin-left: 0.25rem"
              />
              </span>
              <span v-if="data.form.groupSupplierIdList.length ==0">请先选择合作商数据</span>
            </template>
            <el-option
              v-for="item in data.tenantList"
              :label="item.beInvitationTenantName"
              :key="item.beInvitationTenantName"
              :value="item.beInvitationTenantId"
              :disabled="item.reveal === 1"
            />
          </el-select>

        </el-form-item>
        <el-form-item v-if="data.title = '重新分配'">
          <template #label>
            <el-button > 取消分配 </el-button>
          </template>

        </el-form-item>
      </el-form> -->

      <el-form ref="formRef" label-width="80px" :rules="rules" :model="data.form" :inline="false">
        <el-form-item label="分配目标">
          <el-radio-group v-model="data.form.allocationType" class="ml-4" @change="changeRadio">
            <el-radio :value="2" size="large"> 供应商 </el-radio>
            <el-radio :value="3" size="large"> 内部站 </el-radio>
            <el-radio :value="4" size="large">合作商 </el-radio>
            <el-radio :value="5" size="large" v-if="data.title === '重新分配'">
              取消分配
            </el-radio>
          </el-radio-group>
        </el-form-item>
      <el-form-item v-if="data.form.allocationType === 2 && data.form.allocationType !== 5
      " label="供应商" prop="groupSupplierIdList">
          <el-select v-model="data.form.groupSupplierIdList" placeholder="请选择供应商" clearable filterable multiple
            collapse-tags>
            <template #header>
              <el-checkbox v-model="data.selectAll.supplier" @change="selectAllSupplier"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <el-option v-for="item in data.tenantSupplierList" :label="item.supplierAccord"
              :value="item.tenantSupplierId" />
          </el-select>
        </el-form-item>
     <el-form-item v-if="data.form.allocationType === 3 && data.form.allocationType !== 5
      " label="部门" prop="groupSupplierIdList">
          <el-tree v-if="data.departmentList.length > 0" style="max-width: 600px" ref="treeRef"
            :data="data.departmentList" show-checkbox check-strictly node-key="id" :default-expanded-keys="[]"
            :default-checked-keys="departmentId" default-expand-all :props="defaultProps"
            @check-change="handleNodeClick" />
          <el-text v-else>暂无数据</el-text>
        </el-form-item>
       <el-form-item v-if="data.form.allocationType === 4 && data.form.allocationType !== 5
      " label="合作商" prop="groupSupplierIdList">
          <el-select v-model="data.form.groupSupplierIdList" placeholder="请选择合作商" clearable filterable multiple
            collapse-tags>
            <template #header>
              <el-checkbox v-model="data.selectAll.tenant" @change="selectAllTenant"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <el-option v-for="item in data.tenantList" :label="item.beInvitationTenantName"
              :value="item.beInvitationTenantId" :disabled="item.reveal === 1" />
          </el-select>
        </el-form-item>
    </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
/* 修改选中后的标签样式 */
:deep(.el-tag.el-tag--info) {
  background: #e7f3ff;
  border-radius: 4px 4px 4px 4px;
  font-size: 14px;
  font-weight: 400;
  font-size: 12px;
  color: #409eff;
  line-height: 14px;
}
/* 更改省略号的样式 */
:deep(.el-tag.el-tag--info .el-tag__close) {
  color: #409eff;
}
.prefix-class {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  cursor: pointer;
}
/* 鼠标悬停时改变标签样式 */
// :deep(.el-tag.el-tag--info:hover){
//   background-color: #66b1ff;  /* 鼠标悬停时的背景色 */
//   color: #ffffff;             /* 鼠标悬停时的文字颜色 */
// }
.icon-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep {
  .el-form-item.asterisk-left {
    align-items: center;
  }
}
</style>
