<template>
  <div class="goods_in">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资入库</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容卡片区域-->
    <el-card class="box-card">
      <!--头部搜索区域-->
      <el-row>
        <el-col :span="22">
          <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchData.goodsInName"  placeholder="物资名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchData.goodsInUsername" placeholder="入库人" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker
                clearable
                v-model="searchData.goodsInDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="入库日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="exportGoods">导出搜索结果</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="showCreateGoodsInDialog('createForm')">物资入库</el-button>
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
          prop="goodsInName"
          label="物资名称">
        </el-table-column>
        <el-table-column
          prop="goodsInType"
          label="型号/规格">
        </el-table-column>
        <el-table-column
          prop="goodsInTotal"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="goodsInUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="goodsInUsername"
          label="入库人">
        </el-table-column>
        <el-table-column
          prop="goodsInJob"
          label="所属岗位">
        </el-table-column>
        <el-table-column
          prop="goodsInDate"
          label="入库日期">
        </el-table-column>
        <el-table-column
          prop="goodsInComment"
          label="备注">
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

    <!--物资入库对话框-->
    <el-dialog
      title="物资入库"
      :visible.sync="createGoodsInDialogVisible"
      width="30%">
      <el-form ref="createForm" :model="goodsData" :rules="createGoodsInRules" label-width="100px">
        <el-form-item label="物资名称" prop="goodsInName">
<!--          <el-input v-model="goodsData.goodsInName"></el-input>-->
          <el-select v-model="goodsData.goodsInName" placeholder="物资名称">
            <el-option label="防疫一次性口罩" value="防疫一次性口罩"></el-option>
            <el-option label="高浓度84消毒液" value="高浓度84消毒液"></el-option>
            <el-option label="医用消毒酒精" value="医用消毒酒精"></el-option>
            <el-option label="消毒洗手液" value="消毒洗手液"></el-option>
            <el-option label="电子体温枪" value="电子体温枪"></el-option>
            <el-option label="水银温度计" value="水银温度计"></el-option>
            <el-option label="肩背式喷雾器" value="肩背式喷雾器"></el-option>
            <el-option label="手持式喷雾器" value="手持式喷雾器"></el-option>
            <el-option label="一次性手套" value="一次性手套"></el-option>
            <el-option label="一次性垃圾袋" value="一次性垃圾袋"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格/型号" prop="goodsInType">
<!--          <el-input v-model="goodsData.goodsInType"></el-input>-->
          <el-select v-model="goodsData.goodsInType" placeholder="规格/类型">
            <el-option label="医用口罩" value="医用口罩"></el-option>
            <el-option label="120ml" value="120ml"></el-option>
            <el-option label="200ml" value="200ml"></el-option>
            <el-option label="300ml" value="300ml"></el-option>
            <el-option label="小型" value="小型"></el-option>
            <el-option label="中型" value="中型"></el-option>
            <el-option label="大型" value="大型"></el-option>
            <el-option label="橡胶" value="橡胶"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="goodsInTotal">
          <el-input-number v-model="goodsData.goodsInTotal"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" prop="goodsInUnit">
<!--          <el-input v-model="goodsData.goodsInUnit"></el-input>-->
          <el-select v-model="goodsData.goodsInUnit" placeholder="单位">
            <el-option label="个" value="个"></el-option>
            <el-option label="瓶" value="瓶"></el-option>
            <el-option label="把" value="把"></el-option>
            <el-option label="支" value="支"></el-option>
            <el-option label="双" value="双"></el-option>
            <el-option label="卷" value="卷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库人">
          <el-input v-model="goodsData.goodsInUsername" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属岗位" prop="goodsInJob">
          <el-select v-model="goodsData.goodsInJob" placeholder="-所有角色-">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="goodsData.goodsInDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择入库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="goodsData.goodsInComment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="createGoodsInDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createGoods('createForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import { createGoodsIn, getGoodsIn } from './../api/index';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  name: 'GoodsIn',
  data() {
    return {
      searchData: {
        goodsInName: '',
        goodsInUsername: '',
        goodsInDate: '',
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      tableData: [],
      createGoodsInDialogVisible: false,
      goodsData: {
        goodsInName: '',
        goodsInType: '',
        goodsInTotal: '',
        goodsInUnit: '',
        goodsInUsername: '',
        goodsInDate: '',
        goodsInJob: '',
        goodsInComment: ''
      },
      createGoodsInRules: {
        goodsInName: [
          { required: true, message: '请输入物资名称', trigger: 'blur' }
        ],
        goodsInType: [
          { required: true, message: '请输入规格/型号', trigger: 'blur' }
        ],
        goodsInTotal: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        goodsInUnit: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        goodsInUsername: [
          { required: true, message: '请输入入库人', trigger: 'blur' }
        ],
        goodsInJob: [
          { required: true, message: '请选择岗位', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      this.goodsData.goodsInUsername = JSON.parse(userInfo).username;
    }
    this.getGoodsIn();
  },
  methods: {
    // 跳转首页
    resetDefaultActivePath() {
      sessionStorage.removeItem('activePath');
    },
    // 查询
    onSubmit() {
      this.getGoodsIn();
    },
    // 导出搜索结果
    exportGoods() {
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
      XLSX.utils.book_append_sheet(workbook, sheet, 'goods_in');
      // 4.将生成好的表格保存到本地
      // XLSX.writeFile(workbook, 'goods_in.xls'); // 有兼容问题
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
      const wbout = XLSX.write(workbook, wopts);
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'goods_in.xlsx');
    },

    // 物资入库相关
    showCreateGoodsInDialog(formName) {
      this.createGoodsInDialogVisible = true;
      this.goodsData.goodsInDate = '';
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    createGoods(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createGoodsIn(this.goodsData)
            .then(res => {
              if (res.status === 200) {
                // this.tableData.push(this.goodsData);
                this.getGoodsIn();
                this.$message.success(res.msg);
                this.createGoodsInDialogVisible = false;
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        } else {
          this.$message({
            type: 'error',
            message: '数据格式不对'
          });
        }
      });
    },

    // 上传Excel相关代码
    handleExcelSuccess(res, file) {
      // console.log(res);
      if (res.status === 200) {
        this.getGoodsIn();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeExcelUpload(file) {
      // console.log(file.type);
      const isExcel = file.type === 'application/vnd.ms-excel' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isExcel) {
        this.$message.error('只能上传Excel文件');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isExcel && isLt2M;
    },

    // 分页相关代码
    getGoodsIn() {
      getGoodsIn(this.searchData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data.goodsIn;
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
      this.getGoodsIn();
    },
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.searchData.currentPage = currentPage;
      this.getGoodsIn();
    }
  }
};
</script>

<style scoped lang="scss">
  .goods_in{
    .el-breadcrumb{
      padding-bottom: 20px;
    }
    .el-pagination{
      padding-top: 20px;
    }
  }
</style>
