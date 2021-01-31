<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-form
      ref="formItemRef"
      :inline="true"
      :model="formItem">
      <el-form-item>
        <el-input
            v-model="formItem.name"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formItem.sector"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formItem.price"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formItem.quantity"/>
      </el-form-item>
      <el-button
        class="success"
        @click="getResult">
        확인
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IStock } from "./types";
import { defualtStock } from "./type";

// export enum Sector {
//   IT = 'IT',
//   CAR = '자동차',
//   FINANCE = '금융',
//   BIO = '바이오'
// }
//
// export interface IStock {
//   id?: string,
//   name: string,
//   sector: Sector,
//   price : number,
//   quantity: number
// }
//
// export const defualtStock: IStock = {
//   id: '',
//   name: '',
//   sector: Sector.IT,
//   price: 0,
//   quantity: 0
// };

@Component
export default class HelloWorld extends Vue {

  @Prop() private msg!: string;

  private formItem: IStock = defualtStock;

  private getResult() {
    console.log(this.formItem);
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
