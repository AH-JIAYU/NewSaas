<script setup lang="ts">
import { ElMessage } from "element-plus";
import { submitLoading, obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import apiDep from "@/api/modules/survey_vip_department";
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
import DictionaryDialog from "@/views/survey/vip_department/components/dictionaryDialog/index.vue";
defineOptions({
  name: "AllocationEdit",
});
// 部门数据
const departmentList = ref<any>([]);
// 获取树
const treeRef = ref<any>()
// 树绑定的id
const departmentId = ref<any>([])
// 部门配置
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
const emits = defineEmits(["fetch-data"]);
// 弹框
const dialogTableVisible = ref(false);
const formRef = ref<any>(); // ref
const data = ref<any>({
  list: [], // 表格
  title: null,
  vipGroupList: [], // 供应商
  form: {
    projectId: "", // 项目id
    allocationType: 3, // 会员组固定
    groupSupplierIdList: [], //	分配类型为:供应商传供应商id,分配类型为会员组传会员组Id,支持多选
  },
  // 全选
  selectAll: {
    member: false, // 会员
  },
});
// 扁平化部门
const depList = ref<any>([])
const rules = ref<any>({
  groupSupplierIdList: [
    {
      type: "array",
      required: true,
      trigger: "change",
      message: "请选择至少一项",
    },
  ],
});
// 显隐
async function showEdit(row: any, type: string) {
  data.value.list = [{ ...row }]; // 表格
  // 分配
  data.value.form.projectId = row.projectId; // 项目id
  memberObj.value.projectId = row.projectId; // 项目id
  // 会员部门列表
  const res = await obtainLoading(
    api.getProjectAllocation({ projectId: row.projectId })
  );
  const { getProjectAllocationInfoList } = res.data;
  getProjectAllocationInfoList?.forEach((item: any) => {
    if (item.allocationType === 3) {
      memberObj.value = {
        allocationType: item.allocationType,
        projectId: item.projectId,
        groupSupplierIdList: item.groupSupplierIdSet
      }
    }
  })
  const depssList = JSON.parse(JSON.stringify(departmentList.value))
  depList.value = flattenWithoutChildren(depssList)
  if (depList.value.length == memberObj.value.groupSupplierIdList.length) {
    data.value.selectAll.member = true;
  } else {
    data.value.selectAll.member = false;
  }
  if (type === "reassign") {
    data.value.title = "重新分配";
  } else {
    data.value.title = "分配";
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
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(data.value.form, {
    projectId: "",
    groupSupplierIdList: [],
  });
  dialogTableVisible.value = false;
  Object.assign(memberObj.value, {
    projectId: null,
    allocationType: 3,
    groupSupplierIdList: [],
    deleteSet: []
  })
  isAllocation.value = false;
  sendProjectType.value = false;
  data.value.selectAll.member = false;
}
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
const chalend = () => {
  // 清空 groupSupplierIdList，确保每次全选时重新计算
  memberObj.value.groupSupplierIdList = [];
  // 遍历所有部门，递归获取所有节点 ID
  departmentList.value.forEach((item: any) => {
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
// 提交数据
function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      let params: any = {
        addProjectAllocationInfoList: []
      }
      if (memberObj.value.groupSupplierIdList.length) {
        memberObj.value.projectId = data.value.form.projectId
        params.addProjectAllocationInfoList.push(memberObj.value)
      }
      data.value.form.groupSupplierIdList = memberObj.value.groupSupplierIdList
      if (data.value.title !== '分配') {
        if (!params.addProjectAllocationInfoList.length) {
          isAllocation.value = true
        }
      } else {
        if (!params.addProjectAllocationInfoList.length) {
          ElMessage.warning({
            message: "至少选择一个分配目标",
            center: true,
          });
          return
        }
      }
      let message = '分配成功'
      if (isAllocation.value) {
        message = '取消分配成功'
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
      status === 1 &&
        ElMessage.success({
          message: message,
          center: true,
        });
      closeHandler();
      emits("fetch-data");
    }
  });
}
// 切换分配
function changeRadio() {
  data.value.form.groupSupplierIdList = [];
}
onMounted(async () => {
  // 部门
  const res = await apiDep.list({ name: '' });
  if (res.data) {
    departmentList.value = res.data;
  }
});
// 是否取消分配
const isAllocation = ref<any>(false)
const sendProjectType = ref<any>(false)
// 取消分配
const cancelAllocation = () => {
  sendProjectType.value = !sendProjectType.value;
  if (sendProjectType.value) {
    isAllocation.value = true
  } else {
    isAllocation.value = false
  }
}
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
const dictionaryRef = ref();
// 部门
const dictionary = ref({
  search: {
    name: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
    isClick: false,
  },
  row: "",
  loading: false,
});
//供应商，部门，合作商，没有数据时，跳转-暂时没做
const goRouter = (name: any, data?: Dict) => {
   if (name == '部门') {
    //调查系统-部门管理-新增部门
    dictionary.value.currentData = data;
    dictionary.value.dialog.parentId = "";
    dictionary.value.dialog.id = "";
    dictionary.value.dialog.visible = true;
  }
}
//会员列表
const getDictionaryList = async () => {
  const resDep = await apiDep.list({ name: "" });
  departmentList.value = resDep.data;
};
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" :title="data.title" width="700" :before-close="closeHandler">
      <el-table :data="data.list" v-loading="false" row-key="id">
        <el-table-column align="left" show-overflow-tooltip label="项目编码" prop="projectId" />
        <el-table-column align="left" show-overflow-tooltip label="项目名称" prop="projectName" />
        <el-table-column align="left" show-overflow-tooltip label="配额/限量" prop="name">
          <template #default="{ row }">
            {{ row.limitedQuantity || 0 }}/
            {{ row.num || 0 }}
          </template>
        </el-table-column>
      </el-table>
      <el-form ref="formRef" label-width="90px" :rules="rules" :model="data.form" :inline="false" label-position="left"
        style="margin-top: 1.25rem;" v-if="data.form.allocationType === 3 && data.form.allocationType !== 5">
        <el-form-item>
          <template #label>
            <span class="icon-class">
              <img src="@/assets/images/diao.png" alt="" style="margin-right: 0.25rem" />
              部门</span>
          </template>
          <el-tree-select ref="treeRef" v-model="memberObj.groupSupplierIdList" :data="departmentList" show-checkbox
            default-expand-all node-key="id" :props="defaultProps" @check-change="handleNodeClick"
            :check-strictly="true" :check-on-click-node="true" :multiple="true" :expand-on-click-node="false"
            style="width: 37.625rem" clearable placeholder="">
            <template v-if="departmentList.length" #header>
              <el-checkbox v-model="data.selectAll.member" @change="selectAllMember"
                style="display: flex; height: unset">全选</el-checkbox>
            </template>
            <template #prefix>
              <span class="prefix-class" v-if="departmentList.length == 0">
                请先维护部门数据
                <img src="@/assets/images/jiantou.png" alt="" style="margin-left: 0.25rem" />
              </span>
              <span v-if="!memberObj.groupSupplierIdList.length && departmentList.length != 0">请先选择部门数据</span>
            </template>
            <template #empty>
              <div

              >

                <el-button
                  type="primary"
                  link
                  class="buttonClass"
                  size="small"
                   @click="goRouter('部门')"
                >
                  快捷新增
                  <SvgIcon
                    name="ant-design:plus-outlined"
                    color="#fff"
                    style="
                      background-color: var(--el-color-primary);
                      border-radius: 50%;
                      padding: 0.125rem;
                      margin: 0 0.125rem;
                    "
                  />
                </el-button>
              </div>
            </template>

          </el-tree-select>
        </el-form-item>
        <el-form-item v-if="data.title == '重新分配'">
          <template #label>
            <el-button :type="sendProjectType ? 'primary' : ''" @click="cancelAllocation()"
              style="border-radius: 1.875rem;"> 取消分配
            </el-button>
          </template>

        </el-form-item>
      </el-form>

      <!-- <el-form ref="formRef" label-width="6rem" :rules="rules" :model="data.form" :inline="false"
        style="margin-top: 1.25rem;">
        <el-form-item label="分配目标">
          <el-radio-group v-model="data.form.allocationType" class="ml-4" @change="changeRadio">
            <el-radio :value="3" size="large"> 部门 </el-radio>
            <el-radio :value="5" size="large" v-if="data.title === '重新分配'">
              取消分配
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="data.form.allocationType === 3 && data.form.allocationType !== 5" label="部门" prop="">
          <el-tree v-if="departmentList.length > 0" style="max-width: 600px" ref="treeRef" :data="departmentList"
            show-checkbox check-strictly node-key="id" :default-expanded-keys="[]" :default-checked-keys="departmentId"
            default-expand-all :props="defaultProps" @check-change="handleNodeClick" />
          <el-text v-else>暂无数据</el-text>
        </el-form-item>
      </el-form> -->
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
     <!-- 调查站 -->
     <DictionaryDialog
      v-if="dictionary.dialog.visible"
      :id="dictionary.dialog.id"
      v-model="dictionary.dialog.visible"
      :row="dictionary.row"
      :parent-id="dictionary.dialog.parentId"
      :tree="dictionary.tree"
      :isClick="dictionary.dialog.isClick"
      @get-list="getDictionaryList"
    />
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

:deep(.el-select__selection) {
  margin-left: -0.5rem;
}

.prefix-class {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  cursor: pointer;
}

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
:deep(.el-button.is-link:hover) {
  color: #409eff !important;
  background: #f4f8ff !important;
  border-radius: 4px 4px 4px 4px !important;
  border: 1px solid #e9eef3 !important;
}
</style>
