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
// 租户分配
const tenantObj = ref<any>({
  // 项目id
  projectId: null,
  // 分配类型:1:自动分配 2:供应商 3:会员部门 4:租户分配 5:已分配项目变成未分配
  allocationType: 4,
  // 分配类型为:供应商传供应商id,分配类型为会员部门传会员部门Id,支持多选,分配给租户id(租户只能一个分配)allocationType等于5传空数组
  groupSupplierIdList: [],
  // 只有分配类型等于租户分配,并且是重新分配,然后用户删了了后端传的租户id,全部放在这里
  deleteSet: []
})
// 供应商分配
const supplierObj = ref<any>({
  // 项目id
  projectId: null,
  // 分配类型:1:自动分配 2:供应商 3:会员部门 4:租户分配 5:已分配项目变成未分配
  allocationType: 2,
  // 分配类型为:供应商传供应商id,分配类型为会员部门传会员部门Id,支持多选,分配给租户id(租户只能一个分配)allocationType等于5传空数组
  groupSupplierIdList: [],
  // 只有分配类型等于租户分配,并且是重新分配,然后用户删了了后端传的租户id,全部放在这里
  deleteSet: []
})
// 会员分配
const memberObj = ref<any>({
  // 项目id
  projectId: null,
  // 分配类型:1:自动分配 2:供应商 3:会员部门 4:租户分配 5:已分配项目变成未分配
  allocationType: 3,
  // 分配类型为:供应商传供应商id,分配类型为会员部门传会员部门Id,支持多选,分配给租户id(租户只能一个分配)allocationType等于5传空数组
  groupSupplierIdList: [],
  // 只有分配类型等于租户分配,并且是重新分配,然后用户删了了后端传的租户id,全部放在这里
  deleteSet: []
})
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
// 扁平化部门
const depList = ref<any>([])

const tenantIdCopy = ref<any>()
// 显隐
async function showEdit(row: any, type: string) {
  data.value.list = [{ ...row }]; // 表格
  // 重新分配
  if (type === "reassign") {
    data.value.title = "重新分配";
    const res = await obtainLoading(
      api.getProjectAllocation({ projectId: row.projectId })
    );
    data.value.form.projectId = row.projectId;
    const { getProjectAllocationInfoList } = res.data;
    getProjectAllocationInfoList.forEach((item: any) => {
      if (item.allocationType === 2) {
        supplierObj.value = {
          allocationType: item.allocationType,
          projectId: item.projectId,
          groupSupplierIdList: item.groupSupplierIdSet
        }
      } else if (item.allocationType === 3) {
        memberObj.value = {
          allocationType: item.allocationType,
          projectId: item.projectId,
          groupSupplierIdList: item.groupSupplierIdSet
        }
      } else if (item.allocationType === 4) {
        tenantObj.value = {
          allocationType: item.allocationType,
          projectId: item.projectId,
          groupSupplierIdList: item.groupSupplierIdSet
        }
        tenantIdCopy.value = item.groupSupplierIdSet
      }
    })
    // data.value.form = form;
    // data.value.form.groupSupplierIdList = groupSupplierIdSet;
    // copyList.value = JSON.parse(JSON.stringify(groupSupplierIdSet));
  } else {
    data.value.title = "分配";
    // 分配
    data.value.form.projectId = row.projectId; // 项目id
    tenantObj.value.projectId = row.projectId; // 项目id
    supplierObj.value.projectId = row.projectId; // 项目id
    memberObj.value.projectId = row.projectId; // 项目id
  }
  // 供应商列表
  data.value.tenantSupplierList = await obtainLoading(
    supplierStore.getTenantSupplierList(row.projectId)
  );
  if (data.value.tenantSupplierList.length == supplierObj.value.groupSupplierIdList.length) {
    data.value.selectAll.supplier = true;
  } else {
    data.value.selectAll.supplier = false;
  }
  // 会员部门列表
  const resDep = await apiDep.list({ name: "" });
  data.value.departmentList = resDep.data;
  const departmentList = JSON.parse(JSON.stringify(resDep.data))
  depList.value = flattenWithoutChildren(departmentList)
  if (depList.value.length == memberObj.value.groupSupplierIdList.length) {
    data.value.selectAll.member = true;
  } else {
    data.value.selectAll.member = false;
  }
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
  if (data.value.tenantList.length == tenantObj.value.groupSupplierIdList.length) {
    data.value.selectAll.tenant = true;
  } else {
    data.value.selectAll.tenant = false;
  }
  dialogTableVisible.value = true;
}

// 扁平化会员部门
const flattenWithoutChildren = (arr: any) => {
  return arr.reduce((acc: any, val: any) => {
    // 创建一个新对象，移除 children 字段
    const { children, ...rest } = val;
    // 将当前项添加到扁平化的数组中
    acc.push(rest);
    // 如果当前项有 children，则递归扁平化其 children 数组
    if (val.children && val.children.length > 0) {
      acc = acc.concat(flattenWithoutChildren(val.children));
    }
    return acc;
  }, []);
};
// 切换分配
function changeRadio() {
  data.value.form.groupSupplierIdList = [];
}

// 合作商全选
function selectAllTenant() {
  tenantObj.value.groupSupplierIdList = [];
  if (data.value.selectAll.tenant) {
    data.value.tenantList.map((item: any) => {
      tenantObj.value.groupSupplierIdList.push(item.beInvitationTenantId);
    });
  }
}

// 供应商全选
function selectAllSupplier() {
  supplierObj.value.groupSupplierIdList = [];
  if (data.value.selectAll.supplier) {
    data.value.tenantSupplierList.map((item: any) => {
      supplierObj.value.groupSupplierIdList.push(item.tenantSupplierId);
    });
  }
}

// 供应商切换事件
const supplierChange = () => {
  if (data.value.tenantSupplierList.length == supplierObj.value.groupSupplierIdList.length) {
    data.value.selectAll.supplier = true;
  } else {
    data.value.selectAll.supplier = false;
  }
}
// 合作商切换事件
const tenantChange = () => {
  if (data.value.tenantList.length == tenantObj.value.groupSupplierIdList.length) {
    data.value.selectAll.tenant = true;
  } else {
    data.value.selectAll.tenant = false;
  }
}

const chalend = () => {
  // 清空 groupSupplierIdList，确保每次全选时重新计算
  memberObj.value.groupSupplierIdList = [];
  // 遍历所有部门，递归获取所有节点 ID
  data.value.departmentList.forEach((item: any) => {
    // 递归处理每个部门的子节点
    chalendHelper(item);
  });
  // 设置所有节点的 ID 到选中列表
  treeRef.value.setCheckedKeys(memberObj.value.groupSupplierIdList);
};

// 递归处理每个节点及其子节点
function chalendHelper(node: any) {
  // 将当前节点的 ID 添加到 groupSupplierIdList
  memberObj.value.groupSupplierIdList.push(node.id);
  // 如果该节点有子节点，则继续递归
  if (node.children && node.children.length) {
    node.children.forEach((child: any) => {
      chalendHelper(child);  // 递归处理每个子节点
    });
  }
}

// 会员全选
function selectAllMember() {
  // 清空选中的成员列表
  memberObj.value.groupSupplierIdList = [];
  if (data.value.selectAll.member) {
    // 如果全选状态为 true，获取所有节点的 ID 并设置为已选中
    chalend();  // 获取所有节点的 ID
    // 使用 setCheckedKeys 设置选中的节点
    treeRef.value.setCheckedKeys(memberObj.value.groupSupplierIdList);
  } else {
    // 否则取消选中
    data.value.selectAll.member = false;
    memberObj.value.groupSupplierIdList = [];  // 清空选中的 ID
    treeRef.value.setCheckedKeys([]);  // 清除所有勾选项
  }
}

// 树的事件
const handleNodeClick = (nodeData: any, checked: any) => {
  // 如果选中该节点，加入到当前选中的节点列表
  if (checked) {
    if (!departmentId.value.includes(nodeData.id)) {
      departmentId.value.push(nodeData.id); // 保持多个选中的节点
    }
  } else {
    // 如果取消选中节点，移除对应的节点 ID
    departmentId.value = departmentId.value.filter((id: any) => id !== nodeData.id);
  }
  // 获取树的选中节点和半选节点
  const checkedKeys = treeRef.value.getCheckedKeys(); // 获取选中的所有节点
  const halfCheckedKeys = treeRef.value.getHalfCheckedKeys(); // 获取所有半选的节点
  // 合并选中的节点和半选节点
  const organizationalStructureId = [...checkedKeys, ...halfCheckedKeys];
  // 更新组织结构 ID，确保同步到 memberObj
  memberObj.value.groupSupplierIdList = organizationalStructureId;
  if (depList.value.length == organizationalStructureId.length) {
    data.value.selectAll.member = true;
  } else {
    data.value.selectAll.member = false;
  }
};

// 是否取消分配
const isAllocation = ref<any>(false)
const sendProjectType = ref<any>(false)
// 取消分配
const cancelAllocation = () => {
  sendProjectType.value = !sendProjectType.value;
  // colse()
  if (sendProjectType.value) {
    isAllocation.value = true
  } else {
    isAllocation.value = false
  }
}

const colse = () => {
  Object.assign(tenantObj.value, {
    projectId: null,
    allocationType: 4,
    groupSupplierIdList: [],
    deleteSet: []
  })
  Object.assign(supplierObj.value, {
    projectId: null,
    allocationType: 2,
    groupSupplierIdList: [],
    deleteSet: []
  })
  Object.assign(memberObj.value, {
    projectId: null,
    allocationType: 3,
    groupSupplierIdList: [],
    deleteSet: []
  })
  data.value.selectAll.tenant = false;
  data.value.selectAll.supplier = false;
  data.value.selectAll.member = false;
}

// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  colse()
  dialogTableVisible.value = false;
  isAllocation.value = false;
  sendProjectType.value = null;
}
// 提交数据
function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        loading.value = true;
        let params: any = {
          addProjectAllocationInfoList: []
        }
        if (tenantObj.value.groupSupplierIdList.length) {
          tenantObj.value.projectId = data.value.form.projectId
          params.addProjectAllocationInfoList.push(tenantObj.value)
        }
        if (supplierObj.value.groupSupplierIdList.length) {
          supplierObj.value.projectId = data.value.form.projectId
          params.addProjectAllocationInfoList.push(supplierObj.value)
        }
        if (memberObj.value.groupSupplierIdList.length) {
          memberObj.value.projectId = data.value.form.projectId
          params.addProjectAllocationInfoList.push(memberObj.value)
        }
        if (data.value.title !== '分配') {
          if (!params.addProjectAllocationInfoList.length) {
            isAllocation.value = true
          }
          params.addProjectAllocationInfoList.map((item: any) => {
            if (!item.projectId) {
              item.projectId = data.value.form.projectId
            }
            if (item.allocationType === 4) {
              item.deleteSet = []
              if (tenantIdCopy.value && tenantIdCopy.value.length) {
                tenantIdCopy.value.filter((ite: any) => {
                  item.groupSupplierIdList.map((it: any) => {
                    if (ite !== it) {
                      item.deleteSet.push(ite)
                    }
                  })
                })
              }
            }
          })
        } else {
          if (!params.addProjectAllocationInfoList.length) {
            ElMessage.warning({
              message: "至少选择一个分配目标",
              center: true,
            });
            return
          }
        }
        if (isAllocation.value) {
          params = {
            addProjectAllocationInfoList: [{
              projectId: data.value.form.projectId,
              allocationType: 5,
              groupSupplierIdList: [],
              deleteSet: []
            }]
          }
        }
        // return
        const { status } = await submitLoading(api.allocation(params));
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
const goRouter = (name: any) => {
  if (name == '供应商') {
    //供应商列表，新增供应商
  } else if (name == '调查站') {
    //调查系统-部门管理-新增部门
  } else if (name == '合作商') {
    //客商管理-合作租户-邀约公司
  }
}
onMounted(async () => { });
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" :title="data.title" width="700" :before-close="closeHandler">
      <el-table :data="data.list" v-loading="loading" row-key="id">
        <el-table-column align="left" show-overflow-tooltip label="项目名称" prop="name" />
        <el-table-column align="left" show-overflow-tooltip label="项目编码" prop="projectId" />
        <el-table-column align="left" show-overflow-tooltip label="客户简称" width="100" prop="clientName" />
      </el-table>
      <el-form ref="formRef" label-width="90px" :rules="rules" :model="data.form" :inline="false" label-position="left"
        prop="groupSupplierIdList">
        <el-form-item style="margin-top: 1rem">
          <template #label>
            <span class="icon-class">
              <img src="@/assets/images/gong.png" alt="" style="margin-right: 0.25rem" />
              供应商</span>
          </template>
          <el-select v-model="supplierObj.groupSupplierIdList" clearable filterable multiple collapse-tags
            collapse-tags-tooltip :max-collapse-tags="10" placeholder="" @change="supplierChange">
            <template #header>
              <el-checkbox v-model="data.selectAll.supplier" @change="selectAllSupplier"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="data.tenantSupplierList.length == 0" @click="goRouter('供应商')">
                请先维护供应商数据
                <img src="@/assets/images/jiantou.png" alt="" style="margin-left: 0.25rem" />
              </span>
              <span
                v-if="supplierObj.groupSupplierIdList.length == 0 && data.tenantSupplierList.length != 0">请先选择供应商数据</span>
            </template>
            <el-option v-for="item in data.tenantSupplierList" :label="item.supplierAccord" :key="item.supplierAccord"
              :value="item.tenantSupplierId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="icon-class">
              <img src="@/assets/images/diao.png" alt="" style="margin-right: 0.25rem" />
              调查站</span>
          </template>
          <el-tree-select ref="treeRef" v-model="memberObj.groupSupplierIdList" :data="data.departmentList"
            show-checkbox default-expand-all node-key="id" :props="defaultProps" @check-change="handleNodeClick"
            :check-strictly="true" :check-on-click-node="true" :multiple="true" :expand-on-click-node="false"
            style="width: 37.625rem" clearable placeholder="">
            <template #header>
              <el-checkbox v-model="data.selectAll.member" @change="selectAllMember"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="data.departmentList.length == 0" @click="goRouter('调查站')">
                请先维护调查站数据
                <img src="@/assets/images/jiantou.png" alt="" style="margin-left: 0.25rem" />
              </span>
              <span v-if="!memberObj.groupSupplierIdList.length && data.departmentList.length != 0">请先选择调查站数据</span>
            </template>

          </el-tree-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="icon-class">
              <img src="@/assets/images/he.png" alt="" style="margin-right: 0.25rem" />
              合作商</span>
          </template>
          <el-select v-model="tenantObj.groupSupplierIdList" clearable filterable multiple collapse-tags
            collapse-tags-tooltip :max-collapse-tags="10" placeholder="" @change="tenantChange">
            <template #header>
              <el-checkbox v-model="data.selectAll.tenant" @change="selectAllTenant"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="data.tenantList.length == 0" @click="goRouter('合作商')">
                请先维护合作商数据
                <img src="@/assets/images/jiantou.png" alt="" style="margin-left: 0.25rem" />
              </span>
              <span v-if="tenantObj.groupSupplierIdList.length == 0 && data.tenantList.length != 0">请先选择合作商数据</span>
            </template>
            <!-- :disabled="item.reveal === 1" -->
            <el-option v-for="item in data.tenantList" :label="item.beInvitationTenantName"
              :key="item.beInvitationTenantName" :value="item.beInvitationTenantId" />
          </el-select>

        </el-form-item>
        <el-form-item v-if="data.title == '重新分配'">
          <template #label>
            <el-button :type="sendProjectType ? 'primary' : ''" @click="cancelAllocation()"
              style="border-radius: 1.875rem;"> 取消分配
            </el-button>
          </template>

        </el-form-item>
      </el-form>

      <!-- <el-form ref="formRef" label-width="80px" :rules="rules" :model="data.form" :inline="false">
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
    </el-form> -->
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

:deep(.el-select__selection) {
  margin-left: -0.5rem;
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
