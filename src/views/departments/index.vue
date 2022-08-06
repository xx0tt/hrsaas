<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="box-card">
        <!-- 头部 -->
        <tree-tools
          isRoot
          :treeNode="{ name: '传智教育', manager: '负责人' }"
          @addDept="addDept"
        />
        <!-- 树形 -->
        <el-tree :data="TreeData" :props="defaultProps" default-expand-all>
          <template v-slot="scoped">
            <tree-tools
              @removeDept="getDepts"
              :treeNode="scoped.data"
              @addDept="addDept"
              @exit="exitFn"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门弹出层 -->
    <addDept
      ref="addDept"
      :dialogVisible.sync="dialogVisible"
      :currentNode="currentNode"
      :deptsList="deptsList"
    />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils'
import addDept from './components/add-Dept.vue'
export default {
  data() {
    return {
      TreeData: [],
      defaultProps: { label: 'name' },
      dialogVisible: false,
      currentNode: {},
      deptsList: [],
      loading: false
    }
  },
  components: { treeTools, addDept },
  created() {
    this.getDepts()
  },
  methods: {
    // 获取组织架构
    async getDepts() {
      this.loading = true
      const data = await getDeptsApi()

      // 将平铺数据转换成树型数据
      this.TreeData = transListToTree(data.depts, '')

      // 存一份到deptsList 给子组件备用
      this.deptsList = data.depts

      this.loading = false
    },

    // 添加子部门
    addDept(currentNode) {
      this.currentNode = currentNode
      this.dialogVisible = true
    },

    // 编辑部门
    exitFn(id) {
      this.$refs.addDept.getDeptbyId(id)
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="less"></style>
