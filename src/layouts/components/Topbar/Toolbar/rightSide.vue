<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Tools from "./tools.vue";
import eventBus from "@/utils/eventBus";
import useSettingsStore from "@/store/modules/settings";
import useUserStore from "@/store/modules/user";
import { i18nTitleInjectionKey } from "@/utils/injectionKeys";
import useAvatarStore from "@/store/modules/avatar";
import storage from "@/utils/storage";
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
const tenantId = storage.local.get("tenantId");
onMounted(() => {});
//个人中心
const getPerson =()=> {
  router.push({ name: 'personalSetting' })
}
//站点设置
const getSite =()=> {
  router.push({ name: 'site_setting' })
}
//官方客服

//合作租户
const getTenantry =()=> {
  router.push({ name: 'cooperation' })
}
//退出登录
const logout =()=> {
  userStore.logout(null)
}
</script>

<template>
  <div class="flex items-center">
    <Tools mode="right-side" />
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="flex-center gap-1" style="  cursor: pointer;">
          <img
            v-if="userStore.avatar && !avatarError"
            :src="userStore.avatar"
            :onerror="() => (avatarError = true)"
            class="h-[30px] w-[30px] rounded-full"
          />
          <!-- <SvgIcon
          v-else
          name="i-carbon:user-avatar-filled-alt"
          :size="24"
          class="text-gray-400"
        />
        {{ userStore.account }}-->
          <!-- <SvgIcon name="i-ep:caret-bottom" /> -->
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="drop-item">
          <div class="item-1">
            <div class="flex-item gap-1">
              <img
                v-if="userStore.avatar && !avatarError"
                :src="userStore.avatar"
                :onerror="() => (avatarError = true)"
                class="h-[30px] w-[30px] rounded-full"
              />
              <SvgIcon
                v-else
                name="i-carbon:user-avatar-filled-alt"
                :size="24"
                class="text-gray-400"
              />
              <div>
                <div class="font-w">{{ userStore.name ? userStore.name :userStore.account }}</div>
                <div class="font-s12 color1">ID: {{ userStore.tenantId }}</div>
              </div>
            </div>
            <div class="member-set">
              <div
                style="border-bottom: 1px solid rgba(139, 160, 191, 0.3)"
                class="padding-8"
              >
                <div>
                  <img src="@/assets/images/member.png" />
                  <span class="color2" style="margin-left: 0.5rem">试用版</span>
                </div>
                <div class="font-w font-s12 margin-t8">到期时间:</div>
              </div>
              <div class="padding-8">
                <span class="color2 font-w500">升级版本</span>
              </div>
            </div>
          </div>
          <div class="item-2 padding-8 " >
            <div class=" padding-t12 flex-item " @click="getPerson">
              <img src="@/assets/images/geren.png" style="width: 1rem;height: 1rem;margin-left: 0.5rem;" />
              <span style="margin-left: 0.5rem" class="color1 hover-item">个人中心</span>
            </div>
            <div class=" padding-t12  flex-item " @click="getSite">
              <img src="@/assets/images/dizhi.png" style="width: 1rem;height: 1rem;margin-left: 0.5rem;" />
              <span style="margin-left: 0.5rem" class="color1 hover-item"> 站点设置</span>
            </div>
            <div class=" padding-t12  flex-item ">
              <img src="@/assets/images/kefu.png" style="width: 1rem;height: 1rem;margin-left: 0.5rem;" />
              <span style="margin-left: 0.5rem" class="color1 hover-item"> 官方客服</span>
            </div>
            <div class=" padding-t12  flex-item " @click="getTenantry">
              <img src="@/assets/images/hezuozuhu.png" style="width: 1rem;height: 1rem;margin-left: 0.5rem;" />
              <span style="margin-left: 0.5rem" class="color1 hover-item"> 合作租户</span>
            </div>
          </div>
          <div
            class="item-3 padding-8 "
            style="border-top: 1px solid rgba(139, 160, 191, 0.3)"
            @click="logout"
          >
          <div class=" flex-item padding-t4 padding-b4">
            <img src="@/assets/images/logout.png"   style="width: 1rem;height: 1rem;margin-left: 0.5rem;"/>
            <span style="margin-left: 0.5rem" class="color1 hover-item"> 退出登录</span>
          </div>

          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- <HDropdownMenu
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
    </HDropdownMenu> -->
  </div>
</template>
<style scoped>
 :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;
    }
.drop-item {
  padding: 0 !important;
  width: 275px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}
.flex-item {
  display: flex;
  align-items: center;

}
.hover-item:hover {
  color: #409eff;

}
.item-1 {
  background: rgba(215, 234, 255, 0.6);
  /* height: 200px; */
  padding:0.5rem;
}
.member-set {
  background: #ffffff;
  border-radius: 8px 8px 8px 8px;
  margin-top: 0.5rem;
}
.padding-8 {
  padding: 0.5rem;
}
.parging-l8 {
  padding-left: 0.5rem;
}
.margin-t8 {
  margin-top: 0.5rem;
}
.padding-l16 {
  padding-left: 1rem;
}
.padding-t12 {
  padding-top: .75rem;
}
.padding-b4 {
  padding-bottom: .25rem;
}
.padding-t4{
  padding-top: .25rem;
}
.padding-l8 {
  margin-top: 0.5rem;
}
.font-w {
  font-weight: 700;
}
.font-w500 {
  font-weight: 500;
}
.font-s12 {
  font-size: 0.75rem;
}
.color1 {
  color: #777777;
}
.color2 {
  color: #409eff;
}
</style>
