<route lang="yaml">
name: notFound
meta:
  title: 找不到页面
  constant: true
  layout: false
</route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import apiApp from "@/api/modules/app";

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()
const pathList = ref<any>([])
const data = ref({
  inter: Number.NaN,
  countdown: 5,
})

onBeforeRouteLeave(() => {
  data.value.inter && window.clearInterval(data.value.inter)
})

onMounted(async () => {
  const res = await apiApp.routeList()
  if(res.data) {
    const arr = transformTree(res.data)
    pathList.value = extractPaths(arr)
  }
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.remove(route.meta.activeMenu || route.fullPath)
  }
  data.value.inter = window.setInterval(() => {
    data.value.countdown--
    if (data.value.countdown === 0) {
      data.value.inter && window.clearInterval(data.value.inter)
      goBack()
    }
  }, 1000)
})

// 递归函数来转换数据为树形结构，并根据 sort 排序
function transformTree(data: any) {
  return data
    .sort((a: any, b: any) => a.sort - b.sort)  // 按 sort 属性排序
    .map((item: any) => {
      const { path, sort, children, component } = item;
      return {
        path,
        sort,
        children: children ? transformTree(children) : null,
        component: component,
      };
    });
}
// 递归函数来提取路径并排序
function extractPaths(data: any) {
  let paths: any = [];
  // 遍历每个节点
  data.forEach((item: any) => {
    if (item.path && item.component !== '' && item.component !== "Layout") {
      paths.push(item.path);
    }
    // 如果有子节点，递归提取
    if (item.children && item.children.length > 0) {
      paths = paths.concat(extractPaths(item.children)); // 将子节点的路径拼接到当前路径数组
    }
  });
  return paths;
}

// 找不到页面按照排序去第一个
function goBack() {
  if (pathList.value.length) {
    if (pathList.value[0].includes('/')) {
      router.push(pathList.value[0])
    } else {
      router.push(`/${pathList.value.length[0]}`)
    }
  }

}

</script>

<template>
  <div
    class="absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12">
    <SvgIcon name="404" class="text-[300px] lg:text-[400px]" />
    <div class="flex flex-col gap-4">
      <h1 class="m-0 text-6xl font-sans">
        404
      </h1>
      <div class="desc mx-0 text-xl text-stone-5">
        抱歉，你访问的页面不存在
      </div>
      <div>
        <HButton @click="goBack">
          {{ data.countdown }} 秒后，返回首页
        </HButton>
      </div>
    </div>
  </div>
</template>
