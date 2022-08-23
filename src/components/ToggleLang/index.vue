<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon iconClass="language" className="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(val, key) in messages"
        :key="key"
        :command="key"
        :disabled="key === $i18n.locale"
        >{{ val.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },
  methods: {
    onCommand(val) {
      this.$i18n.locale = val
      cookie.set('i18nLang', val)
      this.$router.go(0) // 原地刷新
    }
  }
}
</script>

<style scoped lang="scss">
.language {
  color: #fff;
  margin-right: 14px;
  font-size: 20px;
}
</style>
