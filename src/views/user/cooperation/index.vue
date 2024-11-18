<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import customerProportion from "./components/CustomerProportion/index.vue";
import financialLog from "./components/financialLog/index.vue";
import userPM from "./components/userPM/index.vue"; //部门人
import empty from "@/assets/images/empty.png";
import api from "@/api/modules/user_cooperation";
import QuickEdit from "./components/QuickEdit/index.vue"; //快速编辑

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
const border = ref(false); // 表格控件-边框
const stripe = ref(false); // 表格控件-条纹
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const lineHeight = ref<any>("default"); // 表格控件-大小
const checkList = ref<any>([]); // 表格控件-展示列
const QuickEditRef = ref(); //快速编辑
const columns = ref([
  {
    label: "合作商ID",
    checked: true,
    sortable: true,
    prop: "beInvitationTenantId",
  },
  {
    label: "合作商名称",
    checked: true,
    sortable: true,
    prop: "beInvitationTenantName",
  },
  {
    label: "PM",
    checked: true,
    sortable: true,
    prop: "userName",
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
  { label: "个人待审金额", checked: true, sortable: true, prop: "personalPendBalance" },
  {
    label: "个人可用金额",
    checked: true,
    sortable: true,
    prop: "personalAvailableBalance",
  },
  { label: "发送项目", checked: true, sortable: true, prop: "sendProjectType" },
  {
    label: "接收项目",
    checked: true,
    sortable: true,
    prop: "receiveProjectType",
  },
  { label: "负责部门/PM", checked: true, sortable: true, prop: "userName" },
]);

const current = ref<any>(); //表格当前选中
function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}

// 邀请公司
function handleAdd() {
  editRef.value.showEdit();
}

//终止合作
function termination(row: any) {
  ElMessageBox.prompt("是否确认进行解约?", "终止合作", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPlaceholder: "说明",
    inputPattern: /^.{0,500}$/,
    inputErrorMessage: "不能超过500个字符",
    type: "warning",
  })
    .then(async (val: any) => {
      const {
        data: { flag },
      } = await api.updateRescindTenant({
        beInvitationTenantId: row.beInvitationTenantId,
        remark: val.value,
      });
      flag &&
        ElMessage({
          type: "success",
          message: "已终止合作",
        });
      fetchData();
    })
    .catch(() => {});
}
const financialLogRef = ref()
//财务日志
function openLog(row:any){
  financialLogRef.value.showEdit(row);
}
//合作配置
function priceRatio(row: any) {
  proportionRef.value.showEdit(row);
}

// 查询
const queryForm = reactive<any>({});

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
  Object.assign(queryForm, {});
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
  const cooperationList = list.value.filter(
    (item: any) => item.bindStatus === 2
  );
  // 解约状态
  let terminationOfContractList = list.value.filter(
    (item: any) => item.bindStatus === 4
  );
  // 解约去重
  terminationOfContractList = Array.from(
    new Map(
      terminationOfContractList.map((item: any) => [
        item.beInvitationTenantId,
        item,
      ])
    ).values()
  );
  // 合作的列表的id集合
  const cooperationIdList = cooperationList.map(
    (item: any) => item.beInvitationTenantId
  );
  terminationOfContractList.forEach((item: any) => {
    if (!cooperationIdList.includes(item.beInvitationTenantId)) {
      cooperationList.push(item);
    }
  });
  return cooperationList;
});
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
   * PM  chargeUserId
   */
  QuickEditRef.value.showEdit(row, type);
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
});

//列表切换发送项目状态
const changeSendProjectType = (name: any, row: any) => {
  //判断当前发送状态，如果当前是自动，1,点击手动才调接口，如果当前是手动2，点击自动才调接口
  if (
    (row.sendProjectType == 1 && name == "手动") ||
    (row.sendProjectType == 2 && name == "自动")
  ) {
    try {
      listLoading.value = true;
      let params = {
        id: row.id,
        chargeUserId: row.userId, //负责人UserId
        invitationType: row.invitationType, //邀请类型
        chargeUserName: row.userName, //负责人用户姓名
        sendProjectType: row.sendProjectType == 1 ? 2 : 1, //邀请方发送项目类型:1:自动 2:手动
        receiveProjectType: row.receiveProjectType, //邀请方接收项目类型:1:自动 2:手动
      };
      api.updateInvitationBindUser(params).then(() => {
        listLoading.value = false;
        queryData();
        ElMessage.success({
          message: "修改成功",
          center: true,
        });
      });
    } catch (error) {
    } finally {
      listLoading.value = false;
    }
  }
};
//选择部门人
const userRef = ref();
const id = ref(null);
//列表切换接收项目状态
const changeReceiveProjectType = (name: any, row: any) => {
  id.value = row.id; //获取列表id
  //切换成自动需要选择负责人
  //判断当前发送状态，如果当前是自动，1,点击手动才调接口，如果当前是手动2，点击自动，弹出选择部门负责人才调接口
  let obj = JSON.parse(JSON.stringify(row)); //深拷贝，不改变原数据

  if (row.receiveProjectType == 1 && name == "手动") {
    try {
      listLoading.value = true;
      let params = {
        id: row.id,
        chargeUserId: row.userId, //负责人UserId
        invitationType: row.invitationType, //邀请类型
        chargeUserName: row.userName, //负责人用户姓名
        sendProjectType: row.sendProjectType, //邀请方发送项目类型:1:自动 2:手动
        receiveProjectType: row.receiveProjectType == 1 ? 2 : 1, //邀请方接收项目类型:1:自动 2:手动
      };
      api.updateInvitationBindUser(params).then(() => {
        listLoading.value = false;
        queryData();
        ElMessage.success({
          message: "修改成功",
          center: true,
        });
      });
    } catch (error) {
    } finally {
      listLoading.value = false;
    }
  } else if (row.receiveProjectType == 2 && name == "自动") {
    //弹出部门负责人
    let obj = {
      chargeUserId: row.userId,
      invitationType: row.invitationType,
      chargeUserName: row.userName,
      id: row.id,
    };
    userRef.value.showEdit(obj, "请选择负责部门/人");
  }
};
//勾选部门人回传数据
function userData(data1: any) {
  try {
    listLoading.value = true;
    let params = {
      id: id.value,
      chargeUserId: data1.chargeUserId, //负责人UserId
      invitationType: data1.invitationType, //邀请类型
      chargeUserName: data1.chargeUserName, //负责人用户姓名
      sendProjectType: data1.sendProjectType, //邀请方发送项目类型:1:自动 2:手动
      receiveProjectType: data1.receiveProjectType == 1 ? 2 : 1, //邀请方接收项目类型:1:自动 2:手动
    };

       //判断如果为数组改为字符串，data.value.form.chargeUserId
       if (Array.isArray(params.chargeUserId)) {
        params.chargeUserId = params.chargeUserId[0];
       }
    api.updateInvitationBindUser(params).then(() => {
      listLoading.value = false;
      queryData();
      ElMessage.success({
        message: "修改成功",
        center: true,
      });
    });
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
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
        :data="tableList"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column align="left" type="selection" />
        <el-table-column
          v-if="checkList.includes('bindStatus')"
          align="left"
          prop="bindStatus"
          show-overflow-tooltip
          label="状态"
          width="100"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <el-text v-if="row.bindStatus === 2" type="success">合作</el-text>
              <el-text v-if="row.bindStatus === 4" type="danger">解约</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('bindStatus')"
          align="left"
          prop="sendProjectType"
          label="发送项目"
          width="160"
        >
          <template #default="{ row }">
            <!-- <div class="fontC-System">
              <el-text v-if="row.sendProjectType === 1" type="success">自动</el-text>
              <el-text v-if="row.sendProjectType === 2" type="danger">手动</el-text>
            </div> -->
            <el-button
              :type="row.sendProjectType === 1 ? 'primary' : ''"
              size="small"
              @click="changeSendProjectType('自动', row)"
              >自动
            </el-button>
            <el-button
              :type="row.sendProjectType === 2 ? 'primary' : ''"
              size="small"
              @click="changeSendProjectType('手动', row)"
              >手动</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('receiveProjectType')"
          align="left"
          prop="receiveProjectType"
          label="接收项目"
          width="160"
        >
          <template #default="{ row }">
            <el-button
              :type="row.receiveProjectType === 1 ? 'primary' : ''"
              size="small"
              @click="changeReceiveProjectType('自动', row)"
              >自动
            </el-button>
            <el-button
              :type="row.receiveProjectType === 2 ? 'primary' : ''"
              size="small"
              @click="changeReceiveProjectType('手动', row)"
              >手动</el-button
            >
            <!-- <div class="fontC-System">
              <el-text v-if="row.receiveProjectType === 1" type="success">自动</el-text>
              <el-text v-if="row.receiveProjectType === 2" type="danger">手动</el-text>
            </div> -->
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('beInvitationTenantId')"
          align="left"
          prop="beInvitationTenantId"
          width="200"
          label="合作商ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine beInvitationTenantId">
                <el-tooltip
                  effect="dark"
                  :content="row.beInvitationTenantId"
                  placement="top-start"
                >
                  {{ row.beInvitationTenantId }}
                </el-tooltip>

                <!-- {{ row.beInvitationTenantId }} -->
              </div>
              <copy
                :content="row.beInvitationTenantId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy" :content="row.beInvitationTenantId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('beInvitationTenantName')"
          align="left"
          prop="beInvitationTenantName"
          show-overflow-tooltip
          label="合作商公司名称"
        >
          <template #default="{ row }">
            <div class="tableBig">{{ row.beInvitationTenantName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('userName')"
          align="left"
          prop="userName"
          show-overflow-tooltip
          label="负责部门"
        >
          <template #default="{ row }">
            <div class="flex-s">
              <div class="fontC-System">{{ row.userName ? row.userName : '-' }}</div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'chargeUserId')"
                :class="{ edit: 'edit', current: row.id === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('priceRatio')"
          align="left"
          prop="priceRatio"
          show-overflow-tooltip
          label="价格比例"
        >
          <template #default="{ row }">
            <div class="fontC-System">{{ row.priceRatio }}%</div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          v-if="checkList.includes('pendBalance')"
          align="left"
          prop="pendBalance"
          show-overflow-tooltip
          label="待审金额"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.pendBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('availableBalance')"
          align="left"
          prop="availableBalance"
          show-overflow-tooltip
          label="可用金额"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.availableBalance || 0 }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="checkList.includes('personalPendBalance')"
          align="left"
          prop="personalPendBalance"
          show-overflow-tooltip
          label="个人待审金额"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.personalPendBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('personalAvailableBalance')"
          align="left"
          prop="personalAvailableBalance"
          show-overflow-tooltip
          label="个人可用金额"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{ row.personalAvailableBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          fixed="right"
          prop="i"
          label="操作"
          width="280"
        >
          <template #default="{ row }">
            <ElSpace>
              <el-button size="small" type="primary" plain @click="priceRatio(row)">
                合作配置
              </el-button>
              <el-button
                v-if="row.bindStatus === 2"
                type="danger" plain
                size="small"
                @click="termination(row)"
              >
                终止合作
              </el-button>

            <el-button type="warning" plain size="small" @click="openLog(row)">
                财务日志
              </el-button>
                <!-- <el-button type="danger" plain size="small"> 加减款 </el-button>-->
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
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
      <customerEdit ref="editRef" @fetch-data="queryData" />
      <customerProportion ref="proportionRef" @fetch-data="queryData" />
      <financialLog ref="financialLogRef" @fetch-data="queryData" />
    </PageMain>
    <QuickEdit ref="QuickEditRef" @fetchData="fetchData" />
    <userPM ref="userRef" @userData="userData" />
  </div>
</template>

<style scoped lang="scss">
.rowCopy {
  width: 20px;
  display: none;
}
.copyId .current {
  display: block !important;
}
.el-table__row:hover .rowCopy {
  display: block;
}
.beInvitationTenantId {
  font-size: 0.875rem;
}
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

  > div:nth-of-type(1) {
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
</style>
