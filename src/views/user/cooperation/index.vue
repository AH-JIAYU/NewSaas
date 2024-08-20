<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import customerProportion from "./components/CustomerProportion/index.vue";

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
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm,
  };
  const { data } = await api.list(params);
  list.value = data.tenantBindInfoList;
  pagination.value.total = Number(data.total);
  listLoading.value = false;
}
function setSelectRows(val: any) {
  selectRows.value = val;
}
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
      <!-- <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item v-show="!fold">
              <el-input
                v-model="queryForm.customerShortName"
                clearable
                placeholder="客户简称"
              >
                <el-option label="name" value="name" />
              </el-input>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-select
                v-model="queryForm.customerStatus"
                clearable
                placeholder="客户状态"
              >
                <el-option label="禁用" :value="1" />
                <el-option label="启用" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-select
                v-model="queryForm.antecedentQuestionnaire"
                clearable
                placeholder="前置问卷"
              >
                <el-option label="禁用" :value="1" />
                <el-option label="启用" :value="2" />
              </el-select>
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
<ElButton disabled link @click="toggle">
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
<ElDivider border-style="dashed" /> -->
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
      <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows">
        <el-table-column align="center" type="selection" />
        <el-table-column v-if="checkList.includes('beInvitationTenantId')" align="center" prop="beInvitationTenantId"
          width="180" show-overflow-tooltip label="租户id" />
        <el-table-column v-if="checkList.includes('beInvitationTenantName')" align="center"
          prop="beInvitationTenantName" show-overflow-tooltip label="租户名称" />

        <el-table-column v-if="checkList.includes('bindStatus')" align="center" prop="bindStatus" show-overflow-tooltip
          label="状态">
          <template #default="{ row }">
            <span v-if="row.bindStatus === 2"> 合作 </span>
            <span v-if="row.bindStatus === 4"> 解约 </span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('priceRatio')" align="center" prop="priceRatio" show-overflow-tooltip
          label="价格比例">
          <template #default="{ row }"> {{ row.priceRatio }} % </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('pendBalance')" align="center" prop="pendBalance"
          show-overflow-tooltip label="待审金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.pendBalance || 0 }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('availableBalance')" align="center" prop="availableBalance"
          show-overflow-tooltip label="可用金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.availableBalance || 0 }}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" prop="i" label="操作" show-overflow-tooltip width="350">
          <template #default="{ row }">
            <ElSpace>
              <el-button v-if="row.bindStatus === 2" type="primary" plain size="small" @click="termination(row)">
                终止合作
              </el-button>
              <el-button size="small" plain type="primary" @click="priceRatio(row)">
                价格比例
              </el-button>

              <el-button type="primary" plain size="small">
                财务日志
              </el-button>
              <el-button type="primary" plain size="small"> 加减款 </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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
</style>
