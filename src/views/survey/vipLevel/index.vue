<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { submitLoading } from "@/utils/apiLoading";
import Sortable from "sortablejs"; // 拖拽排序插件
import edit from "./components/Edit/index.vue";
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import api from "@/api/modules/survey_vipLevel";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "vipLevel",
});

const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false);
const EditRef = ref(); // 组件ref 新增/编辑
const list = ref<any>([]); // 列表
const checkList = ref<any>([]); // 表格-展示的列
const border = ref(true); // 表格控件-是否展示边框
const stripe = ref(true); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const elTableRef = ref(); // 表格ref
// 表格控件-展示列
const columns = ref([
  {
    label: "等级名称",
    prop: "levelName",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "价格比例%",
    prop: "additionRatio",
    sortable: true,
    checked: true,
  },
  {
    label: "成员数量",
    prop: "memberQuantity",
    sortable: true,
    checked: true,
  },
]);
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
          memberLevelId: row.memberLevelId,
        })
      );
      status === 1 &&
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      // 数据改变 在会员中需要重新请求
      surveyVipLevelStore.LevelNameList = null;
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
    const { data } = await api.list(params);
    list.value = data.getMemberLevelInfoList;
    pagination.value.total = data.total;
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
  columns.value.forEach((item: any) => {
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
          <el-button size="default" type="primary" @click="handleAdd" v-auth="'vipLevel-get-addMemberLevel'">
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
            <p class="tableBig">{{ row.levelName }}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('additionRatio')" align="left" prop="additionRatio"
          show-overflow-tooltip label="价格比例">
          <template #default="{ row }">
            <p class="fontC-System">{{ row.additionRatio }}%</p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberQuantity')" align="left" prop="memberQuantity"
          show-overflow-tooltip label="成员数量">
          <template #default="{ row }">
            <span style="display: inline-block" class="fontC-System">
              {{   row.memberQuantity ? row.memberQuantity : 0 }}
            </span>
            <!-- <el-button v-if="row.memberQuantity" text type="primary" size="small" class="p-1"
              >
              <SvgIcon name="mdi:cursor-default-click" size="16px" color="#409eff" />
            </el-button> -->





            <!-- <el-text class="buleBorder" type="primary" >{{
    row.memberQuantity ? row.memberQuantity : 0
  }}</el-text> -->
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" show-overflow-tooltip label="操作">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="handleEdit(row)" v-auth="'vipLevel-update-updateMemberLevel'">
              编辑
            </el-button>
            <el-button size="small" plain type="danger" v-if="row.isDelete === 1" @click="handleDelete(row)" v-auth="'vipLevel-delete-deleteMemberLevel'">
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

:deep {
  tbody {
    color: #333;
  }
}

.buleBorder {
  border-bottom: 1px solid #409EFF;
}
</style>
