<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/user_subVip";
defineOptions({
  name: "UserSubVipIndex",
});

const { pagination, onSizeChange, onCurrentChange } = usePagination(); // 分页

const listLoading = ref<boolean>(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref<string>(); // 表格-选中行
const checkList = ref<any>([]); // 表格-展示的列
const border = ref<boolean>(true); // 表格控件-是否展示边框
const stripe = ref<boolean>(true); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref([
  // 表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]);
const queryForm = ref<any>({
  memberChildId: "", //子会员ID
  memberNickname: "", //子会员名称
  memberName: "", //子会员姓名
  tenantSupplierId: "", //供应商ID
  b2bStatus: "", //B2B
  memberChildGroupName: "", //所属组
  memberChildStatus: "", //子会员状态
  createUserName: "", //创建人
  time: [], //创建日期
});
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size);
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  // fetchData();
  onCurrentChange(page);
}
// 分页 后端(刘):这块不好做分页，所有返回全部数据，前端做分页
const DataList = computed(() => {
  const beginTime: any = queryForm.value.time[0]
    ? new Date(queryForm.value.time[0]).getTime()
    : "";
  const endTime: any = queryForm.value.time[1]
    ? new Date(queryForm.value.time[1]).getTime()
    : "";

  const searchList = list.value.filter((item: any) => {
    const rowTime: any = new Date(item.createTime).getTime();
    if (
      (String(item.memberChildId).includes(queryForm.value.memberChildId) ||
        String(item.memberNickname).includes(queryForm.value.memberChildId)) &&
      String(item.memberName).includes(queryForm.value.memberName) &&
      String(item.tenantSupplierId).includes(
        queryForm.value.tenantSupplierId
      ) &&
      (item.b2bStatus === queryForm.value.b2bStatus ||
        !queryForm.value.b2bStatus) &&
      String(item.memberChildGroupName).includes(
        queryForm.value.memberChildGroupName
      ) &&
      (item.memberChildStatus === queryForm.value.memberChildStatus ||
        !queryForm.value.memberChildStatus) &&
      String(item.createUserName).includes(queryForm.value.createUserName) &&
      ((beginTime <= rowTime && rowTime <= endTime) ||
        !beginTime ||
        !endTime ||
        !rowTime)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return searchList.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});
// 重置请求
function queryData() {
  pagination.value.page = 1;
  Object.assign(queryForm.value, {
    memberChildId: "", //子会员ID
    memberNickname: "", //子会员名称
    memberName: "", //子会员姓名
    tenantSupplierId: "", //供应商ID
    b2bStatus: "", //B2B
    memberChildGroupName: "", //所属组
    memberChildStatus: "", //子会员状态
    createUserName: "", //创建人
    time: [], //创建日期
  });
  fetchData();
}

// 请求
async function fetchData() {
  listLoading.value = true;
  const res = await api.list({});
  list.value = res.data.getMemberChildInfoList;
  pagination.value.total = res.data.getMemberChildInfoList.length;
  listLoading.value = false;
}
// 表格-单选框
function setSelectRows(val: string | undefined) {
  selectRows.value = val;
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
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm"
            size="default"
            label-width="180px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberChildId"
                clearable
                :inline="false"
                placeholder="子会员ID、子会员名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberName"
                clearable
                :inline="false"
                placeholder="子会员姓名"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.tenantSupplierId"
                clearable
                :inline="false"
                placeholder="供应商ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.memberChildStatus"
                clearable
                placeholder="子会员状态"
              >
                <el-option label="启用" :value="2" />
                <el-option label="禁用" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.b2bStatus"
                clearable
                placeholder="B2B"
              >
                <el-option label="开启" :value="2" />
                <el-option label="关闭" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-date-picker
                v-model="queryForm.time"
                type="datetimerange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                value-format="YYYY-MM-DD hh:mm:ss"
                size="default"
                style="width: 192px"
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
              <ElButton @click="queryData">
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
        <FormLeftPanel />
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
        :data="DataList"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column
          show-overflow-tooltip
          width="80"
          align="center"
          type="index"
          label="序号"
        /> -->
        <el-table-column
          v-if="checkList.includes('a')"
          align="center"
          prop="memberChildId"
          show-overflow-tooltip
          label="子会员ID"
        />
        <el-table-column
          v-if="checkList.includes('a')"
          align="center"
          prop="memberNickname"
          show-overflow-tooltip
          label="子会员名称"
        />
        <el-table-column
          align="center"
          prop="memberName"
          show-overflow-tooltip
          label="子会员姓名"
        >
          <template #default="{ row }">
            {{ row.memberName ? row.memberName : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="tenantSupplierId"
          show-overflow-tooltip
          label="供应商ID"
        />
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="b2bStatus"
          label="B2B"
        >
          <template #default="{ row }">
            {{ row.b2bStatus === 1 ? "关闭" : "开启" }}
          </template>
        </ElTableColumn>
        <el-table-column
          align="center"
          prop="memberChildGroupName"
          show-overflow-tooltip
          label="所属组"
          ><template #default="{ row }">
            {{ row.memberChildGroupName ? row.memberChildGroupName : "-" }}
          </template>
        </el-table-column>
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="memberChildStatus"
          label="子会员状态"
        >
          <template #default="{ row }">
            {{ row.memberChildStatus === 1 ? "禁用" : "启用" }}
          </template>
        </ElTableColumn>
        <el-table-column
          align="center"
          prop="createUserName"
          show-overflow-tooltip
          label="创建人"
          ><template #default="{ row }">
            {{ row.createUserName ? row.createUserName : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          show-overflow-tooltip
          label="创建日期"
        />
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
