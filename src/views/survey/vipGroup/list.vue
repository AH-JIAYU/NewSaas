<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import vipGroupEdit from "./components/vipGroupEdit/index.vue";
import api from "@/api/modules/survey_vipGroup";

defineOptions({
  name: "SurveyVipGroupList",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false);

const list = ref<Array<Object>>([]); // 列表
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 添加|编辑 组件ref
const checkRef = ref(); // 查看 组件ref
const border = ref<any>(true); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref<Array<Object>>([
  // 表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
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

// 添加
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
// 查看
function handleCheck(row: any) {
  checkRef.value.showEdit(row);
}
// 更改状态
function handleChange(fold: any) {
  if (selectRows.value.length > 0) {
    let msg = "";
    switch (fold) {
      case 0:
        msg = "该注册用户成为";
        break;
      case 1:
        msg = "启用该";
        break;
      case 2:
        msg = "禁用该";
        break;
    }
    ElMessageBox.confirm(`您确${msg}供应商吗?`, "确认信息")
      .then(() => {
        // apiManager.delete(row.id).then(() => {
        //   getDataList()
        //   ElMessage.success({
        //     message: '模拟删除成功',
        //     center: true,
        //   })
        // })
      })
      .catch(() => {});
  } else {
    ElMessage.error("您未选中任何行");
  }
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
  const { status } = await api.changestatus(params);
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // // 数据改变 在会员组中需要重新请求
  // surveyVipStore.NickNameList = null;
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
          <ElForm
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberGroupId"
                clearable
                :inline="false"
                placeholder="会员组ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberGroupName"
                clearable
                :inline="false"
                placeholder="会员组名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.groupLeaderMemberName"
                clearable
                :inline="false"
                placeholder="组长ID、组长名称"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.groupStatus"
                clearable
                placeholder="会员组状态"
              >
                <el-option label="关闭" :value="1" />
                <el-option label="开启" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="queryForm.time"
                type="datetimerange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                value-format="YYYY-MM-DD hh:mm:ss"
                size="default"
              />
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
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
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
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        v-loading="listLoading"
        :border="border"
        :data="list"
        :size="lineHeight"
        :stripe="stripe"
      >
        <el-table-column
          v-if="checkList.includes('a')"
          align="center"
          prop="memberGroupId"
          show-overflow-tooltip
          label="会员组ID"
        />
        <el-table-column
          align="center"
          prop="memberGroupName"
          show-overflow-tooltip
          label="会员组名称"
        />
        <el-table-column
          align="center"
          prop="groupLeaderMemberName"
          show-overflow-tooltip
          label="组长名称(ID)"
        >
          <template #default="{ row }">
            {{ row.groupLeaderMemberName ? row.groupLeaderMemberName : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="memberNumber"
          show-overflow-tooltip
          label="成员"
        />
        <el-table-column
          align="center"
          prop="projectNumber"
          show-overflow-tooltip
          label="项目数"
        >
          <template #default="{ row }">
            <el-link type="primary" @click="handleCheck(row)">{{
              row.projectNumber
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          show-overflow-tooltip
          label="创建日期"
        />
        <el-table-column
          align="center"
          prop="groupStatus"
          show-overflow-tooltip
          label="组状态"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.groupStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              inactive-text="禁用"
              active-text="启用"
              @change="changeState($event, row.memberGroupId)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="i"
          label="操作"
          show-overflow-tooltip
          width="180"
        >
          <template #default="{ row }">
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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
    </PageMain>
    <vipGroupEdit ref="editRef" @fetch-data="queryData" />
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
</style>
