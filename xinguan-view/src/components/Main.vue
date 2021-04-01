<template>
  <div>
    <!--内容卡片区域-->
    <el-card class="box-card">
      <!--头部搜索区域-->
      <el-row>
        <el-form :model="searchData" class="demo-form-inline">
          <el-col :span="2">
            <el-form-item>
              <el-button type="success" @click="showAddHealthDialog('createForm')">每日健康上报</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="" style="width: 100%">
              <el-input v-model="searchData.key" placeholder="输入用户名关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="query_role">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
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
          prop="healthsName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="healthsSex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="healthsJob"
          label="所在部门">
        </el-table-column>
        <el-table-column
          prop="healthsHeat"
          label="今日体温">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.healthsState"
              active-color="#ff4949"
              inactive-color="#13ce66"
              disabled
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--底部分页区域-->
    <el-pagination
      :current-page="searchData.currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchData.pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!--添加编辑权限对话框-->
    <el-dialog
      title="每日健康情况收集-3月20日"
      :visible.sync="healthDialogVisible"
      width="30%">
      <el-form ref="createForm" :model="healthData"  :rules="healthRules" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="healthData.healthsName"
                    disabled
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="healthsSex">
          <el-select v-model="healthData.healthsSex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在部门" prop="healthsJob">
          <el-select v-model="healthData.healthsJob">
            <el-option label="研发" value="研发"></el-option>
            <el-option label="市场" value="市场"></el-option>
            <el-option label="人事" value="人事"></el-option>
            <el-option label="售前" value="售前"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="今日体温" prop="healthsHeat">
          <el-input v-model="healthData.healthsHeat"
                    prefix-icon="el-icon-info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="healthDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createHealths('createForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import { getHealths, createHealths } from './../api/index';
export default {
  name: 'Roles',
  data() {
    return {
      tableData: [],
      searchData: {
        key: '',
        currentPage: 1,
        pageSize: 5
      },
      totalCount: 0,
      healthRules: {
        healthsSex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        healthsJob: [
          { required: true, message: '请输入部门', trigger: 'blur' },
          { min: 1, message: '长度至少1个字符', trigger: 'blur' }
        ],
        healthsHeat: [
          { required: true, message: '请输入当前体温', trigger: 'blur' },
          { min: 2, message: '长度至少2个字符', trigger: 'blur' }
        ]
      },
      healthDialogVisible: false,
      healthData: {
        healthsName: '',
        healthsSex: '',
        healthsJob: '',
        healthsHeat: '',
        healthsState: 0
      }
    };
  },
  created() {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      this.healthData.healthsName = JSON.parse(userInfo).username;
    }
    this.getHealthsList();
  },
  methods: {
    resetDefaultActivePath() {
      sessionStorage.removeItem('activePath');
    },
    // 搜索相关代码
    onSubmit() {
      this.getHealthsList();
    },
    getHealthsList() {
      // 获取分页权限列表
      getHealths(this.searchData)
        .then((response) => {
          if (response.status === 200) {
            response.data.healths.forEach(item => {
              item.healthsSex = item.healthsSex ? '男' : '女';
            });
            this.tableData = response.data.healths;
            this.totalCount = response.data.totalCount;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    // 健康上报相关代码
    showAddHealthDialog(formName) {
      this.healthDialogVisible = true;
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    createHealths(formName) {
      this.healthData.healthsName = JSON.parse(sessionStorage.getItem('userInfo')).username;
      this.$refs[formName].validate((flag) => {
        if (flag) {
          // 排除已填报
          const idx = this.tableData.some(item => {
            return item.healthsName === this.healthData.healthsName;
          });
          if (idx) {
            this.$message.error('请勿重复填报');
            return;
          }

          this.healthDialogVisible = false;
          const healthsSex = parseFloat(this.healthData.healthsSex);
          if (healthsSex === 1) {
            this.healthData.healthsSex = true;
          } else {
            this.healthData.healthsSex = false;
          }
          const healthsHeat = parseFloat(this.healthData.healthsHeat);
          if (healthsHeat > 37.2) {
            this.healthData.healthsState = true;
          } else {
            this.healthData.healthsState = false;
          }
          console.log(this.healthData);
          createHealths(this.healthData)
            .then((response) => {
              if (response.status === 200) {
                this.getHealthsList();
                this.$message.success(response.msg);
              } else {
                this.$message.error(response.msg);
              }
            })
            .catch((error) => {
              this.$message.error(error.msg);
            });
        } else {
          this.$message.error('数据格式不对');
        }
      });
    },

    // 分页相关代码
    handleSizeChange(currentSize) {
      this.searchData.pageSize = currentSize;
      this.getHealthsList();
    },
    handleCurrentChange(currentPage) {
      this.searchData.currentPage = currentPage;
      this.getHealthsList();
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-breadcrumb{
    padding-bottom: 20px;
  }
  .demo-form-inline{
    display: flex;
    justify-content: center;
  }
  .query_role{
    padding: 0 20px;
  }
  .el-pagination{
    padding-top: 20px;
  }
  .el-tag{
    margin: 10px;
  }
  .top-border{
    border-top: 1px solid #ccc;
  }
  .bottom-border{
    border-bottom: 1px solid #ccc;
  }
  .content-center{
    display: flex;
    align-items: center;
  }
</style>
