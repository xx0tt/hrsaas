<template>
  <el-dialog
    @open="onOpen"
    @close="onClose"
    :visible="visible"
    title="分配角色"
  >
    <!-- 复选框 -->
    <el-checkbox-group style="text-align: center" v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesListApi } from '@/api/role'
import { getUserDetailApi } from '@/api/user'
import { assginRolesApi } from '@/api/employees'
export default {
  name: 'assignRole',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    assignId: {
      type: [String, Number]
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    onOpen() {
      // 获取角色列表
      getRolesListApi().then((res) => (this.roles = res.rows))
      // 获取员工角色
      getUserDetailApi(this.assignId).then(
        (res) => (this.checkList = res.roleIds)
      )
    },
    // 点击确定
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assginRolesApi({ id: this.assignId, roleIds: this.checkList })
      this.$message.success('分配成功')
      this.onClose()
    }
  }
}
</script>

<style scoped>
::v-deep .el-dialog__footer {
  text-align: center;
}
</style>
