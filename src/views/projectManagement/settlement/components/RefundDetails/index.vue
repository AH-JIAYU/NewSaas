<script setup lang="ts">
import { ref } from "vue";
import api from "@/api/modules/project_settlement";
import empty from "@/assets/images/empty.png";
import fileExport from "@/utils/flie_export";
defineOptions({
  name: "RefundDetails",
});
// 下拉列表
const listArr = [
  { label: "内部站", value: 1 },
  { label: "供应商", value: 2 },
  { label: "合作商", value: 3 },
  //1.内部站 2.供应商 3.合作商
];
// 搜索
const queryForm = reactive<any>({
  type: [],
  id: "",
});
// 查看弹框
const dialogVisible = ref<any>(false);
const form = ref<any>({});
const list = ref<any>([]);
const data = ref<any>({});
const loading = ref(false);
const examineSuccess = ref<any>(0); //成功条数
const examineFail = ref<any>(0); //失败条数
// 弹框开关变量
const dialogTableVisible = ref(false);
const id = ref(); //项目id
// 获取数据
async function showEdit(row: any) {
  examineSuccess.value = 0;
  examineFail.value = 0;
  try {
    loading.value = true;
    form.value = JSON.parse(row);
    id.value = form.value.projectId;
    getData();

    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

async function getData() {
  examineSuccess.value = 0;
  examineFail.value = 0;
  const res = await api.getProjectSettlementDetails({
    projectId: id.value,
    type: queryForm.type,
    id: queryForm.id,
  });

  //获取总条数
  if (res.data.length == 0) {
    examineSuccess.value = 0;
    examineFail.value = 0;
  } else {
    //根据来源过滤去重

    if (queryForm.type.length != 0) {
      list.value = res.data.filter((item: any) =>
        queryForm.type.includes(item.type)
      );
    } else {
      list.value = res.data;
    }

    list.value.forEach((item: any) => {
      if (item.failCount != 0 && item.failCount != null) {
        examineFail.value += Number(item.failCount);
      }
      if (item.successCount != 0 && item.successCount != null) {
        examineSuccess.value += Number(item.successCount);
      }
    });
  }
}

const detailList = ref<any>([]);
// 查看
async function see(row: any) {
  dialogVisible.value = true;

  const res = await api.getProjectSettlementClickIdDetails({
    projectId: id.value,
    type: row.type,
    id: row.id,
  });

  detailList.value = res.data;
}
// 导出
async function exportExcl(row: any) {
  if (row) {
    //项目结算点击id详情导出
    try {
      let params = {
        projectId: id.value,
        type: row.type,
        id: row.id,
      };

      const list = await api.exportProjectSettlementClickIdDetails(params);

      const name = "项目结算点击id详情.xlsx";
      await fileExport(list, name);
    } catch (error) {
      console.error("导出失败", error);
    }
  } else {
    //项目详情导出
    try {
      let params = {
        projectId: id.value,
        type: queryForm.type,
        id: queryForm.id,
      };

      const list = await api.exportProjectSettlementDetails(params);

      const name = "项目结算详情.xlsx";
      await fileExport(list, name);
    } catch (error) {
      console.error("导出失败", error);
    }
  }
}
// 弹框关闭事件
function closeHandler() {
  // // 重置表单
  Object.assign(form, {});
  Object.assign(list, []);
  dialogTableVisible.value = false;
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer
      v-model="dialogTableVisible"
      title="审核详情"
      size="50%"
      :before-close="closeHandler"
    >
      <!-- <el-divider content-position="left" /> -->
      <div class="examineStatus">
        <div class="left">
          <svg
            style="margin-right: 8px"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <g id="Check-one (æ ¡éª)">
              <path
                id="Vector"
                d="M8.00065 15.1663C9.84158 15.1663 11.5083 14.4201 12.7147 13.2137C13.9211 12.0073 14.6673 10.3406 14.6673 8.49967C14.6673 6.65874 13.9211 4.99207 12.7147 3.78563C11.5083 2.5792 9.84158 1.83301 8.00065 1.83301C6.15972 1.83301 4.49305 2.5792 3.2866 3.78563C2.08018 4.99207 1.33398 6.65874 1.33398 8.49967C1.33398 10.3406 2.08018 12.0073 3.2866 13.2137C4.49305 14.4201 6.15972 15.1663 8.00065 15.1663Z"
                fill="#03C239"
              />
              <path
                id="Vector_2"
                d="M5.33398 8.5L7.33398 10.5L11.334 6.5"
                stroke="#D7FFE2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          审核成功：{{ examineSuccess }}
        </div>
        <div class="right">
          <svg
            style="margin-right: 8px"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <g id="Close-one (å³é­)">
              <path
                id="Vector"
                d="M8.00065 15.1663C11.6826 15.1663 14.6673 12.1816 14.6673 8.49967C14.6673 4.81777 11.6826 1.83301 8.00065 1.83301C4.31875 1.83301 1.33398 4.81777 1.33398 8.49967C1.33398 12.1816 4.31875 15.1663 8.00065 15.1663Z"
                fill="#FB6868"
              />
              <path
                id="Vector_2"
                d="M9.88647 6.61426L6.11523 10.3855"
                stroke="#FFDCDC"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M6.11523 6.61426L9.88647 10.3855"
                stroke="#FFDCDC"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          审核失败：{{ examineFail }}
        </div>
      </div>
      <el-row style="margin: 1rem 0" :gutter="20">
        <el-form
          style="width: 100%; height: 2rem; display: flex"
          :model="queryForm"
          ref="form"
          label-width="43px"
          :inline="false"
        >
          <el-col :span="11">
            <el-form-item label="来源">
              <el-select
                v-model="queryForm.type"
                value-key=""
                placeholder="请选择来源类型"
                multiple
                clearable
                filterable
                @change="getData"
              >
                <el-option
                  v-for="item in listArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="搜索">
              <el-input
                v-model="queryForm.id"
                placeholder="请输入搜索供应商/供应商ID"
                @change="getData"
              >
                <template #prefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g id="Search (æç´¢)">
                      <path
                        id="Vector"
                        d="M6.1263 11.0827C8.8647 11.0827 11.0846 8.86275 11.0846 6.12435C11.0846 3.38595 8.8647 1.16602 6.1263 1.16602C3.3879 1.16602 1.16797 3.38595 1.16797 6.12435C1.16797 8.86275 3.3879 11.0827 6.1263 11.0827Z"
                        stroke="#C6C6C6"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Vector_2"
                        d="M9.68945 9.68945L12.1643 12.1643"
                        stroke="#C6C6C6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="default" @click="exportExcl('')"
              >导出</el-button
            >
          </el-col>
        </el-form>
      </el-row>
      <!-- <el-row style="width: 100%; margin-left: 2px; margin-bottom: 20px" :gutter="20">
        <el-table :data="[form]" v-loading="loading" bordered>
          <el-table-column label="项目ID" prop="id" fixed="left">
            <template #default="{ row }">
              {{ row.id ? row.id : "-" }}
            </template>
</el-table-column>
<el-table-column label="项目名称" prop="projectName">
  <template #default="{ row }">
              {{ row.projectName ? row.projectName : "-" }}
            </template>
</el-table-column>
<el-table-column label="项目退款率" width="100">
  <template #default="{ row }">
              {{ data.refundRate ? data.refundRate : "-" }}
            </template>
</el-table-column>
</el-table>
</el-row> -->
      <el-table
        v-loading="loading"
        :data="list"
        row-key="id"
        @current-change="handleCurrentChange"
        highlight-current-row
      >
        <el-table-column align="left" prop="id" label="来源" width="200">
          <template #default="{ row }">
            <p>
              <span class="tableBig">
                <el-tag
                  effect="dark"
                  style="background-color: #fb6868; border: none"
                  v-if="row.type === 2"
                  type="primary"
                  >供应商</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background: #ffac54; border: none"
                  v-else-if="row.type === 1"
                  type="warning"
                  >内部站</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #379aff; border: none"
                  v-else-if="row.type === 3"
                  type="warning"
                  >合作商</el-tag
                >
              </span>
            </p>

            <div class="copyId tableSmall" v-if="row.type != 1">
              <div class="id oneLine">
                <el-tooltip
                  effect="dark"
                  :content="row.id"
                  placement="top-start"
                >
                  {{ row.id }}
                </el-tooltip>
              </div>
              <copy v-if="row.id" :content="row.id" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="failCount" label="失败数量">
          <template #default="{ row }">
            {{ row.failCount ? row.failCount : 0 }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="successCount" label="通过数量">
          <template #default="{ row }">
            {{ row.successCount ? row.successCount : 0 }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="unitPrice" label="单价">
          <template #default="{ row }">
            <!-- 内部站,单价需要有个查看按钮， -->
            <div class="fontC-System" v-if="row.type != 1">
              <svg
                v-if="row.currencyType === 'USD'"
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
              >
                <path
                  id="Vector"
                  d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                  fill="#333333"
                />
              </svg>
              <svg
                v-if="row.currencyType === 'CNY'"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
              >
                <path
                  id="Vector"
                  d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                  fill="#333333"
                />
              </svg>
              <CurrencyType v-if="!row.currencyType" />{{ row.unitPrice || 0 }}
            </div>
            <div v-else>
              {{ "-" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="totalPrice" label="支付总额">
          <template #default="{ row }">
            <div class="fontC-System">
              <svg
                v-if="row.currencyType === 'USD'"
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
              >
                <path
                  id="Vector"
                  d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                  fill="#333333"
                />
              </svg>
              <svg
                v-if="row.currencyType === 'CNY'"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
              >
                <path
                  id="Vector"
                  d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                  fill="#333333"
                />
              </svg>
              <CurrencyType v-if="!row.currencyType" />{{ row.totalPrice || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template #default="{ row }">
            <el-button type="primary" plain size="small" @click="see(row)"
              >查看</el-button
            >
            <el-button
              type="warning"
              plain
              size="small"
              @click="exportExcl(row)"
              >导出</el-button
            >
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <el-dialog v-model="dialogVisible" title="查看详情" width="300">
        <div class="top">
          <p>审核通过×{{ detailList.successSize }}</p>
          <div class="list-item">
            <div
              v-for="item in detailList.successList"
              class="copyText"
              :key="item"
            >
              <span>ID：{{ item }} </span>
              <copy :content="item" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <p>审核失败×{{ detailList.failSize }}</p>
          <div class="list-item">
            <div
              v-for="item in detailList.failList"
              class="copyText"
              :key="item"
            >
              <span>ID：{{ item }} </span>
              <copy :content="item" />
            </div>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              type="primary"
              size="default"
              @click="dialogVisible = false"
              >关闭</el-button
            >
          </div>
        </template>
      </el-dialog>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.copyId .id {
  font-size: 0.875rem;
}

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
.current {
  display: block !important;
}
.border {
  display: flex;
  align-items: center;
  width: 33%;
  height: 2.5625rem;
  margin: 0;
  border: 1px solid #ebeef5;
}

.pp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 36%;
  height: 100%;
  font-size: 14px;
  color: #606266;
  background-color: #fafafa;
}

.neip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 63%;
  height: 100%;
  border-left: 1px solid #ebeef5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
}

:deep(.dialog-footer) {
  text-align: center;
}

.examineStatus {
  display: flex;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.5rem;
    padding: 0.375rem 1rem;
    width: 10.5rem;
    height: 2.1875rem;
    background: #e2ffea;
    border-radius: 4px 4px 4px 4px;
    color: #03c239;
    font-size: 16px;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.375rem 1rem;
    width: 10.5rem;
    height: 2.1875rem;
    background: #ffeaea;
    border-radius: 4px 4px 4px 4px;
    color: #fb6868;
    font-size: 16px;
  }
}

:deep(.el-tag.el-tag--info) {
  border-radius: 20px;
  color: #88c1ff;
  background-color: #e0efff;
}
:deep(.el-dialog__body) {
  min-height: 300px;
}
.list-item {
  height: 12.5rem;
  overflow: auto;
}
.top {
  width: 42rem;
  // min-height: 7.625rem;
  margin-bottom: .625rem;
  border-radius: 0px 0px 0px 0px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.5625rem;
    height: 1.625rem;
    background: #03c239;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
  .copyText {
    display: flex;
    align-items: center;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;

    span {
      display: inline-block;
      // width: 9.5625rem;
      // height: 1.125rem;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      // line-height: 0.875rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}

.bottom {
  width: 42rem;
  // min-height: 7.625rem;
  border-radius: 0px 0px 0px 0px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.5625rem;
    height: 1.625rem;
    background: #fb6868;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .copyText {
    display: flex;
    align-items: center;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;

    span {
      display: inline-block;
      // width: 9.5625rem;
      // height: 1.125rem;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      // line-height: 0.875rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
