<script setup lang="ts">
import useUserStore from "@/store/modules/user";
const userStore: any = useUserStore();
// 传值就按传的值显示
const props = defineProps(["currencyType"]);
defineOptions({
  name: "CurrencyType",
});
console.log(props.currencyType,'props.currencyType')
console.log(userStore.currencyType,'userStore.currencyType')
</script>

<template>
  <template v-if="props.currencyType">

    <template v-if="Number(props.currencyType) !== 3">

      {{ Number(props.currencyType) === 1 ? "" : "￥" }}
      <el-text v-if="Number(props.currencyType) === 1">
        <div style="color: #333;margin-top: -2px;" class="i-bx:dollar w-1.3em h-1.3em"></div>
      </el-text>
      <el-text v-else>
        <div style="color: #333;margin-top: -2px;" class="i-f7:money-yen w-1.3em h-1.3em"></div>
      </el-text>
    </template>
  </template>
  <template v-else>
    <template v-if="userStore.currencyType !== 3">
      <el-text v-if="userStore.currencyType === 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path id="Vector"
            d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
            fill="#333333" />
        </svg>
        <!-- <div style="color: #333;margin-top: -2px;" class="i-bx:dollar w-1.3em h-1.3em"></div> -->
      </el-text>
      <el-text v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
          <path id="Vector"
            d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
            fill="#333333" />
        </svg>
        <!-- <div style="color: #333;margin-top: -2px;" class="i-f7:money-yen w-1.3em h-1.3em"></div> -->
      </el-text>
    </template>
  </template>
</template>


