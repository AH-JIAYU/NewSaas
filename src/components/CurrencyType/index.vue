<script setup lang="ts">
import useUserStore from "@/store/modules/user";
const userStore: any = useUserStore();

defineOptions({
  name: "CurrencyType",
});
</script>

<template>
  <template v-if="userStore.currencyType !== 3">
    {{ userStore.currencyType === 1 ? "$" : "￥" }}
  </template>
</template>
