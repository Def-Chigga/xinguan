<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容卡片区域-->
    <el-card class="box-card">
      <!--头部搜索区域-->
      <el-form :model="searchData" class="demo-form-inline">
        <el-form-item label="" style="width: 100%">
          <el-input v-model="searchData.key" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item class="query_role">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showAddRoleDialog('createForm')">添加</el-button>
        </el-form-item>
      </el-form>
      <!--中间表格区域-->
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :stripe="true">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1, index1) in scope.row.rightsTree"
                    :key="item1.id"
                    :class="['bottom-border', index1 === 0 ? 'top-border': '', 'content-center']">
              <el-col :span="6">
                <el-tag type="danger">{{item1.rightsName}}</el-tag>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(item2, index2) in item1.children"
                        :key="item2.id"
                        :class="[ index2 !== 0 ? 'top-border': '', 'content-center']">
                  <el-col :span="6">
                    <el-tag type="warning">{{item2.rightsName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="success"
                            v-for="(item3, index3) in item2.children"
                            :key="item3.id">{{item3.rightsName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色备注">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.roleState"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeRoleState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showEditRoleDialog('editForm',scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="destroyRole(scope.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" @click="showRightsDialogVisible(scope.row)"></el-button>
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

    <!--添加角色对话框-->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="30%">
      <el-form ref="createForm" :model="roleData" :rules="addRoleRules" label-width="0px">
        <el-form-item label="" prop="roleName">
          <el-input v-model="roleData.roleName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="" prop="roleDesc">
          <el-input v-model="roleData.roleDesc" prefix-icon="el-icon-info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createRole('createForm')">确 定</el-button>
            </span>
    </el-dialog>

    <!--编辑角色对话框-->
    <el-dialog
      title="编辑用户"
      :visible.sync="editRoleDialogVisible"
      width="30%">
      <el-form ref="editForm" :model="editData" :rules="addRoleRules" label-width="0px">
        <el-form-item label="" prop="roleName">
          <el-input v-model="editData.roleName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="" prop="roleDesc">
          <el-input v-model="editData.roleDesc" prefix-icon="el-icon-info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole('editForm')">确 定</el-button>
            </span>
    </el-dialog>

    <!--添加权限对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="addRightsDialogVisible"
      width="30%"
      class="rights-dialog"
    >
      <el-tree :data="rightsArray"
               :props="defaultProps"
               :default-expand-all="true"
               show-checkbox
               ref="tree"
               node-key="id"
               :default-checked-keys="defaultCheckedKeys">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRights">确 定</el-button>
   </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, createRoles, updateRoles, destroyRoles, getRights, createRoleRights, destroyRoleRights } from './../api/index';

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
      addRoleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, message: '长度至少1个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, message: '长度至少1个字符', trigger: 'blur' }
        ]
      },
      addRoleDialogVisible: false,
      roleData: {
        roleName: '',
        roleDesc: '',
        roleState: true
      },
      editRoleDialogVisible: false,
      editData: {
        id: '',
        roleName: '',
        roleDesc: '',
        roleState: ''
      },
      totalCount: 0,
      // 添加权限相关代码
      rightsArray: [],
      defaultProps: {
        children: 'children',
        label: 'rightsName'
      },
      defaultCheckedKeys: [],
      addRightsDialogVisible: false,
      currentRole: {}
    };
  },
  created() {
    this.getRoleList();
    this.getRightsList();
  },
  methods: {
    resetDefaultActivePath() {
      sessionStorage.removeItem('acitvePath');
    },
    // 查询
    onSubmit() {
      this.getRoleList();
    },
    // 创建角色相关代码
    showAddRoleDialog(formName) {
      this.addRoleDialogVisible = true;
      this.$refs[formName].resetFields();
    },
    createRole(formName) {
      this.addRoleDialogVisible = false;
      this.$refs[formName].validate((flag) => {
        if (flag) {
          createRoles(this.roleData)
            .then(res => {
              if (res.status === 200) {
                const user = res.data;
                this.tableData.push(user);
                this.$message.success('添加角色成功');
                this.getRoleList();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(e => {
              this.$message.error(e.msg);
            });
        } else {
          this.$message.error('数据格式不对');
        }
      });
    },

    // 编辑角色相关代码
    showEditRoleDialog(formName, role) {
      this.editRoleDialogVisible = true;
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
      this.editData = Object.assign(this.editData, role);
    },
    editRole(formName) {
      this.editRoleDialogVisible = false;
      this.$refs[formName].validate((flag) => {
        if (flag) {
          updateRoles(this.editData.id, this.editData)
            .then(res => {
              if (res.status === 200) {
                const idx = this.tableData.findIndex((obj) => {
                  return obj.id === this.editData.id;
                });
                this.$set(this.tableData, idx, this.editData);
                this.getRoleList();
                this.$message.success('更新角色成功');
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(e => {
              this.$message.error(e.msg);
            });
        } else {
          this.$message.error('数据格式不对');
        }
      });
    },

    // 修改角色状态相关代码
    changeRoleState(user) {
      updateRoles(user.id, user)
        .then(res => {
          if (res.status === 200) {
            const idx = this.tableData.findIndex((obj) => {
              return obj.id === this.editData.id;
            });
            this.$set(this.tableData, idx, this.editData);
            this.$message.success('更新角色状态成功');
            this.getRoleList();
          } else {
            this.$message.error(res.msg);
          }
        });
    },

    // 删除角色相关代码
    destroyRole(id) {
      destroyRoles(id)
        .then(res => {
          if (res.status === 200) {
            const idx = this.tableData.findIndex((obj) => {
              return obj.id === id;
            });
            this.tableData.splice(idx, 1);
            this.$message.success('删除角色成功');
            this.getRoleList();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.msg);
        });
    },

    // 分页相关代码
    getRoleList() {
      getRoles(this.searchData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data.roles;
            this.totalCount = res.data.totalCount;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.msg);
        });
    },
    handleSizeChange(currentSize) {
      this.searchData.pageSize = currentSize;
      this.getRoleList();
    },
    handleCurrentChange(currentPage) {
      this.searchData.currentPage = currentPage;
      this.getRoleList();
    },

    // 添加权限相关代码
    showRightsDialogVisible(role) {
      this.addRightsDialogVisible = true;
      this.defaultCheckedKeys = []; // 清空上一次的默认权限
      this.currentRole = role;
      this.currentRole.rights.forEach((item) => { // 生成这一次默认权限
        if (item.level === 2) {
          this.defaultCheckedKeys.push(item.id);
        }
      });
      console.log('defaultCheckedKeys', this.defaultCheckedKeys);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys); // 设置这一次的默认权限
      }
    },
    addRights() {
      this.addRightsDialogVisible = false;
      // 1.获取当前所有选中和半选中的权限
      const allCheckedKeys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()];
      // 2.获取新增的权限
      const addCheckedKeys = allCheckedKeys.filter((id) => {
        return !this.defaultCheckedKeys.includes(id);
      });
      console.log('addCheckedKeys', addCheckedKeys);
      // 3.获取操作之后以前的剩余的权限
      const oldCheckedKeys = allCheckedKeys.filter((id) => {
        return this.defaultCheckedKeys.includes(id);
      });
      console.log('oldCheckedKeys', oldCheckedKeys);
      // 4.获取删除的权限
      const removeCheckedKeys = this.defaultCheckedKeys.filter((id) => {
        return !oldCheckedKeys.includes(id);
      });
      // 5.新增权限
      if (addCheckedKeys.length > 0) {
        createRoleRights({ roleId: this.currentRole.id, rightsIds: addCheckedKeys })
          .then((response) => {
            if (response.status === 200) {
              this.getRoleList();
              this.$message.success('添加权限成功');
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }
      // 6.移出权限
      if (removeCheckedKeys.length > 0 && allCheckedKeys.length !== 0) {
        destroyRoleRights(this.currentRole.id, { rightsIds: removeCheckedKeys })
          .then((response) => {
            if (response.status === 200) {
              this.getRoleList();
              this.$message.success('移出权限成功');
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }
      // 7.移除所有权限
      if (allCheckedKeys.length === 0) {
        destroyRoleRights(this.currentRole.id, { rightsIds: null })
          .then((response) => {
            if (response.status === 200) {
              this.getRoleList();
              this.$message.success('移出所有权限成功');
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }
      sessionStorage.removeItem('activePath');
      this.$router.push('/login');
    },
    getRightsList() {
      getRights({})
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            this.rightsArray = response.data;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
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
  .rights-dialog{
    ::v-deep .el-dialog__body {
      height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
