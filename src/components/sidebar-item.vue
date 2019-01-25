<template>
  <div>
    <el-submenu :index="`${index + 1}`" v-if="item.children">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.name"
        :index="getLink(item.path, child.path)">
        {{child.title}}
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index="getLink(item.path)" v-else>
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
      console.log('---ppath:', ppath);
      return cpath ? `${ppath}/${cpath}` : ppath;
    }
  }
};

</script>

