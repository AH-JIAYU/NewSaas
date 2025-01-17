<route lang="yaml">
  meta:
    enabled: false
  </route>

<script setup lang="ts">
defineOptions({
  name: 'Email',
})

const emailbody = ref({
  emailProvider: 'sendgrid',
  sendGridApiKey: '',
  mailgunApiKey: '',
})

function sendTestEmail() {
  // 发送测试邮件的逻辑
};
function saveEmailConfig() {
  // 保存邮件配置的逻辑
};
</script>

<template>
  <div>
    <h2>邮件配置</h2>
    <select v-model="emailbody.emailProvider">
      <option value="sendgrid">
        SendGrid
      </option>
      <option value="mailgun">
        Mailgun
      </option>
    </select>
    <div v-if="emailbody.emailProvider === 'sendgrid'">
      <input v-model="emailbody.sendGridApiKey" type="text" placeholder="SendGrid API Key">
    </div>
    <div v-if="emailbody.emailProvider === 'mailgun'">
      <input v-model="emailbody.mailgunApiKey" type="text" placeholder="Mailgun API Key">
    </div>
    <button @click="sendTestEmail">
      发送测试邮件
    </button>
    <button @click="saveEmailConfig">
      保存配置
    </button>
  </div>
</template>

<style lang="scss" scoped>
// 样式
</style>
