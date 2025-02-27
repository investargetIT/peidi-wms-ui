<template>
  <div class="container">
    <div v-for="item in configs" :key="item.fields" class="item">
      <label class="typo__label">{{ item.label }}<span :style="{ color: item.type == 'delete' ? 'red' : 'unset' }">{{
        item.type == 'delete' ? '（去除）' : '（包含）'
          }}</span></label>
      <multiselect tag-placeholder="添加新标签" placeholder="搜索或添加标签" deselectLabel="回车删除" :options="item.value"
        v-model="item.value" :multiple="true" :taggable="true" :show-no-options="false" @tag="addTag($event, item)" />
    </div>
    <v-btn @click="save">保存</v-btn>
    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="400" title="保存成功">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="OK" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      configs: [],
      dialog: false,
      text: '',
    };
  },
  mounted() {
    axios.get(BASE_URL + '/inventory/config', {
      headers: {
        authorization: localStorage.getItem('authToken')
      }
    })
      .then(response => {
        const { code, data } = response.data;
        if (code == 200) {
          this.configs = data.slice();
        }
      })
      .catch(error => {
        console.error("API调用错误：", error);
      });
  },
  methods: {
    addTag(newTag, item) {
      item.value.push(newTag);
    },
    save() {
      axios.post(BASE_URL + '/inventory/config', this.configs, {
        headers: {
          authorization: localStorage.getItem('authToken')
        }
      })
        .then(response => {
          console.log(response.data);
          this.text = '保存成功';
          this.dialog = true;
        })
        .catch(error => {
          console.error(error);
        });
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.container {
  font-family: Arial, sans-serif;
  margin-block: 0;
  margin-inline: auto;
  min-block-size: 500px;
  padding-block: 0;
  padding-inline: 1.25rem;
}

.item {
  margin-block-end: 20px;
}
</style>
