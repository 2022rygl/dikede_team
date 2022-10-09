<template>
  <div class="header">
    <div class="header-mian">
      <div class="mian">
        <p>商品类型搜索：</p>
        <el-input v-model="input" placeholder="请输入" style="width:205px;height: 36px;line-height: 36px;padding-right: 10px;" />
        <el-button icon="el-icon-search" class="btn-search" @click="submit">查询</el-button>
      </div>
      <div class="end">
        <div class="end-body">
          <el-button icon="el-icon-circle-plus-outline" class="btn-add" @click="handleAdd">新建</el-button>

          <el-table
            :data="arr"
            style="width: 100%;"
            :header-cell-style="{ background: 'rgb(243, 246, 251)', color: '#666' ,fontWeight:'400'}"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            />
            <el-table-column
              prop="className"
              label="商品类型名称"
              width="1000"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="{ row }">
                <el-button type="text" size="small" class="change" @click="editRow(row)"> 修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  class="delete"
                  @click="delRow(row.classId)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
    <!--放置一个弹层组件-->
    <add-sku-class ref="AddSkuClass" :show-dialog.sync="showDialog" @skuClassSearch="skuClassSearch" />
  </div>
</template>

<script>
import { skuClassSearchAPI, delskuClassAPI } from '@/api/sku'
import AddSkuClass from './add-skuClass.vue'
export default {
  name: '',
  components: { AddSkuClass },
  props: {},
  data() {
    return {
      input: '',
      arr: [],
      showDialog: false,
      row: {}
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.skuClassSearch()
  },
  methods: {
    async skuClassSearch() {
      const { data } = await skuClassSearchAPI()
      this.arr = data.currentPageRecords
      console.log(this.arr)
    },
    async delRow(id) {
      try {
        await this.$confirm('确认删除该商品名称吗？')
        await delskuClassAPI(id)
        this.$message.success('删除成功')
        this.skuClassSearch()
      } catch (error) {
        console.log(error)
      }
    },
    async editRow(row) {
      console.log(row)
      this.showDialog = true
      this.$refs.AddSkuClass.shopForm = {
        classId: row.classId,
        className: row.className
      }
    },
    handleAdd() {
      this.showDialog = true
    },
    async submit() {
      const xx = await skuClassSearchAPI(1, 100000, this.input)
      console.log(xx)
      this.arr = xx.data.currentPageRecords
    }

  }
}
</script>
<style lang="scss" >
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
  .delete{
    color: #ff5a5a;

    font-size: 14px;
  }

.el-table td, .el-table th.is-leaf{
  border-bottom: none;
}
.el-table::before {
height: 0;
}
.el-table .cell{
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  color: rgb(102, 102, 102) !important;
  font-weight:500;
}
.el-table thead {
    color: #909399;
    font-weight: 500;
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

</style>
