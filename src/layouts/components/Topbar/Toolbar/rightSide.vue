<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Tools from "./tools.vue";
import eventBus from "@/utils/eventBus";
import useSettingsStore from "@/store/modules/settings";
import useUserStore from "@/store/modules/user";
import { i18nTitleInjectionKey } from "@/utils/injectionKeys";
import useAvatarStore from "@/store/modules/avatar";

defineOptions({
  name: "ToolbarRightSide",
});

const router = useRouter();
const avatarStore = useAvatarStore();
const settingsStore = useSettingsStore();
const userStore: any = useUserStore();
const { t } = useI18n();
const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);
const avatarError = ref(false);
watch(
  () => userStore.avatar,
  () => {
    if (avatarError.value) {
      avatarError.value = false;
    }
  }
);
watch(
  () => avatarStore.permissions,
  (newValue) => {
    if (newValue) {
      userStore.avatar = newValue;
    }
  }
);
</script>

<template>
  <div class="flex items-center">
    <Tools mode="right-side" />
    <!--  快捷键  [
          { label: t('app.hotkeys'), handle: () => eventBus.emit('global-hotkeys-intro-toggle'), hide: settingsStore.mode !== 'pc' },
        ], -->
    <HDropdownMenu
      :items="[
        [
          {
            label: generateI18nTitle(
              'route.home',
              settingsStore.settings.home.title
            ),
            handle: () =>
              router.push({ path: settingsStore.settings.home.fullPath }),
            hide: !settingsStore.settings.home.enable,
          },
          {
            label: t('app.profile'),
            handle: () => router.push({ name: 'personalSetting' }),
          },
          {
            label: t('app.preferences'),
            handle: () => eventBus.emit('global-preferences-toggle'),
            hide: !settingsStore.settings.userPreferences.enable,
          },
        ],
        [{ label: t('app.logout'), handle: () => userStore.logout(null) }],
      ]"
      class="flex-center cursor-pointer px-2"
    >
      <div class="flex-center gap-1">
        <img
          v-if="userStore.avatar && !avatarError"
          :src="userStore.avatar"
          :onerror="() => (avatarError = true)"
          class="h-[24px] w-[24px] rounded-full"
        />
        <SvgIcon
          v-else
          name="i-carbon:user-avatar-filled-alt"
          :size="24"
          class="text-gray-400"
        />
        {{ userStore.account }}
        <SvgIcon name="i-ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>
