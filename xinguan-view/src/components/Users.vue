<template>
    <div class="users">
      <!--面包屑导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!--内容卡片区域-->
      <el-card class="box-card">
        <!--头部搜索区域-->
        <el-row>
          <el-col :span="20">
            <el-form :inline="true" :model="searchData" class="demo-form-inline">
              <el-form-item label="">
                <el-select v-model="searchData.role" placeholder="-所有角色-">
                  <el-option label="管理员" value="manager"></el-option>
                  <el-option label="普通用户" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-select v-model="searchData.type" placeholder="-所有用户-">
                  <el-option label="用户名" value="username"></el-option>
                  <el-option label="邮箱" value="email"></el-option>
                  <el-option label="手机" value="phone"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="searchData.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="exportUser">导出搜索结果</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="showAddUserDialog('createForm')">添加用户</el-button>
            <el-upload
              class="excel-uploader"
              action="http://127.0.0.1:7001/api/v1/importUser/"
              :show-file-list="false"
              :on-success="handleExcelSuccess"
              :before-upload="beforeExcelUpload"
              accept=".xls,.xlsx">
              <el-button type="primary">导入用户</el-button>
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
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            :formatter="getCurrentRoleName"
            label="角色">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <!-- {{scope.row.userState}}-->
              <el-switch
                v-model="scope.row.userState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeUserState(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showEditUserDialog('editForm', scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="destroyUser(scope.row.id)"></el-button>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" @click="showAddRoleDialog(scope.row)"></el-button>
              </el-tooltip>
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

      <!--添加用户对话框-->
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="30%">
        <el-form ref="createForm" :model="userData" :rules="addUserRules" label-width="0px">
          <el-form-item label="" prop="username">
            <el-input v-model="userData.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input v-model="userData.email" prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item label="" prop="phone">
            <el-input v-model="userData.phone" prefix-icon="el-icon-phone-outline"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="userData.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item label="" prop="rePassword">
            <el-input type="password" v-model="userData.rePassword" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createUser('createForm')">确 定</el-button>
            </span>
      </el-dialog>

      <!--编辑用户对话框-->
      <el-dialog
        title="编辑用户"
        :visible.sync="editUserDialogVisible"
        width="30%">
        <el-form ref="editForm" :model="editData" :rules="editUserRules" label-width="0px">
          <el-form-item label="" prop="" style="text-align: center" class="upload-item">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:7001/api/v1/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="editData.avatarURL" :src="editData.baseURL ? (editData.baseURL + editData.avatarURL) : ($store.state.uploadHttp + editData.avatarURL)" class="avatar">
              <!--                        <img v-if="editData.avatarURL" :src="editData.avatarURL" class="avatar">-->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="" prop="username">
            <el-input v-model="editData.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input v-model="editData.email" prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item label="" prop="phone">
            <el-input v-model="editData.phone" prefix-icon="el-icon-phone-outline"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="editData.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item label="" prop="rePassword">
            <el-input type="password" v-model="editData.rePassword" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser('editForm')">确 定</el-button>
            </span>
      </el-dialog>

      <!--分配角色对话框-->
      <el-dialog
        title="分配角色"
        :visible.sync="addRoleDialogVisible"
        width="30%">
        <el-form ref="form" :model="currentUser" label-width="80px">
          <el-form-item label="当前用户">
            <el-input v-model="currentUser.username  || currentUser.email || currentUser.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="当前角色">
            <el-input v-model="currentRoleName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="新的角色">
            <el-select v-model="currentRoleId" placeholder="请选择角色">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole(currentUser.id)">新增角色</el-button>
        <el-button type="danger" @click="removeRole(currentUser.id)">删除角色</el-button>
    </span>
      </el-dialog>
    </div>
</template>

<script>
import { getUsers, addUsers, destroyUsers, updateUsers, getRoles, createUserRole, destroyUserRole } from './../api/index';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  name: 'Users',
  data() {
    return {
      searchData: {
        role: '',
        // origin: '',
        type: '',
        key: '',
        currentPage: 1,
        pageSize: 5
      },
      totalCount: 0,
      tableData: [],
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      userData: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        phone: '',
        userState: true
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { min: 10, max: 25, message: '长度至少为 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      editData: {
        id: '',
        username: '',
        password: '',
        rePassword: '',
        email: '',
        phone: '',
        avatarURL: '',
        userState: true
      },
      editUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { min: 10, max: 25, message: '长度至少为 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        rePassword: [
          { required: false, message: '请再次输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      addRoleDialogVisible: false,
      currentUser: {},
      roles: [],
      currentRoleId: ''
    };
  },
  created() {
    // this.getUsers();
    this.getUserList();
  },
  computed: {
    currentRoleName() {
      if (JSON.stringify(this.currentUser) === '{}') return '';
      return this.getCurrentRoleName(this.currentUser);
    }
  },
  methods: {
    // 跳转首页
    resetDefaultActivePath() {
      sessionStorage.removeItem('activePath');
    },
    // 查询
    onSubmit() {
      this.getUserList();
    },
    // 导出搜索结果
    exportUser() {
      const user = this.tableData.length ? this.tableData[0] : null;
      const data = [];
      if (user) {
        const cloumnTitles = Object.keys(user);
        data.push(cloumnTitles);
        this.tableData.forEach((user) => {
          const temp = [];
          cloumnTitles.forEach((key) => {
            temp.push(user[key]);
          });
          data.push(temp);
        });
      }
      // 1.根据二维数组生成表格中的数据
      const sheet = XLSX.utils.aoa_to_sheet(data);
      // 2.创建一个新的表格
      const workbook = XLSX.utils.book_new();
      // 3.把数据添加到表格中, 并给这个表格起一个名称
      XLSX.utils.book_append_sheet(workbook, sheet, 'user');
      // 4.将生成好的表格保存到本地
      // XLSX.writeFile(workbook, 'users.xls'); // 有兼容问题
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
      const wbout = XLSX.write(workbook, wopts);
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx');
    },
    // 添加用户相关
    showAddUserDialog(formName) {
      this.addUserDialogVisible = true;
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    createUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userData.password !== this.userData.rePassword) {
            return this.$message.error('两次输入的密码不一致');
          }
          addUsers(this.userData)
            .then(res => {
              if (res.status === 200) {
                this.tableData.push(this.userData);
                this.$message.success(res.msg);
                this.addUserDialogVisible = false;
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

    // 删除用户
    destroyUser(id) {
      destroyUsers(id)
        .then(res => {
          if (res.status === 200) {
            const idx = this.tableData.findIndex(() => {
              return res.id === id;
            });
            this.tableData.splice(idx, 1);
            this.getUserList();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },

    // 分配角色相关
    showAddRoleDialog(user) {
      this.addRoleDialogVisible = true;
      this.currentUser = user;
      getRoles({})
        .then((res) => {
          if (res.status === 200) {
            this.roles = res.data;
            // this.$message.success('获取角色信息成功');
          } else {
            this.$message.error('获取角色信息失败');
          }
        })
        .catch(e => {
          this.$message.error('获取角色信息失败');
        });
    },
    addRole(userId) {
      // console.log(userId, this.currentRoleId);
      this.addRoleDialogVisible = false;
      const obj = { userId: userId, roleId: this.currentRoleId };
      createUserRole(obj)
        .then((res) => {
          if (res.status === 200) {
            this.getUserList();
            this.$message.success('分配角色成功');
          } else {
            this.$message.error('分配角色失败');
          }
        })
        .catch((e) => {
          this.$message.error('分配角色失败');
        });
    },
    getCurrentRoleName(user) {
      // console.log(user);
      const roles = user.roles;
      const names = [];
      roles.forEach((role) => {
        names.push(role.roleName);
      });
      return names.join(' | ');
    },
    removeRole(userId) {
      this.addRoleDialogVisible = false;
      const obj = { userId: userId, roleId: this.currentRoleId };
      destroyUserRole(userId, obj)
        .then((res) => {
          if (res.status === 200) {
            this.getUserList();
            this.$message.success('移出角色成功');
          } else {
            this.$message.error('移出角色失败');
          }
        })
        .catch((e) => {
          this.$message.error('移出角色失败');
        });
    },

    // 编辑用户相关
    showEditUserDialog(formName, user) {
      this.editUserDialogVisible = true;
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
      this.editData = Object.assign(this.editData, user);
      // console.log(this.editData);
    },
    editUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editData.password !== this.editData.rePassword) {
            return this.$message.error('两次输入的密码不一致');
          }
          updateUsers(this.editData.id, this.editData)
            .then(res => {
              if (res.status === 200) {
                // const idx = this.tableData.findIndex((obj) => {
                //   return obj.id === this.editData.id;
                // });
                // 直接给数组的某一个索引赋值, 是不会触发Vue更新界面的
                // this.tableData[idx] = this.editData;
                // this.$set(this.tableData, idx, this.editData);
                const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                userInfo.avatarURL = this.editData.avatarURL;
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                this.$emit('initUserInfo', false);
                this.getUserList();
                this.$message.success(res.msg);
                this.editUserDialogVisible = false;
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

    // 上传用户头像相关代码
    handleAvatarSuccess(res, file) {
      // console.log(res);
      if (res.status === 200) {
        this.editData.avatarURL = res.data;
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },

    // 修改用户状态相关代码
    changeUserState(user) {
      updateUsers(user.id, user)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('更新用户状态成功');
          } else {
            user.userState = !user.userState;
            this.$message.error('更新用户状态失败');
          }
        })
        .catch(e => {
          user.userState = !user.userState;
          this.$message.error('更新用户状态失败');
        });
    },

    // 上传Excel相关代码
    handleExcelSuccess(res, file) {
      // console.log(res);
      if (res.status === 200) {
        this.getUserList();
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
    getUserList() {
      getUsers(this.searchData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data.users;
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
      this.getUserList();
    },
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.searchData.currentPage = currentPage;
      this.getUserList();
    }

    // 获取所有用户
    // getUsers() {
    //   getUsers()
    //     .then(res => {
    //       if (res.status === 200) {
    //         this.tableData = res.data;
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //     .catch(e => {
    //       this.$message.error(e.msg);
    //     });
    // }
  }
};
</script>

<style scoped lang="scss">
.users{
  .el-breadcrumb{
    padding-bottom: 20px;
  }
  .upload-item{
    ::v-deep .el-form-item__content{
      line-height: 0;
    }
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .excel-uploader{
    display: inline-block;
    margin-left: 20px;
  }
  .el-pagination{
    padding-top: 20px;
  }
}
</style>
