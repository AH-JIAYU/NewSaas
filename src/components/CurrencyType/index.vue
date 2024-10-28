<script setup lang="ts">
import useUserStore from "@/store/modules/user";
const userStore: any = useUserStore();
// 传值就按传的值显示
const props = defineProps(["currencyType"]);
defineOptions({
  name: "CurrencyType",
});
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
        <div style="color: #333;margin-top: -2px;" class="i-bx:dollar w-1.3em h-1.3em"></div>
      </el-text>
      <el-text v-else>
        <div style="color: #333;margin-top: -2px;" class="i-f7:money-yen w-1.3em h-1.3em"></div>
      </el-text>
    </template>
  </template>
</template>
