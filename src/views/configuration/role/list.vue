<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/configuration_role";
import QuickEdit from './components/QuickEdit/index.vue'//快速编辑
import useSettingsStore from "@/store/modules/settings";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "role",
});
// 路由
const router = useRouter();
// 分页
const { pagination, onSizeChange, onCurrentChange, onSortChange } = usePagination();
const tabbar = useTabbar();
const QuickEditRef = ref(); //快速编辑
const current = ref<any>()//表格当前选中
const settingsStore = useSettingsStore();
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-role')// 表单排序name
// 定义表单
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
  // 详情
  formModeProps: {
    visible: false,
    id: "",
    row: {},
  },
  // 搜索
  search: {
    // 角色id
    id: null,
    // 角色名称
    name: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});


function handleCurrentChange(val: any) {
  if (val) current.value = val.id
  else current.value = ''
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
    备注 remark
  */
  QuickEditRef.value.showEdit(row, type)
}


onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
// 获取数据
function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...data.value.search
    }
    api.list(params).then((res: any) => {
      data.value.loading = false;
      data.value.dataList = res.data;
      pagination.value.total = res.data.length;
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.search.limit = size;
    getDataList();
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    getDataList();
  });
}
// 重置数据
function onReset() {
  Object.assign(data.value.search, {
    // 角色id
    id: null,
    // 	角色名称
    name: "",
  });
  getDataList();
}
// 新增
function onCreate() {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "multilevel_menu_exampleRoleCreate",
      });
    } else {
      router.push({
        name: "multilevel_menu_exampleRoleCreate",
      });
    }
  } else {
    data.value.formModeProps.id = "";
    data.value.formModeProps.visible = true;
  }
}
// 修改
function onEdit(row: any) {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "multilevel_menu_exampleRoleEdit",
        params: {
          id: row.id,
        },
      });
    } else {
      router.push({
        name: "multilevel_menu_exampleRoleEdit",
        params: {
          id: row.id,
        },
      });
    }
  } else {
    data.value.formModeProps.id = row.id;
    data.value.formModeProps.row = JSON.stringify(row);
    data.value.formModeProps.visible = true;
  }
}
// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.roleName}」吗？`, "确认信息")
    .then(() => {
      api.delete({ id: row.id }).then(() => {
        getDataList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => { });
}

onMounted(() => {
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
  formSearchList.value =[
    {index: 1, show: true, type: 'input', modelName: 'id', placeholder: '角色ID'},
    {index: 2, show: true, type: 'input', modelName: 'name', placeholder: '角色名称'}
]
});

</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="data.search" />
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          新增角色管理
        </ElButton>
      </ElSpace>
      <ElTable v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row
        height="100%" @sort-change="sortChange" border @selection-change="data.batch.selectionDataList = $event"
        @current-change="handleCurrentChange" >
        <ElTableColumn v-if="data.batch.enable" type="selection" align="left" fixed />
        <ElTableColumn prop="id" align="left" label="角色ID" >
          <template #default="{row}">
            <div class="copyId tableSmall">
              <div class="id oneLine  ">ID: {{ row.id }}</div>
              <copy class="copy" :content="row.id" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="roleName" align="left" label="角色名称" >
          <template #default="{row}">
            <div class="tableBig">{{row.roleName}}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="count" align="left" label="账户数" >
          <template #default="{row}">
            <div class="tableBig">{{row.count}}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="remark" align="left" label="备注" >
          <template #default="{row}">
            <div class="flex-s  ">
              <div class="oneLine tableBig" style="width: calc(100% - 20px);">
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon v-if="row.projectType !== 2" @click="quickEdit(row, 'remark')"
                :class="{ edit: 'edit', current: row.id === current }" name="i-ep:edit" color="#409eff" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="250" align="left" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" plain @click="onDel(scope.row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList" />
      <QuickEdit ref="QuickEditRef" @fetchData="getDataList" />
  </div>
</template>

<style lang="scss" scoped>
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

.flex-s {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  >div:nth-of-type(1) {
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
.el-table__row:hover .edit {
  display: block;
}
// id
.copyId {
  @extend .flex-s;
  justify-content: center;

  .copy {
    width: 20px;
  }

  .id {
    // flex: 1;
    width:auto !important;
    max-width:calc(100% - 25px)  !important;
  }
}
</style>
