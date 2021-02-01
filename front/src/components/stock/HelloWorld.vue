<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button
      class="button-new-tag"
      size="small"
      @click="showForm">
      + New Form
    </el-button>
    <el-row
      class="el-row-margin">
      <el-form
        v-for="item in formItemList"
        :key="item.id"
        ref="formItemRef"
        style="min-width: 1020px;"
        :inline="true"
        :model="item">
        <el-form-item>
          <el-input
            v-model="item.name"/>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="item.sector"/>
        </el-form-item>
        <el-form-item>
          <el-input-number
            v-model="item.price"
            :controls="false"/>
        </el-form-item>
        <el-form-item>
          <el-input-number
            v-model="item.quantity"
            :controls="false"/>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="item.ratio"
            disabled/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-button
      class="success"
      @click="getResult">
      확인
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IStock } from './types'
import { defualtStock } from './type'
import { cloneDeep } from 'lodash'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private formItem: IStock = defualtStock
  private formItemOrigin: IStock = cloneDeep(defualtStock)
  private formItemList: IStock[] = []
  private formVisible = false;
  private totalPrice = 0;
  private index: number = 0;

  private getResult () {
    this.getRatio()
    // 일부값/전체값 * 100
  }

  private getTotalPrice() {
    const length = this.formItemList.length;
    let totalPrice = 0;

    for (let i = 0; i < length; i++) {
      const price = this.formItemList[i].price * this.formItemList[i].quantity;
      totalPrice += price;
    }
    return totalPrice;
  }

  private getRatio() {
    const length = this.formItemList.length;
    this.totalPrice = this.getTotalPrice();

    for (let i = 0; i < length; i++) {
      const price = this.formItemList[i].price * this.formItemList[i].quantity;
      this.formItemList[i].ratio = ((price / this.totalPrice) * 100).toFixed(2);
    }
  }

  private showForm () {
    const cloneObj = cloneDeep(this.formItemOrigin);
    this.index++;
    cloneObj.id = this.index;
    this.formItemList.push(cloneObj);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.el-row-margin {
  margin-top: 20px;
}
</style>
