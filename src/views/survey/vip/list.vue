<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import VipEdit from "./components/VipEdit/index.vue";
import vipPlusMinusPayments from "./components/vipPlusMinusPayments/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/survey_vip";
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
import empty from '@/assets/images/empty.png'
import useClipboard from "vue-clipboard3"; // 复制

defineOptions({
  name: "vip",
});
// 复制
const { toClipboard } = useClipboard();
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
const surveyVipStore = useSurveyVipStore(); // 会员
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const data = reactive<any>({
  list: [], // 列表
  vipLevelList: [], //会员等级
  vipGroupList: [], // 会员组
});
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 新增|编辑 组件ref
const vipPlusMinusPaymentsRef = ref(); //加减款
const border = ref<any>(true); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-展示列
const columns = ref<Array<Object>>([
  { prop: "memberId", label: "会员ID", checked: true, sprtable: true },
  {
    prop: "memberNickname",
    label: "会员名称",
    checked: true,
    sprtable: true,
  },
  { label: "会员姓名", checked: true, sortable: true, prop: "memberName" },
  { label: "可用余额", checked: true, sortable: true, prop: "availableBalance" },
  {
    label: "待审金额",
    checked: true,
    sortable: true,
    prop: "pendingBalance",
  },
  { prop: "memberName", label: "会员姓名", checked: true, sprtable: true },
  {
    prop: "memberLevelName",
    label: "会员等级",
    checked: true,
    sprtable: true,
  },
  { prop: "memberGroupName", label: "会员组", checked: true, sprtable: true },
  { prop: "B2B|B2C", label: "B2B|B2C", checked: true, sprtable: true },
  { prop: "memberStatus", label: "会员状态", checked: true, sprtable: true },
  { prop: "randomStatus", label: "随机身份", checked: true, sprtable: true },
  { prop: "createName", label: "创建人", checked: true, sprtable: true },
  { prop: "createTime", label: "创建日期", checked: true, sprtable: true },
]);

// 请求接口携带参数
const queryForm = reactive<any>({
  memberId: null,
  memberName: "",
  memberLevelId: "",
  memberStatus: "",
  memberGroupId: "",
  beginTime: "",
  endTime: "",
  time: [],
});

// 新增
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
// 加减款
const plusMinusPayments = (row: any) => {
  vipPlusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
};
// 切换状态
async function changeState(state: any, id: string) {
  const params = {
    memberId: id,
    memberStatus: state,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在会员组中需要重新请求
  surveyVipStore.NickNameList = null;
  queryData();
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
    const params = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = queryForm.time[0] || "";
      params.endTime = queryForm.time[1] || "";
    }
    const res = await api.list(params);
    data.list = res.data.getMemberInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 复制ID
const svgClick = (id: any) => {
  toClipboard(id);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    memberId: null,
    memberName: "",
    memberLevelId: "",
    memberStatus: "",
    memberGroupId: "",
    beginTime: "",
    endTime: "",
    time: [],
  });
  queryData();
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val;
}
onMounted(async () => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  data.vipLevelList = await surveyVipLevelStore.getLevelNameList();
  data.vipGroupList = await surveyVipGroupStore.getGroupNameList();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model.trim="queryForm.memberId" clearable :inline="false" placeholder="会员ID"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <!--
                (刘)
                会员列表目前这个只会模糊匹配姓名
                那个我等下有时间在搞
              -->
              <el-input v-model.trim="queryForm.memberName" clearable :inline="false" placeholder="会员名称"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="queryForm.memberLevelId" clearable placeholder="会员等级" @change="currentChange()">
                <el-option v-for="item in data.vipLevelList" :key="item.memberLevelId"
                  :label="item.levelNameOrAdditionRatio" :value="item.memberLevelId" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="queryForm.memberStatus" clearable placeholder="会员状态" @change="currentChange()">
                <el-option label="关闭" :value="1" />
                <el-option label="开启" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="queryForm.memberGroupId" clearable placeholder="所属会员组" @change="currentChange()">
                <el-option v-for="item in data.vipGroupList" :key="item.memberGroupId" :label="item.memberGroupName"
                  :value="item.memberGroupId" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker v-model="queryForm.time" type="datetimerange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" value-format="YYYY-MM-DD hh:mm:ss" size="default"
                @change="currentChange()" />
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
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
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
      <el-table v-loading="listLoading" :border="border" :data="data.list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows">
        <el-table-column align="center" type="selection" />
        <el-table-column align="center" v-if="checkList.includes('memberStatus')" show-overflow-tooltip label="会员状态">
          <template #default="{ row }">
            <ElSwitch v-if="row.memberStatus === 3" v-model="row.memberStatus" inline-prompt :inactive-value="3"
              :active-value="2" inactive-text="待审核" active-text="启用" @change="changeState($event, row.memberId)" />
            <ElSwitch v-else v-model="row.memberStatus" inline-prompt :inactive-value="1" :active-value="2"
              inactive-text="禁用" active-text="启用" @change="changeState($event, row.memberId)" />
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="checkList.includes('randomStatus')" show-overflow-tooltip label="随机身份">
          <template #default="{ row }">
            <ElSwitch v-model="row.randomStatus" inline-prompt :inactive-value="1" :active-value="2" inactive-text="禁用"
              active-text="启用" @change="changeState($event, row.memberId)" />
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberId')" align="center" prop="memberId" width="180"
          show-overflow-tooltip label="会员ID">
          <template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">ID：{{ row.memberId }}</p>
              <span>
                <svg
                @click="svgClick(row.memberId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
          </el-table-column>
        <el-table-column v-if="checkList.includes('memberNickname')" align="center" prop="memberNickname"
          show-overflow-tooltip label="会员名称" />
        <el-table-column v-if="checkList.includes('memberName')" align="center" prop="memberName" show-overflow-tooltip
          label="会员姓名"><template #default="{ row }">
            {{ row.memberName ? row.memberName : '-' }} </template></el-table-column>
        <el-table-column v-if="checkList.includes('memberLevelName')" align="center" prop="memberLevelName"
          show-overflow-tooltip label="会员等级">
          <template #default="{ row }">
            {{ row.memberLevelName ? row.memberLevelName : '-' }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberGroupName')" align="center" prop="memberGroupName"
          show-overflow-tooltip label="会员组"><template #default="{ row }">
            {{ row.memberGroupName ? row.memberGroupName : '-' }} </template></el-table-column>
        <el-table-column v-if="checkList.includes('B2B|B2C')" align="center" show-overflow-tooltip label="B2B|B2C">
          <template #default="{ row }">
            <el-text v-if="row.b2bStatus && row.b2bStatus === 2" class="mx-1">
              <div style="color: #15d36a;" class="i-fluent:checkmark-12-filled w-1.5em h-1.5em"></div>
            </el-text>
            <el-text v-else class="mx-1">
              <div style="color:#e74032;" class="i-entypo:cross w-1.5em h-1.5em"></div>
            </el-text>
            |
            <el-text v-if="row.b2cStatus && row.b2cStatus === 2" class="mx-1">
              <div style="color: #15d36a;" class="i-fluent:checkmark-12-filled w-1.5em h-1.5em"></div>
            </el-text>
            <el-text v-else class="mx-1">
              <div style="color:#e74032;" class="i-entypo:cross w-1.5em h-1.5em"></div>
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('availableBalance')" align="center" prop="availableBalance"
          show-overflow-tooltip label="可用余额">
          <template #default="{ row }">
            <CurrencyType />{{ row.availableBalance || 0 }}
          </template></el-table-column>
        <el-table-column v-if="checkList.includes('pendingBalance')" align="center" prop="pendingBalance"
          show-overflow-tooltip label="待审金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.pendingBalance || 0 }}
          </template></el-table-column>
        <el-table-column v-if="checkList.includes('createName')" align="center" prop="createName" show-overflow-tooltip
          label="创建人">
          <template #default="{ row }">
            {{ row.createName ? row.createName : "-" }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('createTime')" align="center" prop="createTime" show-overflow-tooltip
          label="创建时间">
          <template #header>
            <span class="headerIcon">
              <svg class="timeSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="none">
                <g id="Time (æ¶é´)">
                  <path id="Vector"
                    d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z"
                    fill="#409EFF" />
                  <path id="Vector_2" d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              创建时间
            </span>
          </template>
          <template #default="{ row }">
            <el-tag effect="plain" type="info">{{
    format(row.createTime)
  }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" show-overflow-tooltip width="180">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="plusMinusPayments(row)">
              加减款
            </el-button>
            <el-button size="small" plain type="warning" @click="handleEdit(row)">
              编辑
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
    <VipEdit ref="editRef" @fetch-data="queryData" />
    <vipPlusMinusPayments ref="vipPlusMinusPaymentsRef" @fetch-data="queryData" />
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
.fineBom {
  text-align: left !important;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hoverSvg {
  display: flex;
  align-items: center;
}
// .hoverSvg:hover .svg {
//   display: block;
// }

.svg {
  // display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}
:deep {
  tbody {
    color: #333;
    font-weight: 700;
  }
}
.headerIcon {
  display: flex;
  align-items: center;
  justify-content: center;

  .timeSvg {
    margin-right: 4px;
  }
}
</style>
