<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      :file-list="fileList"
      action="#"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      list-type="picture-card"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
// id: AKIDThiYZi4bhYJqJXIFjrVNL6dxHWYMl8cr
// key: FK58KNAqGRNL8i30JL9kMpPkuSk3DuLn
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDThiYZi4bhYJqJXIFjrVNL6dxHWYMl8cr',
  SecretKey: 'FK58KNAqGRNL8i30JL9kMpPkuSk3DuLn'
})

// 在企业开发 id和key怎么获取,肯定不是明文
// var cos = new COS({
//   getAuthorization: async function (option, callback) {
//     console.log('获取鉴权12')
//     // 发送请求获取id和key
//     const res = await axios.get('url')
//     callback({
//       TmpSecretId: res.tmpSecretId,
//       TmpSecretKey: res.tmpSecretKey,
//       SecurityToken: res.sessionToken,
//       // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//       StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
//       ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000000
//     })
//   },
// })
// cos.putObject(
//   {
//     Bucket: 'examplebucket-1250000000' /* 必须 */,
//     Region: 'COS_REGION' /* 存储桶所在地域，必须字段 */,
//     Key: 'exampleobject' /* 必须 */,
//     StorageClass: 'STANDARD',
//     Body: '', // 上传文件对象
//     onProgress: function (progressData) {
//       console.log(JSON.stringify(progressData))
//     },
//   },
//   function (err, data) {
//     console.log(err || data)
//   }
// )
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hrsaas-31-1302962993' /* 桶的名字 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // 成功或值失败均进入该函数
          // err null false 没有错
          // err 不为null true 有错
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲,上传失败,请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      // 限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
      // console.log('上传前的检查', file)
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
