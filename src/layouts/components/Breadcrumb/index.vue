<template>
  <div class="flex items-center text-sm">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
:deep(.breadcrumb-item) {
  &:first-child {
    .separator {
      display: none;
    }
  }

  &:last-child {
    .text {
      background-color: #f2f2f2 !important;
      color: rgba($color: #000000, $alpha: 0.8);
      opacity: 1;
    }
  }
}
</style>
