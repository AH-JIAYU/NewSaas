<script setup lang="ts">
import api from "@/api/modules/survey_myProjeck";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3"; // 复制 js库

defineOptions({
  name: "Edit",
});
const { toClipboard } = useClipboard();
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = reactive<any>({
  list: [],
});
// 获取数据
async function showEdit(row: any) {
  const res = await obtainLoading(
    api.getMemberPriceList({ projectId: row.projectId })
  );
  data.list = res.data.getMemberPriceListInfoList;
  dialogTableVisible.value = true;
}
// 复制ID
const svgClick = (id: any) => {
  toClipboard(id);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
}
// 提交数据
function close() {
  dialogTableVisible.value = false;
}

// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="查看你会员价格"
      direction="rtl"
      :close-on-click-modal="false"
    >
      <el-table :data="data.list" border stripe>
        <el-table-column label="会员ID" prop="memberId" >
          <template #default="{ row }">
            <div class="hoverSvg">
              <p class="fineBom">{{ row.memberId }}</p>
              <span>
                <svg @click="svgClick(row.memberId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14"
                  height="14" viewBox="0 0 14 14" fill="none">
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
          </template>
        </el-table-column>
        <el-table-column label="会员姓名" prop="memberName" />
        <el-table-column label="会员等级" prop="memberLevelName" />
        <el-table-column label="会员价格" prop="memberPrice">
          <template #default="{ row }">
            <el-text style="color: #FD8989;" ><CurrencyType /></el-text><el-text style="color: #333333;font-weight: 700;font-family: PingFang SC, PingFang SC;">
                {{ row.memberPrice || 0 }}
              </el-text>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div>
          <el-button @click="close"> 关闭 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.eldivider {
  font-size: 20px;
  font-weight: 700;
}
.eldividers {
  font-size: 30px;
  text-align: center;
  color: #52b0cb;
}

:deep {
  .rightspan {
    text-align: right;
    font-size: 12px;
    margin-right: 20px;
  }
}
.fineBom {
  text-align: left !important;
  color: #333333;
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
</style>
