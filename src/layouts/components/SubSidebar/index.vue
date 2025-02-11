<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import Logo from "../Logo/index.vue";
import Menu from "../Menu/index.vue";
import useSettingsStore from "@/store/modules/settings";
import useMenuStore from "@/store/modules/menu";
import useUserStore from "@/store/modules/user";
import projectEdit from "@/views/projectManagement/list/components/ProjeckEdit/index.vue"; //快捷操作： 新增项目
defineOptions({
  name: "SubSidebar",
});

const route = useRoute();
const router = useRouter();
// 组件Ref 快捷操作： 新增客户
const editRef = ref<any>();
const settingsStore = useSettingsStore();
const menuStore = useMenuStore();
const userStore: any = useUserStore();
const subSidebarRef = ref();
const showShadowTop = ref(false);
const showShadowBottom = ref(false);
function onSidebarScroll() {
  const scrollTop = subSidebarRef.value.scrollTop;
  showShadowTop.value = scrollTop > 0;
  const clientHeight = subSidebarRef.value.clientHeight;
  const scrollHeight = subSidebarRef.value.scrollHeight;
  showShadowBottom.value = Math.ceil(scrollTop + clientHeight) < scrollHeight;
}
const avatarError = ref(false);
watch(
  () => userStore.avatar,
  () => {
    if (avatarError.value) {
      avatarError.value = false;
    }
  },
);
const enableSidebar = computed(() => {
  return (
    settingsStore.mode === "mobile" ||
    (["side", "head", "single"].includes(
      settingsStore.settings.menu.menuMode,
    ) &&
      menuStore.sidebarMenus.length !== 0 &&
      !(
        settingsStore.settings.menu.subMenuOnlyOneHide &&
        menuStore.sidebarMenus.length === 1 &&
        (!menuStore.sidebarMenus[0].children ||
          menuStore.sidebarMenus[0]?.children.every(
            (item) => item.meta?.menu === false,
          ))
      ))
  );
});

watch(
  enableSidebar,
  (val) => {
    if (val) {
      nextTick(() => {
        onSidebarScroll();
      });
    }
  },
  {
    immediate: true,
  },
);

const menuRef = ref();

onMounted(() => {
  if (enableSidebar.value) {
    const { height } = useElementSize(menuRef);
    watch(
      () => height.value,
      () => {
        if (height.value > 0) {
          onSidebarScroll();
        }
      },
      {
        immediate: true,
      },
    );
  }
});

const isCollapse = computed(() => {
  if (settingsStore.mode === "pc") {
    if (
      settingsStore.settings.menu.subMenuCollapse &&
      (!settingsStore.isHoverSidebar ||
        (settingsStore.isHoverSidebar &&
          !settingsStore.settings.menu.subMenuAutoCollapse))
    ) {
      return true;
    } else {
      return false;
    }
  }
  return settingsStore.settings.menu.subMenuCollapse;
});
const createTime = (time: any) => {
  // 将字符串转化为 Date 对象
  const targetDate: any = new Date(time);
  // 获取当前日期
  const currentDate: any = new Date();
  // 获取两个日期的时间戳差值（单位为毫秒）
  const timeDiff: any = targetDate - currentDate;
  // 计算天数差，1天 = 24小时 * 60分钟 * 60秒 * 1000毫秒
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff;
};
// 快捷操作：新增客户
const AddProject = () => {
  editRef.value.showEdit();
};
//跳转到官网
const getWebsite = (val: any) => {
  if (val === 1) {
    window.open("https://www.surveysaas.com/", "_blank");
  } else {
    window.open(`https://${userStore.domain}`, "_blank");
  }
};
// 跳转用户
const pushUser = () => {
  router.push("/configuration/user");
};
</script>

<template>
  <div
    v-if="enableSidebar"
    class="sub-sidebar-container"
    :class="{
      'is-collapse': isCollapse,
      'shadow-side':
        settingsStore.isHoverSidebar &&
        settingsStore.settings.menu.subMenuAutoCollapse &&
        settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <Logo
      :show-logo="settingsStore.settings.menu.menuMode === 'single'"
      class="sidebar-logo"
      :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.menuMode === 'single',
      }"
    />
    <div
      ref="subSidebarRef"
      class="sub-sidebar flex-1 transition-shadow-300"
      :class="{
        'shadow-top': showShadowTop,
        'shadow-bottom': showShadowBottom,
      }"
      @scroll="onSidebarScroll"
    >
      <div ref="menuRef">
        <TransitionGroup name="sub-sidebar">
          <template
            v-for="(mainItem, mainIndex) in menuStore.allMenus"
            :key="mainIndex"
          >
            <div v-show="mainIndex === menuStore.actived">
              <Menu
                :menu="mainItem.children"
                :value="route.meta.activeMenu || route.path"
                :default-openeds="menuStore.defaultOpenedPaths"
                :always-openeds="menuStore.alwaysOpenedPaths"
                :accordion="settingsStore.settings.menu.subMenuUniqueOpened"
                :collapse="isCollapse"
                :rounded="settingsStore.settings.menu.isRounded"
                :direction="settingsStore.settings.app.direction"
                class="menu"
              />
            </div>
          </template>
        </TransitionGroup>
      </div>
    </div>
    <!-- 版本信息 -->
    <div v-show="!isCollapse" class="version-info">
      <div class="version-info-item" style="padding: 1rem">
        <img src="@/assets/images/member.png" />
        <span class="version-info-color" style="margin-left: 0.5rem"
          >试用版</span
        >
      </div>
      <div
        class="font-w font-s12 margin-t8 version-info-w"
        style="padding-left: 1rem"
      >
        到期时间：{{ createTime(userStore.expirationTime) }}天
      </div>
      <div
        style="
          padding-left: 1rem;
          padding-right: 1rem;
          display: flex;
          margin-top: 1rem;
        "
      >
        <el-button type="primary" style="width: 90%; flex: 1"
          >立即升级</el-button
        >
      </div>

      <div
        class="version-info-item"
        style="border-top: 1px solid rgba(170, 170, 170, 0.3)"
      >
        <div style="padding: 1rem" class="version-info-flex-1">
          <!-- <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)"
            class="h-[30px] w-[30px] rounded-full" /> -->
          <!-- <SvgIcon v-else name="i-carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" /> -->
          <div
            style="border-right: 1px solid #c6c6c6; width: 50%"
            class="version-info-flex-2"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              content="新增项目"
              placement="top-start"
            >
              <img
                src="@/assets/images/tu4.png"
                style="width: 24px; height: 24px; cursor: pointer"
                @click="AddProject"
              />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="用户管理"
              placement="top-start"
            >
              <img
                src="@/assets/images/tu2.png"
                style="
                  width: 24px;
                  height: 24px;
                  margin-left: 1.875rem;
                  cursor: pointer;
                "
                @click="pushUser"
              />
            </el-tooltip>
          </div>
          <div style="width: 50%" class="version-info-flex-2">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="个人官网"
              placement="top-start"
            >
              <img
                src="@/assets/images/tu5.png"
                style="
                  width: 24px;
                  height: 24px;
                  cursor: pointer;
                  margin-left: 1rem;
                "
                @click="getWebsite(2)"
              />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="平台官网"
              placement="top-start"
            >
              <img
                src="@/assets/images/tu3.png"
                style="
                  width: 24px;
                  height: 24px;
                  margin-left: 1.875rem;
                  cursor: pointer;
                "
                @click="getWebsite(1)"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="settingsStore.mode === 'pc'"
      class="relative flex items-center px-4 py-3"
      :class="{
        'justify-center': isCollapse,
        'justify-between':
          !isCollapse &&
          settingsStore.settings.menu.enableSubMenuCollapseButton,
        'justify-end':
          !isCollapse &&
          !settingsStore.settings.menu.enableSubMenuCollapseButton,
      }"
    >
      <span
        v-show="
          !isCollapse ||
          (isCollapse &&
            !settingsStore.settings.menu.enableSubMenuCollapseButton)
        "
        class="flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark:bg-stone-9 hover:bg-stone-2 dark:hover:bg-stone-8"
        @click="settingsStore.toggleSidebarAutoCollapse()"
      >
        <SvgIcon
          :name="
            settingsStore.settings.menu.subMenuAutoCollapse
              ? 'i-lucide:pin-off'
              : 'i-lucide:pin'
          "
        />
      </span>
      <span
        v-show="settingsStore.settings.menu.enableSubMenuCollapseButton"
        class="flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark:bg-stone-9 hover:bg-stone-2 dark:hover:bg-stone-8"
        :class="{
          '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse,
        }"
        @click="settingsStore.toggleSidebarCollapse()"
      >
        <SvgIcon name="toolbar-collapse" />
      </span>
    </div>
    <projectEdit ref="editRef" />
  </div>
</template>

<style lang="scss" scoped>
.version-info {
  font-weight: 500;
  font-size: 14px;
  color: #333333;
}

.version-info-item {
  margin-top: 1rem;
}

.version-info-color {
  font-weight: 500;
  font-size: 14px;
  color: #409eff;
}

.version-info-w {
  font-family:
    Source Han Sans CN,
    Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 14px;
}

.version-info-flex-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.version-info-flex-2 {
  display: flex;
  align-items: center;
}

.sub-sidebar-container {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: var(--g-sub-sidebar-width);
  background-color: var(--g-sub-sidebar-bg);
  box-shadow:
    -1px 0 0 0 var(--g-border-color),
    1px 0 0 0 var(--g-border-color);
  transition:
    background-color 0.3s,
    inset-inline-start 0.3s,
    width 0.3s,
    box-shadow 0.3s;

  &.is-collapse {
    width: var(--g-sub-sidebar-collapse-width);

    .sidebar-logo {
      &:not(.sidebar-logo-bg) {
        display: none;
      }

      :deep(span) {
        display: none;
      }
    }
  }

  &.shadow-side {
    box-shadow: 10px 0 10px -10px var(--g-box-shadow-color);
  }

  .sidebar-logo {
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s;

    &.sidebar-logo-bg {
      background-color: var(--g-sub-sidebar-logo-bg);

      :deep(span) {
        color: var(--g-sub-sidebar-logo-color);
      }
    }
  }

  .sub-sidebar {
    overflow: hidden auto;
    overscroll-behavior: contain;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.shadow-top {
      box-shadow:
        inset 0 10px 10px -10px var(--g-box-shadow-color),
        inset 0 0 0 transparent;
    }

    &.shadow-bottom {
      box-shadow:
        inset 0 0 0 transparent,
        inset 0 -10px 10px -10px var(--g-box-shadow-color);
    }

    &.shadow-top.shadow-bottom {
      box-shadow:
        inset 0 10px 10px -10px var(--g-box-shadow-color),
        inset 0 -10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .menu {
    width: 100%;
  }
}

// 次侧边栏动画
.sub-sidebar-enter-active {
  transition: 0.2s;
}

.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
  opacity: 0;
  transform: translateY(30px) skewY(10deg);
}

.sub-sidebar-leave-active {
  position: absolute;
}
</style>
