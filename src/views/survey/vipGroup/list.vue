<script setup lang="ts">
defineOptions({
  name: "SurveyVipGroupList",
});
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import vipGroupEdit from "./components/vipGroupEdit/index.vue";
import vipGroupDetail from "./components/vipGroupDetail/index.vue";

const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页

const listLoading = ref(false);

const list = ref<Array<Object>>([]); //列表
const selectRows = ref<any>(); //表格-选中行
const editRef = ref(); //添加|编辑 组件ref
const checkRef = ref(); //查看 组件ref
const border = ref<any>(true); //表格控件-是否展示边框
const stripe = ref<any>(true); //表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); //表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); //表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref<Array<Object>>([
  //表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
    sortable: true,
    disableCheck: false, //不可更改
    checked: true, //默认展示
  },
]);

const queryForm = reactive<any>({
  //请求接口携带参数
  pageNo: 1,
  pageSize: 10,
  select: {},
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
  queryForm.pageNo = 1;
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
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
  list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  ];
  listLoading.value = false;
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    select: {},
  });
  fetchData()
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) checkList.value.push(item.prop);
  });
  fetchData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.select.id"
                clearable
                :inline="false"
                placeholder="会员组ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.select.id"
                clearable
                :inline="false"
                placeholder="会员组名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.select.id"
                clearable
                :inline="false"
                placeholder="组长ID、组长名称"
              />
            </el-form-item>
            <el-form-item label="" v-show="!fold">
              <el-select
                v-model="queryForm.select.default"
                clearable
                placeholder="会员组状态"
              >
                <el-option label="默认" value="true" />
                <el-option label="关闭" value="false" />
              </el-select>
            </el-form-item>
            <el-form-item label="" v-show="!fold">
              <el-select
                v-model="queryForm.select.default"
                clearable
                placeholder="接单授权"
              >
                <el-option label="默认" value="true" />
                <el-option label="关闭" value="false" />
              </el-select>
            </el-form-item>
            <el-form-item   v-show="!fold">
              <el-date-picker
                v-model="queryForm.select.time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                size="default"

                clear-icon="true"
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
                  <div class="i-grommet-icons:power-reset w-1em h-1em"></div>
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
        @selection-change="setSelectRows"
      >
        <el-table-column
          align="center"
          prop="a"
          show-overflow-tooltip
          type="selection"
        />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column
          v-if="checkList.includes('a')"
          align="center"
          prop="id"
          show-overflow-tooltip
          label="会员组ID"
        />
        <el-table-column
          align="center"
          prop="b"
          show-overflow-tooltip
          label="会员组名称"
        />
        <el-table-column
          align="center"
          prop="c"
          show-overflow-tooltip
          label="组长(ID)"
        />
        <el-table-column
          align="center"
          prop="d"
          show-overflow-tooltip
          label="成员"
        />
        <el-table-column
          align="center"
          prop="e"
          show-overflow-tooltip
          label="项目数"
        />
        <el-table-column
          align="center"
          prop="r"
          show-overflow-tooltip
          label="创建日期"
        />
        <el-table-column
          align="center"
          prop="a"
          show-overflow-tooltip
          label="组状态"
        >
        <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </el-table-column>
        <el-table-column
          align="center"
          prop="a"
          show-overflow-tooltip
          label="接单授权"
        >
        <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </el-table-column>
        <el-table-column
          align="center"
          prop="i"
          label="操作"
          show-overflow-tooltip
          width="180"
        >
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button size="small" plain type="primary" @click="handleCheck(row)">
              详情
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
    <vipGroupEdit ref="editRef" @fetch-data="fetchData" />
    <vipGroupDetail ref="checkRef" @fetch-data="fetchData" />
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
