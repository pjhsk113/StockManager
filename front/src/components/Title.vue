<template>
  <el-container
    id="container">
    <el-row style="width: 100%">
      <el-col :span="24">
        <img alt="Vue logo" src="../assets/logo.png">
      </el-col>
      <el-col class="mb-4">
        <h1>Stock Manager</h1>
      </el-col>
      <el-col align="center">
        <Form/>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Form from './Form.vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: {
    Form
  }
})

export default class Title extends Vue {

}
</script>

<style scoped>
#container {
  background-color: #FFFFFF;
}
</style>
