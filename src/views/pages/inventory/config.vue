<template>
  <div class="container">
    <div class="item">
      <label class="typo__label">名称</label>
      <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
        track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag" />
    </div>
    <v-btn>保存</v-btn>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.container {
  min-height: 500px;
  padding: 0 1.25rem;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.item {
  margin-bottom: 20px;
}
</style>
