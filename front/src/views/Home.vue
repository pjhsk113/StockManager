<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <StockCalc msg="Stock Manager"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StockCalc from '@/components/stock/StockCalc.vue'; // @ is an alias to /src

@Component({
  components: {
    StockCalc
  }
})
export default class Home extends Vue {}
</script>
