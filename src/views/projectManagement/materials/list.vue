<script setup lang="ts">
import { reactive, ref } from "vue";
import deletes from "./components/Delete/index.vue";
import detail from "./components/Details/index.vue";
import api from "@/api/modules/projectManagement_materials";

defineOptions({
  name: "materials",
});

// 时间
const { format } = useTimeago();
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
const border = ref(true);
// 获取组件变量
const deleteRef = ref();
const detailsRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);

const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const columns = ref<any>([
  { label: "会员ID", prop: "memberChildId", sotrtable: true, checked: true },
  {
    label: "会员名称",
    prop: "memberChildName",
    sotrtable: true,
    checked: true,
  },
  {
    label: "会员组ID",
    prop: "memberChildGroupId",
    sotrtable: true,
    checked: true,
  },
  { label: "项目ID", prop: "projectId", sotrtable: true, checked: true },
  { label: "项目名称", prop: "projectName", sotrtable: true, checked: true },
  {
    label: "客户简称/标识",
    prop: "customerIdentification",
    sotrtable: true,
    checked: true,
  },
  { label: "说明", prop: "instructions", sotrtable: true, checked: true },
  { label: "创建时间", prop: "createTime", sotrtable: true, checked: true },
]);
// 查询参数
const queryForm = ref<any>({
  type: 1, //	1:会员素材 2:子会员素材
  memberChildId: "", //子会员Id/会员id
  supplierId: "", //	供应商id
  projectId: "", //	项目id
  projectName: "", //	项目名称
});
const list = ref<any>([]);
// 详情
function projectDetails(row: any) {
  if (!selectRows.value.length) {
    detailsRef.value.showEdit(row);
  }
}
// 删除数据
function deleteData(row: any) {
  // if (!selectRows.value.length)
  //   return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  deleteRef.value.showEdit(row);
}

// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
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
  Object.assign(queryForm.value, {
    // type: 1, //	1:会员素材 2:子会员素材
    memberChildId: "", //子会员Id/会员id
    supplierId: "", //	供应商id
    projectId: "", //	项目id
    projectName: "", //	项目名称
  });
  fetchData();
}
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm.value,
  };
  const res = await api.list(params);
  list.value = res.data.projectMaterialInfoList;
  pagination.value.total = res.data.total;
  listLoading.value = false;
}
const getDataChange = () => {
  if (queryForm.value.type === 1) {
    checkList.value = []
    columns.value = [
      {
        label: "会员ID",
        prop: "memberChildId",
        sotrtable: true,
        checked: true,
      },
      {
        label: "会员名称",
        prop: "memberChildName",
        sotrtable: true,
        checked: true,
      },
      {
        label: "会员组ID",
        prop: "memberChildGroupId",
        sotrtable: true,
        checked: true,
      },
      { label: "项目ID", prop: "projectId", sotrtable: true, checked: true },
      {
        label: "项目名称",
        prop: "projectName",
        sotrtable: true,
        checked: true,
      },
      {
        label: "客户简称/标识",
        prop: "customerIdentification",
        sotrtable: true,
        checked: true,
      },
      { label: "说明", prop: "instructions", sotrtable: true, checked: true },
      { label: "创建时间", prop: "createTime", sotrtable: true, checked: true },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        checkList.value.push(item.prop);
      }
    });
    fetchData();
  } else {
    checkList.value = []
    columns.value = [
      {
        label: "子会员ID",
        prop: "memberChildId",
        sotrtable: true,
        checked: true,
      },
      {
        label: "子会员名称",
        prop: "memberChildName",
        sotrtable: true,
        checked: true,
      },
      {
        label: "子会员组ID",
        prop: "memberChildGroupId",
        sotrtable: true,
        checked: true,
      },
      { label: "项目ID", prop: "projectId", sotrtable: true, checked: true },
      {
        label: "项目名称",
        prop: "projectName",
        sotrtable: true,
        checked: true,
      },
      {
        label: "客户简称/标识",
        prop: "customerIdentification",
        sotrtable: true,
        checked: true,
      },
      { label: "说明", prop: "instructions", sotrtable: true, checked: true },
      { label: "创建时间", prop: "createTime", sotrtable: true, checked: true },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        checkList.value.push(item.prop);
      }
    });
    fetchData();
  }
};
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
      <el-tabs
        v-model="queryForm.type"
        @tab-change="getDataChange"
      >
        <el-tab-pane label="会员素材" :name="1">
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
                    v-model="queryForm.memberChildId"
                    clearable
                    placeholder="会员ID"
                  />
                </el-form-item>
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
                  <ElButton link @click="toggle" disabled>
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
            <FormLeftPanel />
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
            v-loading="false"
            style="margin-top: 10px"
            row-key="id"
            :data="list"
            :border="border"
            :size="lineHeight"
            :stripe="stripe"
            @selection-change="setSelectRows"
          >
            <el-table-column align="center" type="selection" />
            <el-table-column
              v-if="checkList.includes('memberChildId')"
              show-overflow-tooltip
              prop="memberChildId"
              align="center"
              label="会员ID"
            />
            <el-table-column
              v-if="checkList.includes('memberChildName')"
              show-overflow-tooltip
              prop="memberChildName"
              align="center"
              label="会员名称"
            />
            <el-table-column
              v-if="checkList.includes('memberChildGroupId')"
              show-overflow-tooltip
              prop="memberChildGroupId"
              align="center"
              label="会员组ID"
            />
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
              v-if="checkList.includes('customerIdentification')"
              show-overflow-tooltip
              prop="customerIdentification"
              align="center"
              label="客户简称/标识"
            />
            <el-table-column
              v-if="checkList.includes('instructions')"
              show-overflow-tooltip
              prop="instructions"
              align="center"
              label="说明"
            />
            <el-table-column
              v-if="checkList.includes('createTime')"
              show-overflow-tooltip
              prop="createTime"
              align="center"
              label="创建时间"
              ><template #default="{ row }">
                <el-tag effect="plain" type="info">{{
                  format(row.createTime)
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="240"
            >
              <template #default="{ row }">
                <ElSpace>
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="projectDetails(row)"
                  >
                    查看
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="deleteData(row)"
                  >
                    删除
                  </el-button>
                </ElSpace>
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
        </el-tab-pane>
        <el-tab-pane label="子会员素材" :name="2">
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
                    v-model="queryForm.memberChildId"
                    clearable
                    placeholder="会员ID"
                  />
                </el-form-item>
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
                  <ElButton link @click="toggle" disabled>
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
            <FormLeftPanel />
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
            v-loading="false"
            style="margin-top: 10px"
            row-key="id"
            :data="list"
            :border="border"
            :size="lineHeight"
            :stripe="stripe"
            @selection-change="setSelectRows"
          >
            <el-table-column type="selection" />
            <el-table-column
              v-if="checkList.includes('memberChildId')"
              show-overflow-tooltip
              prop="memberChildId"
              align="center"
              label="会员ID"
            />
            <el-table-column
              v-if="checkList.includes('memberChildName')"
              show-overflow-tooltip
              prop="memberChildName"
              align="center"
              label="会员名称"
            />
            <el-table-column
              v-if="checkList.includes('memberChildGroupId')"
              show-overflow-tooltip
              prop="memberChildGroupId"
              align="center"
              label="会员组ID"
            />
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
              v-if="checkList.includes('customerIdentification')"
              show-overflow-tooltip
              prop="customerIdentification"
              align="center"
              label="客户简称/标识"
            />
            <el-table-column
              v-if="checkList.includes('instructions')"
              show-overflow-tooltip
              prop="instructions"
              align="center"
              label="说明"
            />
            <el-table-column
              v-if="checkList.includes('createTime')"
              show-overflow-tooltip
              prop="createTime"
              align="center"
              label="创建时间"
              ><template #default="{ row }">
                <el-tag effect="plain" type="info">{{
                  format(row.createTime)
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="240"
            >
              <template #default="{ row }">
                <ElSpace>
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="projectDetails(row)"
                  >
                    查看
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="deleteData(row)"
                  >
                    删除
                  </el-button>
                </ElSpace>
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
        </el-tab-pane>
      </el-tabs>
      <deletes ref="deleteRef" />
      <detail ref="detailsRef" @fetchData="fetchData" />
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
