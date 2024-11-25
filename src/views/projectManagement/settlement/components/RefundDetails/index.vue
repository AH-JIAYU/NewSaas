<script setup lang="ts">
import { ref } from "vue";
import api from "@/api/modules/project_settlement";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "RefundDetails",
});
// 下拉列表
const listArr = [
  { label: '内部站', value: 1 },
  { label: '供应商', value: 2 },
  { label: '合作商', value: 3 },
  //1.内部站 2.供应商 3.合作商
]
// 搜索
const queryForm = reactive<any>({
  type: [],
  id: ''
})
// 查看弹框
const dialogVisible = ref<any>(false)
const form = ref<any>({});
const list = ref<any>([]);
const data = ref<any>({});
const loading = ref(false);
// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any) {
  try {
    loading.value = true;
    form.value = JSON.parse(row);
    console.log(row,'rrrr')

    const res = await api.getProjectSettlementDetails({ projectId: form.value.projectId ,type:queryForm.type,id:queryForm.id});
    // data.value = res.data;
    list.value = res.data.examineDetailsList;

    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
// 查看
const see = (row: any) => {
  dialogVisible.value = true;
}
// 导出
const exportExcl = (row: any) => {

}
// 弹框关闭事件
function closeHandler() {
  // // 重置表单
  Object.assign(form, {});
  Object.assign(list, []);
  Object.assign(data, {});
  dialogTableVisible.value = false;
}
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" title="审核详情" size="50%" :before-close="closeHandler">
      <!-- <el-divider content-position="left" /> -->
      <div class="examineStatus">
        <div class="left">
          <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
            fill="none">
            <g id="Check-one (æ ¡éª)">
              <path id="Vector"
                d="M8.00065 15.1663C9.84158 15.1663 11.5083 14.4201 12.7147 13.2137C13.9211 12.0073 14.6673 10.3406 14.6673 8.49967C14.6673 6.65874 13.9211 4.99207 12.7147 3.78563C11.5083 2.5792 9.84158 1.83301 8.00065 1.83301C6.15972 1.83301 4.49305 2.5792 3.2866 3.78563C2.08018 4.99207 1.33398 6.65874 1.33398 8.49967C1.33398 10.3406 2.08018 12.0073 3.2866 13.2137C4.49305 14.4201 6.15972 15.1663 8.00065 15.1663Z"
                fill="#03C239" />
              <path id="Vector_2" d="M5.33398 8.5L7.33398 10.5L11.334 6.5" stroke="#D7FFE2" stroke-linecap="round"
                stroke-linejoin="round" />
            </g>
          </svg>
          审核成功：
        </div>
        <div class="right">
          <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
            fill="none">
            <g id="Close-one (å³é­)">
              <path id="Vector"
                d="M8.00065 15.1663C11.6826 15.1663 14.6673 12.1816 14.6673 8.49967C14.6673 4.81777 11.6826 1.83301 8.00065 1.83301C4.31875 1.83301 1.33398 4.81777 1.33398 8.49967C1.33398 12.1816 4.31875 15.1663 8.00065 15.1663Z"
                fill="#FB6868" />
              <path id="Vector_2" d="M9.88647 6.61426L6.11523 10.3855" stroke="#FFDCDC" stroke-linecap="round"
                stroke-linejoin="round" />
              <path id="Vector_3" d="M6.11523 6.61426L9.88647 10.3855" stroke="#FFDCDC" stroke-linecap="round"
                stroke-linejoin="round" />
            </g>
          </svg>
          审核失败：100
        </div>
      </div>
      <el-row style="margin: 1rem 0;" :gutter="20">
        <el-form style="width: 100%; height: 2rem; display: flex;" :model="queryForm" ref="form" label-width="43px"
          :inline="false">
          <el-col :span="11">
            <el-form-item label="来源">
              <el-select v-model="queryForm.type" value-key="" placeholder="请选择来源类型" multiple clearable filterable
                >
                <el-option v-for="item in listArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="搜索">
              <el-input v-model="queryForm.id" placeholder="请输入搜索供应商/供应商ID">
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Search (æç´¢)">
                      <path id="Vector"
                        d="M6.1263 11.0827C8.8647 11.0827 11.0846 8.86275 11.0846 6.12435C11.0846 3.38595 8.8647 1.16602 6.1263 1.16602C3.3879 1.16602 1.16797 3.38595 1.16797 6.12435C1.16797 8.86275 3.3879 11.0827 6.1263 11.0827Z"
                        stroke="#C6C6C6" stroke-width="1.5" stroke-linejoin="round" />
                      <path id="Vector_2" d="M9.68945 9.68945L12.1643 12.1643" stroke="#C6C6C6" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="default">导出</el-button>
          </el-col>
        </el-form>
      </el-row>
      <!-- <el-row style="width: 100%; margin-left: 2px; margin-bottom: 20px" :gutter="20">
        <el-table :data="[form]" v-loading="loading" bordered>
          <el-table-column label="项目ID" prop="projectId" fixed="left">
            <template #default="{ row }">
              {{ row.projectId ? row.projectId : "-" }}
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
      <el-table v-loading="loading" :data="list" row-key="id">
        <!-- <el-table-column type="index" align="left" label="序号" width="55" /> -->
        <el-table-column align="left" prop="projectId" label="来源">
          <template #default="{ row }">
            <div>
              <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.type === 2"
              class="mx-1"
              type="primary"
              >供应商</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #05c9be; border: none"
              v-if="row.type === 1"
              class="mx-1"
              type="warning"
              >内部站</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #ffac54; border: none"
              v-if="row.allocationType === 3"
              class="mx-1"
              type="warning"
              >合作商</el-tag
            >
            </div>
            <div>
              ID:{{ row.projectId }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="examineFailList" label="失败数量">
          <template #default="{ row }">
            {{ row.examineFailList ? row.examineFailList.length : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="examineSuccessList" label="通过数量">
          <template #default="{ row }">
            {{ row.examineSuccessList ? row.examineSuccessList : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="unitPrice" label="单价">
          <template #default="{ row }">
            {{ row.unitPrice ? row.unitPrice : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="price" label="支付总额">
          <template #default="{ row }">
            {{ row.price ? row.price : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="left"  label="操作">
          <template #default="{ row }">
            <el-button type="primary" plain size="small" @click="see(row)">查看</el-button>
            <el-button type="warning" plain size="small" @click="exportExcl(row)">导出</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <el-dialog v-model="dialogVisible" title="查看详情" width="300">
        <div class="top">
          <p>审核通过x12345</p>
          <div v-for="item in 3" class="copyText">
            <span>ID：215135164616165165
            </span>
            <copy content="row.projectId" />
          </div>
        </div>
        <div class="bottom">
          <p>审核失败x12345</p>
          <div v-for="item in 3" class="copyText">
            <span>ID：215135164616165165
            </span>
            <copy content="row.projectId" />
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" size="default" @click="dialogVisible = false">关闭</el-button>
          </div>
        </template>
      </el-dialog>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
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
    width: 11.5625rem;
    height: 2.1875rem;
    background: #E2FFEA;
    border-radius: 4px 4px 4px 4px;
    color: #03C239;
    font-size: 16px;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.375rem 1rem;
    width: 11.5625rem;
    height: 2.1875rem;
    background: #FFEAEA;
    border-radius: 4px 4px 4px 4px;
    color: #FB6868;
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

.top {
  width: 42rem;
  min-height: 7.625rem;
  border-radius: 0px 0px 0px 0px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.5625rem;
    height: 1.625rem;
    background: #03C239;
    border-radius: .25rem .25rem .25rem .25rem;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .copyText {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: .75rem;

    span {
      display: inline-block;
      width: 9.5625rem;
      height: 1.125rem;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      line-height: .875rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

}


.bottom {
  width: 42rem;
  min-height: 7.625rem;
  border-radius: 0px 0px 0px 0px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.5625rem;
    height: 1.625rem;
    background: #FB6868;
    border-radius: .25rem .25rem .25rem .25rem;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .copyText {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: .75rem;

    span {
      display: inline-block;
      width: 9.5625rem;
      height: 1.125rem;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      line-height: .875rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

}
</style>
