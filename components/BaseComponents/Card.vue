<template>
  <div class="card" :class="{'show': show }">
    <div class="image" :style="{ 'background-image': `url('${image}'), url('${require('~/assets/image-placeholder.jpeg')}')` }">
    <button @click="handleDelete()" class="delete-button">
      <div class="icon" :style="{ 'background-image': `url('${require('~/assets/delete.svg')}')` }" />
    </button>
    </div>
    <div class="info">
      <h4>{{ name }}</h4>
      <p>{{ description }}</p>
      <h3>{{ price }} руб.</h3>
    </div>
  </div>
</template>


<script>
export default {
  name: "Card",
  props: {
    id: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  mounted() {
    this.$bus.$on('goods-changed', () =>{
      this.show = false;
      setTimeout(() => {
        this.show = true
      }, 300);
    });
    setTimeout(() => this.show = true, 300);
  },
  data() {
    return {
      show: false,
      internalKey: '',
    }
  },
  methods: {
    async handleDelete(){
      this.show = false;
      await this.$axios.$delete(`/api/goods/${this.id}`);
      this.$bus.$emit('update-goods');
    }
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
  height: fit-content;
  position: relative;
  opacity: 0;

  transform: rotateY(120deg);
  transition:
    all 0.8s cubic-bezier(.28,.77,.37,.86);
  perspective: 100px;

  &.show {
    opacity: 1;
    transform: none;

    &:hover {
      transform: scale(1.02);

      .delete-button {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .image {
    height: 200px;
    border-radius: 4px 4px 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #3F3F3F;
    background-image: url('assets/image-placeholder.jpeg');
  }

  .delete-button {
    visibility: hidden;
    opacity: 0;
    transition: all linear .1s;
    padding: 0;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF8484;
    position: absolute;
    top: -8px;
    right: -8px;


    &:hover {
      background-color: #ff4b4b;
      transition: background-color .1s linear;
    }
  }

  .icon {
    width: 16px;
    height: 16px;
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
      overflow-y: auto;
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
