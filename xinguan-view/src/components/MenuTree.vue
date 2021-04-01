<template>
  <div class="menu-tree">
    <template v-for="item in menuList">
      <el-submenu :index="item.rightsPath+''" :key="item.id" v-if="item.children && item.children.length>0">
        <template slot="title">
          <i :class="item.rightsIcon" style="color: #fff;"></i>
<!--          <i class="el-icon-setting"></i>-->
          <span slot="title">{{item.rightsName}}</span>
        </template>
        <MenuTree :menuList="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.rightsPath+''"
        :key="item.id"
        @click="saveActivePath(item.rightsPath)"
      >
        <template slot="title">
          <i :class="item.rightsIcon" style="color: #fff;"></i>
<!--          <i class="el-icon-setting"></i>-->
          <span slot="title">{{item.rightsName}}</span>
        </template>
      </el-menu-item>
    </template>
    <!--一级菜单-->
    <!--<el-submenu :index="item.rightsPath"
                v-for="item in menuList"
                :key="item.id">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>{{item.rightsName}}</span>
      </template>
      &lt;!&ndash;二级菜单&ndash;&gt;
      <el-menu-item-group>
        <el-menu-item :index="subItem.rightsPath"
                      v-for="subItem in item.children"
                      :key="subItem.id"
                      @click="saveActivePath(subItem.rightsPath)">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{subItem.rightsName}}</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    saveActivePath(path) {
      // console.log(path);
      window.sessionStorage.setItem('activePath', path);
    }
  }
};
</script>

<style scoped lang="scss">
  /*实现了一个溢出处理*/
  .el-menu--collapse span,
  .el-menu--collapse i.el-submenu__icon-arrow {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
