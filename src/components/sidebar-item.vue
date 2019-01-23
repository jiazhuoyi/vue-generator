<template>
  <!-- <div>
    <el-submenu :index="`${index + 1}`" v-if="item.children">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.name"
        :index="child.path">
        <router-link to="/">
          {{child.title}}
        </router-link>
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index="`${index + 1}`" v-else>
      <router-link to="/my/setting">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.title}}</span>
      </router-link>
    </el-menu-item>
  </div> -->
  <div>
    <el-submenu :index="`${index + 1}`" v-if="item.children">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.name"
        :index="`${item.path}/${child.path}`">
        {{child.title}}
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index="item.path" v-else>
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: Object,
    index: Number
  },
  methods: {
    getLink(ppath, cpath) {
      return ppath + cpath;
    }
  }
};

</script>

