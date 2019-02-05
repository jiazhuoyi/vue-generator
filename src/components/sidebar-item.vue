<template>
  <div>
    <el-menu-item :index="getLink(item.path)" v-if="hasShowingChild(item)">
      <i :class="`el-icon-${item.meta.icon}`"></i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <el-submenu :index="`${index + 1}`" v-else>
      <template slot="title">
        <i :class="`el-icon-${item.meta.icon}`"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        v-if="child.meta.title"
        :key="child.meta.name"
        :index="getLink(item.path, child.path)">
        {{child.meta.title}}
      </el-menu-item>
    </el-submenu>
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
      return cpath ? `${ppath}/${cpath}` : ppath;
    },
    hasShowingChild(item) {
      let showing = [];
      showing = item.children.filter((child) => {
        if (child.meta.title) {
          return true;
        }
        return false;
      });
      return showing.length === 0;
    }
  }
};

</script>

