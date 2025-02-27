<script setup lang="ts">
import { reactive, ref } from "vue";
import deletes from "./components/Delete/index.vue";
import detail from "./components/Details/index.vue";
import edit from "./components/Edit/index.vue";
import api from "@/api/modules/projectManagement_materials";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n";
import { translate } from "element-plus";

defineOptions({
  name: "materials",
});

// 国际化
const { t } = useI18n();
// 时间
const { format } = useTimeago();
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(false);
const border = ref(true);
// 获取组件变量
const deleteRef = ref();
const detailsRef = ref();
const editsRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-materials"); // 表单排序name
const lineHeight = ref<any>("default");
const stripe = ref(true);
const selectRows = ref<any>([]);
const columns = ref<any>([
  {
    label: computed(() => t("materials.vipId")),
    prop: "memberChildId",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.vipName")),
    prop: "memberChildName",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.vipGroupsId")),
    prop: "memberChildGroupId",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.projectID")),
    prop: "projectId",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.projectName")),
    prop: "projectName",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.instructions")),
    prop: "instructions",
    sotrtable: true,
    checked: true,
  },
  {
    label: computed(() => t("materials.createTime")),
    prop: "createTime",
    sotrtable: true,
    checked: true,
  },
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

const tabs1Current = ref<any>(); //表格当前选中
function handleTabs1CurrentChange(val: any) {
  if (val) tabs1Current.value = val.projectId;
  else tabs1Current.value = "";
}
const tabs2Current = ref<any>(); //表格当前选中
function handleTabs2CurrentChange(val: any) {
  if (val) tabs2Current.value = val.projectId;
  else tabs2Current.value = "";
}

// 详情
function projectDetails(row: any) {
  if (!selectRows.value.length) {
    detailsRef.value.showEdit(row);
  }
}
// 快捷编辑
function quickEdit(row: any) {
  editsRef.value.showEdit(row);
}

// 删除数据
function deleteData(row: any) {
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
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm.value,
    };
    const res = await api.list(params);
    list.value = res.data.projectMaterialInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
const getDataChange = () => {
  if (queryForm.value.type === 1) {
    checkList.value = [];
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
    checkList.value = [];
    columns.value = [
      {
        label: computed(() => t("materials.subVipId")),
        prop: "memberChildId",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.subVipName")),
        prop: "memberChildName",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.subVipGroupsId")),
        prop: "memberChildGroupId",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.projectID")),
        prop: "projectId",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.projectName")),
        prop: "projectName",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.instructions")),
        prop: "instructions",
        sotrtable: true,
        checked: true,
      },
      {
        label: computed(() => t("materials.createTime")),
        prop: "createTime",
        sotrtable: true,
        checked: true,
      },
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
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "memberChildId",
      placeholder: computed(() => t("materials.vipId")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("materials.projectID")),
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: computed(() => t("materials.projectName")),
    },
  ];
});
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <el-tabs v-model="queryForm.type" @tab-change="getDataChange">
        <el-tab-pane :label="t('materials.vipMaterial')" :name="1">
          <FormSearch
            :formSearchList="formSearchList"
            :formSearchName="formSearchName"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="queryForm"
          />

          <!-- <SearchBar :show-toggle="false">
            <template #default="{ fold, toggle }">
              <el-form :model="queryForm.select" size="default" label-width="100px" inline-message inline
                class="search-form">
                <el-form-item label="">
                  <el-input v-model="queryForm.memberChildId" clearable placeholder="会员ID"
                    @keydown.enter="currentChange()" />
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryForm.projectId" clearable placeholder="项目ID"
                    @keydown.enter="currentChange()" />
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryForm.projectName" clearable placeholder="项目名称"
                    @keydown.enter="currentChange()" />
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
                      <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                    </template>
  {{ fold ? "展开" : "收起" }}
</ElButton>
</ElFormItem>
</el-form>
</template>
</SearchBar> -->
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel />
            <FormRightPanel>
              <el-button size="default" @click="">
                {{ t("materials.export") }}
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
            @selection-change="setSelectRows"
            highlight-current-row
            @current-change="handleTabs1CurrentChange"
          >
            <!-- <el-table-column align="left" type="selection" /> -->
            <el-table-column
              v-if="checkList.includes('memberChildId')"
              show-overflow-tooltip
              prop="memberChildId"
              align="left"
              :label="t('materials.vipId')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    {{ row.memberChildId }}
                  </div>
                  <copy
                    :content="row.memberChildId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === tabs1Current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.memberChildId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('memberChildName')"
              show-overflow-tooltip
              prop="memberChildName"
              align="left"
              :label="t('materials.vipName')"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.memberChildName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectName')"
              show-overflow-tooltip
              prop="projectName"
              align="left"
              :label="t('materials.projectName')"
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
              :label="t('materials.projectID')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">{{ row.projectId }}</div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === tabs1Current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.projectId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('createTime')"
              show-overflow-tooltip
              prop="createTime"
              align="left"
              :label="t('materials.create')"
              ><template #default="{ row }">
                <el-tooltip :content="row.createTime" placement="top">
                  <el-tag effect="plain" type="info">{{
                    format(row.createTime)
                  }}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('instructions')"
              show-overflow-tooltip
              prop="instructions"
              align="left"
              :label="t('materials.instructions')"
            >
              <template #default="{ row }">
                <div class="flex-c fontC-System">
                  <div class="oneLine" style="width: calc(100% - 20px)">
                    {{ row.instructions ? row.instructions : "-" }}
                  </div>
                  <SvgIcon
                    v-auth="
                      'materials-update-updateProjectMaterialInstructions'
                    "
                    @click="quickEdit(row)"
                    :class="{
                      edit: 'edit',
                      current: row.projectId === tabs1Current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              :label="t('materials.control')"
              width="240"
            >
              <template #default="{ row }">
                <ElSpace>
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="projectDetails(row)"
                    v-auth="'materials-get-getMaterials-btn'"
                  >
                    {{ t("materials.view") }}
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="deleteData(row)"
                    v-auth="'materials-delete-deleteProjectMaterial'"
                  >
                    {{ t("materials.delete") }}
                  </el-button>
                </ElSpace>
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
        <el-tab-pane :label="t('materials.subVipMaterial')" :name="2">
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
                    :placeholder="t('materials.vipId')"
                  />
                </el-form-item>
                <el-form-item label="">
                  <el-input
                    v-model="queryForm.projectId"
                    clearable
                    :placeholder="t('materials.projectID')"
                  />
                </el-form-item>
                <el-form-item label="">
                  <el-input
                    v-model="queryForm.projectName"
                    clearable
                    :placeholder="t('materials.projectName')"
                  />
                </el-form-item>
                <ElFormItem>
                  <ElButton type="primary" @click="currentChange()">
                    <template #icon>
                      <SvgIcon name="i-ep:search" />
                    </template>
                    {{ t("materials.sift") }}
                  </ElButton>
                  <ElButton @click="onReset">
                    <template #icon>
                      <div class="i-grommet-icons:power-reset h-1em w-1em" />
                    </template>
                    {{ t("materials.reset") }}
                  </ElButton>
                  <ElButton link @click="toggle" disabled>
                    <template #icon>
                      <SvgIcon
                        :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                      />
                    </template>
                    {{ fold ? t("materials.expand") : t("materials.collapse") }}
                  </ElButton>
                </ElFormItem>
              </el-form>
            </template>
          </SearchBar>
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel />
            <FormRightPanel>
              <el-button size="default" @click="">
                {{ t("materials.export") }}
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
            @selection-change="setSelectRows"
            highlight-current-row
            @current-change="handleTabs2CurrentChange"
          >
            <!-- <el-table-column type="selection" /> -->

            <el-table-column
              v-if="checkList.includes('memberChildId')"
              show-overflow-tooltip
              prop="memberChildId"
              align="left"
              :label="t('materials.subVipId')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    {{ row.memberChildId }}
                  </div>
                  <copy
                    :content="row.memberChildId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === tabs2Current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.memberChildId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('memberChildName')"
              show-overflow-tooltip
              prop="memberChildName"
              align="left"
              :label="t('materials.subVipName')"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.memberChildName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectName')"
              show-overflow-tooltip
              prop="projectName"
              align="left"
              :label="t('materials.projectName')"
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
              :label="t('materials.projectID')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">{{ row.projectId }}</div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === tabs2Current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.projectId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('customerIdentification')"
              show-overflow-tooltip
              prop="customerIdentification"
              align="left"
              :label="t('materials.customer')"
            />
            <el-table-column
              v-if="checkList.includes('createTime')"
              show-overflow-tooltip
              prop="createTime"
              align="left"
              :label="t('materials.create')"
              ><template #default="{ row }">
                {{row.createTime}}
                <!-- <el-tooltip :content="row.createTime" placement="top">
                  <el-tag effect="plain" type="info">{{
                    format(row.createTime)
                  }}</el-tag>
                </el-tooltip> -->
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('instructions')"
              show-overflow-tooltip
              prop="instructions"
              align="left"
              :label="t('materials.instructions')"
            >
              <template #default="{ row }">
                <div class="flex-c fontC-System">
                  <div class="oneLine" style="width: calc(100% - 20px)">
                    {{ row.instructions ? row.instructions : "-" }}
                  </div>
                  <SvgIcon
                    v-auth="
                      'materials-update-updateProjectMaterialInstructions'
                    "
                    @click="quickEdit(row)"
                    :class="{
                      edit: 'edit',
                      current: row.projectId === tabs2Current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              :label="t('materials.control')"
              width="240"
            >
              <template #default="{ row }">
                <ElSpace>
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="projectDetails(row)"
                    v-auth="'materials-get-getMaterials-btn'"
                  >
                    查看
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="deleteData(row)"
                    v-auth="'materials-delete-deleteProjectMaterial'"
                  >
                    删除
                  </el-button>
                </ElSpace>
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
      <deletes ref="deleteRef" />
      <detail ref="detailsRef" @fetchData="fetchData" />
      <edit ref="editsRef" @fetchData="fetchData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.copyId .projectId {
  font-size: 0.875rem;
}
.copyId .current {
  display: block !important;
}
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
.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
}
.el-table__row:hover .edit {
  display: block;
}
</style>
