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
import customerEdit from "./index.vue";
const userStore: any = useUserStore();

const emit = defineEmits(["queryData"]);
const drawerisible = ref<boolean>(false);

const data = ref<any>({
  companyName:'',
});
let interval = ref();
// 显隐
async function showEdit() {
  await getTenantUserList();
  drawerisible.value = true;
  startTimers();
  // interval.value = setInterval(updateCountdown, 1000); // 每秒调用一次
}

// 获取合作商列表
async function getTenantUserList() {
  const res = await api.getTenantUserList({companyName:data.value.companyName});
  data.value.tenantUserList = res.data.tenantUserInfoList;
}

const getTenantList = () => {
  getTenantUserList();
  emit("queryData");
};
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
const editRef = ref();
const openCooperation = (row: any) => {
  editRef.value.showEdit(row);
};
const timers: any = reactive({});
//倒计时
// 格式化时间为 "XX天 XX小时 XX分钟 XX秒"
const formatTime = (timeLeft: any) => {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${hours}: ${minutes}: ${seconds}`;
};

// 计算剩余时间并更新
const updateRemainingTime = (item: any) => {
  const now: any = new Date();
  const targetTime: any = new Date(item.refuseTime);
  targetTime.setDate(targetTime.getDate() + 7); // 目标时间为开始时间 + 7天
  const timeLeft = targetTime - now;

  if (timeLeft <= 0) {
    getTenantUserList(); // 调用接口
    return 0; // 如果时间已到，返回0
  } else {
    return timeLeft; // 返回剩余时间
  }
};

// 每条数据定时器更新
const startTimers = () => {
  data.value.tenantUserList.forEach((item: any) => {
    // 初始化每条数据的剩余时间
    if (item.refuse >= 2) {
      item.remainingTime = updateRemainingTime(item);

      // 清除旧定时器
      if (timers[item.tenantId]) {
        clearInterval(timers[item.tenantId]);
      }

      // 每秒更新倒计时
      timers[item.tenantId] = setInterval(() => {
        item.remainingTime = updateRemainingTime(item);
      }, 1000);
    }
  });
};

// 在组件销毁时清除定时器
onUnmounted(() => {
  // 清除所有定时器
  Object.values(timers).forEach((timer: any) => {
    if (timer) {
      clearInterval(timer);
    }
  });
});
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
        v-model="data.companyName"
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
                :src="`${item.aratar}`"
                alt=""
                style="width: 3rem; height: 3rem"
                v-if="item.aratar"
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
                item.currencyType == "2" ? "人民币" : "美元"
              }}</el-text>
              <el-text class="info-text3 font-s14 flex-a" v-if="item.hot">
                <img
                  src="@/assets/images/remen.png"
                  style="margin-right: 3px"
                />
                热门合作商</el-text
              >
              <el-text
                class="info-text4 font-s14 flex-a"
                v-if="item.versionName"
              >
                <img
                  src="@/assets/images/member.png"
                  style="margin-right: 3px; width: 14px; height: 14px"
                />
                {{ item.versionName }}</el-text
              >
            </div>
          </el-col>
          <!-- 绑定状态:0:未邀约 1:未处理 2:同意(合作) 3:拒绝 4:解约成功(只有同意以后才有解约) -->
          <el-col :span="6">
            <div style="height: 100%" class="flex-ab">
              <!-- 未邀约，解约成功 -->
              <div
                class="flex-a"
                v-if="item.invitationStatus == 0 || item.invitationStatus == 4"
              >
                <img
                  src="@/assets/images/keyaoyue.png"
                  alt=""
                  style="margin-right: 3px"
                />
                <span class="color3 font-s14">可邀约</span>
              </div>
              <!-- 拒绝邀约 -->
              <div class="flex-a" v-if="item.invitationStatus == 3">
                <img
                  src="@/assets/images/jujue.png"
                  alt=""
                  style="margin-right: 3px"
                />
                <span class="color5 font-s14">拒绝邀约</span>
              </div>
              <!-- 同意(合作) -->
              <div class="flex-a" v-if="item.invitationStatus == 2">
                <img
                  src="@/assets/images/bukeyaoyue.png"
                  alt=""
                  style="margin-right: 3px"
                />
                <span class="color4 font-s14">不可邀约</span>
              </div>
              <!-- 未处理 ，不可邀约-->
              <div class="flex-a" v-if="item.invitationStatus == 1">
                <img
                  src="@/assets/images/bukeyaoyue.png"
                  alt=""
                  style="margin-right: 3px"
                />
                <span class="color4 font-s14">未处理</span>
              </div>

              <!-- 未邀约，拒绝1，解约成功 -->
              <el-button
                v-if="
                  item.invitationStatus == 0 ||
                  (item.invitationStatus == 3 && item.refuse < 2) ||
                  item.invitationStatus == 4
                "
                type="primary"
                class="font-s14"
                style="margin-left: 1rem"
                @click="openCooperation(item)"
              >
                申请合作
              </el-button>

              <!-- 未处理，已合作 -->
              <el-button
                v-if="item.invitationStatus == 1 || item.invitationStatus == 2"
                type="info"
                class="font-s14 bgcolor1"
                style="margin-left: 1rem"
              >
                申请合作
              </el-button>
              <!-- 拒绝2次之后展示倒计时 -->
              <el-button
                v-if="item.invitationStatus == 3 && item.refuse >= 2"
                type="info"
                class="font-s14 bgcolor1"
                style="margin-left: 1rem"
              >
                {{ formatTime(item.remainingTime) }}
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-drawer>
    <customerEdit ref="editRef" @fetch-data="getTenantList" />
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
