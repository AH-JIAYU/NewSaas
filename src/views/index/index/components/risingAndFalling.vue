<route lang="yaml">
meta:
  title: 导航1
</route>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const props = defineProps(["Difference", "type"]);
const { t } = useI18n(); // 国际化
</script>

<template>
  <div class="compare" v-if="props.type !== 'year'">
    <div class="compare-hui">
      {{ props.type === "day" ? t("home.yesterday") : t("home.lastMonth") }}
    </div>
    <template v-if="Math.abs(props.Difference) === 0">
      <div class="quantity-num">{{ t("home.fair") }}</div>
    </template>
    <template v-else>
      <div class="quantity-num">{{ Math.abs(props.Difference) }}</div>
      <div class="quantity-icon">
        <!-- 上升 -->
        <svg
          v-if="props.Difference > 0"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame" clip-path="url(#clip0_168_10011)">
            <path
              id="Vector"
              d="M0.587678 6.69506L6.43968 0.843061C6.74768 0.535061 7.25168 0.535061 7.56668 0.843061L13.4117 6.69506C13.9157 7.19906 13.5587 8.05306 12.8517 8.05306H1.14768C0.440678 8.05306 0.0836778 7.19206 0.587678 6.69506Z"
              fill="#FF7D7D"
            />
            <path
              id="Vector_2"
              d="M5.10393 4.37805H8.89793C9.39493 4.37805 9.79393 4.77705 9.79393 5.27405V13.4431C9.79393 13.9401 9.39493 14.3391 8.89793 14.3391H5.11093C4.61393 14.3391 4.21493 13.9401 4.21493 13.4431V5.27405C4.20793 4.77705 4.60693 4.37805 5.10393 4.37805Z"
              fill="#FF7D7D"
            />
          </g>
          <defs>
            <clipPath id="clip0_168_10011">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <!-- 下降 -->
        <svg
          v-else
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_283_7192)">
            <path
              d="M0.587678 7.80518L6.43968 13.6572C6.74768 13.9652 7.25168 13.9652 7.56668 13.6572L13.4117 7.80518C13.9157 7.30118 13.5587 6.44718 12.8517 6.44718H1.14768C0.440678 6.44718 0.0836778 7.30818 0.587678 7.80518Z"
              fill="#00C738"
            />
            <path
              d="M5.10393 10.1221H8.89793C9.39493 10.1221 9.79393 9.72307 9.79393 9.22607V1.05707C9.79393 0.560071 9.39493 0.161071 8.89793 0.161071H5.11093C4.61393 0.161071 4.21493 0.560071 4.21493 1.05707V9.22607C4.20793 9.72307 4.60693 10.1221 5.10393 10.1221Z"
              fill="#00C738"
            />
          </g>
          <defs>
            <clipPath id="clip0_283_7192">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="matrix(1 0 0 -1 0 14)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.compare {
  max-width: 7.375rem;
  height: 1.8125rem;
  background: #f0f5fa;
  border-radius: 6.25rem 6.25rem 6.25rem 6.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .compare-hui {
    width: 2.625rem;
    height: 1.25rem;
    font-family: D-DIN Exp;
    font-weight: 400;
    font-size: 0.875rem;
    color: #777777;
    line-height: 1.25rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .quantity-num {
    width: 2rem;
    height: 3.125rem;
    line-height: 3.125rem;
    font-family: D-DIN Exp;
    font-weight: 500;
    font-size: 0.875rem;
    color: #333333;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
