<template>
  <el-dialog @open="onOpen" @close="close" title="分配角色" :visible="visible">
    <el-checkbox-group v-model="checkList">
      <!-- label: 渲染 name -->
      <!-- 会记录选中值 id -->
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        <!-- 插槽也可以用于渲染 -->
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [], // 记录选中的角色
      roles: [],
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    // 监听对话框打开
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    // 获取员工角色
    async getEmployeesRoles() {
      // console.log()
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      })
      this.$message.success('分配成功')
      this.close()
    },
  },
}
</script>

<style scoped lang="less"></style>
