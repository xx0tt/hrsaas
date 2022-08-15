<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="OnRequest"
      :on-change="OnChange"
      :on-remove="OnRemove"
      :on-preview="OnPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="imgIsShow">
      <img :src="imgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDb3IBsLZYIm24qPkqhIekbEckcFcjbDah',
  SecretKey: 'xgAPPBi03qNfiW5ORGpAG7lBLGvKUO3S'
})

export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      // { name: 'cxk.jpg', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      imgIsShow: false,
      imgSrc: '',
      loading: false
    }
  },
  methods: {
    // 自定义上传事件
    OnRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'xx0tt-1313341672' /* 必须 桶名称 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请稍后重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    OnPreview(file) {
      this.imgIsShow = true
      this.imgSrc = file.url
    },
    OnChange(file, fileList) {
      this.fileList = fileList
    },
    OnRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      // 限制图片上传格式
      const type = ['image/jpeg', 'image/gif', 'image/png']
      if (!type.includes(file.type)) {
        this.$message.error('请选择' + type.join('、') + '图片')
        return false
      }
      // 限制图片上传大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
