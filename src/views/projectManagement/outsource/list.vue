<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import edit from "./components/Edit/index.vue";
import api from "@/api/modules/projectManagement_outsource";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";
import empty from "@/assets/images/empty.png";
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
const border = ref(false);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-outsource"); // 表单排序name
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
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "tenantId",
      placeholder: "租户id",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "tenantName",
      placeholder: "租户名称",
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "projectStatus",
      placeholder: "项目状态",
      option: "projectStatus",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});
const formOption = {
  projectStatus: () =>
    projectManagementOutsourceStore.projectStatusList.map((item, index) => ({
      label: item,
      value: index + 1,
    })),
};
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.projectId;
  else current.value = "";
}
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <el-tabs v-model="queryForm.type" @tab-change="fetchData">
        <el-tab-pane label="外包项目" :name="2">
          <FormSearch
            v-if="queryForm.type === 2"
            :formSearchList="formSearchList"
            :formSearchName="formSearchName"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="queryForm"
            :formOption="formOption"
          />
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel> </FormLeftPanel>
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
            <el-table-column align="left" type="selection" />
            <el-table-column
              v-if="checkList.includes('projectStatus')"
              show-overflow-tooltip
              prop="projectStatus"
              align="left"
              label="状态"
            >
              <template #default="{ row }">
                <span class="tableBig">
                  <el-text v-if="row.projectStatus === 1" type="primary">
                    进行中(在线)</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 2" type="warning">
                    已完成(审核通过)</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 3" type="info">
                    离线</el-text
                  >
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantName')"
              show-overflow-tooltip
              prop="tenantName"
              align="left"
              label="租户名称"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.tenantName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantId')"
              show-overflow-tooltip
              prop="tenantId"
              align="left"
              label="租户ID"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">{{ row.tenantId }}</div>
                  <copy
                    :content="row.tenantId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.tenantId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectName')"
              show-overflow-tooltip
              prop="projectName"
              align="left"
              label="项目名称"
            >
              <template #default="{ row }">
                <div class="tableBig oneLine">{{ row.projectName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectId')"
              show-overflow-tooltip
              prop="projectId"
              align="left"
              width="180"
              label="项目ID"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    <el-tooltip
                      effect="dark"
                      :content="row.projectId"
                      placement="top-start"
                    >
                      {{ row.projectId }}
                    </el-tooltip>

                    <!-- {{ row.projectId }} -->
                  </div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.projectId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('participationNumber')"
              show-overflow-tooltip
              prop="participationNumber"
              align="left"
              label="参数"
              width="300"
            >
              <template #default="{ row }">
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  type="danger"
                  >参与: {{ row.participationNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  type="success"
                  >完成: {{ row.doneNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(255, 172, 84)"
                  class="oneLine"
                  type="warning"
                  >配额: {{ row.num || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(170, 170, 170)"
                  class="oneLine"
                  type="info"
                  >限量: {{ row.limitedQuantity || "-" }}</el-text
                >
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              label="操作"
              width="170"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="editData(row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
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
        </el-tab-pane>
        <el-tab-pane label="接收项目" :name="1">
          <FormSearch
            v-if="queryForm.type === 1"
            :formSearchList="formSearchList"
            :formSearchName="formSearchName"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="queryForm"
            :formOption="formOption"
          />
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel> </FormLeftPanel>
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
            @current-change="handleCurrentChange"
          >
            <el-table-column align="left" type="selection" />
            <el-table-column
              v-if="checkList.includes('projectStatus')"
              show-overflow-tooltip
              prop="projectStatus"
              align="left"
              label="状态"
            >
              <template #default="{ row }">
                <span class="tableBig">{{
                  projectManagementOutsourceStore.projectStatusList[
                    row.projectStatus - 1
                  ]
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantName')"
              show-overflow-tooltip
              prop="tenantName"
              align="left"
              label="租户名称"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.tenantName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantId')"
              show-overflow-tooltip
              prop="tenantId"
              align="left"
              label="租户ID"
              ><template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    {{ row.tenantId }}
                  </div>
                  <copy
                    :content="row.tenantId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.tenantId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectName')"
              show-overflow-tooltip
              prop="projectName"
              align="left"
              label="项目名称"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.projectName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectId')"
              show-overflow-tooltip
              prop="projectId"
              align="left"
              width="180"
              label="项目ID"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    <el-tooltip
                      effect="dark"
                      :content="row.projectId"
                      placement="top-start"
                    >
                      {{ row.projectId }}
                    </el-tooltip>
                    <!-- {{ row.projectId }} -->
                  </div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.projectId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('participationNumber')"
              show-overflow-tooltip
              prop="participationNumber"
              align="left"
              label="参数"
              width="300"
            >
              <template #default="{ row }">
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  type="danger"
                  >参与: {{ row.participationNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  type="success"
                  >完成: {{ row.doneNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(255, 172, 84)"
                  class="oneLine"
                  type="warning"
                  >配额: {{ row.num || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(170, 170, 170)"
                  class="oneLine"
                  type="info"
                  >限量: {{ row.limitedQuantity || "-" }}</el-text
                >
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              fixed="right"
              label="操作"
              width="170"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="editData(row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
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
        </el-tab-pane>
      </el-tabs>

      <edit ref="editRef" @fetch-data="fetchData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.projectId {
  font-size: 14px;
}

.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
}
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

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  > div:nth-of-type(1) {
    width: calc(100% - 25px);
    flex-shrink: 0;
  }

  .edit {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}
</style>
