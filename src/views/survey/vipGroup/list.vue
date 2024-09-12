<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import vipGroupEdit from "./components/vipGroupEdit/index.vue";
import vipGroupDetail from "./components/vipGroupDetail/index.vue";
import api from "@/api/modules/survey_vipGroup";
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "vipGroup",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 新增|编辑 组件ref
const checkRef = ref(); // 查看 组件ref
const border = ref<any>(true); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref<Array<Object>>([
  // 表格控件-展示列
  {
    label: "组状态",
    prop: "groupStatus",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "会员组ID",
    prop: "memberGroupId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "会员组名称",
    prop: "memberGroupName",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "组长名称(ID)",
    prop: "groupLeaderMemberName",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "成员",
    prop: "memberNumber",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "项目数",
    prop: "projectNumber",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "创建时间",
    prop: "createTime",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]);

// 请求接口携带参数
const queryForm = reactive<any>({
  memberGroupId: "", //	会员组id
  memberGroupName: "", //	会员组名称
  groupLeaderMemberName: "", //组长id,名称
  groupStatus: "", //	组状态:1:关闭 2:开启
  time: [], // 时间日期选择器
});

// 新增
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
// 查看项目数
function handleCheck(row: any) {
  checkRef.value.showEdit(row);
}
// 重置请求
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const params: any = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = queryForm.time[0] || "";
      params.endTime = queryForm.time[1] || "";
    }
    const { data } = await api.list(params);
    list.value = data.getMemberGroupInfoList;
    pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    memberGroupId: "",
    memberGroupName: "",
    groupLeaderMemberName: "",
    groupStatus: "",
    time: [],
  });
  fetchData();
}
// 切换状态
async function changeState(state: any, id: string) {
  const params: any = {
    memberGroupId: id,
    groupStatus: state,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在会员中需要重新请求
  surveyVipGroupStore.GroupNameList = null;
  queryData();
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model.trim="queryForm.memberGroupId" clearable :inline="false" placeholder="会员组ID"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model.trim="queryForm.memberGroupName" clearable :inline="false" placeholder="会员组名称"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model.trim="queryForm.groupLeaderMemberName" clearable :inline="false" placeholder="组长ID、组长名称"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="queryForm.groupStatus" clearable placeholder="会员组状态" @change="currentChange()">
                <el-option label="关闭" :value="1" />
                <el-option label="开启" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker v-model="queryForm.time" type="datetimerange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" value-format="YYYY-MM-DD hh:mm:ss" size="default"
                @change="currentChange()" />
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
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe">
        <el-table-column align="center" type="selection" />
        <el-table-column v-if="checkList.includes('groupStatus')" align="center" prop="groupStatus"
          show-overflow-tooltip label="组状态">
          <template #default="{ row }">
            <ElSwitch v-model="row.groupStatus" inline-prompt :inactive-value="1" :active-value="2" inactive-text="禁用"
              active-text="启用" @change="changeState($event, row.memberGroupId)" />
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberGroupId')" width="200" align="center" prop="memberGroupId"
          show-overflow-tooltip label="会员组ID">
          <template #default="{ row }">
            <div v-if="row.memberGroupId" class="hoverSvg">
              <p class="fineBom">ID：{{ row.memberGroupId }}</p>
              <span class="c-fx">
                <copy class="copy" :content="row.memberGroupId" />
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberGroupName')" align="center" prop="memberGroupName"
          show-overflow-tooltip label="会员组名称">
          <template #default="{ row }">
            <p class="weightColor">{{ row.memberGroupName ? row.memberGroupName : "-" }}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('groupLeaderMemberName')" align="center" prop="groupLeaderMemberName"
          show-overflow-tooltip label="组长名称(ID)">
          <template #default="{ row }">
            <div v-if="row.groupLeaderMemberName" class="hoverSvg">
              <div class="weightColor">{{ row.groupLeaderMemberName.split('/')[0] }}</div> &nbsp;&nbsp;
              <p class="fineBom">ID：{{ row.groupLeaderMemberName.split('/')[1] }}</p>
              <span class="c-fx">
                <copy class="copy" :content="row.groupLeaderMemberName.split('/')[1]" />
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberNumber')" width="100" align="center" prop="memberNumber"
          show-overflow-tooltip label="成员">
          <template #default="{ row }">
            <el-link type="primary">{{
    row.memberNumber ? row.memberNumber : 0
  }}</el-link>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectNumber')" width="100" align="center" prop="projectNumber"
          show-overflow-tooltip label="项目数">
          <template #default="{ row }">
            <el-link type="primary" @click="handleCheck(row)">{{
    row.projectNumber ? row.projectNumber : 0
  }}</el-link>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('createTime')" align="center" prop="createTime" show-overflow-tooltip
          label="创建时间">
          <template #header>
            <span class="headerIcon">
              <svg class="timeSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="none">
                <g id="Time (æ¶é´)">
                  <path id="Vector"
                    d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z"
                    fill="#409EFF" />
                  <path id="Vector_2" d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              创建时间
            </span>
          </template>
          <template #default="{ row }">
            <el-tag effect="plain" type="info">{{
    format(row.createTime)
  }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="i" label="操作" fixed="right" show-overflow-tooltip width="180">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <vipGroupEdit ref="editRef" @fetch-data="queryData" />
    <vipGroupDetail ref="checkRef" @fetch-data="queryData" />
  </div>
</template>

<style scoped lang="scss">
// 高度自适应
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

// 筛选
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

.fineBom {
  text-align: left !important;
  font-size: .75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hoverSvg {
  display: flex;
  align-items: center;
}

.copy {
  display: flex;
  align-items: center;
  width: 20px;
}

.svg {
  width: .875rem;
  height: .875rem;
  margin-left: .3125rem;
}

.weightColor {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep {
  tbody {
    color: #333;
  }
}
.headerIcon {
  display: flex;
  align-items: center;
  justify-content: center;

  .timeSvg {
    margin-right: 4px;
  }
}

.c-fx {
  display: flex;
  align-items: center;
  justify-content: center;
}
.copySvg {
  width: 100%;
  height: 100%;
}
</style>
