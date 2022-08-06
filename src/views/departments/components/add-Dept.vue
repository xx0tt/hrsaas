<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="formData"
      :rules="fromRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getemployApi } from '@/api/employees'
import { addDeptsApi, getDeptbyIdApi, setDeptbyApi } from '@/api/department'
export default {
  data() {
    // 判断部门名是否重复
    const validatorNameRules = (rule, value, callback) => {
      let newdeptsList = this.deptsList
      let isRepeat

      if (this.formData.id) {
        // 编辑 排除兄弟项和自己
        newdeptsList = newdeptsList.filter((item) => {
          return item.pid === this.formData.pid && item.id !== this.formData.id
        })
        isRepeat = newdeptsList.every((item) => item.name !== value)
      } else {
        if (!this.currentNode.children) return callback()
        isRepeat = this.currentNode.children.every(
          (item) => item.name !== value
        )
      }
      isRepeat ? callback() : callback(new Error('部门已存在！'))
    }
    // 判断部门编码是否重复
    const validatorCodeRules = (rule, value, callback) => {
      let newdeptsList = this.deptsList

      if (this.formData.id) {
        // 如果是编辑 ，则先排除自身
        newdeptsList = newdeptsList.filter(
          (item) => item.id !== this.formData.id
        )
      }

      newdeptsList.every((item) => item.code !== value)
        ? callback()
        : callback(new Error('部门编码已存在！'))
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      fromRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: validatorNameRules, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: validatorCodeRules, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入选择负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employList: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    },
    deptsList: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getemploy()
  },
  methods: {
    // 关闭弹窗
    onClose() {
      this.formData = {}
      this.$refs.form.resetFields()
      this.$emit('update:dialogVisible', false)
    },
    // 获取员工列表
    async getemploy() {
      this.employList = await getemployApi()
    },
    // 点击确认按钮
    async onSave() {
      await this.$refs.form.validate() // 校验

      try {
        if (this.formData.id) {
          // 如果是编辑
          await setDeptbyApi(this.formData)
          this.$message.success('修改部门成功')
        } else {
          // 如果是添加
          this.formData.pid = this.currentNode.id // 传pid
          // 发送添加部门请求
          await addDeptsApi(this.formData)
          this.$message.success('添加部门成功')
        }
      } finally {
        // 重新渲染页面 关闭窗口
        await this.$parent.getDepts()
        this.onClose()
      }
    },

    // 点击编辑触发的
    async getDeptbyId(id) {
      this.formData = await getDeptbyIdApi(id)
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  }
}
</script>

<style></style>
