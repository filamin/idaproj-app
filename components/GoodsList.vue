<template>
<div class="goods-list">
    <Card
      v-for="(good, idx) in goods"
      :key="`good_${idx}`"
      :src="good.src"
      :img="good.img"
      :title="good.title"
      :description="good.description"
      :price="good.price"
    />
</div>
</template>

<script>
import Card from "./BaseComponents/Card";
export default {
  name: "GoodsList",
  components: {Card},
  props: {
    goods: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      goodsList: [
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Очень длинное название, очень длинное название, очень длинное название, очень длинное название, очень длинное название, очень длинное название очень длинное название, очень длинное название, очень длинное название, очень длинное название.',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
        {
          src: 'none',
          title: 'Товар',
          description: 'Какое то описание товара',
          price: '2000',
        },
      ]
    }
  }
}
</script>

<style scoped>
.goods-list {
  grid-area: goods-list;

  display: grid;
  grid-template-columns: repeat(3, 332px);
  grid-gap: 16px 16px;
  overflow: scroll;
}

@media (max-width: 1400px) {
  .goods-list {
    grid-template-columns: repeat(2, 332px);
  }
}

@media (max-width: 1100px) {
  .goods-list {
    grid-template-columns: repeat(3, 280px);
    justify-content: center;
  }
}

@media (max-width: 940px) {
  .goods-list {
    grid-template-columns: repeat(2, 400px);
  }
}

@media (max-width: 880px) {
  .goods-list {
    grid-template-columns: repeat(2, 280px);
  }
}

@media (max-width: 650px) {
  .goods-list {
    grid-template-columns: repeat(1, 280px);
  }
}
</style>
