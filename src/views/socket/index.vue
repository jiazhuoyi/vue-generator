<template>
  <div class="socket">
    <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>发送框</span>
        </div>
        <el-input placeholder="请输入要发送的消息" v-model="context" class="input-with-select">
          <el-button slot="append" icon="el-icon-upload2" @click="sendMsg"></el-button>
        </el-input>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>接收框</span>
        </div>
        <div>
          <p>{{mg}}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      context: '',
      mg: ''
    };
  },
  sockets: {
    connect: () => {
      console.log('socket connected');
    },
    getData: (data) => {
      console.log('接收到了数据', data);
      this.mg = data;
      console.log('result:', this.mg);
    }
  },
  methods: {
    sendMsg() {
      console.log('发送数据context:', this.context);
      this.$socket.emit('receive', this.context);
    }
  }
};
</script>

