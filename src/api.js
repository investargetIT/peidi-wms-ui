import axios from 'axios';
export default {

  data() {
    return {
        inventorywarning: null,
    };
  },
  mounted() {
    axios.get('/inventory/inventory-waring')
      .then(response => {
        // 成功时的处理逻辑
        this.inventorywarning = response.data;
      })
      .catch(error => {
        // 错误处理
        console.error("API调用错误：", error);
      });
  },


};
