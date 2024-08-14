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
      {{ Number(props.currencyType) === 1 ? "$" : "￥" }}
    </template>
  </template>
  <template v-else>
    <template v-if="userStore.currencyType !== 3">
      {{ userStore.currencyType === 1 ? "$" : "￥" }}
    </template>
  </template>
</template>
