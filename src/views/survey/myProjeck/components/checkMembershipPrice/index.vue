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
    <el-dialog v-model="dialogTableVisible" title="查看你会员价格" direction="rtl" :close-on-click-modal="false">
      <el-table :data="data.list" border stripe>
        <el-table-column label="会员ID" prop="memberId">
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
            <!-- <el-text style="color: #FD8989;" ><CurrencyType /></el-text> -->
            <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
              viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10"
              viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <el-text style="color: #333333;font-weight: 700;">
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
