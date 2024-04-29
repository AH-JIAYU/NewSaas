<script setup lang="ts">
import Sortable from 'sortablejs'
import themes from '../../../../themes'
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Preferences',
})

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const isShow = ref(false)

const themeList = computed(() => {
  return Object.keys(themes).map((key) => {
    return {
      label: key,
      value: (themes as any)[key],
    }
  }).filter((item) => {
    return item.value['color-scheme'] === settingsStore.currentColorScheme
  })
})

// eslint-disable-next-line unused-imports/no-unused-vars
let toolbarLayoutSortable: Sortable
const toolbarLayoutRef = ref()
watch(() => toolbarLayoutRef.value, (val) => {
  if (val) {
    toolbarLayoutSortable = new Sortable(toolbarLayoutRef.value, {
      animation: 200,
      ghostClass: 'op-30',
      draggable: '.draggable',
      filter: '.no-drag',
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          userStore.preferences.toolbar && userStore.preferences.toolbar.layout && userStore.preferences.toolbar.layout.splice(e.newIndex, 0, userStore.preferences.toolbar.layout.splice(e.oldIndex, 1)[0])
        }
      },
    })
  }
})

onMounted(() => {
  eventBus.on('global-preferences-toggle', () => {
    isShow.value = !isShow.value
  })
})

async function handleReset() {
  userStore.updatePreferences()
  location.reload()
}
</script>

<template>
  <HSlideover v-model="isShow" title="偏好设置" :side="settingsStore.settings.app.direction === 'ltr' ? 'right' : 'left'">
    <div
      v-if="
        userStore.preferences.app?.hasOwnProperty('colorScheme')
          || (userStore.preferences.app?.hasOwnProperty('lightTheme') && userStore.preferences.app?.hasOwnProperty('darkTheme'))
      "
    >
      <div class="divider">
        颜色主题风格
      </div>
      <div v-if="userStore.preferences.app?.hasOwnProperty('colorScheme')" class="flex items-center justify-center pb-4">
        <HTabList
          v-model="userStore.preferences.app.colorScheme"
          :options="[
            { icon: 'i-ri:sun-line', label: '明亮', value: 'light' },
            { icon: 'i-ri:moon-line', label: '暗黑', value: 'dark' },
            { icon: 'i-ri:computer-line', label: '系统', value: '' },
          ]"
          class="w-60"
        />
      </div>
      <div v-if="userStore.preferences.app?.hasOwnProperty('lightTheme') && userStore.preferences.app?.hasOwnProperty('darkTheme')" class="themes">
        <div v-for="item in themeList" :key="item.label" class="theme" :class="{ active: settingsStore.currentColorScheme === 'dark' ? userStore.preferences.app.darkTheme === item.label : userStore.preferences.app.lightTheme === item.label }" @click="settingsStore.currentColorScheme === 'dark' ? userStore.preferences.app?.hasOwnProperty('darkTheme') && (userStore.preferences.app.darkTheme = item.label) : userStore.preferences.app?.hasOwnProperty('lightTheme') && (userStore.preferences.app.lightTheme = item.label)">
          <div class="content" :style="`background-color: rgb(${item.value['--ui-primary']});`" />
        </div>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc' && userStore.preferences.menu?.hasOwnProperty('menuMode')">
      <div class="divider">
        导航栏模式
      </div>
      <div class="menu-mode">
        <HTooltip text="侧边栏模式 (含主导航)" placement="bottom" :delay="500">
          <div class="mode mode-side" :class="{ active: userStore.preferences.menu.menuMode === 'side' }" @click="userStore.preferences.menu?.hasOwnProperty('menuMode') && (userStore.preferences.menu.menuMode = 'side')">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="顶部模式" placement="bottom" :delay="500">
          <div class="mode mode-head" :class="{ active: userStore.preferences.menu.menuMode === 'head' }" @click="userStore.preferences.menu?.hasOwnProperty('menuMode') && (userStore.preferences.menu.menuMode = 'head')">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="侧边栏模式 (不含主导航)" placement="bottom" :delay="500">
          <div class="mode mode-single" :class="{ active: userStore.preferences.menu.menuMode === 'single' }" @click="userStore.preferences.menu?.hasOwnProperty('menuMode') && (userStore.preferences.menu.menuMode = 'single')">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="侧边栏精简模式" placement="bottom" :delay="500">
          <div class="mode mode-only-side" :class="{ active: userStore.preferences.menu.menuMode === 'only-side' }" @click="userStore.preferences.menu?.hasOwnProperty('menuMode') && (userStore.preferences.menu.menuMode = 'only-side')">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="顶部精简模式" placement="bottom" :delay="500">
          <div class="mode mode-only-head" :class="{ active: userStore.preferences.menu.menuMode === 'only-head' }" @click="userStore.preferences.menu?.hasOwnProperty('menuMode') && (userStore.preferences.menu.menuMode = 'only-head')">
            <div class="mode-container" />
          </div>
        </HTooltip>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc' && userStore.preferences.layout?.hasOwnProperty('widthMode')">
      <div class="divider">
        页宽模式
      </div>
      <div class="app-width-mode">
        <HTooltip text="自适应" placement="bottom" :delay="500">
          <div class="mode mode-adaption" :class="{ active: userStore.preferences.layout.widthMode === 'adaption' }" @click="userStore.preferences.layout?.hasOwnProperty('widthMode') && (userStore.preferences.layout.widthMode = 'adaption')">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
        <HTooltip text="自适应 (有最小宽度)" placement="bottom" :delay="500">
          <div class="mode mode-adaption-min-width" :class="{ active: userStore.preferences.layout.widthMode === 'adaption-min-width' }" @click="userStore.preferences.layout?.hasOwnProperty('widthMode') && (userStore.preferences.layout.widthMode = 'adaption-min-width')">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
        <HTooltip text="定宽居中" placement="bottom" :delay="500">
          <div class="mode mode-center" :class="{ active: userStore.preferences.layout.widthMode === 'center' }" @click="userStore.preferences.layout?.widthMode && (userStore.preferences.layout.widthMode = 'center')" />
        </HTooltip>
        <HTooltip text="定宽居中 (有最大宽度)" placement="bottom" :delay="500">
          <div class="mode mode-center-max-width" :class="{ active: userStore.preferences.layout.widthMode === 'center-max-width' }" @click="userStore.preferences.layout?.widthMode && (userStore.preferences.layout.widthMode = 'center-max-width')">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
      </div>
    </div>
    <div v-if="userStore.preferences.mainPage?.hasOwnProperty('enableTransition') || userStore.preferences.mainPage?.hasOwnProperty('transitionMode')">
      <div class="divider">
        页面切换动画
      </div>
      <div v-if="userStore.preferences.mainPage?.hasOwnProperty('enableTransition')" class="flex items-center justify-center pb-4">
        <HToggle v-model="userStore.preferences.mainPage.enableTransition" />
      </div>
      <div v-if="userStore.preferences.mainPage?.hasOwnProperty('transitionMode')" class="transition-mode">
        <HTooltip text="淡入淡出" placement="bottom" :delay="500">
          <div class="mode mode-fade" :class="{ active: userStore.preferences.mainPage.transitionMode === 'fade' }" @click="userStore.preferences.mainPage?.hasOwnProperty('transitionMode') && (userStore.preferences.mainPage.transitionMode = 'fade')" />
        </HTooltip>
        <HTooltip text="向左滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-left" :class="{ active: userStore.preferences.mainPage.transitionMode === 'slide-left' }" @click="userStore.preferences.mainPage?.hasOwnProperty('transitionMode') && (userStore.preferences.mainPage.transitionMode = 'slide-left')" />
        </HTooltip>
        <HTooltip text="向右滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-right" :class="{ active: userStore.preferences.mainPage.transitionMode === 'slide-right' }" @click="userStore.preferences.mainPage?.hasOwnProperty('transitionMode') && (userStore.preferences.mainPage.transitionMode = 'slide-right')" />
        </HTooltip>
        <HTooltip text="向上滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-top" :class="{ active: userStore.preferences.mainPage.transitionMode === 'slide-top' }" @click="userStore.preferences.mainPage?.hasOwnProperty('transitionMode') && (userStore.preferences.mainPage.transitionMode = 'slide-top')" />
        </HTooltip>
        <HTooltip text="向下滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-bottom" :class="{ active: userStore.preferences.mainPage.transitionMode === 'slide-bottom' }" @click="userStore.preferences.mainPage?.hasOwnProperty('transitionMode') && (userStore.preferences.mainPage.transitionMode = 'slide-bottom')" />
        </HTooltip>
      </div>
    </div>
    <div
      v-if="
        (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('switchMainMenuAndPageJump'))
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuOnlyOneHide'))
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuUniqueOpened'))
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuCollapse'))
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuAutoCollapse'))
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('enableSubMenuCollapseButton'))
          || userStore.preferences.menu?.hasOwnProperty('isRounded')
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('menuActiveStyle'))
      "
    >
      <div class="divider">
        导航栏
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('switchMainMenuAndPageJump')" class="setting-item">
        <div class="label">
          主导航切换跳转
          <HTooltip text="切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.menu.switchMainMenuAndPageJump" :disabled="['single', 'only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuOnlyOneHide')" class="setting-item">
        <div class="label">
          次导航自动隐藏
          <HTooltip text="切换主导航时，如果次导航里只有一个导航时，则自动隐藏">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.menu.subMenuOnlyOneHide" :disabled="['single', 'only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuUniqueOpened')" class="setting-item">
        <div class="label">
          次导航保持展开一个
          <HTooltip text="次导航只保持单个菜单的展开">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.menu.subMenuUniqueOpened" :disabled="['only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuCollapse')" class="setting-item">
        <div class="label">
          次导航是否收起
        </div>
        <HToggle v-model="userStore.preferences.menu.subMenuCollapse" :disabled="['only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('subMenuAutoCollapse')" class="setting-item">
        <div class="label">
          次导航是否自动收起
          <HTooltip text="次导航收起时，鼠标悬停会临时展开">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.menu.subMenuAutoCollapse" :disabled="['only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="settingsStore.mode === 'pc' && userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('enableSubMenuCollapseButton')" class="setting-item">
        <div class="label">
          显示次导航展开/收起按钮
        </div>
        <HToggle v-model="userStore.preferences.menu.enableSubMenuCollapseButton" :disabled="['only-side', 'only-head'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('isRounded')" class="setting-item">
        <div class="label">
          是否圆角
        </div>
        <HToggle v-model="userStore.preferences.menu.isRounded" />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.menu?.hasOwnProperty('menuActiveStyle')" class="setting-item">
        <div class="label">
          激活风格
        </div>
        <HCheckList
          v-model="userStore.preferences.menu.menuActiveStyle" :options="[
            { icon: 'i-jam:stop-sign', value: '' },
            { icon: ['head', 'only-head'].includes(userStore.preferences.menu?.menuMode!) ? 'i-ep:caret-top' : 'i-ep:caret-left', value: 'arrow' },
            { icon: ['side', 'only-side'].includes(userStore.preferences.menu?.menuMode!) ? 'i-tabler:minus-vertical' : 'i-tabler:minus', value: 'line' },
            { icon: 'i-icon-park-outline:dot', value: 'dot' },
          ]"
        />
      </div>
    </div>
    <div v-if="userStore.preferences.topbar?.hasOwnProperty('mode') || userStore.preferences.topbar?.hasOwnProperty('switchTabbarAndToolbar')">
      <div class="divider">
        顶栏
      </div>
      <div v-if="userStore.preferences.topbar?.hasOwnProperty('mode')" class="setting-item">
        <div class="label">
          模式
        </div>
        <HCheckList
          v-model="userStore.preferences.topbar.mode" :options="[
            { label: '静止', value: 'static' },
            { label: '固定', value: 'fixed' },
            { label: '粘性', value: 'sticky' },
          ]"
        />
      </div>
      <div v-if="userStore.preferences.topbar?.hasOwnProperty('switchTabbarAndToolbar')" class="setting-item">
        <div class="label">
          展示切换
          <HTooltip text="切换标签栏和工具栏的展示顺序">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.topbar.switchTabbarAndToolbar" :disabled="!userStore.preferences.tabbar?.enable" />
      </div>
    </div>
    <div
      v-if="
        userStore.preferences.tabbar?.hasOwnProperty('style')
          || userStore.preferences.tabbar?.hasOwnProperty('enableIcon')
          || userStore.preferences.tabbar?.hasOwnProperty('enableMemory')
      "
    >
      <div class="divider">
        标签栏
      </div>
      <div v-if="userStore.preferences.tabbar?.hasOwnProperty('style')" class="setting-item">
        <div class="label">
          风格
        </div>
        <HCheckList
          v-model="userStore.preferences.tabbar.style" :options="[
            { label: '默认', value: '' },
            { label: '时尚', value: 'fashion' },
            { label: '卡片', value: 'card' },
            { label: '方块', value: 'square' },
          ]"
        />
      </div>
      <div v-if="userStore.preferences.tabbar?.hasOwnProperty('enableIcon')" class="setting-item">
        <div class="label">
          是否显示图标
        </div>
        <HToggle v-model="userStore.preferences.tabbar.enableIcon" />
      </div>
      <div v-if="userStore.preferences.tabbar?.hasOwnProperty('enableMemory')" class="setting-item">
        <div class="label">
          是否启用记忆功能
          <HTooltip text="非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.tabbar.enableMemory" />
      </div>
    </div>
    <div
      v-if="
        userStore.preferences.toolbar?.hasOwnProperty('breadcrumb')
          || userStore.preferences.toolbar?.hasOwnProperty('navSearch')
          || userStore.preferences.toolbar?.hasOwnProperty('fullscreen')
          || userStore.preferences.toolbar?.hasOwnProperty('pageReload')
          || userStore.preferences.toolbar?.hasOwnProperty('colorScheme')
          || userStore.preferences.toolbar?.hasOwnProperty('layout')
      "
    >
      <div class="divider">
        工具栏
      </div>
      <div v-if="settingsStore.mode === 'pc' && userStore.preferences.toolbar?.hasOwnProperty('breadcrumb')" class="setting-item">
        <div class="label">
          面包屑导航
        </div>
        <HToggle v-model="userStore.preferences.toolbar.breadcrumb" />
      </div>
      <div v-if="userStore.preferences.toolbar?.hasOwnProperty('navSearch')" class="setting-item">
        <div class="label">
          导航搜索
          <HTooltip text="对导航进行快捷搜索">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.toolbar.navSearch" />
      </div>
      <div v-if="settingsStore.mode === 'pc' && userStore.preferences.toolbar?.hasOwnProperty('fullscreen')" class="setting-item">
        <div class="label">
          全屏
        </div>
        <HToggle v-model="userStore.preferences.toolbar.fullscreen" />
      </div>
      <div v-if="userStore.preferences.toolbar?.hasOwnProperty('pageReload')" class="setting-item">
        <div class="label">
          页面刷新
          <HTooltip text="使用框架内提供的刷新功能进行页面刷新">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.toolbar.pageReload" />
      </div>
      <div v-if="userStore.preferences.toolbar?.hasOwnProperty('colorScheme')" class="setting-item">
        <div class="label">
          颜色主题
          <HTooltip text="可切换明亮/暗黑模式">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.toolbar.colorScheme" />
      </div>
      <div v-if="userStore.preferences.toolbar?.hasOwnProperty('layout')" ref="toolbarLayoutRef" class="mx-4 my-2 flex items-center rounded-2 px-2 py-1 ring-1 ring-stone-2 dark:ring-stone-7">
        <span
          v-for="tool in userStore.preferences.toolbar.layout" :key="tool" class="draggable flex-center p-1" :class="{
            'flex-1 text-stone-3 dark:text-stone-7 no-drag': tool === '->',
            'cursor-ew-resize': tool !== '->',
            'pointer-events-none w-0 op-0 p-0! no-drag': tool !== '->' && userStore.preferences.toolbar[tool] === false,
          }"
        >
          <SvgIcon v-if="tool === 'favorites'" name="i-uiw:star-off" />
          <SvgIcon v-if="tool === 'breadcrumb'" name="i-ic:twotone-double-arrow" :rotate="settingsStore.settings.app.direction === 'rtl' ? 180 : 0" />
          <SvgIcon v-if="tool === 'navSearch'" name="i-ri:search-line" />
          <SvgIcon v-if="tool === 'notification'" name="i-ri:notification-3-line" />
          <SvgIcon v-if="tool === 'i18n'" name="i-ri:translate" />
          <SvgIcon v-if="tool === 'fullscreen'" name="i-ri:fullscreen-line" />
          <SvgIcon v-if="tool === 'pageReload'" name="i-iconoir:refresh-double" />
          <SvgIcon v-if="tool === 'colorScheme'" name="i-ri:sun-line" />
          <span v-if="tool === '->'" class="pointer-events-none text-sm">布局调整</span>
        </span>
      </div>
    </div>
    <div
      v-if="
        settingsStore.mode === 'pc' && (
          userStore.preferences.breadcrumb?.hasOwnProperty('style')
          || (userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.breadcrumb?.hasOwnProperty('enableMainMenu'))
        )
      "
    >
      <div class="divider">
        面包屑导航
      </div>
      <div v-if="userStore.preferences.breadcrumb?.hasOwnProperty('style')" class="setting-item">
        <div class="label">
          风格
        </div>
        <HCheckList
          v-model="userStore.preferences.breadcrumb.style" :options="[
            { label: '默认', value: '' },
            { label: '现代', value: 'modern' },
          ]" :disabled="!userStore.preferences.toolbar?.breadcrumb"
        />
      </div>
      <div v-if="userStore.preferences.menu?.hasOwnProperty('menuMode') && userStore.preferences.breadcrumb?.hasOwnProperty('enableMainMenu')" class="setting-item">
        <div class="label">
          是否显示主导航
        </div>
        <HToggle v-model="userStore.preferences.breadcrumb.enableMainMenu" :disabled="['single'].includes(userStore.preferences.menu?.menuMode!)" />
      </div>
    </div>
    <div v-if="userStore.preferences.app?.hasOwnProperty('enableProgress')">
      <div class="divider">
        其它
      </div>
      <div class="setting-item">
        <div class="label">
          载入进度条
          <HTooltip text="该功能开启时，跳转路由会看到页面顶部有进度条">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="userStore.preferences.app.enableProgress" />
      </div>
    </div>
    <template #footer>
      <HButton block @click="handleReset">
        重置
      </HButton>
    </template>
  </HSlideover>
</template>

<style lang="scss" scoped>
.divider {
  --at-apply: flex items-center justify-between gap-4 my-4 whitespace-nowrap text-sm font-500;

  &::before,
  &::after {
    --at-apply: content-empty w-full h-1px bg-stone-2 dark:bg-stone-6;
  }
}

.themes {
  --at-apply: flex flex-wrap items-center justify-center gap-4 pb-4;

  .theme {
    --at-apply: flex items-center justify-center w-12 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;

      .content {
        --at-apply: rotate-0;
      }
    }

    .content {
      --at-apply: w-6 h-4 rounded-50% -rotate-45 transition;
    }
  }
}

.menu-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --at-apply: absolute pointer-events-none;
    }

    &::before {
      --at-apply: content-empty bg-ui-primary;
    }

    &::after {
      --at-apply: content-empty bg-ui-primary/60;
    }

    .mode-container {
      --at-apply: bg-ui-primary/20 border-width-1.5 border-dashed border-ui-primary;

      &::before {
        --at-apply: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --at-apply: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --at-apply: top-2 bottom-2 start-4.5 w-3;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-8 rounded-se-1 rounded-ee-1;
      }
    }

    &-head {
      &::before {
        --at-apply: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --at-apply: top-4.5 start-2 bottom-2 w-3 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-e-2 inset-b-2 inset-s-5.5 rounded-ee-1;
      }
    }

    &-single {
      &::after {
        --at-apply: top-2 start-2 bottom-2 w-3 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-5.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-side {
      &::before {
        --at-apply: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-4.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-head {
      &::before {
        --at-apply: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-e-2 inset-b-2 inset-s-2 rounded-es-1 rounded-ee-1;
      }
    }
  }
}

.app-width-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition of-hidden;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &-adaption {
      &::before {
        --at-apply: content-empty absolute w-full h-full bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-1;
      }

      .right {
        --at-apply: right-1;
      }
    }

    &-adaption-min-width {
      &::before {
        --at-apply: content-empty absolute w-1/2 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-0.5;
      }

      .right {
        --at-apply: right-0.5;
      }
    }

    &-center {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }
    }

    &-center-max-width {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-2.5;
      }

      .right {
        --at-apply: right-2.5;
      }
    }
  }
}

.transition-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative flex items-center justify-center w-14 h-10 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::after {
      --at-apply: content-empty absolute w-3/5 h-3/5 top-1/5 left-1/5 rounded-2 bg-stone-2 dark:bg-stone-9 transition;
    }

    &.mode-fade {
      &::after {
        animation: transition-mode-fade-after 1.5s infinite;
      }

      @keyframes transition-mode-fade-after {
        0% {
          opacity: 1;
        }

        30%,
        35% {
          opacity: 0;
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-left {
      &::after {
        animation: transition-mode-slide-left 1.5s infinite;
      }

      @keyframes transition-mode-slide-left {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-right {
      &::after {
        animation: transition-mode-slide-right 1.5s infinite;
      }

      @keyframes transition-mode-slide-right {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-top {
      &::after {
        animation: transition-mode-slide-top 1.5s infinite;
      }

      @keyframes transition-mode-slide-top {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-bottom {
      &::after {
        animation: transition-mode-slide-bottom 1.5s infinite;
      }

      @keyframes transition-mode-slide-bottom {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
}

.setting-item {
  --at-apply: flex items-center justify-between gap-4 px-4 py-2 rounded-2 transition hover:bg-stone-1 dark:hover:bg-stone-9;

  .label {
    --at-apply: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --at-apply: text-xl text-orange cursor-help;
    }
  }
}
</style>
