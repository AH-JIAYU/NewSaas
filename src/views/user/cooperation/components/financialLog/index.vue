<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUse from "@/api/modules/configuration_manager";
import empty from "@/assets/images/empty.png";

// 时间
const { format } = useTimeago();
const emit = defineEmits(["fetch-data"]);
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 用户数据
const staffList = ref<any>([]);
// 表单数据
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: false, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  search: {
    page: 1,
    limit: 10,
    allocationTenantId: null,
    projectId: null,
    clickId: null,
    operationType: null,
    type: null,
  },
});
const drawerisible = ref<boolean>(false);
// 详情数据
const detailData = ref<any>();
// 编辑

// 加减款
async function showEdit(row: any) {
  if (row.beInvitationTenantId) {
    data.value.search.allocationTenantId = row.beInvitationTenantId;
    await getDataList();
    // const ress = await apiUse.queryNotEnableStaffList({
    //   organizationalStructureId: data.value.search.organizationalStructureId,
    // });
    // staffList.value = ress.data;
  }
  drawerisible.value = true;
}
// 获取列表数据
const getDataList = async () => {
  try {
    data.value.loading = true;
    const params = {
      ...data.value.search,
    };
    const res = await api.queryCompanyRecordQueryAmount(params);
    detailData.value = res.data.items;
    pagination.value.total = +res.data.total;
    data.value.loading = false;
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
};
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
function close() {
  emit("fetch-data");
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 用户id
    userId: null,
    // 组织架构id
    organizationalStructureId: null,
  });
  drawerisible.value = false;
}

defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    v-loading="data.loading"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    size="70%"
    title="财务日志"
    @close="close"
  >
    <ElDivider border-style="dashed" />
    <!-- <ElForm
      :model="data.search"
      size="default"
      label-width="100px"
      inline-message
      inline
      class="search-form"
    >
      <ElFormItem>
        <el-select style="width:10.5rem" v-model="data.search.userId" placeholder="请选择员工" clearable filterable @change="currentChange()">
        <el-option v-for="item in staffList"
        :key="item.id"
        :label="item.userName"
        :value="item.id">
        </el-option>
        </el-select>
      </ElFormItem>
    </ElForm> -->
    <ElTable
      v-loading="data.loading"
      :border="data.border"
      :size="data.lineHeight"
      :stripe="data.stripe"
      class="my-4"
      :data="detailData"
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="data.batch.selectionDataList = $event"
    >

      <ElTableColumn
        show-overflow-tooltip
        align="left"
        prop=""
        label="点击ID"
      >
        <template #default="{ row }">
          <el-text class="color3">{{ row.clickId ? row.clickId : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="projectId" label="项目ID">
  <template #default="{ row }">
  <el-text class="color3">{{ row.projectId ? row.projectId : "-" }}</el-text>
</template>
</ElTableColumn>

<ElTableColumn show-overflow-tooltip width="120" align="left" prop="type" label="类型">
  <template #default="{ row }">
  <el-tag v-if="row.type === 1" type="warning" effect="dark">待审余额</el-tag>
  <el-tag v-if="row.type === 2" type="primary" effect="dark">可用余额</el-tag>
</template>
</ElTableColumn>

<ElTableColumn show-overflow-tooltip align="left" prop="remark" label="说明"><template #default="{ row }">
  <el-text class="mx-1 color3">{{ row.remark ? row.remark : "-" }}</el-text>
</template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="beforeBalance" width="150" label="变动前">
  <template #default="{ row }">
    <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <el-text class="fontColor color3"><CurrencyType v-if="!row.currencyType" />{{ row.beforeBalance || 0 }}</el-text>
</template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="difference" label="加减款" width="120">
  <template #default="{ row }">
    <p class="plus" v-if="row.operationType === 1">
            <div class="plusSpan i-majesticons:plus-line w-1em h-1em"></div>
            <el-text class="color3">
              <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <CurrencyType v-if="!row.currencyType" />{{ Math.abs(row.difference) }}
            </el-text>
            </p>
            <p class="plus" v-if="row.operationType === 2">
            <div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div>
            <el-text class="color3">
              <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <CurrencyType v-if="!row.currencyType" />{{ Math.abs(row.difference) }}
            </el-text>
            </p>
          </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="afterBalance" width="150" label="变动后">
  <template #default="{ row }">
    <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <CurrencyType v-if="!row.currencyType" /><el-text class="fontColor color3">{{ row.afterBalance || 0 }}</el-text>
</template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="updateTime" label="时间"><template #default="{ row }">
  <el-tooltip :content="row.updateTime" placement="top">
    <el-tag effect="plain" type="info">{{ format(row.updateTime) }}</el-tag>
  </el-tooltip>
</template>
</ElTableColumn>
<template #empty>
          <el-empty :image="empty" :image-size="300" />
      </template>
</ElTable>
<ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
  :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background
  @size-change="sizeChange" @current-change="currentChange" />
</el-drawer>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rightStatus {
    position: relative;
    width: 128px;

    >div {
      width: 120px;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20.8px;

      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }

      &::after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
    }

    >div.isOnlineTrue {
      background-color: #70b51a;

      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    >div.isOnlineFalse {
      background-color: #d8261a;

      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}

.plusSpan {
  color: #35cd61;
}

.minusSign {
  color: #fb6868;
}
</style>
