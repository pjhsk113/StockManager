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
    <el-row>
      <el-col
        :span="12"
        align="right">
        <GChart
          v-if="tableVisible"
          type="PieChart"
          :data="sectorRatioData"
          :options="sectorRatioOptions"
          style="height: 500px;"
        />
      </el-col>
       <el-col
         :span="12">
         <div
          v-for="(item, index) in sectorDetailClone"
          :key="item[0]">
           <GChart
             v-if="tableVisible"
             type="PieChart"
             :data="getDetailData(index)"
             :options="getChartOptions(item)"
             style="height: 350px;"
           />
         </div>
       </el-col>
    </el-row>
    <el-button
      v-if="tableVisible"
      @click="closeTable">
      닫기
    </el-button>
    <vue-csv-import
      v-slot="{file}"
      v-model="csv"
      :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
    >
    </vue-csv-import>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IStock} from './types'
import {defualtStock} from './type'
import {cloneDeep} from 'lodash'
import {Sector} from "@/components/stock/enum";
import {GChart} from 'vue-google-charts';
import {VueCsvImport} from 'vue-csv-import';


@Component({
  components: {
    GChart,
    VueCsvImport
  }
})
export default class StockCalc extends Vue {
  @Prop() private msg!: string;

  private formItemOrigin: IStock = cloneDeep(defualtStock)
  private formItemList: IStock[] = []
  private tableVisible = false;
  private totalPrice = 0;
  private index: number = 0;
  private sectorCount: number = 0;

  private sectorRatioData = [['sector', 'ratio']];
  private sectorDetailData = [['name', 'detail']];
  private sectorDetailClone = [];

  private sectorRatioOptions = {
    title: '섹터별 비중',
    is3D: true,
  }

  private getResult () {
    this.sectorRatioData = [['sector', 'ratio']];
    this.sectorDetailData = [['name', 'detail']];
    this.sectorDetailClone = [];
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
    this.sectorDetailClone = [];
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
      this.sectorDetailClone.push([key, value]);
    }
  }

  private sectorDetailRatio() {
    this.sectorCount = this.sectorRatioData.length - 1;
    const data = this.formItemList.filter(item => item.sector === Sector.IT);

    for (let i = 0; i < data.length; i++) {
      const total: number = data[i].price * data[i].quantity;
      this.sectorDetailData.push([data[i].name, total]);
    }
  }

  private getDetailData (index: number) {
    const sector = this.formItemList.filter(item => item.sector === this.sectorRatioData[index+1][0]);
    const detailData = [['name', 'detail']];

    for (let i = 0; i < sector.length; i++) {
      const total: number = sector[i].price * sector[i].quantity;
      detailData.push([sector[i].name, total]);
    }

    return detailData;
  }

  private getChartOptions(item: any) {
    return {
      title: item[0],
      // is3D: true,
    };
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
