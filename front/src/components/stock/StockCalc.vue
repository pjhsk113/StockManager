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
        :model="item">
        <el-form-item>
          <el-input
            v-model="item.name"/>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="item.sector">
            <el-option
              v-for="sector in getSector"
              :key="sector"
              :value="sector">
            </el-option>
          </el-select>
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
    <GChart
      :setting = "{ packages: ['treemap'] }"
      type="TreeMapChart"
      :data="chartData"
      :options="chartOptions"
    />
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
    GChart
  }
})
export default class StockCalc extends Vue {
  @Prop() private msg!: string;

  private formItemOrigin: IStock = cloneDeep(defualtStock)
  private formItemList: IStock[] = []
  private tableVisible = false;
  private totalPrice = 0;
  private index: number = 0;
  private chartData = [
    ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
    ['Global',    null,                 0,                               0],
    ['America',   'Global',             0,                               0],
    ['Europe',    'Global',             0,                               0],
    ['Asia',      'Global',             0,                               0],
    ['Australia', 'Global',             0,                               0],
    ['Africa',    'Global',             0,                               0],
    ['Brazil',    'America',            11,                              10],
    ['USA',       'America',            52,                              31],
    ['Mexico',    'America',            24,                              12],
    ['Canada',    'America',            16,                              -23],
    ['France',    'Europe',             42,                              -11],
    ['Germany',   'Europe',             31,                              -2],
    ['Sweden',    'Europe',             22,                              -13],
    ['Italy',     'Europe',             17,                              4],
    ['UK',        'Europe',             21,                              -5],
    ['China',     'Asia',               36,                              4],
    ['Japan',     'Asia',               20,                              -12],
    ['India',     'Asia',               40,                              63],
    ['Laos',      'Asia',               4,                               34],
    ['Mongolia',  'Asia',               1,                               -5],
    ['Israel',    'Asia',               12,                              24],
    ['Iran',      'Asia',               18,                              13],
    ['Pakistan',  'Asia',               11,                              -52],
    ['Egypt',     'Africa',             21,                              0],
    ['S. Africa', 'Africa',             30,                              43],
    ['Sudan',     'Africa',             12,                              2],
    ['Congo',     'Africa',             10,                              12],
    ['Zaire',     'Africa',             8,                               10]
  ];
  private chartOptions = { // For v49 or before
    highlightOnMouseOver: true,
    maxDepth: 1,
    maxPostDepth: 2,
    minHighlightColor: '#8c6bb1',
    midHighlightColor: '#9ebcda',
    maxHighlightColor: '#edf8fb',
    minColor: '#009688',
    midColor: '#f7f7f7',
    maxColor: '#ee8100',
    headerHeight: 15,
    showScale: true,
    height: 500,
    useWeightedAverageForAggregation: true
  };
  private getResult () {
    this.tableVisible = true;
    this.getRatio()
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
