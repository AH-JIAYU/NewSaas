<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from "@/store/modules/user";
import imgLogo from '@/assets/images/logo.png'

defineOptions({
  name: 'Logo',
})
const userStore = useUserStore();
// 网站LOGO
const logo = ref<any>()
// 网站名称
const title = ref<any>()
if(userStore.logo && userStore.logo !== "undefined" &&userStore.logo !== "null") {
  logo.value = userStore.logo
}else {
  logo.value = ''
}

if(userStore.webName && userStore.webName !== "undefined" &&userStore.webName !== "null") {
  title.value = userStore.webName
}else {
  title.value = import.meta.env.VITE_APP_TITLE
}

withDefaults(
  defineProps<{
    showLogo?: boolean
    showTitle?: boolean
  }>(),
  {
    showLogo: true,
    showTitle: true,
  },
)
watch(
  () => userStore.logo,
  (newValue) => {
    if (newValue) {
      logo.value = newValue;
    }else {
      logo.value = ''
    }
  },{deep: true}
);
watch(
  () => userStore.webName,
  (newValue) => {
    if (newValue) {
      title.value = newValue;
    }
  },{deep: true}
);
const settingsStore = useSettingsStore()

const to = computed(() => settingsStore.settings.home.enable ? settingsStore.settings.home.fullPath : '')
</script>

<template>
  <RouterLink :to="to" class="h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline" :class="{ 'cursor-pointer': settingsStore.settings.home.enable }" :title="title">
    <img v-if="logo" :src="logo" class="logo h-[30px] w-[30px] object-contain">
    <span v-if="showTitle" class="block truncate font-bold">{{ title }}</span>
  </RouterLink>
</template>


<style lang="scss" scoped>
  img {
    border-radius: 7px;
  }
</style>
