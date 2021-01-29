<template>
  <el-form
    ref="editFormRef"
    :model="editForm"
    :inline="true">
    <el-form-item>
      <el-input
        placeholder="이름"
        v-model="editForm.id"/>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="이름"
        v-model="editForm.name"/>
    </el-form-item>
    <el-form-item>
    <el-input
      placeholder="업종"
      v-model="editForm.sectors"/>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="가격"
        v-model="editForm.price"/>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="수량"
        v-model="editForm.quantity"/>
    </el-form-item>
    <el-button
      class="success"
      @click="getResult">
      확인
    </el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { IStockParams } from '@/api/types'
import { Sectors } from '@/api/enums'

export const defaultStockParam: IStockParams = {
  id: null,
  name: '',
  sectors: Sectors.IT,
  price: 0,
  quantity: 0
}

export default class extends Vue {
  private editForm: IStockParams = defaultStockParam;

  private getResult () {
    console.log(this.editForm)
  }
}
</script>

<style scoped>

</style>
