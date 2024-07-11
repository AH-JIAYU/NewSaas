<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import VipEdit from "./components/VipEdit/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/survey_vip";
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
const surveyVipStore = useSurveyVipStore(); // 会员

defineOptions({
  name: "SurveyVipList",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false);
const data = reactive<any>({
  list: [], // 列表
  vipLevelList: [], //会员等级
  vipGroupList: [], // 会员组
});
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 添加|编辑 组件ref
const border = ref<any>(true); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-展示列
const columns = ref<Array<Object>>([
  { prop: "memberId", label: "会员id", checked: true, sprtable: true },
  {
    prop: "memberNickname",
    label: "会员名称",
    checked: true,
    sprtable: true,
  },
  { label: "余额", checked: true, sortable: true, prop: "availableBalance" },
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
  { prop: "createName", label: "创建人", checked: true, sprtable: true },
  { prop: "createTime", label: "创建日期", checked: true, sprtable: true },
]);

// 请求接口携带参数
const queryForm = reactive<any>({
  memberName: "",
  memberLevelId: "",
  memberStatus: "",
  memberGroupId: "",
  beginTime: "",
  endTime: "",
  time: [],
});

// 添加
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
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
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
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
          <ElForm
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <!--
                (刘)
                会员列表目前这个只会模糊匹配姓名
                那个我等下有时间在搞
              -->
              <el-input
                v-model.trim="queryForm.memberName"
                clearable
                :inline="false"
                placeholder="会员ID、会员名称、姓名"
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.memberLevelId"
                clearable
                placeholder="会员等级"
              >
                <el-option
                  v-for="item in data.vipLevelList"
                  :key="item.memberLevelId"
                  :label="item.levelNameOrAdditionRatio"
                  :value="item.memberLevelId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.memberStatus"
                clearable
                placeholder="会员状态"
              >
                <el-option label="关闭" :value="1" />
                <el-option label="开启" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.memberGroupId"
                clearable
                placeholder="所属会员组"
              >
                <el-option
                  v-for="item in data.vipGroupList"
                  :key="item.memberGroupId"
                  :label="item.memberGroupName"
                  :value="item.memberGroupId"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="queryForm.time"
                type="datetimerange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                value-format="YYYY-MM-DD hh:mm:ss"
                size="default"
              />
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
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        v-loading="listLoading"
        :border="border"
        :data="data.list"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column
          v-if="checkList.includes('memberId')"
          align="center"
          prop="memberId"
          show-overflow-tooltip
          label="会员ID"
        />
        <el-table-column
          v-if="checkList.includes('memberNickname')"
          align="center"
          prop="memberNickname"
          show-overflow-tooltip
          label="会员名称"
        />
        <el-table-column
          v-if="checkList.includes('memberName')"
          align="center"
          prop="memberName"
          show-overflow-tooltip
          label="会员姓名"
        />
        <el-table-column
          v-if="checkList.includes('availableBalance')"
          align="center"
          prop="availableBalance"
          show-overflow-tooltip
          label="余额"
        />
        <el-table-column
          v-if="checkList.includes('pendingBalance')"
          align="center"
          prop="pendingBalance"
          show-overflow-tooltip
          label="待审金额"
        />
        <el-table-column
          v-if="checkList.includes('memberLevelName')"
          align="center"
          prop="memberLevelName"
          show-overflow-tooltip
          label="会员等级"
        />
        <el-table-column
          v-if="checkList.includes('memberGroupName')"
          align="center"
          prop="memberGroupName"
          show-overflow-tooltip
          label="会员组"
        />

        <el-table-column
          v-if="checkList.includes('B2B|B2C')"
          align="center"
          show-overflow-tooltip
          label="B2B|B2C"
        >
          <template #default="{ row }">
            {{ row.b2bStatus && row.b2bStatus === 2 ? "√" : "×" }} |
            {{ row.b2cStatus && row.b2cStatus === 2 ? "√" : "×" }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          v-if="checkList.includes('memberStatus')"
          show-overflow-tooltip
          label="会员状态"
        >
          <template #default="{ row }">
            <ElSwitch
              v-if="row.memberStatus === 3"
              v-model="row.memberStatus"
              inline-prompt
              :inactive-value="3"
              :active-value="2"
              inactive-text="待审核"
              active-text="启用"
              @change="changeState($event, row.memberId)"
            />
            <ElSwitch
              v-else
              v-model="row.memberStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              inactive-text="禁用"
              active-text="启用"
              @change="changeState($event, row.memberId)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="checkList.includes('memberStatus')"
          show-overflow-tooltip
          label="随机身份"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.randomStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              inactive-text="禁用"
              active-text="启用"
              @change="changeState($event, row.memberId)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createName')"
          align="center"
          prop="createName"
          show-overflow-tooltip
          label="创建人"
        />
        <el-table-column
          v-if="checkList.includes('createTime')"
          align="center"
          prop="createTime"
          show-overflow-tooltip
          label="创建日期"
        />
        <el-table-column
          align="center"
          label="操作"
          show-overflow-tooltip
          width="180"
        >
          <template #default="{ row }">
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button size="small" plain type="primary"> 加减款 </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
        </template>
      </el-table>
      <ElPagination
        :current-page="pagination.page"
        :total="pagination.total"
        :page-size="pagination.size"
        :page-sizes="pagination.sizes"
        :layout="pagination.layout"
        :hide-on-single-page="false"
        class="pagination"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </PageMain>
    <VipEdit ref="editRef" @fetch-data="queryData" />
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
