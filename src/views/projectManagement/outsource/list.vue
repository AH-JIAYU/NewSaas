<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import edit from "./components/Edit/index.vue";
import allocationEdit from "../list/components/AllocationEdit/index.vue";
import api from "@/api/modules/projectManagement_outsource";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";
import empty from "@/assets/images/empty.png";
// import userDialog from "@/components/departmentHead/index.vue"; //部门人
import userDialog from "./components/userPM/index.vue";
import { useI18n } from "vue-i18n";
import { rowKey } from "element-plus/es/components/table-v2/src/common.mjs";
defineOptions({
  name: "outsource",
});
const projectManagementOutsourceStore = useProjectManagementOutsourceStore();
// const { format } = useTimeago();
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const tableSortRef = ref();
const tableSortRef2 = ref();
// 获取组件变量
const addAllocationEditRef = ref();
// loading加载
const listLoading = ref<boolean>(true);
const border = ref(false);
// 获取组件变量
const editRef = ref();
const data = ref<any>({
  selectList: [],
});
// 国际化
const { t } = useI18n();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const formSearchList = ref<any>(); //表单排序配置
const formSearchList2 = ref<any>(); //表单排序配置接收项目
const formSearchName = ref<string>("formSearch-outsource"); // 表单排序name
const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref<any>([
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.partnerID")),
    prop: "tenantId",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.receivingStatus")),
    prop: "receiveStatus",
  },
  { sotrtable: true, checked: true, label: "PM", prop: "userName" },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.partnerName")),
    prop: "tenantName",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.distribution")),
    prop: "allocationType",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.projectPrice")),
    prop: "doMoneyPrice",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.projectID")),
    prop: "projectId",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.projectName")),
    prop: "projectName",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.participate")),
    prop: "participationNumber",
  },
  {
    sotrtable: true,
    checked: true,
    label: computed(() => t("outsource.status")),
    prop: "projectStatus",
  },
]);

// 查询参数
const queryForm = reactive<any>({
  projectId: "", //项目id
  tenantId: "", //合作商id
  tenantName: "", //	合作商名称
  projectStatus: [], //	1:进行中(在线) 2:已完成(审核通过) 3:离线
  receiveStatus: "", //1.自动已接收，2.手动未接收
  type: 1,
});
const list = ref<any>([]);
// 分配
function distribution(row: any) {
  row.name = row.tenantName;
  addAllocationEditRef.value.showEdit(row, "distribution");
}
// 重新分配
function reassign(row: any) {
  addAllocationEditRef.value.showEdit(row, "reassign");
}

//接收
// 详情
function editData(row: any) {
  editRef.value.showEdit(row, queryForm.type === 2 ? 1 : 0);
}

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
    tenantId: "", //合作商id
    tenantName: "", //	合作商名称
    projectStatus: [], //	1:进行中(在线) 2:已完成(审核通过) 3:离线
    type: 1,
  });
  fetchData();
}
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.type === 1) {
      const res = await api.list(params);
      list.value = res.data.projectAllocationInfoList;
      pagination.value.total = res.data.total;
    } else {
      const res = await api.meList(params);
      list.value = res.data.projectMeAllocationInfoList;
      pagination.value.total = res.data.total;
    }
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("outsource.projectID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "tenantId",
      placeholder: computed(() => t("outsource.partnerID")),
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "tenantName",
      placeholder: computed(() => t("outsource.partnerName")),
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "projectStatus",
      placeholder: computed(() => t("outsource.projectStatus")),
      option: "projectStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
  ];
  formSearchList2.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("outsource.projectID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "tenantId",
      placeholder: computed(() => t("outsource.partnerID")),
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "tenantName",
      placeholder: computed(() => t("outsource.partnerName")),
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "projectStatus",
      placeholder: computed(() => t("outsource.projectStatus")),
      option: "projectStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
    {
      index: 5,
      show: true,
      type: "select",
      modelName: "receiveStatus",
      placeholder: computed(() => t("outsource.receivingStatus")),
      option: "receiveStatus",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});

const receiveStatusList = [
  {
    value: 1,
    label: computed(() => t("outsource.auto")),
  },
  {
    value: 2,
    label: computed(() => t("outsource.handle")),
  },
];
const formOption = {
  projectStatus: () =>
    projectManagementOutsourceStore.projectStatusList.map((item, index) => ({
      label: item,
      value: index + 1,
    })),
  receiveStatus: () => receiveStatusList,
};
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.projectId;
  else current.value = "";
}
const userRef = ref();
//接收-批量
function addReceiveAll() {
  const selectList = tableSortRef2.value.getSelectionRows();
  if (selectList.length == 0) {
    ElMessage.warning({
      message: t("outsource.projectSelect"),
      center: true,
    });
    return;
  } else {
    //循环判断，如果勾选的数据有已接收的，给出提示，已接收的项目不能再次接收，请重新选择
    let flagNum = selectList.length; //默认勾选的全部都是未接收的receiveStatus == 2
    selectList.forEach((item: any) => {
      if (item.receiveStatus == 1) {
        //如果有已接收的，加数
        flagNum++;
      }
    });
    if (flagNum != selectList.length) {
      ElMessage.warning({
        message: t("outsource.again1"),
        center: true,
      });
    } else {
      data.value.receivingMode = t("outsource.lotRecieve");
      data.value.selectList = selectList;

      userRef.value.showEdit("", t("outsource.recieve"), selectList);
    }
  }
}
//取消接收-批量
function delReceiveAll() {
  const selectList = tableSortRef2.value.getSelectionRows();
  if (selectList.length == 0) {
    ElMessage.warning({
      message: t("outsource.projectSelect"),
      center: true,
    });
    return;
  } else {
    //循环判断，如果勾选的数据有未接收的，给出提示，未接收的项目不能取消接收，请重新选择
    let flagNum = selectList.length; //默认勾选的全部都是已接收的的receiveStatus == 1
    selectList.forEach((item: any) => {
      if (item.receiveStatus == 2) {
        //如果有未接收的，加数
        flagNum++;
      }
    });
    if (flagNum != selectList.length) {
      ElMessage.warning({
        message: t("outsource.again2"),
        center: true,
      });
    } else {
      ElMessageBox.confirm(t("outsource.ask"), t("outsource.confirmInfo"))
        .then(() => {
          try {
            listLoading.value = true;
            let idList: any = [];
            selectList.forEach((item: any) => {
              idList.push(item.id);
            });
            let params = {
              type: 2, //取消接收
              idList: idList,
            };
            api.updateReceiveStatus(params).then(() => {
              listLoading.value = false;
              fetchData();
              ElMessage.success({
                message: t("outsource.cancelSuccess"),
                center: true,
              });
            });
          } catch (error) {
          } finally {
            listLoading.value = false;
          }
        })
        .catch(() => {});
    }
  }
}
//接收-单个
function addReceive(row: any) {
  data.value.selectList = [row];
  userRef.value.showEdit("", t("outsource.recieve"), [row]);
}
//取消接收-单个
function delreceive(row: any) {
  ElMessageBox.confirm(t("outsource.ask"), t("outsource.confirmInfo"))
    .then(() => {
      try {
        listLoading.value = true;
        let params = {
          type: 2, //取消接收
          idList: [row.id],
        };
        api.updateReceiveStatus(params).then(() => {
          listLoading.value = false;
          fetchData();
          ElMessage.success({
            message: t("outsource.cancelSuccess"),
            center: true,
          });
        });
      } catch (error) {
      } finally {
        listLoading.value = false;
      }
    })
    .catch(() => {});
}
//勾选部门人回传数据
function userData(data1: any) {
  data.value.chargeUserId = data1.chargeUserId; //负责人UserId
  data.value.invitationType = data1.invitationType; //邀请类型，1员工，2部门
  data.value.chargeUserName = data1.chargeUserName; //负责人名称
  //判断是多选还是单选
  let idList: any = [];
  data.value.selectList.forEach((item: any) => {
    idList.push(item.id);
  });
  try {
    listLoading.value = true;
    let params = {
      type: 1, //接收
      idList: idList,
      userId: data1.chargeUserId,
      userName: data1.chargeUserName,
      allocationType: data1.invitationType,
    };
    api.updateReceiveStatus(params).then(() => {
      listLoading.value = false;
      fetchData();
      ElMessage.success({
        message: t("outsource.recieveSuccess"),
        center: true,
      });
    });
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
//拒绝
const downReceive = (row: any) => {
  ElMessageBox.confirm(t("outsource.refuse"), t("outsource.confirmInfo"))
    .then(() => {
      try {
        listLoading.value = true;
        let params = {
          type: 3, //拒绝
          idList: [row.id],
        };
        api.updateReceiveStatus(params).then(() => {
          listLoading.value = false;
          fetchData();
          ElMessage.success({
            message: t("outsource.refuseSuccess"),
            center: true,
          });
        });
      } catch (error) {
      } finally {
        listLoading.value = false;
      }
    })
    .catch(() => {});
};
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <el-tabs v-model="queryForm.type" @tab-change="fetchData">
        <el-tab-pane :label="t('outsource.reciveProject')" :name="1">
          <FormSearch
            v-if="queryForm.type === 1"
            :formSearchList="formSearchList2"
            :formSearchName="formSearchName"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="queryForm"
            :formOption="formOption"
          />
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel>
              <el-button
                type="primary"
                size="default"
                @click="addReceiveAll"
                v-auth="'outsource-update-updateReceiveStatus'"
              >
                {{ t("outsource.reciveProject") }}
              </el-button>
              <el-button
                size="default"
                @click="delReceiveAll"
                v-auth="'outsource-update-updateReceiveStatus'"
              >
                {{ t("outsource.cancelRecieve") }}
              </el-button>
            </FormLeftPanel>
            <FormRightPanel>
              <el-button size="default" @click="">
                {{ t("outsource.export") }}
              </el-button>
              <TabelControl
                v-model:border="border"
                v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList"
                v-model:columns="columns"
                v-model:line-height="lineHeight"
                v-model:stripe="stripe"
                style="margin-left: 12px"
                @query-data="currentChange"
              />
            </FormRightPanel>
          </el-row>
          <el-table
            ref="tableSortRef2"
            style="margin-top: 10px"
            row-key="id"
            :data="list"
            :border="border"
            :size="lineHeight"
            highlight-current-row
            :stripe="stripe"
            @current-change="handleCurrentChange"
          >
            <el-table-column align="left" type="selection" />
            <el-table-column
              v-if="checkList.includes('projectStatus')"
              show-overflow-tooltip
              prop="projectStatus"
              align="left"
              :label="t('outsource.status')"
              width="140"
            >
              <template #default="{ row }">
                <span class="tableBig">
                  <el-text v-if="row.projectStatus === 1" type="primary">
                    {{ t("outsource.underWay") }}</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 2" type="warning">
                    {{ t("outsource.complete") }}</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 3" type="info">
                    {{ t("outsource.offline") }}</el-text
                  >
                </span>
                <!-- <span class="tableBig">{{
                  projectManagementOutsourceStore.projectStatusList[
                    row.projectStatus - 1
                  ]
                }}
                </span>-->
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('receiveStatus')"
              show-overflow-tooltip
              prop="receiveStatus"
              align="left"
              :label="t('outsource.receivingStatus')"
              width="140"
            >
              <template #default="{ row }">
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  v-if="row.receiveStatus == 2"
                  type="danger"
                  >{{ t("outsource.notReceive") }}</el-text
                >
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  v-if="row.receiveStatus == 1"
                  type="success"
                  >{{ t("outsource.alreadyReceived") }}</el-text
                >
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="tenantName"
              align="left"
              :label="t('outsource.partner')"
              width="200"
            >
              <template #default="{ row }">
                <div class="tableBig" v-if="checkList.includes('tenantName')">
                  {{ row.tenantName }}
                </div>
                <div
                  class="copyId tableSmall"
                  v-if="checkList.includes('tenantId')"
                >
                  <div class="id oneLine projectId" style="font-size: 12px">
                    {{ row.tenantId }}
                  </div>
                  <copy
                    :content="row.tenantId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                    class="littleButton"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="projectName"
              align="left"
              :label="t('outsource.project')"
              width="200"
            >
              <template #default="{ row }">
                <div class="tableBig" v-if="checkList.includes('projectName')">
                  {{ row.projectName }}
                </div>
                <div
                  class="copyId tableSmall"
                  v-if="checkList.includes('projectId')"
                >
                  <div class="id oneLine projectId" style="font-size: 12px">
                    <el-tooltip
                      effect="dark"
                      :content="row.projectId"
                      placement="top-start"
                    >
                      {{ row.projectId }}
                    </el-tooltip>
                  </div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                    class="littleButton"
                  />
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              v-if="checkList.includes('projectId')"
              show-overflow-tooltip
              prop="projectId"
              align="left"
              width="280"
              label="项目ID"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    <el-tooltip
                      effect="dark"
                      :content="row.projectId"
                      placement="top-start"
                    >
                      {{ row.projectId }}
                    </el-tooltip>
                  </div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                </div>
              </template>
            </el-table-column> -->

            <!-- <el-table-column
              v-if="checkList.includes('tenantId')"
              show-overflow-tooltip
              prop="tenantId"
              align="left"
              label="合作商ID"
              width="280"
              ><template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    {{ row.tenantId }}
                  </div>
                  <copy
                    :content="row.tenantId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              v-if="checkList.includes('allocationType')"
              align="left"
              :label="t('outsource.distribution')"
              width="120"
            >
              <template #default="{ row }">
                <el-button
                  class="tableBut"
                  size="small"
                  type="danger"
                  v-if="row.allocationType === 1"
                  plain
                  >{{ t("outsource.automaticAllocation") }}</el-button
                >
                <el-button
                  class="tableBut"
                  size="small"
                  type="danger"
                  v-else-if="row.allocationType === 2"
                  >{{ t("outsource.supplier") }}</el-button
                >
                <el-button
                  class="tableBut"
                  size="small"
                  type="success"
                  v-else-if="row.allocationType === 3"
                  >{{ t("outsource.department") }}</el-button
                >
                <el-button
                  class="tableBut"
                  size="small"
                  type="primary"
                  v-else-if="row.allocationType === 4"
                  >{{ t("outsource.partner") }}</el-button
                >
                <el-button size="small" v-else class="tableBut">
                  {{ t("outsource.undistributed") }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('doMoneyPrice')"
              show-overflow-tooltip
              align="left"
              :label="t('outsource.projectPrice')"
              width="120"
            >
              <template #default="{ row }">
                <div><CurrencyType />{{ row.doMoneyPrice || 0 }}</div>
              </template>
            </el-table-column>

            <el-table-column
              v-if="checkList.includes('participationNumber')"
              show-overflow-tooltip
              prop="participationNumber"
              align="left"
              :label="t('outsource.argument')"
              width="300"
            >
              <template #default="{ row }">
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  type="danger"
                  >{{ t("outsource.participateIn") }}
                  {{ row.participationNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  type="success"
                  >{{ t("outsource.completed") }}
                  {{ row.doneNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(255, 172, 84)"
                  class="oneLine"
                  type="warning"
                  >{{ t("outsource.quota") }} {{ row.num || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(170, 170, 170)"
                  class="oneLine"
                  type="info"
                  >{{ t("outsource.limited") }}
                  {{ row.limitedQuantity || "-" }}</el-text
                >
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('userName')"
              show-overflow-tooltip
              prop="userName"
              align="left"
              :label="t('outsource.personInCharge')"
              width="140"
            >
              <template #default="{ row }">
                <div class="flex-c">
                  <div class="oneLine" style="width: calc(100% - 1.25rem)">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="row.userName"
                      placement="top-start"
                    >
                      <div class="tableBig overflow">
                        {{ row.userName ? row.userName : "-" }}
                      </div>
                    </el-tooltip>
                  </div>
                  <SvgIcon
                    v-if="row.receiveStatus == 1"
                    @click="addReceive(row)"
                    :class="{
                      edit: 'edit',
                      current: row.projectId === current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              :label="t('outsource.control')"
              width="220"
            >
              <template #default="{ row }">
                <!-- <el-button
                  v-if="row.allocationStatus === 1"
                  plain
                  :disabled="row.isOnline === 2"
                  type="primary"
                  size="small"
                  @click="distribution(row)"
                >
                  分配
                </el-button>
                <el-button
                  v-else
                  plain
                  type="primary"
                  :disabled="row.isOnline === 2"
                  size="small"
                  @click="reassign(row)"
                >
                  重新分配
                </el-button> -->
                <!-- 1，已接收，2手动，未接收 -->
                <el-button
                  v-if="row.receiveStatus == 2"
                  plain
                  type="primary"
                  size="small"
                  @click="addReceive(row)"
                  v-auth="'outsource-update-updateReceiveStatus'"
                >
                  {{ t("outsource.resieved") }}
                </el-button>
                <el-button
                  v-if="row.receiveStatus == 1"
                  plain
                  type="primary"
                  size="small"
                  @click="delreceive(row)"
                  v-auth="'outsource-update-updateReceiveStatus'"
                >
                  {{ t("outsource.cancelRecieve") }}
                </el-button>
                <el-button
                  down
                  v-if="row.receiveStatus == 2"
                  plain
                  type="danger"
                  size="small"
                  @click="downReceive(row)"
                  v-auth="'outsource-update-updateReceiveStatus'"
                >
                  {{ t("outsource.refused") }}
                </el-button>
                <el-button
                  type="warning"
                  plain
                  size="small"
                  @click="editData(row)"
                  v-auth="'outsource-get-getTenantMeasurementList'"
                >
                  {{ t("outsource.detail") }}
                </el-button>
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
        </el-tab-pane>
        <el-tab-pane :label="t('outsource.outsourcingProject')" :name="2">
          <FormSearch
            v-if="queryForm.type === 2"
            :formSearchList="formSearchList"
            :formSearchName="formSearchName"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="queryForm"
            :formOption="formOption"
          />
          <ElDivider border-style="dashed" />
          <el-row :gutter="24">
            <FormLeftPanel> </FormLeftPanel>
            <FormRightPanel>
              <el-button size="default" @click="">
                {{ t("outsource.export") }}
              </el-button>
              <TabelControl
                v-model:border="border"
                v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList"
                v-model:columns="columns"
                v-model:line-height="lineHeight"
                v-model:stripe="stripe"
                style="margin-left: 12px"
                @query-data="currentChange"
              />
            </FormRightPanel>
          </el-row>
          <el-table
            ref="tableSortRef"
            v-loading="listLoading"
            style="margin-top: 10px"
            row-key="id"
            :data="list"
            :border="border"
            :size="lineHeight"
            :stripe="stripe"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column align="left" type="selection" />
            <el-table-column
              v-if="checkList.includes('projectStatus')"
              show-overflow-tooltip
              prop="receiveStatus"
              align="left"
              width="140"
              :label="t('outsource.status')"
            >
              <template #default="{ row }">
                <span class="tableBig">
                  <el-text v-if="row.projectStatus === 1" type="primary">
                    {{ t("outsource.underWay") }}</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 2" type="warning">
                    {{ t("outsource.complete") }}</el-text
                  >
                  <el-text v-else-if="row.projectStatus === 3" type="info">
                    {{ t("outsource.offline") }}</el-text
                  >
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantName')"
              show-overflow-tooltip
              prop="tenantName"
              align="left"
              :label="t('outsource.partnerName')"
            >
              <template #default="{ row }">
                <div class="tableBig">{{ row.tenantName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantId')"
              show-overflow-tooltip
              prop="tenantId"
              align="left"
              width="280"
              :label="t('outsource.partnerID')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">{{ row.tenantId }}</div>
                  <copy
                    :content="row.tenantId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.tenantId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectName')"
              show-overflow-tooltip
              prop="projectName"
              align="left"
              :label="t('outsource.projectName')"
            >
              <template #default="{ row }">
                <div class="tableBig oneLine">{{ row.projectName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('projectId')"
              show-overflow-tooltip
              prop="projectId"
              align="left"
              width="280"
              :label="t('outsource.projectID')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine projectId">
                    <el-tooltip
                      effect="dark"
                      :content="row.projectId"
                      placement="top-start"
                    >
                      {{ row.projectId }}
                    </el-tooltip>

                    <!-- {{ row.projectId }} -->
                  </div>
                  <copy
                    :content="row.projectId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.projectId === current,
                    }"
                  />
                  <!-- <copy class="copy" :content="row.projectId" /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('participationNumber')"
              show-overflow-tooltip
              prop="participationNumber"
              align="left"
              :label="t('outsource.argument')"
              width="300"
            >
              <template #default="{ row }">
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  type="danger"
                >
                  {{ t("outsource.participateIn") }}
                  {{ row.participationNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  type="success"
                  >{{ t("outsource.completed") }}
                  {{ row.doneNumber || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(255, 172, 84)"
                  class="oneLine"
                  type="warning"
                  >{{ t("outsource.quota") }} {{ row.num || 0 }}</el-text
                >
                &ensp;
                <el-text
                  style="color: rgb(170, 170, 170)"
                  class="oneLine"
                  type="info"
                  >{{ t("outsource.limited") }}
                  {{ row.limitedQuantity || "-" }}</el-text
                >
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              :label="t('outsource.control')"
              width="170"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="editData(row)"
                  v-auth="'outsource-get-getTenantMeasurementList'"
                >
                  {{ t("outsource.detail") }}
                </el-button>
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
        </el-tab-pane>
      </el-tabs>
      <allocationEdit ref="addAllocationEditRef" @fetchData="fetchData" />
      <edit ref="editRef" @fetch-data="fetchData" />
    </PageMain>
    <userDialog ref="userRef" @userData="userData" />
  </div>
</template>

<style scoped lang="scss">
.projectId {
  font-size: 0.875rem;
}

.copyId .current {
  display: block !important;
}

.rowCopy {
  width: 20px;
  display: none;
}

.el-table__row:hover .rowCopy {
  display: block;
}

:deep {
  table {
    width: 100% !important;
  }
}

.el-pagination {
  margin-top: 15px;
}

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
}

.el-table__row:hover .edit {
  display: block;
}

.flex-c {
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

.overflow {
  white-space: nowrap;
  /* 不允许文本换行 */
  overflow: hidden;
  /* 隐藏超出容器的文本 */
  text-overflow: ellipsis;
  /* 使用省略号表示超出部分 */
}

.littleButton {
  position: absolute;
  right: 10px;
}
</style>
