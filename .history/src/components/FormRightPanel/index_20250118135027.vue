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
    <div class="right-panel">
      <slot />
    </div>
  </el-col>
</template>

<style>
.right-panel {
  display: flex;
  flex-wrap: wrap;
  place-content: center flex-end;
  align-items: center;
}
</style>
