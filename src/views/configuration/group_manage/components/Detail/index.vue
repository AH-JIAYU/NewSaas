<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import api from "@/api/modules/user_customer";
// import { obtainLoading } from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
async function showEdit(row: any) {
  console.log("row", row);

  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };
  // const { status, data } = await obtainLoading(api.detail(params));
  // detailData.value = data;
  // status === 1 &&
  //   ElMessage.success({
  //     message: "查询成功",
  //     center: true,
  //   });
  drawerisible.value = true;
}

function close() {
  emit("fetch-data");
  drawerisible.value = false;
}

const operationType = (type: number) => {
  const typeArray = ["新增", "编辑", "启用", "禁用"];
  return typeArray[type - 1];
};

defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    size="60%"
    title="详情"
    @close="close"
  >
    <el-form label-width="100px" label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="部门ID:">
              <el-text class="mx-1">
                {{
                  detailData?.tenantCustomerId
                    ? detailData.tenantCustomerId
                    : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门名称:">
              <el-text class="mx-1">
                {{
                  detailData?.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门主管:">
              <el-text class="mx-1">
                {{
                  detailData?.customerShortName
                    ? detailData.customerAccord
                    : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="员工数:">
              <el-text class="mx-1">
                {{ detailData?.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态:">
              <el-text class="mx-1">
                {{ detailData?.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间:">
              <el-text class="mx-1">
                {{ detailData?.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盈利比例:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <!-- <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>权限信息</span>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户状态:">
              <el-text class="mx-1">
                {{ detailData.customerStatus === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资料:">
              <el-text class="mx-1">
                {{ detailData.antecedentQuestionnaire === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险控制:">
              <el-text class="mx-1">
                {{ detailData.riskControl === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业限额/月:">
              <el-text class="mx-1">
                <CurrencyType />{{ detailData.turnover || 0 }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核率Min值:">
              <el-text class="mx-1">
                {{ detailData.turnover ? detailData.turnover + "%" : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card> -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>员工</span>
          </div>
        </template>
        <el-table :data="detailData?.getTenantCustomerOperationInfoList" border>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createTime"
            label="员工ID"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="用户名"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="姓名"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="电话号码"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="电子邮箱"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="部门"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="createName"
            label="职位"
          />
          <el-table-column align="center" show-overflow-tooltip label="小组">
            <template #default="{ row }">
              {{ operationType(row.operationType) }}
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="暂无数据" />
          </template>
        </el-table>
      </el-card>
      <!-- <customerDetailDetail ref="checkRef" /> -->
    </el-form>
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

    > div {
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
    > div.isOnlineTrue {
      background-color: #70b51a;
      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    > div.isOnlineFalse {
      background-color: #d8261a;
      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}
</style>
