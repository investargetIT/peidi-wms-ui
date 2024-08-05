import axios from 'axios';
export default {


  data() {
    return {
        api : import.meta.env.VITE_API_ENDPOINT,
        inventorywarning: null,
    };
  },
  mounted() {
    axios.get(this.api+'inventory/inventory-waring')
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
