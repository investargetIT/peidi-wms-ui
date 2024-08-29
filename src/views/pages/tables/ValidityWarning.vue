<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      searchQuery: {
        brandName: null,
        specNo: '',
        goodsName: '',
        specName: '',
        groupType: '',
        waring1Num: '',
        waring2Num: '',
        waring3Num: '',
        inventoryNum: '',
      },
      headers: [
        { title: '品牌', value: 'brandName', sortable: true, },
        { title: '商品编码', value: 'specNo', sortable: false },
        { title: '货品名称', value: 'goodsName', sortable: false },
        { title: '规格名称', value: 'specName', sortable: false },
        { title: '分类', value: 'groupType', sortable: true, minWidth: 100 },
        { title: '1/3效期', value: 'waring1Num', sortable: true, minWidth: 100 },
        { title: '2/3效期', value: 'waring2Num', sortable: true, minWidth: 80 },
        { title: '临期', value: 'waring3Num', sortable: true, minWidth: 100 },
        { title: '库存数量', value: 'inventoryNum', sortable: true, minWidth: 100 },
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
        { searchName: 'groupType', searchType: 'like', searchValue: this.searchQuery.groupType },
        { searchName: 'waring1Num', searchType: 'like', searchValue: this.searchQuery.waring1Num },
        { searchName: 'waring2Num', searchType: 'like', searchValue: this.searchQuery.waring2Num },
        { searchName: 'waring3Num', searchType: 'like', searchValue: this.searchQuery.waring3Num },
        { searchName: 'inventoryNum', searchType: 'like', searchValue: this.searchQuery.inventoryNum },
      ].filter(param => param.searchValue && param.searchValue.trim() !== '')
    }
  },
  methods: {
    onSearch() {
      // 在这里实现你的搜索逻辑
      // console.log('Searching with:', this.searchQuery);
      const encodedParams = encodeURIComponent(JSON.stringify(this.searchParams));
      const url = `http://wmsapi.peidigroup.cn/inventory/validity-waring?searchStr=${encodedParams}`;
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
      const defaultSort = [
        { sortName: 'waring3Num', sortType: 'desc' },
        { sortName: 'waring2Num', sortType: 'desc' },
        { sortName: 'waring1Num', sortType: 'desc' },
        { sortName: 'groupType', sortType: 'desc' },
        { sortName: 'brandName', sortType: 'desc' },
      ];
      axios.get(BASE_URL + '/inventory/validity-waring?sortStr=' + encodeURIComponent(JSON.stringify(defaultSort)))
        .then(response => {
          const { code, data } = response.data;
          if (code == 200) {
            this.items = data;
          }
          // 成功时的处理逻辑
          // console.log(this.items);
        })
        .catch(error => {
          // 错误处理
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
          <v-text-field v-model="searchQuery.groupType" label="分类" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.waring1Num" label="1/3效期" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.waring2Num" label="2/3效期" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.waring3Num" label="临期" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="searchQuery.inventoryNum" label="库存数量" type="text" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-btn type="submit" color="primary">搜索</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-data-table :headers="headers" :items="items" :items-per-page="-1" :hide-default-footer="true">
  </v-data-table>
</template>

<style lang="scss">
.blue-header {
  color: blue;
  font-weight: bold;
}
</style>
