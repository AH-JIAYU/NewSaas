<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import homePageEdit from "./components/HomePageEdit/index.vue";
import empty from '@/assets/images/empty.png'
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/configuration_homepageSetting";

defineOptions({
  name: "TenantTenantHomepageSettingList",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const homePageRef = ref<any>();
const data = ref({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: "dialog" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    row: "",
    id: "",
  },
  // 搜索
  search: {
    title: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  //自定义
  dataList: [],
  // 通用
  controlDataList: [],
});

// 获取数据
function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...getParams(),
      ...(data.value.search.title && { title: data.value.search.title }),
    };
    api.list(params).then((res: any) => {
      data.value.loading = false;
      if(res.data && res.status === 1) {
        //通用
        data.value.controlDataList = res.data.controlData;

        //自定义
        data.value.dataList = res.data.data;

      }
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}

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

// 新增
function onCreate() {
  data.value.formModeProps.id = "";
  data.value.formModeProps.row = "";
  data.value.formModeProps.visible = true;
}

// 修改
function onEdit(row: any) {
  data.value.formModeProps.id = row.id;
  data.value.formModeProps.row = JSON.stringify(row);
  data.value.formModeProps.visible = true;
}

// 设计主页
function homePage(row: any, title: any = "编辑") {
  homePageRef.value.showEdit(row, title);
}
//设置为自定义模版
async function homeMyPage(row: any) {
  const params = {
    "title":row.title,
    "css":row.css,
    "html":row.html,
    "rawData":row.rawData
  }

  const res = await api.create(params);
  res.status === 1 &&
    ElMessage.success({
      message: "设置成功",
      center: true,
    });
  getDataList()
}

// 设计主页
async function setHomePage(row: any) {
  const res = await api.setHomePageTemplate({ templateId: row.id });
  res.status === 1 &&
    ElMessage.success({
      message: "设置成功",
      center: true,
    });
  getDataList()
}

// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.title}」吗？`, "确认信息")
    .then(() => {
      api.del({ id: row.id }).then((res: any) => {
        res.status === 1 &&
          ElMessage.success({
            message: "删除成功",
            center: true,
          });
        getDataList();
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
      <div style="font-size: 1.5rem;">官网首页模版库</div>
      <ElDivider border-style="dashed" />
      <PageMain>
      <div style="font-size: 1.5rem;">通用模板</div>
      <ElTable v-loading="data.loading" class="my-4" :data="data.controlDataList" stripe highlight-current-row
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <ElTableColumn v-if="data.batch.enable" type="selection" align="left" fixed />
        <ElTableColumn prop="title" label="标题" />
        <ElTableColumn prop="isSet" align="left" width="100" label="是否默认">
          <template #default="{ row }">
            {{ row.isSet ? '是' : '否' }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="350" align="left" fixed="right">
          <template #default="scope">
            <ElButton v-if="!scope.row.isSet" type="primary" size="small" plain @click="setHomePage(scope.row)">
              设置为主页
            </ElButton>
            <ElButton type="primary" size="small" plain @click="homeMyPage(scope.row)">
              设置为自定义模版
            </ElButton>
            <ElButton type="primary" size="small" plain @click="homePage(scope.row,'')">
              查看
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
    </PageMain>
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          <template #icon>
            <SvgIcon name="i-ep:plus" />
          </template>
          新增模版
        </ElButton>
        <ElButton v-if="data.batch.enable" size="default" :disabled="!data.batch.selectionDataList.length">
          单个批量操作按钮
        </ElButton>
        <ElButtonGroup v-if="data.batch.enable">
          <ElButton size="default" :disabled="!data.batch.selectionDataList.length">
            批量操作按钮组1
          </ElButton>
          <ElButton size="default" :disabled="!data.batch.selectionDataList.length">
            批量操作按钮组2
          </ElButton>
        </ElButtonGroup>
      </ElSpace>
      <div style="font-size: 1.5rem;">官网首页模版库</div>

      <ElTable v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <ElTableColumn v-if="data.batch.enable" type="selection" align="left" fixed />
        <ElTableColumn prop="title" label="标题" />
        <ElTableColumn prop="isSet" align="left"  label="是否使用">
          <!-- 可以使用，二次点击去掉使用 -->
          <template #default="{ row }">
            <el-button
              :type="row.isSet ?  'primary' :''"
              size="small"
@click="setHomePage(row)"
              >使用
            </el-button>


            <!-- {{ row.isSet ? '是' : '否' }} -->
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="350" align="left" fixed="right">
          <template #default="scope">
            <!-- <ElButton v-if="!scope.row.isSet" type="primary" size="small" plain @click="setHomePage(scope.row)">
              设置为主页
            </ElButton> -->
            <ElButton type="primary" size="small" plain @click="homePage(scope.row)" >
              设计模板
            </ElButton>
            <ElButton type="primary" size="small" plain @click="onEdit(scope.row)"  v-if="!scope.row.isCommon">
              编辑标题
            </ElButton>
            <!-- 通用模板不支持删除 -->
            <ElButton type="danger" size="small" plain @click="onDel(scope.row)" v-if="!scope.row.isSet&& !scope.row.isCommon ">
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
      :row="data.formModeProps.row" v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList" />
    <homePageEdit ref="homePageRef" @fetch-data="getDataList"></homePageEdit>
  </div>
</template>

<style lang="scss" scoped>
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
