<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import Detail from "./components/Detail/index.vue";
import api from "@/api/modules/alter";
import apiUser from "@/api/modules/configuration_manager";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "alter",
});
// 时间
const { format } = useTimeago();
// 分页
const { pagination, onSizeChange, onCurrentChange } = usePagination();
// 分页
const tableSortRef = ref("");
// 用户数组
const userList = ref<any>([]);
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
const detailRef = ref();
// 右侧工具栏配置变量
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
const checkList = ref<any>([]);
const border = ref(false);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-alter')// 表单排序name
const statusType = [
  { label: "完成", value: "1,0" },
  { label: "审核通过", value: "1,7" },
  { label: "审核失败", value: "1,8" },
  { label: "数据冻结", value: "1,9" },
  { label: "被甄别", value: "2,null" },
  { label: "配额满", value: "3,null" },
];
const columns = ref<any>([
  { prop: "projectClickId", label: "点击ID", sortable: true, checked: true },
  { prop: "beforeType", label: "变更前", sortable: true, checked: true },
  { prop: "afterType", label: "变更后", sortable: true, checked: true },
  { prop: "createTime", label: "创建时间", sortable: true, checked: true },
  { prop: "remark", label: "备注", sortable: true, checked: true },
  { prop: "createUserId", label: "操作人", sortable: true, checked: true },
]);
// 查询参数
const queryForm = reactive<any>({
  // 页数
  page: 1,
  // 条数
  limit: 10,
  // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
  type: null,
  // 操作人名称
  createUserName: "",
  // 1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  surveyType: null,
  // 副状态
  viceType: null,
});
const list = ref<any>([]);
// 新增
function addData() {
  editRef.value.showEdit();
}
// 右侧工具方法
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
    type: null,
    // 操作人id
    createUserName: "",
    // 1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
    surveyType: null,
    // 副状态
    viceType: null,
  });
  fetchData();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    queryForm.limit = size;
    fetchData();
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    queryForm.page = page;
    fetchData();
  });
}
// 获取列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    if (queryForm.type) {
      const type = queryForm.type.split(',')
      queryForm.surveyType = type[0]
      queryForm.viceType = type[1]
    }
    const { data } = await api.list(queryForm);
    list.value = data.tenantUpdateRecordVOBuilders;
    pagination.value.total = +data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
onMounted(async () => {
  const { data } = await apiUser.getTenantStaffListData({});
  userList.value = data;
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'createUserName', placeholder: '操作人' },
    {
      index: 2, show: true, type: 'select', modelName: 'type', placeholder: '变更状态', option: 'type', optionLabel: 'label', optionValue: 'value'
    },
  ];
});
const formOption = {
  type: () => statusType.map((item: any) => ({ label: item.label, value: item.value }))
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>

<template>
  <div v-loading="listLoading" :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="queryForm" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button style="margin-right: 10px" type="primary" size="default" @click="addData">
            新增
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
        :border="border" :size="lineHeight" :stripe="stripe" @selection-change="setSelectRows"           highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column align="left" type="selection" />
        <!-- <el-table-column type="index" align="left" label="序号" width="55" /> -->
        <el-table-column v-if="checkList.includes('projectClickId')" prop="projectClickId" show-overflow-tooltip
          align="left" label="点击ID" >


          <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">{{ row.projectClickId }}</div>
                  <copy
                    :content="row.projectClickId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.id === current,
                    }"
                  />
                </div>
              </template>
        </el-table-column>

        <el-table-column v-if="checkList.includes('beforeType')" prop="beforeType" show-overflow-tooltip align="left"
          label="变更前">
          <template #default="{ row }">
            <el-text type="info" v-if="row.beforeSurveyType === 5 && row.beforeViceType === 0"
              class="mx-1">未完成</el-text>
            <el-text type="success" v-if="row.beforeSurveyType === 1 && row.beforeViceType === 0"
              class="mx-1">完成</el-text>
            <el-text type="success" v-if="row.beforeSurveyType === 1 && row.beforeViceType === 7"
              class="mx-1">审核通过</el-text>
            <el-text type="danger" v-if="row.beforeSurveyType === 1 && row.beforeViceType === 8"
              class="mx-1">审核失败</el-text>
            <el-text v-if="row.beforeSurveyType === 1 && row.beforeViceType === 9" class="mx-1">数据冻结</el-text>
            <el-text type="warning" v-if="row.beforeSurveyType === 2" class="mx-1">被甄别</el-text>
            <el-text type="primary" v-if="row.beforeSurveyType === 3" class="mx-1">配额满</el-text>
            <el-text type="success" v-if="row.beforeViceType === 13" class="mx-1">和解</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('afterType')" prop="afterType" show-overflow-tooltip align="left"
          label="变更后">
          <template #default="{ row }">
            <el-text type="success" v-if="row.afterSurveyType === 1 && row.afterViceType === 0"
              class="mx-1">完成</el-text>
            <el-text type="success" v-if="row.afterSurveyType === 1 && row.afterViceType === 7"
              class="mx-1">审核通过</el-text>
            <el-text type="danger" v-if="row.afterSurveyType === 1 && row.afterViceType === 8"
              class="mx-1">审核失败</el-text>
            <el-text v-if="row.afterSurveyType === 1 && row.afterViceType === 9" class="mx-1">数据冻结</el-text>
            <el-text type="warning" v-if="row.afterSurveyType === 2" class="mx-1">被甄别</el-text>
            <el-text type="primary" v-if="row.afterSurveyType === 3" class="mx-1">配额满</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('createTime')" prop="createTime" show-overflow-tooltip align="left"
          label="创建时间"><template #default="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
              <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('remark')" prop="remark" show-overflow-tooltip align="left"
          label="备注"><template #default="{ row }">
            {{ row.remark ? row.remark : "-" }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('createUserId')" prop="createUserId" show-overflow-tooltip
          align="left" label="操作人"><template #default="{ row }">
            <div v-for="item in userList" :key="item.id">
              <el-text v-if="item.id === row.createUserId">
                {{ item.userName }}</el-text>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip align="left" label="操作">
          <template #default="{ row }">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="detailData(row)"
            >
              详情
            </ElButton>
          </template>
        </el-table-column> -->
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
      <Edit @success="fetchData" ref="editRef" />
      <Detail ref="detailRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.projectId {
  font-size: 0.875rem;
}
.copyId .current {
  display: block !important;
}
.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
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
:deep {
  tbody {
    color: #333333;
    // font-weight: 700;
  }
}
</style>
