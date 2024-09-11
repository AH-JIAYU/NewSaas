<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineOptions({
  name: "Copy",
});

const { copy, copied } = useClipboard()
// 传值就按传的值显示
const props = defineProps(["content"]);
const showing = ref(false);
// 复制
const handleCopy = () => {
  copy(props.content)

  showing.value = true;
  setTimeout(() => {
    showing.value = false;
  }, 2000); // 动画时间
}



</script>

<template>
  <div class="container">
    <SvgIcon @click="handleCopy" class="copySvg" name="i-ri:file-copy-2-fill" color="#4fa5ff" />
    <SvgIcon v-if="showing" class="success-icon" name="i-ant-design:like-outlined" color="#16c60c" />
    <!-- <div >✔️</div> -->

  </div>
</template>

<style scoped lang="scss">
/* 表格拷贝icon */
.copySvg {
  width: 16px;
  height: 16px;
  margin-left: 5px;
  cursor: pointer;
}

.container {
  position: relative;
  width: 21px;
}

.success-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 24px;
  color: green;
  opacity: 1;
  animation: floatUp 2s ease forwards;
  z-index: 9999;
  cursor: pointer;
}

@keyframes floatUp {
  0% {
    transform: translate(-50%, -100%);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, calc(-100% - 30px));
    opacity: 0;
  }
}
</style>
