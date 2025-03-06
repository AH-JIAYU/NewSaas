<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

defineOptions({
  name: 'PageReload',
})

const router = useRouter()
const mainPage = useMainPage()

const isAnimating = ref(false)

function handleClick() {
  isAnimating.value = true
    // 将 reload 包装成 Promise
  const reloadPromise = new Promise<void>((resolve, reject) => {
    try {
      mainPage.reload()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
  // 调用 reloadPromise.reload 方法尝试刷新页面
  reloadPromise.catch(() => {
    // 如果 useMainPage 的 reload 方法抛出错误，则使用 router 进行页面刷新
    router.push({ name: router.currentRoute.value.name, query: { reload: Date.now() } })
  }).finally(() => {
    isAnimating.value = false
  })
}
</script>

<template>
  <span class="flex-center cursor-pointer px-2 py-1" :class="{ animation: isAnimating }" @click="handleClick" @animationend="isAnimating = false">
    <SvgIcon name="i-iconoir:refresh-double" />
  </span>
</template>

<style scoped>
.animation {
  animation: animation 1s;
}

@keyframes animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
