<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button
      class="button-new-tag"
      size="small"
      @click="showForm">
      + 종목 추가
    </el-button>
    <el-row
      class="el-row-margin">
      <el-form
        v-for="item in formItemList"
        :key="item.id"
        ref="formItemRef"
        style="min-width: 1020px;"
        :inline="true"
        label-position="top"
        :model="item">
        <el-form-item
          label="종목명">
          <el-input
            v-model="item.name"/>
        </el-form-item>
        <el-form-item
          label="업종">
          <el-select
            v-model="item.sector">
            <el-option
              v-for="sector in getSector"
              :key="sector"
              :value="sector">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="가격">
          <el-input-number
            v-model="item.price"
            :controls="false"/>
        </el-form-item>
        <el-form-item
          label="보유량">
          <el-input-number
            v-model="item.quantity"
            :controls="false"/>
        </el-form-item>
        <el-form-item
          label="비중">
          <el-input
            v-model="item.ratio"
            disabled/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-button
      class="success"
      @click="getResult">
      비중 확인
    </el-button>
    <el-table
      v-if="tableVisible"
      :data="formItemList"
      class="el-row-margin">
      <el-table-column
        key="index"
        type="index"
        label="No"
        align="center"/>
      <el-table-column
        key="name"
        prop="name"
        label="주식명"
        align="center"/>
      <el-table-column
        key="sector"
        prop="sector"
        label="업종"
        align="center"/>
      <el-table-column
        key="price"
        prop="price"
        label="가격"
        align="center"/>
      <el-table-column
        key="quantity"
        prop="quantity"
        label="수량"
        align="center"/>
      <el-table-column
        key="ratio"
        prop="ratio"
        label="비중"
        align="center"/>
    </el-table>
    <el-row>
      <el-col
        :span="12">
        <GChart
          v-if="tableVisible"
          type="PieChart"
          :data="sectorRatioData"
          :options="chartOptions"
          :event="chartEvents"
          style="width: 500px; height: 500px"
        />
      </el-col>
       <el-col
         :span="12">
         <GChart
           v-if="tableVisible"
           type="PieChart"
           :data="sectorDetailData"
           :options="chartOptions"
           :event="chartEvents"
         />
       </el-col>
    </el-row>

    <el-button
      v-if="tableVisible"
      @click="closeTable">
      닫기
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IStock } from './types'
import { defualtStock } from './type'
import { cloneDeep } from 'lodash'
import {Sector} from "@/components/stock/enum";
import { GChart } from 'vue-google-charts';


@Component({
  components: {
    GChart,
  }
})
export default class StockCalc extends Vue {
  @Prop() private msg!: string;

  private formItemOrigin: IStock = cloneDeep(defualtStock)
  private formItemList: IStock[] = []
  private tableVisible = false;
  private totalPrice = 0;
  private index: number = 0;

  private sectorRatioData = [['sector', 'ratio']];
  private sectorDetailData = [['name', 'detail']];

  private chartOptions = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    is3D: true,
  }

  private chartEvents = {
    click : () => {
      this.closeTable();
    }
  }

  private getResult () {
    this.sectorRatioData = [['sector', 'ratio']];
    this.sectorDetailData = [['name', 'detail']];
    this.tableVisible = true;
    this.getRatio();
    this.sectorRatio();
    this.sectorDetailRatio();
    // 일부값/전체값 * 100
  }

  get getSector() {
    return Sector;
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
      if (price === 0) {
        this.formItemList[i].ratio = 0;
      } else {
        this.formItemList[i].ratio = Number(((price / this.totalPrice) * 100).toFixed(2));
      }
    }
  }

  private showForm () {
    const cloneObj: IStock = cloneDeep(this.formItemOrigin);
    this.index++;
    cloneObj.id = this.index;
    this.formItemList.push(cloneObj);
  }

  private closeTable() {
    this.tableVisible = false;
    this.sectorRatioData = [['sector', 'ratio']];
    this.sectorDetailData = [['name', 'detail']];
  }

  private sectorRatio() {
    const d = this.formItemList.reduce((acc, curr)=>{
      if (!(curr.sector in acc))
        acc[curr.sector] = 0
      acc[curr.sector] += curr.price * curr.quantity;
      return acc;
    }, {})

    for (const [key, value] of Object.entries(d)) {
      this.sectorRatioData.push([key, value]);
    }
  }

  private sectorDetailRatio() {
    const data = this.formItemList.filter(item => item.sector === Sector.IT);

    for (let i = 0; i < data.length; i++) {
      const total = data[i].price * data[i].quantity;
      this.sectorDetailData.push([data[i].name, total]);
    }
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
