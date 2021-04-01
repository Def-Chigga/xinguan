<template>
  <div class="goods">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容卡片区域-->
    <el-card class="box-card">
      <!--头部搜索区域-->
      <el-row>
        <el-col :span="22">
          <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="searchData.goodsName" placeholder="物资名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchData.goodsType" placeholder="型号/规格" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="exportUser">导出搜索结果</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-upload
            class="excel-uploader"
            action="http://127.0.0.1:7001/api/v1/importGoods/"
            :show-file-list="false"
            :on-success="handleExcelSuccess"
            :before-upload="beforeExcelUpload"
            accept=".xls,.xlsx">
            <el-button type="primary">导入物资</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <!--中间表格区域-->
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :stripe="true">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="物资名称">
        </el-table-column>
        <el-table-column
          prop="goodsType"
          label="型号/规格">
        </el-table-column>
        <el-table-column
          prop="goodsUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="goodsReverse"
          label="库存">
        </el-table-column>
      </el-table>
    </el-card>

    <!--底部分页区域-->
    <el-pagination
      :current-page="searchData.currentPage"
      :page-sizes="[10, 20, 40, 60]"
      :page-size="searchData.pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { getGoods } from './../api/index';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  name: 'Users',
  data() {
    return {
      searchData: {
        goodsName: '',
        goodsType: '',
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      tableData: []
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    // 跳转首页
    resetDefaultActivePath() {
      sessionStorage.removeItem('activePath');
    },
    // 查询
    onSubmit() {
      this.getGoods();
    },
    // 导出搜索结果
    exportUser() {
      const goods = this.tableData.length ? this.tableData[0] : null;
      const data = [];
      if (goods) {
        const columnTitles = Object.keys(goods);
        data.push(columnTitles);
        this.tableData.forEach((goods) => {
          const temp = [];
          columnTitles.forEach((key) => {
            temp.push(goods[key]);
          });
          data.push(temp);
        });
      }
      // 1.根据二维数组生成表格中的数据
      const sheet = XLSX.utils.aoa_to_sheet(data);
      // 2.创建一个新的表格
      const workbook = XLSX.utils.book_new();
      // 3.把数据添加到表格中, 并给这个表格起一个名称
      XLSX.utils.book_append_sheet(workbook, sheet, 'goods');
      // 4.将生成好的表格保存到本地
      // XLSX.writeFile(workbook, 'users.xls'); // 有兼容问题
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
      const wbout = XLSX.write(workbook, wopts);
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'goods.xlsx');
    },

    // 上传Excel相关代码
    handleExcelSuccess(res, file) {
      // console.log(res);
      if (res.status === 200) {
        this.getGoods();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeExcelUpload(file) {
      // console.log(file.type);
      const isExcel = file.type === 'application/vnd.ms-excel' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isExcel) {
        this.$message.error('只能上传Excel文件');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isExcel && isLt2M;
    },

    // 分页相关代码
    getGoods() {
      getGoods(this.searchData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data.goods;
            this.totalCount = res.data.totalCount;
            // console.log(res.data);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((e) => {
          this.$message.error(e.msg);
        });
    },
    handleSizeChange(currentSize) {
      // console.log(currentSize);
      this.searchData.pageSize = currentSize;
      this.getGoods();
    },
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.searchData.currentPage = currentPage;
      this.getGoods();
    }
  }
};
</script>

<style scoped lang="scss">
  .goods{
    .el-breadcrumb{
      padding-bottom: 20px;
    }
    .el-pagination{
      padding-top: 20px;
    }
  }
</style>
