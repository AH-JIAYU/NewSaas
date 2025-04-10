<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/otherFunctions_screenLibrary";
import useSettingsStore from "@/store/modules/settings";
import Edit from "./components/Edit/index.vue";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useOtherFunctionsScreenLibraryStore from "@/store/modules/otherFunctions_screenLibrary"; //  问卷
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "screen_library",
});

//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 问卷
const otherFunctionsScreenLibraryStore = useOtherFunctionsScreenLibraryStore();
// 暂存
const stagedDataStore = useStagedDataStore();
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
//表单排序配置
const formSearchList = ref<any>()
// 表单排序name
const formSearchName = ref<string>('formSearch-screen_library')
// 定义数据
const data = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: "drawer" as "router" | "dialog" | "drawer",
  // 设计问卷
  formModeProps: {
    visible: false,
    id: "",
    details: "",
    title: "",
  },
  // 新增
  editProps: {
    id: "",
    countryId: "",
    visible: false,
    row: "",
  },
  // 搜索
  search: {
    countryId: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
  // 区域列表
  countryList: [],

  rules: {
    categoryName: [{ required: true, message: "请输入标题", trigger: "blur" }],
  },
});
const formRef = ref<any>();

// 获取列表
function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...getParams(),
      ...(data.value.search.countryId && {
        countryId: data.value.search.countryId,
      }),
    };
    api.list(params).then((res: any) => {
      if (res.data && res.status === 1) {
        data.value.dataList = res.data.getCountryListInfoList;
        //babOrB2c
        data.value.dataList.forEach((item:any) => {
          if(item.getProjectProblemCategoryInfoList.length !=0){
            item.getProjectProblemCategoryInfoList.forEach((item1:any) =>
            item1.babOrB2c =item1.babOrB2c ==null ? 1:item1.babOrB2c
          )
          }
        })
        pagination.value.total = res.data.getCountryListInfoList.length;
      }
      data.value.loading = false;
    });
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
}

// 分页 后端(刘):这块不好做分页，所有返回全部数据，前端做分页
const DataList = computed(() => {
  return data.value.dataList.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList());
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}

// 新增区域
function onCreate(row?: any) {
  data.value.editProps.id = "";
  data.value.editProps.countryId = row ? row.countryId : "";
  data.value.editProps.row = "";
  data.value.editProps.visible = true;
}

// 新增问卷/标题
function onCreateTiele(row: any) {
  row.getProjectProblemCategoryInfoList.unshift({
    categoryName: "",
    countryId: row.countryId,
    status: 1,
    isDefault: row.isDefault,
    type: "add",
    babOrB2c:row.babOrB2c,
  });
}

// 新增
function handleAdd(row: any, countryIndex: any, index: any) {
  formRef.value.validateField(
    `[${countryIndex}].getProjectProblemCategoryInfoList[${index}].categoryName`,
    async (valid: any) => {
      if (valid) {
        // 新增
        const { data, status } = await submitLoading(api.create(row));
        status === 1 &&
          ElMessage.success({
            message: "新增成功",
            center: true,
          });
        await getDataList();
      }
    }
  );
}

// 关闭新增那一行
function cancel(row: any, index: number) {
  const fIndex = data.value.dataList.findIndex(
    (item: any) => item.countryId === row.countryId
  );
  data.value.dataList[fIndex].getProjectProblemCategoryInfoList.splice(
    index,
    1
  );
}

// 修改默认
async function changeIsDefault(item: any) {
  const { status } = await submitLoading(api.update(item));
  status === 1 &&
    ElMessage.success({
      message: "修改「默认区域」成功",
      center: true,
    });
  getDataList();
  stagedDataStore.projectManagementList = null;
}

// 修改状态
async function changeStatus(item: any) {
  const { status } = await submitLoading(api.edit(item));
  status === 1 &&
    ElMessage.success({
      message: "修改「状态」成功",
      center: true,
    });
  getDataList();
  stagedDataStore.projectManagementList = null;
}

// 设计模板
function EditSurvey(row: any) {
  otherFunctionsScreenLibraryStore.countryId = row.countryId;
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "screenLibraryEdit",
        params: {
          id: row.projectProblemCategoryId,
        },
      });
    } else {
      router.push({
        name: "screenLibraryEdit",
        params: {
          id: row.projectProblemCategoryId,
        },
      });
    }
  } else {
    data.value.formModeProps.id = row.projectProblemCategoryId;
    data.value.formModeProps.details = JSON.stringify(row);
    data.value.formModeProps.title = row.categoryName;
    data.value.formModeProps.visible = true;
  }
}

// 删除区域
function onDelCountry(row: any) {
  ElMessageBox.confirm(`确认删除「${row.countryId}」吗？`, "确认信息")
    .then(async () => {
      const { status } = await submitLoading(
        api.delete({ countryId: row.countryId })
      );
      status === 1 &&
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      getDataList();
    })
    .catch(() => { });
  stagedDataStore.projectManagementList = null;
}

// 删除标题
function onDelProject(row: any) {
  ElMessageBox.confirm(`确认删除「${row.categoryName}」吗？`, "确认信息")
    .then(async () => {
      const { status } = await submitLoading(
        api.delete({ projectProblemCategoryId: row.projectProblemCategoryId })
      );
      status === 1 &&
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      getDataList();
    })
    .catch(() => { });
  stagedDataStore.projectManagementList = null;
}

// 重置数据
function onReset() {
  Object.assign(data.value.search, {
    // 区域id
    countryId: '',
  });
  getDataList();
}

onMounted(async () => {
  getDataList();
  data.value.countryList = await basicDictionaryStore.getCountry();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
  formSearchList.value = [
    { index: 1, show: true, type: 'select', modelName: 'countryId', placeholder: '区域', option: 'global', optionLabel: 'chineseName', optionValue: 'id' }
  ]
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="data.search" />
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate" v-auth="'screen_library-get-addProjectProblemCategory'">
          新增前置问卷库
        </ElButton>
      </ElSpace>
      <el-form ref="formRef" :rules="data.rules" :model="DataList">
        <ElTable v-loading="data.loading" class="my-4" :data="DataList" highlight-current-row height="100%"
          @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
          :default-expand-all="true">
          <el-table-column type="expand" width="55">
            <template #default="scopeCountry">
              <el-table :data="scopeCountry.row.getProjectProblemCategoryInfoList" highlight-current-row
                class="hide-table-header" height="100%" @sort-change="sortChange"
                @selection-change="data.batch.selectionDataList = $event">
                <el-table-column width="55" />
                <ElTableColumn prop="status" label="状态" align="left">
                  <template #default="scope">
                    <template v-if="scope.row.type === 'add'">
                      <ElSwitch v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt
                        active-text="启用" inactive-text="禁用" />
                    </template>
                    <template v-else>
                      <ElSwitch @change="changeStatus(scope.row)" v-model="scope.row.status" :active-value="1"
                        :inactive-value="2" inline-prompt active-text="启用" inactive-text="禁用" />
                    </template>
                  </template>
                </ElTableColumn>
                <el-table-column width="500" prop="categoryName" label="问卷名称" align="left">
                  <template #default="scope">
                    <template v-if="scope.row.type === 'add'">
                      <el-form-item
                        :prop="`[${scopeCountry.$index}].getProjectProblemCategoryInfoList[${scope.$index}].categoryName`"
                        :rules="data.rules.categoryName">
                        <el-input v-model="scope.row.categoryName"></el-input>
                      </el-form-item>
                    </template>
                    <template v-else>
                      <el-text class="fontC-System">{{ scope.row.categoryName }}</el-text>
                    </template>
                  </template>
                </el-table-column>
                <ElTableColumn prop="babOrB2c" label="类型" align="left">
                  <template #default="scope">
                    <template v-if="scope.row.type === 'add'">
                      <ElSwitch v-model="scope.row.babOrB2c" :active-value="2" :inactive-value="1" inline-prompt
                        active-text="B2C" inactive-text="B2B" />
                      </template>
                      <template v-else>
                        <ElSwitch v-model="scope.row.babOrB2c" :active-value="2" :inactive-value="1" inline-prompt
                        active-text="B2C" inactive-text="B2B" disabled/>
                      </template>
                  </template>

                </ElTableColumn>

                <ElTableColumn width="250" align="left" fixed="right" label="操作">
                  <template #default="scope">
                    <template v-if="scope.row.type === 'add'">
                      <ElButton v-auth="'screen_library-get-addProjectProblemCategory'" type="primary" size="small" plain @click="
    handleAdd(
      scope.row,
      scopeCountry.$index,
      scope.$index
    )
    ">
                        提交
                      </ElButton>
                      <ElButton type="danger" size="small" plain @click="cancel(scope.row, scope.$index)">
                        取消
                      </ElButton>
                    </template>
                    <template v-else>
                      <ElButton type="warning" size="small" plain @click="EditSurvey(scope.row)" v-auth="'screen_library-get-addProjectProblem'">
                        设计问卷
                      </ElButton>
                      <ElButton type="danger" size="small" plain @click="onDelProject(scope.row)" v-auth="'screen_library-delete-deleteProjectProblemCategory'">
                        删除
                      </ElButton>
                    </template>
                  </template>
                </ElTableColumn>
              </el-table>
            </template>
          </el-table-column>
          <ElTableColumn prop="isDefault" label="默认/状态" align="left">
            <template #default="scope">
              <ElSwitch @change="changeIsDefault(scope.row)" v-model="scope.row.isDefault" :active-value="1"
                :inactive-value="2" inline-prompt active-text="启用" inactive-text="禁用" />
            </template>
          </ElTableColumn>

          <ElTableColumn prop="countryName" label="区域/标题" width="500" align="left">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.countryName }}</el-tag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="babOrB2c" label="类型" align="left">
            <template #default="scope">
                    <template v-if="scope.row.type === 'add'">
                      <ElSwitch v-model="scope.row.babOrB2c" :active-value="2" :inactive-value="1" inline-prompt
                      active-text="B2C" inactive-text="B2B" disabled/>
                    </template>
                  </template>
                </ElTableColumn>
          <ElTableColumn label="操作" width="250" align="left" fixed="right">
            <template #default="scope">
              <ElButton type="primary" size="small" plain @click="onCreateTiele(scope.row)" v-auth="'screen_library-get-addProjectProblemCategory'">
                新增问卷
              </ElButton>
              <ElButton type="danger" size="small" plain @click="onDelCountry(scope.row)" v-auth="'screen_library-delete-deleteProjectProblemCategory'">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
          <template #empty>
            <el-empty :image="empty" :image-size="300" />
          </template>
        </ElTable>
      </el-form>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <Edit v-if="data.editProps.visible" :id="data.editProps.id" :countryId="data.editProps.countryId"
      v-model="data.editProps.visible" :row="data.editProps.row" @success="getDataList"></Edit>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" :details="data.formModeProps.details"
      :title="data.formModeProps.title" @success="getDataList" />
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .hide-table-header thead {
    display: none !important;
  }

  td:has(> .hide-table-header) {
    padding: 0 !important;
    border: none;

    tbody>tr:nth-last-of-type(1) {
      td {
        border-bottom: none !important;
      }
    }

    .el-table--border .el-table__inner-wrapper:after {
      height: 0;
    }

    .el-table--border:after {
      width: 0;
    }
  }
}

.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
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
