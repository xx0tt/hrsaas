<template>
  <el-row style="width: 100%" type="flex">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="3">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col
          ><el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('addDept', treeNode)"
                >添加子部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('exit', treeNode.id)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown></el-col
        >
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/department'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 删除部门
    async onRemove() {
      try {
        await this.$confirm('您是否确定要删除该部门?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        await delDeptsApi(this.treeNode.id)
        // 重新渲染
        this.$emit('removeDept')
        this.$message.success('删除部门成功')
      } catch (error) {}
    }
  }
}
</script>

<style></style>
