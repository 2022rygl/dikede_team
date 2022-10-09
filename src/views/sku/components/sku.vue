<template>
  <div class="header">
    <div class="header-mian">
      <div class="mian">
        <p>商品搜索：</p>
        <el-input v-model="input" placeholder="请输入" style="width:205px;height: 36px;line-height: 36px;padding-right: 10px;" />
        <el-button icon="el-icon-search" class="btn-search" @click="submit">查询</el-button>
      </div>
      <div class="end">
        <div class="end-body">
          <div class="btncss">
            <el-button icon="el-icon-circle-plus-outline" class="btn-add" @click="handleAdd">新建</el-button>
            <el-button class="btn-addData" @click="into">导入数据</el-button>
          </div>
          <el-table
            :data="arr"
            style="width: 100%"
            :header-cell-style="{ background: 'rgb(243, 246, 251)', color: '#666' ,fontWeight:'400'}"
          >
            <el-table-column
              type="index"
              label="序号"
              width="100"
            />
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="150"
            />
            <el-table-column align="center" prop="skuImage" label="商品图片" width="200">
              <template scope="scope">
                <img :src="scope.row.skuImage" width="24" height="24" border-radius="50%">
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="规格"
              width="160"
            />
            <el-table-column
              prop="price"
              label="商品价格"
              width="160"
            />
            <el-table-column
              prop="skuClass.className"
              label="产品类型"
              width="160"
            />
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="200"
            />
            <el-table-column
              prop="address"
              label="操作"
              width="120"
            >
              <template slot-scope="{ row }">
                <el-button type="text" size="small" class="change" @click="editRow(row)"> 修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fengye">
          <p>共条记录{{ allArr.totalCount }} 第{{ allArr.pageIndex
          }} /{{ allArr.totalPage }}页</p>
          <div>
            <el-button>上一页</el-button>
            <el-button>下一页</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--新建组件-->
    <add-sku ref="AddSku" :dialog-visible.sync="dialogVisible" :arr1="arr1" @skuSearchAPI="skuSearchAPI" />
    <!-- 导入组件 -->
    <add-skuinto :btnadd-data.sync="btnaddData" />
  </div>
</template>

<script>
import { skuSearchAPI, skuClassSearchAPI } from '@/api/sku'
import AddSku from './add-sku.vue'
import AddSkuinto from './add-skuinto.vue'
export default {
  name: '',
  components: { AddSku, AddSkuinto },
  props: {},
  data() {
    return {
      input: '',
      arr: [],
      allArr: [],
      dialogVisible: false,
      btnaddData: false,
      arr1: []
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.skuSearchAPI()
    // this.skuClassSearch()
  },
  methods: {
    async skuSearchAPI() {
      const { data } = await skuSearchAPI()
      this.allArr = data
      console.log(data)
      this.arr = data.currentPageRecords
      console.log(this.arr)
    },
    async editRow(row) {
      console.log(row)
      this.dialogVisible = true
      this.$refs.AddSku.form = {
        skuName: row.skuName,
        skuImage: row.skuImage,
        price: row.price,
        classId: row.classId,
        unit: row.unit,
        brandName: row.brandName,
        skuId: row.skuId
      }
    },
    async handleAdd() {
      this.dialogVisible = true
      const { data } = await skuClassSearchAPI()
      this.arr1 = data.currentPageRecords
    },
    async submit() {
      const xx = await skuSearchAPI(1, 100000, this.input)
      console.log(xx)
      this.arr = xx.data.currentPageRecords
    },
    into() {
      this.btnaddData = true
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  padding: 20px;
  background-color: #F8FAFD;
  .header-mian{
    padding: 20px;
  }
}
.mian{
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 64px;
  p{
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    margin-left: 10px;
  }
}
.btn-search{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: #5f84ff;
  border: none;
  color: #fff;
}
.end{
margin-top: 50px;
background-color: #fff;
}
.btncss{
  display: flex;
}
.btn-add{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    color: #fff;
    margin-bottom:20px;
}
.btn-addData{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
}
.search-from{
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
}
.end-body{
  margin: 10px ;
}
.change{
    color: #5f84ff;
    font-size: 14px;
  }
.el-table td, .el-table th.is-leaf{
  border-bottom: none;
}
.el-table::before {
height: 0;
}
.fengye{
  display: flex;
}
</style>
