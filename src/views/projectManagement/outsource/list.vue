<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import edit from "./components/Edit/index.vue";
import api from "@/api/modules/projectManagement_outsource";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";

defineOptions({
  name: "outsource",
});
const projectManagementOutsourceStore = useProjectManagementOutsourceStore();
const { format } = useTimeago();
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
  { sotrtable: true, checked: true, label: "租户ID", prop: "tenantId" },
  { sotrtable: true, checked: true, label: "租户名称", prop: "tenantName" },
  { sotrtable: true, checked: true, label: "项目id", prop: "projectId" },
  { sotrtable: true, checked: true, label: "项目名称", prop: "projectName" },
  {
    sotrtable: true,
    checked: true,
    label: "参与/完成/配额/限量",
    prop: "participationNumber",
  },
  { sotrtable: true, checked: true, label: "状态", prop: "projectStatus" },
]);

// 查询参数
const queryForm = reactive<any>({
  tenantId: "", //租户id
  tenantName: "", //	租户名称
  projectStatus: "", //	1:进行中(在线) 2:已完成(审核通过) 3:离线
  type: 2,
});
const list = ref<any>([]);

// 详情
function editData(row: any) {
  editRef.value.showEdit(row, queryForm.type === 2 ? 1 : 0);
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
    tenantId: "", //租户id
    tenantName: "", //	租户名称
    projectStatus: "", //	1:进行中(在线) 2:已完成(审核通过) 3:离线
    type: 2,
  });
  fetchData();
}
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.type === 1) {
      const res = await api.list(params);
      list.value = res.data.projectAllocationInfoList;
      pagination.value.total = res.data.total;
    } else {
      const res = await api.meList(params);
      list.value = res.data.projectMeAllocationInfoList;
      pagination.value.total = res.data.total;
    }
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
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
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <el-tabs v-model="queryForm.type"   @tab-change="fetchData">
        <el-tab-pane label="外包项目" :name="2">
          <SearchBar :show-toggle="false">
            <template #default="{ fold, toggle }">
              <el-form :model="queryForm.select" size="default" label-width="100px" inline-message inline
                class="search-form">
                <el-form-item label="">
                  <el-input v-model="queryForm.tenantId" clearable placeholder="租户id" />
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryForm.tenantName" clearable placeholder="租户名称" />
                </el-form-item>
                <el-form-item label="">
                  <el-select v-model="queryForm.projectStatus" clearable placeholder="项目状态">
                    <el-option v-for="(
                    item, index
                  ) in projectManagementOutsourceStore.projectStatusList" :label="item" :value="index + 1" />
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
                      <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                    </template>
                    {{ fold ? "展开" : "收起" }}
                  </ElButton>
                </ElFormItem>
              </el-form>
            </template>
          </SearchBar>
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel> </FormLeftPanel>

            <FormRightPanel>
              <el-button size="default" @click=""> 导出 </el-button>
              <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
                v-model:stripe="stripe" style="margin-left: 12px" @query-data="currentChange" />
            </FormRightPanel>
          </el-row>
          <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
            :border="border" :size="lineHeight" :stripe="stripe">
            <el-table-column align="center" type="selection" />
            <el-table-column v-if="checkList.includes('tenantId')" show-overflow-tooltip prop="tenantId" align="center"
              label="租户ID" />
            <el-table-column v-if="checkList.includes('tenantName')" show-overflow-tooltip prop="tenantName"
              align="center" label="租户名称" />

            <el-table-column v-if="checkList.includes('projectId')" show-overflow-tooltip prop="projectId"
              align="center" width="180" label="项目ID" />
            <el-table-column v-if="checkList.includes('projectName')" show-overflow-tooltip prop="projectName"
              align="center" label="项目名称" />

            <el-table-column v-if="checkList.includes('participationNumber')" show-overflow-tooltip
              prop="participationNumber" align="center" label="参与/完成/配额/限量">
              <template #default="{ row }">
                <el-text size="large">{{ row.participationNumber || 0 }} </el-text>
                <el-text size="large"> / </el-text>
                <el-text type="success" size="large">
                  {{ row.doneNumber || 0 }}
                </el-text>
                <el-text size="large"> / </el-text>
                <el-text type="warning" size="large"> {{ row.num || 0 }}</el-text><el-text size="large"> / </el-text>
                <el-text size="large">{{ row.limitedQuantity || 0 }}</el-text>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('projectStatus')" show-overflow-tooltip prop="projectStatus"
              align="center" label="状态">
              <template #default="{ row }">
                <span>{{
    projectManagementOutsourceStore.projectStatusList[
    row.projectStatus - 1
    ]
  }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" fixed="right" label="操作" width="170">
              <template #default="{ row }">
                <el-button type="primary" plain size="small" @click="editData(row)">
                  详情
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChange" />
        </el-tab-pane>
        <el-tab-pane label="接收项目" :name="1">
          <SearchBar :show-toggle="false">
            <template #default="{ fold, toggle }">
              <el-form :model="queryForm.select" size="default" label-width="100px" inline-message inline
                class="search-form">
                <el-form-item label="">
                  <el-input v-model="queryForm.tenantId" clearable placeholder="租户id" />
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryForm.tenantName" clearable placeholder="租户名称" />
                </el-form-item>
                <el-form-item label="">
                  <el-select v-model="queryForm.projectStatus" clearable placeholder="项目状态">
                    <el-option v-for="(
                    item, index
                  ) in projectManagementOutsourceStore.projectStatusList" :label="item" :value="index + 1" />
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
                      <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                    </template>
                    {{ fold ? "展开" : "收起" }}
                  </ElButton>
                </ElFormItem>
              </el-form>
            </template>
          </SearchBar>
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel> </FormLeftPanel>

            <FormRightPanel>
              <el-button size="default" @click=""> 导出 </el-button>
              <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
                v-model:stripe="stripe" style="margin-left: 12px" @query-data="currentChange" />
            </FormRightPanel>
          </el-row>
          <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
            :border="border" :size="lineHeight" :stripe="stripe">
            <el-table-column align="center" type="selection" />
            <el-table-column v-if="checkList.includes('tenantId')" show-overflow-tooltip prop="tenantId" align="center"
              label="租户ID" />
            <el-table-column v-if="checkList.includes('tenantName')" show-overflow-tooltip prop="tenantName"
              align="center" label="租户名称" />

            <el-table-column v-if="checkList.includes('projectId')" show-overflow-tooltip prop="projectId"
              align="center" width="180" label="项目ID" />
            <el-table-column v-if="checkList.includes('projectName')" show-overflow-tooltip prop="projectName"
              align="center" label="项目名称" />

            <el-table-column v-if="checkList.includes('participationNumber')" show-overflow-tooltip
              prop="participationNumber" align="center" label="参与/完成/配额/限量">
              <template #default="{ row }">
                <el-text size="large">{{ row.participationNumber || 0 }} </el-text>
                <el-text size="large"> / </el-text>
                <el-text type="success" size="large">
                  {{ row.doneNumber || 0 }}
                </el-text>
                <el-text size="large"> / </el-text>
                <el-text type="warning" size="large"> {{ row.num || 0 }}</el-text><el-text size="large"> / </el-text>
                <el-text size="large">{{ row.limitedQuantity || 0 }}</el-text>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('projectStatus')" show-overflow-tooltip prop="projectStatus"
              align="center" label="状态">
              <template #default="{ row }">
                <span>{{
    projectManagementOutsourceStore.projectStatusList[
    row.projectStatus - 1
    ]
  }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" fixed="right" label="操作" width="170">
              <template #default="{ row }">
                <el-button type="primary" plain size="small" @click="editData(row)">
                  详情
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChange" />
        </el-tab-pane>

      </el-tabs>

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
