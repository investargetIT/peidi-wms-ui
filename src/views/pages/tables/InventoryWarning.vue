<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      defaultSort: [
        { sortName: 'waringLevel', sortType: 'desc' },
        { sortName: 'groupType', sortType: 'asc' },
        { sortName: 'brandName', sortType: 'desc' },
        { sortName: 'inventoryNum', sortType: 'desc' },
      ],
      searchQuery: {
        brandName: null,
        specNo: '',
        goodsName: '',
        specName: '',
        inventoryNum: '',
        turnoverDays: '',
        groupType: '',
        waringLevel: '',
      },
      headers: [
        { title: '品牌', value: 'brandName', sortable: true },
        { title: '商品编码', value: 'specNo', sortable: false },
        { title: '货品名称', value: 'goodsName', sortable: false },
        { title: '规格名称', value: 'specName', sortable: false },
        { title: '库存数量', value: 'inventoryNum', sortable: true, minWidth: 100 },
        { title: '预计可周转天数', value: 'turnoverDays', sortable: true, minWidth: 100 },
        { title: '分类', value: 'groupType', sortable: true, minWidth: 80 },
        { title: '库存预警', value: 'waringLevel', sortable: true, minWidth: 100 },
      ],
      items: [

      ],
    };
  },
  computed: {
    searchParams() {
      return [
        { searchName: 'brandName', searchType: 'like', searchValue: this.searchQuery.brandName },
        { searchName: 'specNo', searchType: 'like', searchValue: this.searchQuery.specNo },
        { searchName: 'goodsName', searchType: 'like', searchValue: this.searchQuery.goodsName },
        { searchName: 'specName', searchType: 'like', searchValue: this.searchQuery.specName },
        { searchName: 'inventoryNum', searchType: 'like', searchValue: this.searchQuery.inventoryNum },
        { searchName: 'turnoverDays', searchType: 'like', searchValue: this.searchQuery.turnoverDays },
        { searchName: 'groupType', searchType: 'like', searchValue: this.searchQuery.groupType },
        { searchName: 'waringLevel', searchType: 'like', searchValue: this.searchQuery.waringLevel },
      ].filter(param => param.searchValue && param.searchValue.trim() !== '')
    }
  },
  methods: {
    onSearch() {
      const encodedParams = encodeURIComponent(JSON.stringify(this.searchParams));
      const encodedSort = encodeURIComponent(JSON.stringify(this.defaultSort));
      const url = `${BASE_URL}/inventory/inventory-waring?searchStr=${encodedParams}&sortStr=${encodedSort}`;
      fetch(url)
        .then(response => response.json())
        .then(responseData => {
          const { code, data } = responseData;
          if (code == 200) {
            this.items = data;
          }
        })
        .catch(error => {
          console.error('API调用错误:', error);
        });
    },
    updateData() {
      axios.get(BASE_URL + '/inventory/inventory-waring?sortStr=' + encodeURIComponent(JSON.stringify(this.defaultSort)))
        .then(response => {
          const { code, data } = response.data;
          if (code == 200) {
            this.items = data;
          }
        })
        .catch(error => {
          console.error("API调用错误：", error);
        });
    },
  },
  mounted() {
    // 当组件挂载后，更新数据
    this.updateData();
    // 设置定时器模拟数据更新 (实际应用中应该避免使用setInterval)
    // setInterval(() => {
    //   this.updateData();
    // }, 5000); // 每5秒更新一次数据
  },
};
</script>

<template>
  <v-form @submit.prevent="onSearch">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-select v-model="searchQuery.brandName" clearable label="品牌"
            :items="['SMARTBONES', '好适嘉', '齿能', 'Meatyway爵宴']" />
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.specNo" label="商品编码" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.goodsName" label="货品名称" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.specName" label="规格名称" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.inventoryNum" label="库存数量" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.turnoverDays" label="预计可周转天数" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.groupType" label="分类" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.waringLevel" label="库存预警" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-btn type="submit" color="primary">搜索</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-data-table :headers="headers" :items="items" :items-per-page="-1" :hide-default-footer="true">
    <template v-slot:item.waringLevel="{ item }">
      <span class="circle" :style="{ 'background': item.waringLevel }"></span>
    </template>
  </v-data-table>
</template>

<style lang="scss">
.circle {
  display: block;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.blue-header {
  color: blue;
  font-weight: bold;
}
</style>
