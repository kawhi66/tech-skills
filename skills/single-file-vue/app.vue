<template>
  <article class="app">
    <h1>Single file Vue</h1>
    <form class="mt20">
      <label for="username">Show Github repositories by @</label>
      <input id="username" v-model="name" type="text" placeholder="kawhi66" />
    </form>
    <ul class="wrapper mt20">
      <li v-for="item in res" :key="item.id">{{ item.name }}</li>
    </ul>
  </article>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "kawhi66",
      res: []
    };
  },
  methods: {
    async fetch(name) {
      const url = `https://api.github.com/users/${name}/repos`;
      const res = await axios.get(url, {
        params: {
          type: "all",
          sort: "updated"
        }
      });

      return res.data || [];
    }
  },
  mounted() {
    this.fetch(this.name).then(res => {
      this.res = res;
    });
  }
};
</script>

