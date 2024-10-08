<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      defaultSort: [
        { sortName: 'waring3Num', sortType: 'desc' },
        { sortName: 'waring2Num', sortType: 'desc' },
        { sortName: 'waring1Num', sortType: 'desc' },
        { sortName: 'groupType', sortType: 'desc' },
        { sortName: 'brandName', sortType: 'desc' },
      ],
      searchQuery: {
        brandName: null,
        specNo: null,
        goodsName: null,
        specName: null,
        groupType: null,
        waring1Num: [0, 1000000],
        waring2Num: [0, 100000],
        waring3Num: [0, 100000],
        inventoryNum: [0, 1000000],
      },
      headers: [
        { title: '品牌', value: 'brandName', sortable: true, },
        { title: '商品编码', value: 'specNo', sortable: false },
        { title: '货品名称', value: 'goodsName', sortable: false },
        { title: '规格名称', value: 'specName', sortable: false },
        { title: '分类', value: 'groupType', sortable: true, minWidth: 60 },
        { title: '1/3效期', value: 'waring1Num', sortable: true, minWidth: 80 },
        { title: '2/3效期', value: 'waring2Num', sortable: true, minWidth: 80 },
        { title: '临期', value: 'waring3Num', sortable: true, minWidth: 100 },
        { title: '库存数量', value: 'inventoryNum', sortable: true, minWidth: 100 },
      ],
      items: [],
      allSpecNo: [],
      allGoodsName: [],
      allSpecName: [],
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
        { searchName: 'waring1Num', searchType: 'between', searchValue: this.searchQuery.waring1Num.join('#/#') },
        { searchName: 'waring2Num', searchType: 'between', searchValue: this.searchQuery.waring2Num.join('#/#') },
        { searchName: 'waring3Num', searchType: 'between', searchValue: this.searchQuery.waring3Num.join('#/#') },
        { searchName: 'inventoryNum', searchType: 'between', searchValue: this.searchQuery.inventoryNum.join('#/#') },
      ].filter(param => param.searchValue && param.searchValue.trim() !== '')
    }
  },
  methods: {
    onSearch() {
      // 在这里实现你的搜索逻辑
      // console.log('Searching with:', this.searchQuery);
      const encodedParams = encodeURIComponent(JSON.stringify(this.searchParams));
      const encodedSort = encodeURIComponent(JSON.stringify(this.defaultSort));
      const url = `http://wmsapi.peidigroup.cn/inventory/validity-waring?searchStr=${encodedParams}&sortStr=${encodedSort}`;
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
      axios.get(BASE_URL + '/inventory/validity-waring?sortStr=' + encodeURIComponent(JSON.stringify(this.defaultSort)))
        .then(response => {
          const { code, data } = response.data;
          if (code == 200) {
            this.items = data;
            this.allSpecNo = data.map(m => m.specNo);
            this.allGoodsName = data.map(m => m.goodsName);
            this.allSpecName = data.map(m => m.specName);
          }
          // 成功时的处理逻辑
          // console.log(this.items);
        })
        .catch(error => {
          // 错误处理
          console.error("API调用错误：", error);
        });
    },
    handleResetBtnClicked() {
      this.searchQuery = {
        brandName: null,
        specNo: null,
        goodsName: null,
        specName: null,
        groupType: null,
        waring1Num: [0, 1000000],
        waring2Num: [0, 100000],
        waring3Num: [0, 100000],
        inventoryNum: [0, 1000000],
      };
      this.updateData();
    },
    exportToExcel() {
      const headers = [
        { title: '品牌', key: 'brandName' },
        { title: '商品编码', key: 'specNo' },
        { title: '货品名称', key: 'goodsName' },
        { title: '规格名称', key: 'specName' },
        { title: '分类', key: 'groupType' },
        { title: '1/3效期', key: 'waring1Num' },
        { title: '2/3效期', key: 'waring2Num' },
        { title: '临期', key: 'waring3Num' },
        { title: '库存数量', key: 'inventoryNum' },
      ];

      const data = this.items.map(item => ({
        brandName: item.brandName,
        specNo: item.specNo,
        goodsName: item.goodsName,
        specName: item.specName,
        groupType: item.groupType,
        waring1Num: item.waring1Num,
        waring2Num: item.waring2Num,
        waring3Num: item.waring3Num,
        inventoryNum: item.inventoryNum,
      }));

      // 创建工作表
      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers.map(h => h.key) });

      // 设置中文表头
      const sheetHeaders = headers.map(h => h.title);
      XLSX.utils.sheet_add_aoa(worksheet, [sheetHeaders], { origin: 'A1' });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '效期数据');
      XLSX.writeFile(workbook, '效期预警.xlsx');
    },
  },
  mounted() {
    this.updateData();
  },
};
</script>

<template>
  <v-expansion-panels style="margin-bottom: 20px;">
    <v-expansion-panel title="效期预警">
      <v-expansion-panel-text>
        <v-form @submit.prevent="onSearch">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-select v-model="searchQuery.brandName" clearable label="品牌"
                  :items="['SMARTBONES', '好适嘉', '齿能', 'Meatyway爵宴']" />
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="searchQuery.groupType" clearable label="分类" :items="['A', 'B', 'C']" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-autocomplete v-model="searchQuery.specNo" clearable label="商品编码" :items="allSpecNo" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-autocomplete v-model="searchQuery.goodsName" clearable label="货品名称" :items="allGoodsName" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-autocomplete v-model="searchQuery.specName" clearable label="规格名称" :items="allSpecName" />
              </v-col>
              <v-col cols="12">
                <v-range-slider v-model="searchQuery.waring1Num" :max="1000000" :min="0" :step="1" label="1/3效期"
                  class="align-center" hide-details>
                  <template v-slot:prepend>
                    <v-text-field v-model="searchQuery.waring1Num[0]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field v-model="searchQuery.waring1Num[1]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-range-slider v-model="searchQuery.waring2Num" :max="100000" :min="0" :step="1" label="2/3效期"
                  class="align-center" hide-details>
                  <template v-slot:prepend>
                    <v-text-field v-model="searchQuery.waring2Num[0]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field v-model="searchQuery.waring2Num[1]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-range-slider v-model="searchQuery.waring3Num" :max="100000" :min="0" :step="1" label="临期"
                  class="align-center" hide-details>
                  <template v-slot:prepend>
                    <v-text-field v-model="searchQuery.waring3Num[0]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field v-model="searchQuery.waring3Num[1]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-range-slider v-model="searchQuery.inventoryNum" :max="1000000" :min="0" :step="1" label="库存数量"
                  class="align-center" hide-details>
                  <template v-slot:prepend>
                    <v-text-field v-model="searchQuery.inventoryNum[0]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field v-model="searchQuery.inventoryNum[1]" style="width: 120px" type="number"
                      variant="outlined" hide-details single-line></v-text-field>
                  </template>
                </v-range-slider> </v-col>
              <v-col cols="12">
                <v-btn size="small" type="submit" color="primary" style="margin-right: 10px;">搜索</v-btn>
                <v-btn size="small" color="secondary" style="margin-right: 10px;"
                  @click="handleResetBtnClicked">重置</v-btn>
                <v-btn size="small" color="secondary" @click="exportToExcel">导出</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div class="sticky-header">
    <v-card>
      <v-data-table :headers="headers" :items="items" :items-per-page="-1" :hide-default-footer="true">
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="scss">
.blue-header {
  color: blue;
  font-weight: bold;
}

.sticky-header {

  .v-table__wrapper,
  .v-card {
    overflow: unset !important;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
  }
}
</style>
