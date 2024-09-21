<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import customerProportion from "./components/CustomerProportion/index.vue";
import empty from '@/assets/images/empty.png'
import api from "@/api/modules/user_cooperation";

defineOptions({
  name: "cooperation",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false); // 加载
const list = ref<Array<Object>>([]); // 表格数据
const editRef = ref<any>(); // 组件ref 新增编辑
const proportionRef = ref<any>(); // 组件ref 价格比例
const selectRows = ref(); // 表格选中行
const border = ref(true); // 表格控件-边框
const stripe = ref(false); // 表格控件-条纹
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const lineHeight = ref<any>("default"); // 表格控件-大小
const checkList = ref<any>([]); // 表格控件-展示列
const columns = ref([
  {
    label: "租户id",
    checked: true,
    sortable: true,
    prop: "beInvitationTenantId",
  },
  {
    label: "租户名称",
    checked: true,
    sortable: true,
    prop: "beInvitationTenantName",
  },
  { label: "状态", checked: true, sortable: true, prop: "bindStatus" },
  {
    label: "价格比例",
    checked: true,
    sortable: true,
    prop: "priceRatio",
  },
  { label: "待审金额", checked: true, sortable: true, prop: "pendBalance" },
  {
    label: "可用金额",
    checked: true,
    sortable: true,
    prop: "availableBalance",
  },
]);
// 邀请公司
function handleAdd() {
  editRef.value.showEdit();
}

//终止合作
function termination(row: any) {
  ElMessageBox.prompt("是否确认进行解约?", "终止合作", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPlaceholder: '说明',
    inputPattern: /^.{0,500}$/,
    inputErrorMessage: '不能超过500个字符',
    type: "warning",
  })
    .then(async (val: any) => {
      const {
        data: { flag },
      } = await api.updateRescindTenant({
        beInvitationTenantId: row.beInvitationTenantId,
        remark: val.value
      });
      flag &&
        ElMessage({
          type: "success",
          message: "已终止合作",
        });
      fetchData();
    })
    .catch(() => { });
}
//价格比例
function priceRatio(row: any) {
  proportionRef.value.showEdit(row);
}

// 查询
const queryForm = reactive<any>({
});

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
  Object.assign(queryForm, {
  });
  queryData();
}
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 获取列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const { data } = await api.list(params);
    list.value = data.tenantBindInfoList;
    pagination.value.total = Number(data.total);
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
function setSelectRows(val: any) {
  selectRows.value = val;
}
// 过滤数据，后面刘哥过滤
const tableList = computed(() => {
  // 合作状态
  const cooperationList = list.value.filter((item: any) => item.bindStatus === 2)
  // 解约状态
  let terminationOfContractList = list.value.filter((item: any) => item.bindStatus === 4)
  // 解约去重
  terminationOfContractList = Array.from(new Map(terminationOfContractList.map((item: any) => [item.beInvitationTenantId, item])).values())
  // 合作的列表的id集合
  const cooperationIdList = cooperationList.map((item: any) => item.beInvitationTenantId)
  terminationOfContractList.forEach((item: any) => {
    if (!cooperationIdList.includes(item.beInvitationTenantId)) {
      cooperationList.push(item)
    }
  })
  return cooperationList
})

onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            邀约公司
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-table v-loading="listLoading" :border="border" :data="tableList" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows">
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('bindStatus')" align="left" prop="bindStatus" show-overflow-tooltip
          label="状态" width="100">
          <template #default="{ row }">
            <div class="tableBig">
              <el-text v-if="row.bindStatus === 2" type="success">合作</el-text>
              <el-text v-if="row.bindStatus === 4" type="danger">解约</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('beInvitationTenantId')" align="left" prop="beInvitationTenantId"
          width="180" show-overflow-tooltip label="租户id">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine ">ID: {{ row.beInvitationTenantId }}</div>
              <copy class="copy" :content="row.beInvitationTenantId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('beInvitationTenantName')" align="left"
          prop="beInvitationTenantName" show-overflow-tooltip label="租户名称">
          <template #default="{ row }">
            <div class="tableBig">{{ row.beInvitationTenantName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('priceRatio')" align="left" prop="priceRatio" show-overflow-tooltip
          label="价格比例">
          <template #default="{ row }">
            <div class="tableBig">
              {{ row.priceRatio }} %
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('pendBalance')" align="left" prop="pendBalance"
          show-overflow-tooltip label="待审金额">
          <template #default="{ row }">
            <div class="tableBig">
              <CurrencyType />{{ row.pendBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('availableBalance')" align="left" prop="availableBalance"
          show-overflow-tooltip label="可用金额">
          <template #default="{ row }">
            <div class="tableBig">
              <CurrencyType />{{ row.availableBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" prop="i" label="操作" width="350">
          <template #default="{ row }">
            <ElSpace>
              <el-button v-if="row.bindStatus === 2" type="danger" plain size="small" @click="termination(row)">
                终止合作
              </el-button>
              <el-button size="small" plain type="primary" @click="priceRatio(row)">
                价格比例
              </el-button>

              <el-button type="warning" plain size="small">
                财务日志
              </el-button>
              <el-button type="danger" plain size="small"> 加减款 </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
      <customerEdit ref="editRef" @fetch-data="queryData" />
      <customerProportion ref="proportionRef" @fetch-data="queryData" />
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

// id
.copyId {
  @extend .flex-s;
  justify-content: center;

  .copy {
    width: 20px;
  }

  .id {
    width: auto !important;
    max-width: calc(100% - 25px) !important;
  }
}
</style>
