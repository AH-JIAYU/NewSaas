<script setup lang="ts">
import useClipboard from "vue-clipboard3";

defineOptions({
  name: "Copy",
});

// const { copy, copied } = useClipboard()
const { toClipboard } = useClipboard();
// 传值就按传的值显示
const props = defineProps(["content"]);
const showing = ref(false);
// 复制
const handleCopy = () => {
  toClipboard(props.content)
  showing.value = true;
  setTimeout(() => {
    showing.value = false;
  }, 2000); // 动画时间
}



</script>

<template>
  <div class="container">
    <SvgIcon @click="handleCopy" class="copySvg" name="i-ri:file-copy-2-fill" color="#4fa5ff" />
    <div v-if="showing" class="success-icon">
      <SvgIcon  name="i-ant-design:like-outlined" color="#16c60c" />
    </div>


  </div>
</template>

<style scoped lang="scss">
/* 表格拷贝icon */
.copySvg {
  width: 20px;
  height: 20px;
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
  left: 120%;
  transform: translate(-50% , -50%);
  font-size: 24px;
  color: green;
  opacity: 1;
  animation: floatUp 1s ease forwards;
  z-index: 99999;
  cursor: pointer;
}

@keyframes floatUp {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
