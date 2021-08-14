<template>
  <div class="card">
    <div class="image">

    </div>
    <div class="info">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
      <h3>{{ price }} руб.</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    src: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  }
}
</script>

<style scoped lang="less">
.card {
  background: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  .image {
    height: 200px;
    border-radius: 4px 4px 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #3F3F3F;
    background-image: url('assets/image-placeholder.jpeg');
  }

  .info {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto 80px auto;
    padding: 16px 16px 24px;

    & > * {
      margin: 0;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      overflow: scroll;
    }

    h3 {
      margin-top: 32px;
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
    }
  }
}
@media (max-width: 1140px) {
  .goods-list {
    grid-template-columns: repeat(1, 332px);
  }
}

</style>
