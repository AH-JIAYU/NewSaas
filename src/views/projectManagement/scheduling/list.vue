<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import edit from "./components/Edit/index.vue";
import api from "@/api/modules/projectManagement_scheduling";

defineOptions({
  name: "ProjectManagementSchedulingIndex",
});
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
const border = ref(true);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);

const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref<any>([
  { sotrtable: true, checked: true, label: "类型", prop: "dispatchType" },
  { sotrtable: true, checked: true, label: "项目id", prop: "projectId" },
  { sotrtable: true, checked: true, label: "项目名称", prop: "projectName" },
  { sotrtable: true, checked: true, label: "原价(美元)", prop: "moneyPrice" },
  { sotrtable: true, checked: true, label: "指定价格", prop: "doMoneyPrice" },
  { sotrtable: true, checked: true, label: "指定供应商", prop: "Supplier" },
  { sotrtable: true, checked: true, label: "指定会员组", prop: "group" },
  { sotrtable: true, checked: true, label: "创建时间", prop: "createTime" },
]);
// 查询参数
const queryForm = reactive<any>({
  dispatchType: "", // 	调度类型:1:指定关闭 2:指定价格,不传查询全部类型
  projectId: "", //	项目id-模糊查询
  projectName: "", // 项目名称-模糊查询
});
const list = ref<any>([]);
// 新增数据
function addData() {
  editRef.value.showEdit();
}
// 编辑数据
function editData(row: any) {
  editRef.value.showEdit(row);
}
// 删除数据
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.projectName}」吗？`, "确认信息")
    .then(() => {
      api
        .delete({ projectDispatchId: row.projectDispatchId })
        .then((res: any) => {
          fetchData();
          ElMessage.success({
            message: "删除成功",
            center: true,
          });
        });
    })
    .catch(() => {});
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    dispatchType: "", // 	调度类型:1:指定关闭 2:指定价格,不传查询全部类型
    projectId: "", //	项目id-模糊查询
    projectName: "", // 项目名称-模糊查询
  });
  fetchData();
}
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm,
  };
  const res = await api.list(params);
  list.value = res.data.getProjectDispatchInfoList;
  pagination.value.total = res.data.total;
  listLoading.value = false;
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
});
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectId"
                clearable
                placeholder="项目ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectName"
                clearable
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.dispatchType"
                clearable
                placeholder="全部类型"
              >
                <el-option label="指定关闭" :value="1" />
                <el-option label="指定价格" :value="2" />
              </el-select>
            </el-form-item>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                重置
              </ElButton>
              <ElButton disabled link @click="toggle">
                <template #icon>
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </el-form>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addData">
            新增
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="listLoading"
        style="margin-top: 10px"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
      >
        <el-table-column align="center" type="selection" />
        <el-table-column
          v-if="checkList.includes('dispatchType')"
          show-overflow-tooltip
          prop="dispatchType"
          align="center"
          label="类型"
        >
          <template #default="{ row }">
            {{ row.dispatchType === 1 ? "指定关闭" : "指定价格" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          show-overflow-tooltip
          prop="projectId"
          align="center"
          label="项目ID"
        />
        <el-table-column
          v-if="checkList.includes('projectName')"
          show-overflow-tooltip
          prop="projectName"
          align="center"
          label="项目名称"
        />
        <el-table-column
          v-if="checkList.includes('moneyPrice')"
          show-overflow-tooltip
          prop="moneyPrice"
          align="center"
          label="原价(美元)"
        />
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          prop="doMoneyPrice"
          align="center"
          label="指定价格"
        >
          <template #default="{ row }">
            {{ row.doMoneyPrice ? row.doMoneyPrice : '-' }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('Supplier')"
          show-overflow-tooltip
          prop="groupSupplierId"
          align="center"
          label="指定供应商"
        >
          <template #default="{ row }">
            <template v-if="row.dataType == 1">
              <span v-for="item in row.groupSupplierId">{{ item }}</span>
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('group')"
          show-overflow-tooltip
          align="center"
          label="指定会员组"
        >
          <template #default="{ row }">
            <template v-if="row.dataType == 2">
              <span v-for="item in row.groupSupplierId">{{ item }}</span>
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          show-overflow-tooltip
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column align="center" label="操作" width="170">
          <template #default="{ row }">
            <el-button type="primary" plain size="small" @click="editData(row)">
              编辑
            </el-button>
            <el-button type="danger" plain size="small" @click="onDel(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <ElPagination
        :current-page="pagination.page"
        :total="pagination.total"
        :page-size="pagination.size"
        :page-sizes="pagination.sizes"
        :layout="pagination.layout"
        :hide-on-single-page="false"
        class="pagination"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
      <edit ref="editRef" @fetch-data="fetchData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
:deep {
  table {
    width: 100% !important;
  }
}

.el-pagination {
  margin-top: 15px;
}

.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }
  }
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
