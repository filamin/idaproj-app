<template>
  <div class='root'>
    <div class='container'>
      <Header/>
      <Form/>
      <GoodsList
        :loading="loading"
        :goods="sortedGoods"
      />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';
import Form from '../components/Form';
import GoodsList from "../components/GoodsList";
export default {
  components: {GoodsList, Form, Header},
  data() {
    return {
      loading: false,
      defaultGoods: [],
      category: "По умолчанию",
    };
  },
  mounted() {
    this.$bus.$on('update-goods', () => {
      this.loadGoods();
    });
    this.$bus.$on('sort-goods', (category) => {
      this.category = category;
    })

  },
  async fetch() {
    await this.loadGoods();
  },
  computed: {
    sortedGoods() {
      const goods = [...this.defaultGoods];
      switch (this.category) {
        case 'Имя':
          return goods.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        case 'Цена (min)':
          return goods.sort((a,b) => a.price - b.price);
        case 'Цена (max)':
          return goods.sort((a,b) => b.price - a.price);
        default:
          return goods;
      }
    }
  },
  methods: {
    async loadGoods() {
      try {
        this.loading = true;
        this.defaultGoods = await this.$axios.$get("/api/goods");
        this.loading = false;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  }
}
</script>

<style lang='less'>
html {
  font-family: 'Source Sans Pro', sans-serif;
}
body {
  margin: 0;
  padding: 0;
}

.root {
  height: 100vh;
  width: 100vw;

  .container {
    padding: 32px 0 0 32px;
    display: grid;
    grid-template:
            "header header" 40px
            "form goods-list"  calc(100vh - 40px - 32px) / 332px auto;
  }
}

@media (max-width: 1100px) {
  .root {
    .container {
      display: flex;
      flex-direction: column;
      padding: 16px 12px 0px;
    }
  }
}

@media (max-width: 650px) {
  .root {
    .container {
      padding: 16px 0 0;
    }
  }
}
</style>
