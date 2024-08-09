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
        <el-row :gutter="20">
          <el-col :span="1"> </el-col>
          <el-col style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            " :span="1.5">
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </el-col>
          <el-col
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            "
            :span="6"
          >
            <p>用户A</p>
            <p style="font-size: 14px">账号:<span>迪迦</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="员工ID:">
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
            <el-form-item label="姓名:">
              <el-text class="mx-1">
                {{
                  detailData?.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:">
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
            <el-form-item label="邮箱:">
              <el-text class="mx-1">
                {{ detailData?.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门:">
              <el-text class="mx-1">
                {{ detailData?.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位:">
              <el-text class="mx-1">
                {{ detailData?.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="帐号状态:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">角色信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="员工ID:">
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
            <el-form-item label="姓名:">
              <el-text class="mx-1">
                {{
                  detailData?.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:">
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
            <el-form-item label="邮箱:">
              <el-text class="mx-1">
                {{ detailData?.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门:">
              <el-text class="mx-1">
                {{ detailData?.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位:">
              <el-text class="mx-1">
                {{ detailData?.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="帐号状态:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">小组信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="员工ID:">
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
            <el-form-item label="姓名:">
              <el-text class="mx-1">
                {{
                  detailData?.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:">
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
            <el-form-item label="邮箱:">
              <el-text class="mx-1">
                {{ detailData?.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门:">
              <el-text class="mx-1">
                {{ detailData?.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位:">
              <el-text class="mx-1">
                {{ detailData?.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="帐号状态:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间:">
              <el-text class="mx-1">
                {{ detailData?.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
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
