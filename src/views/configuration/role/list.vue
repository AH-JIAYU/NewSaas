<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/configuration_role";
import useSettingsStore from "@/store/modules/settings";

defineOptions({
  name: "role",
});
// 路由
const router = useRouter();
// 分页
const { pagination, onSizeChange, onCurrentChange, onSortChange } = usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
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
    limit: "",
    page: "",
    title: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});

onMounted(() => {
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
// 获取数据
function getDataList() {
  try {
    data.value.loading = true;
    api.list().then((res: any) => {
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
    data.value.search.page = page;
    getDataList();
  });
}
// 重置数据
function onReset() {
  Object.assign(data.value.search, {
    // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
    type: null,
    // 操作人id
    createUserId: "",
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
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form :model="data.search" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model.trim="data.search.title" clearable :inline="false" placeholder="角色ID" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model.trim="data.search.title" clearable :inline="false" placeholder="角色名称" />
            </el-form-item>
            <!-- <el-form-item v-show="!fold" label="">
              <el-select
                v-model="data.search.title"
                value-key=""
                placeholder="数据权限"
                clearable
                filterable
              >
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item v-show="!fold" label="">
              <el-select
                v-model="data.search.title"
                value-key=""
                placeholder="状态"
                clearable
                filterable
              >
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
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
          </el-form>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          新增角色管理
        </ElButton>
      </ElSpace>
      <ElTable v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row border
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <ElTableColumn v-if="data.batch.enable" type="selection" align="center" fixed />
        <ElTableColumn prop="id" align="center" label="角色ID" />
        <ElTableColumn prop="roleName" align="center" label="角色名称" />
        <ElTableColumn prop="count" align="center" label="账户数" />
        <ElTableColumn prop="roleName" align="center" label="备注" />
        <ElTableColumn label="操作" width="250" align="center" fixed="right">
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
          <el-empty description="暂无数据" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList" />
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

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }
}
</style>
