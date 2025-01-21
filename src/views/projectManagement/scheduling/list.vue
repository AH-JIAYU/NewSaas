<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import edit from "./components/Edit/index.vue";
import api from "@/api/modules/projectManagement_scheduling";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n";
defineOptions({
  name: "scheduling",
});
// 时间
const { format } = useTimeago();
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const tableSortRef = ref("");
// 国际化
const { t } = useI18n();
// loading加载
const listLoading = ref<boolean>(false);
const border = ref(false);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-scheduling"); // 表单排序name
const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref<any>([
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.type")),
    prop: "dispatchType",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.projectID")),
    prop: "projectId",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.projectName")),
    prop: "projectName",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.projectPrice")),
    prop: "moneyPrice",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.specifiedPrice")),
    prop: "doMoneyPrice",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.designatedSupplier")),
    prop: "Supplier",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.designatedDepartment")),
    prop: "group",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("scheduling.creationTime")),
    prop: "createTime",
  },
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
const current = ref<any>(); //表格当前选中
function handleCurrentChange(val: any) {
  if (val) current.value = val.projectId;
  else current.value = "";
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
// 列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const res = await api.list(params);
    list.value = res.data.getProjectDispatchInfoList;
    pagination.value.total = res.data.total;
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
      modelName: "projectId",
      placeholder: computed(() => t("scheduling.projectID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: computed(() => t("scheduling.projectName")),
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "dispatchType",
      placeholder: computed(() => t("scheduling.allTypes")),
      option: "dispatchType",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});

const formOption = {
  dispatchType: () => [
    { label: computed(() => t("scheduling.assignmentOff")), value: 1 },
    { label: computed(() => t("scheduling.specifiedPrice")), value: 2 },
  ],
};
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="queryForm"
        :formOption="formOption"
      />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button
            type="primary"
            size="default"
            @click="addData"
            v-auth="'scheduling-get-addProjectDispatch'"
          >
            {{ t("scheduling.add") }}
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click="">
            {{ t("scheduling.export") }}
          </el-button>
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
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column
          v-if="checkList.includes('dispatchType')"
          show-overflow-tooltip
          prop="dispatchType"
          align="left"
          :label="t('scheduling.type')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <el-text
                v-if="row.dispatchType === 1"
                type="primary"
                style="font-weight: 700"
                >{{ t("scheduling.assignmentOff") }}</el-text
              >
              <el-text v-else type="danger" style="font-weight: 700">{{
                t("scheduling.specifiedPrice")
              }}</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectName')"
          show-overflow-tooltip
          prop="projectName"
          align="left"
          :label="t('scheduling.project')"
        >
          <template #default="{ row }">
            <div class="tableBig oneLine">
              {{ row.projectName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          show-overflow-tooltip
          prop="projectId"
          align="left"
          :label="t('scheduling.projectID')"
          width="200"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall projectId">
              <div class="id oneLine">
                <el-tooltip
                  effect="dark"
                  :content="row.projectId"
                  placement="top-start"
                >
                  {{ row.projectId }}
                </el-tooltip>

                <!-- ID: {{ row.projectId }} -->
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
          v-if="checkList.includes('moneyPrice')"
          show-overflow-tooltip
          prop="moneyPrice"
          align="left"
          :label="t('scheduling.projectPrice')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.moneyPrice || 0 }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          prop="doMoneyPrice"
          align="left"
          :label="t('scheduling.specifiedPrice')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.doMoneyPrice || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('Supplier')"
          show-overflow-tooltip
          prop="groupSupplierId"
          align="left"
          :label="t('scheduling.targetAssignment')"
          width="400"
        >
          <template #default="{ row }">
            <div class="specifyTheTarget">
              <el-button
                style="width: 46px; background-color: #ffac54"
                v-if="row.dataType == 2"
                type="warning"
                size="small"
                class="p-1"
                >{{
                  row.getGroupSupplierIdNameInfoList.length > 1
                    ? "×" + row.getGroupSupplierIdNameInfoList.length
                    : t("scheduling.department")
                }}</el-button
              >
              <el-button
                style="width: 46px"
                v-else-if="row.dataType === 1"
                type="warning"
                size="small"
                class="p-1"
                >{{
                  row.getGroupSupplierIdNameInfoList.length > 1
                    ? "×" + row.getGroupSupplierIdNameInfoList.length
                    : t("scheduling.supplier")
                }}</el-button
              >
              <b class="tableBig">{{
                row.getGroupSupplierIdNameInfoList[0].groupSupplierName
              }}</b>
              <span class="id tableSmall" style="font-size: 14px">
                {{
                  row.getGroupSupplierIdNameInfoList[0].groupSupplierId
                }}</span
              >
              <copy
                :content="row.getGroupSupplierIdNameInfoList[0].groupSupplierId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.projectId === current,
                }"
              />

              <!-- <copy class="copy" :content="row.getGroupSupplierIdNameInfoList[0].groupSupplierId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          show-overflow-tooltip
          prop="createTime"
          align="left"
          :label="t('scheduling.create')"
          ><template #default="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
              <el-tag effect="plain" type="info">{{
                format(row.createTime)
              }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          fixed="right"
          :label="t('scheduling.controls')"
          width="170"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              plain
              size="small"
              @click="editData(row)"
              v-auth="'scheduling-update-updateProjectDispatch'"
            >
              {{ t("scheduling.edit") }}
            </el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="onDel(row)"
              v-auth="'scheduling-delete-deleteProjectDispatch'"
            >
              {{ t("scheduling.delete") }}
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
      <edit ref="editRef" @fetch-data="fetchData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.copyId .current {
  display: block !important;
}

.copyId.projectId {
  font-size: 0.875rem;
}

.rowCopy {
  width: 20px;
  display: none;
}

.copyId .current {
  display: block !important;
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

.specifyTheTarget {
  // @extend .flex-c;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  .id,
  b {
    margin: 0 4px;
  }

  .copy {
    width: 20px !important;
  }
}
</style>
