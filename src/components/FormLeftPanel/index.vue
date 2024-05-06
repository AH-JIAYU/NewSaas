<script lang="ts" setup>
defineProps({
  span: {
    type: Number,
    default: 12,
  },
})
</script>

<template>
  <el-col :lg="span" :md="24" :sm="24" :xl="span" :xs="24">
    <div class="left-panel">
      <slot />
    </div>
  </el-col>
</template>

<style>
.left-panel {
  display: flex;
  flex-wrap: wrap;
  place-content: center flex-start;
  align-items: center;
}
</style>
