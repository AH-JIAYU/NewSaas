<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { submitLoading } from "@/utils/apiLoading";
// 拖拽排序插件
import Sortable from "sortablejs";
import edit from "./components/Edit/index.vue";
//供应商等级
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel";
import api from "@/api/modules/configuration_supplierLevel";
import empty from '@/assets/images/empty.png'
import { columns } from './components/configuration/index.ts'

defineOptions({
  name: "supplierLevel",
});

//供应商等级
const configurationSupplierLevelStore = useConfigurationSupplierLevelStore();
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination();
// listLoading
const listLoading = ref(false);
// 组件ref 新增/编辑
const EditRef = ref();
// 列表
const list = ref<any>([]);
// 表格-展示的列
const checkList = ref<any>([]);
// 表格控件-是否展示边框
const border = ref(true);
// 表格控件-是否展示斑马条
const stripe = ref(true);
// 表格控件-控制表格大小
const lineHeight = ref<any>("default");
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 表格ref
const elTableRef = ref();

// 新增
function handleAdd() {
  EditRef.value.showEdit();
}

// 编辑
function handleEdit(row: any) {
  EditRef.value.showEdit(row);
}

// 删除
function handleDelete(row: any) {
  ElMessageBox.confirm(`您确定要删除当前项吗?`, "确认信息")
    .then(async () => {
      const { status } = await submitLoading(
        api.delete({
          tenantSupplierLevelId: row.tenantSupplierLevelId,
        })
      );
      status === 1 &&
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      // 数据改变 在会员中需要重新请求
      configurationSupplierLevelStore.LevelNameList = null;
      queryData();
    })
    .catch(() => { });
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
    };
    const { data, status } = await api.list(params);
    if (data && status === 1) {
      list.value = data.getTenantSupplierLevelInfoList;
      pagination.value.total = data.total;
    }
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}

// 拖拽
function rowDrop() {
  const tbody = elTableRef.value.$el.querySelector(
    ".el-table__body-wrapper tbody"
  );
  Sortable.create(tbody, {
    handle: ".sortable",
    animation: 300,
    ghostClass: "ghost",
    onEnd: ({ newIndex, oldIndex }) => {
      if (newIndex === undefined || oldIndex === undefined) {
        return;
      }
      nextTick(() => rowDrop());
    },
  });
}

onMounted(() => {
  columns.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  nextTick(() => {
    rowDrop();
  });
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <el-row>
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="handleAdd" v-auth="'supplierLevel-get-addTenantSupplierLevel'">
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
      <el-table ref="elTableRef" v-loading="listLoading" row-key="id" :border="border" :data="list" :size="lineHeight"
        :stripe="stripe" fit>
        <ElTableColumn width="80" align="left" fixed>
          <template #header> 排序 </template>
          <template #default>
            <ElTag type="info" class="sortable">
              <SvgIcon name="i-ep:d-caret" />
            </ElTag>
          </template>
        </ElTableColumn>
        <el-table-column v-if="checkList.includes('levelName')" align="left" prop="levelName" show-overflow-tooltip
          label="等级名称">
          <template #default="{ row }">
            <div class="tableBig">{{ row.levelName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('additionRatio')" align="left" prop="additionRatio"
          show-overflow-tooltip label="价格比例">
          <template #default="{ row }">
            <div class="fontC-System">{{ row.additionRatio }}%</div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberQuantity')" align="left" prop="memberQuantity"
          show-overflow-tooltip label="成员数量">
          <template #default="{ row }">
            <div class="fontC-System">{{ row.memberQuantity }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" show-overflow-tooltip label="操作">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="handleEdit(row)" v-auth="'supplierLevel-update-updateTenantSupplierLevel'">
              编辑
            </el-button>
            <el-button size="small" plain type="danger" v-if="row.isDelete === 1" @click="handleDelete(row)" v-auth="'supplierLevel-delete-deleteTenantSupplierLevel'">
              删除
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
    <edit ref="EditRef" @queryData="queryData" />
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

// 拖拽
.el-tag.sortable,
.el-tag.sortable .icon {
  cursor: ns-resize;
}
</style>
@/api/modules/survey_vipLevel
