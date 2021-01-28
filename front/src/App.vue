<template>
  <div id="app">
    <el-container>
      <el-row style="width: 100%">
        <el-col>
          <Title/>
        </el-col>
        <el-col>
          asd
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Title from '@/components/Title.vue'

@Component({
  components: {
    Title
  }
})

export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
