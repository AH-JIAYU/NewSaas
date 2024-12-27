<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUser from "@/api/modules/configuration_manager";
import storage from "@/utils/storage";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
import { Calendar, Search } from "@element-plus/icons-vue";
import apiDep from "@/api/modules/department";
import useUserStore from "@/store/modules/user";
import { handleError } from "vue";

const userStore: any = useUserStore();

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);

const data = ref<any>({
  searchData: "",
});

// 显隐
async function showEdit() {
  await getTenantUserList();
  drawerisible.value = true;
}

// 获取合作商列表
async function getTenantUserList() {
  const res = await api.getTenantUserList({});
  data.value.tenantUserList = res.data.tenantUserInfoList;
}

// 筛选所选合作商
// const dataList = computed(() => {
//   const findData = data.value.tenantUserList.find(
//     (item: any) => item.tenantId === data.value.form.beInvitationTenantId
//   );
//   if (findData) {
//     data.value.form.tenantName = findData.tenantName;
//     data.value.form.phoneOrEmail = storage.local.get("account");
//     return [findData];
//   }
//   return [];
// });

// 关闭
function close() {
  drawerisible.value = false;
}
const handleData = () => {};
defineExpose({
  showEdit,
});
const openCooperation =(row:any)=> {

}
</script>

<template>
  <div>
    <el-drawer
      v-model="drawerisible"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="55%"
      title="邀约公司"
      class="yaoyueDrawer"
      :before-close="close"
    >
      <el-input
        v-model="data.searchData"
        placeholder="请输入搜索名称"
        style="width: 35%"
        @change="handleData"
      ></el-input>
      <el-card
        v-for="item in data.tenantUserList"
        :key="item"
        shadow="always"
        :body-style="{ padding: '1.5rem 1rem 1.5rem 1rem' }"
        style="background-color: #fff; margin-top: 1rem"
      >
        <el-row>
          <el-col :span="8" class="">
            <div class="flex-a">
              <img
                src="@/assets/images/user.png"
                alt=""
                style="width: 3rem; height: 3rem"
              />
              <div style="margin-left: 0.75rem">
                <div class="font-s16 color1">{{ item.tenantName }}</div>
                <div class="font-s12 color2" style="margin-top: 0.25rem">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="10" class="">
            <div class="flex-a" style="height: 100%">
              <el-text class="info-text1 font-s14">{{ item.country }}</el-text>
              <el-text class="info-text2 font-s14">{{
                item.country == "CN" ? "人民币" : "美元"
              }}</el-text>
              <el-text class="info-text3 font-s14 flex-a">
                <img
                  src="@/assets/images/remen.png"
                  style="margin-right: 3px"
                />
                热门合作商</el-text
              >
              <el-text class="info-text4 font-s14 flex-a">
                <img
                  src="@/assets/images/member.png"
                  style="margin-right: 3px; width: 14px; height: 14px"
                />
                试用版</el-text
              >
            </div>
          </el-col>
          <el-col :span="6">
            <div style="height: 100%" class="flex-ab">
              <div class="flex-a">
                  <img src="@/assets/images/keyaoyue.png" alt="" style="margin-right: 3px;">
                  <span class="color3 font-s14">可邀约</span>
              </div>
              <el-button
                type="primary"
              class="font-s14"
              style="margin-left: 1rem;"
              @click="openCooperation(item)"
              >
                申请合作
              </el-button>

              <!-- <div class="flex-a">
                <img
                  src="@/assets/images/bukeyaoyue.png"
                  alt=""
                  style="margin-right: 3px"
                />
                <span class="color4 font-s14">不可邀约</span>
              </div>
              <el-button
                type="info"
                class="font-s14 bgcolor1"
                style="margin-left: 1rem"
              >
                申请合作
              </el-button> -->
              <!-- <div  class="flex-a">
                  <img src="@/assets/images/jujue.png" alt="" style="margin-right: 3px;">
                  <span class="color5 font-s14">拒绝邀约</span>
              </div>
              <el-button
                type="info"
              class="font-s14 bgcolor1"
              style="margin-left: 1rem;"
              >
                倒计时
              </el-button> -->
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.flex-a {
  display: flex;
  align-items: center;
}
.flex-ab {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.font-s14 {
  font-size: 0.875rem;
}
.font-s16 {
  font-size: 1rem;
}
.font-s12 {
  font-size: 0.75rem;
}
.font-w {
  font-weight: 500;
}
.color1 {
  color: #333333;
}
.color2 {
  color: #777777;
}
.color3 {
  color: #03c239;
}
.color4 {
  color: #ffa446;
}
.color5 {
  color: #fb6868;
}
.bgcolor1 {
  background: #c6c6c6;
  border: 1px solid #c6c6c6;
}
.info-text1 {
  // width: 3.25rem;
  // height: 1.75rem;
  background: #e7f3ff;
  border-radius: 4px 4px 4px 4px;
  color: #409eff;
  // line-height: 1rem;
  text-align: center;
  padding: 0.25rem 0.75rem;
}
.info-text2 {
  // width: 3.25rem;
  // height: 1.75rem;
  background: #ffe7ce;
  border-radius: 4px 4px 4px 4px;
  color: #ff9d33;
  // line-height: 1rem;
  text-align: center;
  padding: 0.25rem 0.75rem;
  margin-left: 0.5rem;
}
.info-text3 {
  // width: 7rem;
  // height: 1.75rem;
  background: #fee8b6;
  border-radius: 4px 4px 4px 4px;
  color: #fea703;
  // line-height: 1rem;
  text-align: center;
  padding: 0.25rem 0.75rem;
  margin-left: 0.5rem;
}
.info-text4 {
  // width: 5.25rem;
  // height: 1.75rem;
  background: #e7f3ff;
  border-radius: 4px 4px 4px 4px;
  color: #409eff;
  // line-height: 1rem;
  text-align: center;
  padding: 0.25rem 0.75rem;
  margin-left: 0.5rem;
}
:deep(.el-row) {
  margin: 0 !important;
}

:deep {
  .el-card__body {
    padding: 0 !important;
  }
  .el-drawer__body .el-card {
    padding: 0 !important;
  }
  .el-row {
    margin: 0 !important;
  }
}
</style>
