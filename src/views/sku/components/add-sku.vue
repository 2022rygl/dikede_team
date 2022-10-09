<template>
  <el-dialog
    :title="title"
    width="40%"
    :visible="dialogVisible"
    class="h"
    @close="btnCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item
        prop="skuName"
        label="商品名称:"
      >
        <el-input
          v-model="form.skuName"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="品牌:"
        prop="brandName"
      >
        <el-input
          v-model="form.brandName"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number v-model="form.price" controls-position="right" :step="0.5" :precision="2" :min="0.5" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="商品类型:" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择">
          <el-option
            v-for="item in arr1"
            :key="item.classId"
            v-model="item.classId"
            :label="item.className"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          v-model="form.unit"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="商品图片:" prop="skuImage">
        <el-upload
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          :http-request="beforeAvatarUpload"
        >
          <img v-if="form.skuImage" :src="form.skuImage" class="avatar">
          <i v-else class="el-icon-upload avatar-uploader-icon" />
        </el-upload>
        <p>支持扩展名：jpg、png，文件不得大于100kb</p>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="14">
        <el-button size="samll" class="quxiao" @click="btnCancel">取消</el-button>
      </el-col>
      <el-col :span="10">
        <el-button size="small" class="queren" @click="btnOK">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script >
import { addskuAPI, UploadPic, changeskuAPI } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    arr1: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      num: undefined,
      imageUrl: '',
      rules: {
        skuName: [{ required: true, message: '请输入', trigger: 'blur' }],
        brandName: [{ required: true, message: '请输入', trigger: 'blur' }],
        price: [{ required: true, message: '请输入', trigger: 'change' }],
        classId: [{ required: true, message: '请输入', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入', trigger: 'blur' }],
        skuImage: [{ required: true, message: '请上传', trigger: 'change' }]
      },
      form: {
        skuName: '',
        skuImage: '',
        price: undefined,
        classId: '',
        unit: '',
        brandName: '',
        skuId: ''
      }
    }
  },
  computed: {
    title() {
      return this.form.skuId ? '修改商品' : '新增商品'
    }
  },
  methods: {
    async btnOK() {
      try {
        await this.$refs.form.validate()
        if (this.form.skuId) {
          await changeskuAPI(this.form.skuName, this.form.skuImage, this.form.price * 100, this.form.classId, this.form.unit, this.form.brandName, this.form.skuId)
          this.$message.success('修改成功')
          this.$emit('skuSearchAPI')
        } else {
          await addskuAPI(this.form.skuName, this.form.skuImage, this.form.price * 100, this.form.classId, this.form.unit, this.form.brandName)
          this.$message.success('新增成功')
          this.$emit('skuSearchAPI')
        }
      } catch (error) {
        console.log(error)
      }
      this.btnCancel()
    },
    btnCancel() {
      this.$emit('update:dialogVisible', false)
      this.form = {
        skuName: '',
        skuImage: '',
        price: undefined,
        classId: '',
        unit: '',
        brandName: '',
        skuId: ''
      }
    },
    async beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.file.type === 'image/jpeg'
      const isPNG = file.file.type === 'image/png'
      const isLt2M = file.file.size / 1024 < 100
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 jpg、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 100kb!')
      }
      const fd = new FormData()
      fd.append('fileName', file.file)
      const { data } = await UploadPic(fd)
      this.form.skuImage = data
      return (isJPG || isPNG) && isLt2M
    }

  }
}
</script>

  <style scoped lang="scss">
  .h{
    font-weight:700
  }
  ::v-deep .el-dialog__header .el-icon-close:before {
  color: #333;
  }
  ::v-deep .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #303133;
  }
  ::v-deep .el-dialog__body {
    padding: 10px 20px 20px 20px;
    color: #606266;
   font-size: 14px;
   word-break: break-all;
  }
  ::v-deep .el-dialog{
   border-radius: 10px;
  }
  ::v-deep .el-dialog__header{
   background-color: #fff;
   border-radius: 10px
  }

  .el-form-item__label{
    width: 140px;
  }
  .el-dialog__header{
      background-color: #fff;
  }
  .el-dialog__header .el-dialog__title{
      color: #000;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    background: #F3F6FB;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    background: #F3F6FB;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 78px;
    text-align: center;
    border-radius: 6px;
    background-color: #F3F6FB;
  }
  .avatar {
    width: 76px;
    height: 76px;
    margin: 4px;
    display: block;
    -o-object-fit: contain;
    object-fit: contain;
  }

  .quxiao{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    font-size: 14px;
    margin-left: 200px;
}
.queren{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    font-size: 14px;
    color: #fff;
}
.el-input-number,.el-select{
  width: 100%;
}
p{
  font-size: 14px;
  color: #bac0cd;
}
  </style>
