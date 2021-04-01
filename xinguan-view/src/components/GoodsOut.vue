<template>
  <div class="goods_out">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资领用</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容卡片区域-->
    <el-card class="box-card">
      <!--头部搜索区域-->
      <el-row>
        <el-col :span="22">
          <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchData.goodsOutName"  placeholder="物资名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchData.goodsOutUsername" placeholder="领用人" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker
                clearable
                v-model="searchData.goodsOutDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="领用日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="exportGoods">导出搜索结果</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="showCreateGoodsOutDialog('createForm')">物资领用</el-button>
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
          prop="goodsOutName"
          label="物资名称">
        </el-table-column>
        <el-table-column
          prop="goodsOutType"
          label="型号/规格">
        </el-table-column>
        <el-table-column
          prop="goodsOutTotal"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="goodsOutUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="goodsOutUsername"
          label="领用人">
        </el-table-column>
        <el-table-column
          prop="goodsOutJob"
          label="所属岗位">
        </el-table-column>
        <el-table-column
          prop="goodsOutDate"
          label="领用日期">
        </el-table-column>
        <el-table-column
          prop="goodsOutComment"
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

    <!--物资领用对话框-->
    <el-dialog
      title="物资领用"
      :visible.sync="createGoodsOutDialogVisible"
      width="30%">
      <el-form ref="createForm" :model="goodsData" :rules="createGoodsOutRules" label-width="100px">
        <el-form-item label="物资名称" prop="goodsOutName">
          <!--          <el-input v-model="goodsData.goodsOutName"></el-input>-->
          <el-select v-model="goodsData.goodsOutName" placeholder="物资名称">
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
        <el-form-item label="规格/型号" prop="goodsOutType">
          <!--          <el-input v-model="goodsData.goodsOutType"></el-input>-->
          <el-select v-model="goodsData.goodsOutType" placeholder="规格/类型">
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
        <el-form-item label="数量" prop="goodsOutTotal">
          <el-input-number v-model="goodsData.goodsOutTotal"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" prop="goodsOutUnit">
          <!--          <el-input v-model="goodsData.goodsOutUnit"></el-input>-->
          <el-select v-model="goodsData.goodsOutUnit" placeholder="单位">
            <el-option label="个" value="个"></el-option>
            <el-option label="瓶" value="瓶"></el-option>
            <el-option label="把" value="把"></el-option>
            <el-option label="支" value="支"></el-option>
            <el-option label="双" value="双"></el-option>
            <el-option label="卷" value="卷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领用人">
          <el-input v-model="goodsData.goodsOutUsername" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属岗位" prop="goodsOutJob">
          <el-select v-model="goodsData.goodsOutJob" placeholder="-所有角色-">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领用日期">
          <el-date-picker
            v-model="goodsData.goodsOutDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择领用日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="goodsData.goodsOutComment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="createGoodsOutDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createGoods('createForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import { createGoodsOut, getGoodsOut } from './../api/index';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  name: 'GoodsOut',
  data() {
    return {
      searchData: {
        goodsOutName: '',
        goodsOutUsername: '',
        goodsOutDate: '',
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      tableData: [],
      createGoodsOutDialogVisible: false,
      goodsData: {
        goodsOutName: '',
        goodsOutType: '',
        goodsOutTotal: '',
        goodsOutUnit: '',
        goodsOutUsername: '',
        goodsOutDate: '',
        goodsOutJob: '',
        goodsOutComment: ''
      },
      createGoodsOutRules: {
        goodsOutName: [
          { required: true, message: '请输入物资名称', trigger: 'blur' }
        ],
        goodsOutType: [
          { required: true, message: '请输入规格/型号', trigger: 'blur' }
        ],
        goodsOutTotal: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        goodsOutUnit: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        goodsOutUsername: [
          { required: true, message: '请输入领用人', trigger: 'blur' }
        ],
        goodsOutJob: [
          { required: true, message: '请选择岗位', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      this.goodsData.goodsOutUsername = JSON.parse(userInfo).username;
    }
    this.getGoodsOut();
  },
  methods: {
    // 跳转首页
    resetDefaultActivePath() {
      sessionStorage.removeItem('activePath');
    },
    // 查询
    onSubmit() {
      this.getGoodsOut();
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
      XLSX.utils.book_append_sheet(workbook, sheet, 'goods_out');
      // 4.将生成好的表格保存到本地
      // XLSX.writeFile(workbook, 'goods_out.xls'); // 有兼容问题
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
      const wbout = XLSX.write(workbook, wopts);
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'goods_out.xlsx');
    },

    // 物资领用相关
    showCreateGoodsOutDialog(formName) {
      this.createGoodsOutDialogVisible = true;
      this.goodsData.goodsOutDate = '';
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    createGoods(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createGoodsOut(this.goodsData)
            .then(res => {
              if (res.status === 200) {
                // this.tableData.push(this.goodsData);
                this.getGoodsOut();
                this.$message.success(res.msg);
                this.createGoodsOutDialogVisible = false;
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
        this.getGoodsOut();
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
    getGoodsOut() {
      if (!this.searchData.goodsOutDate) {
        this.searchData = Object.assign({}, this.searchData, { goodsOutDate: '' });
      }
      getGoodsOut(this.searchData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data.goodsOut;
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
      this.getGoodsOut();
    },
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.searchData.currentPage = currentPage;
      this.getGoodsOut();
    }
  }
};
</script>

<style scoped lang="scss">
  .goods_out{
    .el-breadcrumb{
      padding-bottom: 20px;
    }
    .el-pagination{
      padding-top: 20px;
    }
  }
</style>
