<template>
<div ref="goods" class="goods-list">
  <div class="blur"/>
  <div v-if="loading" class="preloader" :style="{width : containerSize.width, height: containerSize.height}">
    <div v-if="loading" class="circle"/>
  </div>
  <div class="goods-grid">
    <Card
      v-for="(good, idx) in asyncGoods"
      :key="`good_${idx}`"
      :id="good._id"
      :name="good.name"
      :description="good.description"
      :image="good.image"
      :price="good.price"
    />
  </div>
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
    },
    loading: {
      type: Boolean,
      default: () => false,
    }
  },
  mounted() {
    this.mounted = true;
    this.containerHeight = this.$refs.goods.clientHeight + 'px';
  },
  data() {
    return {
      mounted: false,
      asyncGoods: [],
    }
  },
  computed: {
    containerSize() {
      return window.innerWidth > 1100 && this.mounted ?
        { width: this.$refs.goods.clientWidth + 'px', height: this.$refs.goods.clientHeight + 'px'} :
        { width: '100vw', height: '100vh'}
    }
  },
  watch: {
    goods: {
      deep: true,
      handler(val) {
        this.$bus.$emit('goods-changed');
        setTimeout(() => {
          this.asyncGoods = val;
        }, 300);
      },
    },
  },
}
</script>

<style scoped lang="less">
.goods-list {
  grid-area: goods-list;
  overflow-y: scroll;
  position: relative;
  z-index: 1;

  .preloader {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: rgba(63, 63, 63, 0.18);
    filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle {
    width: 80px;
    height: 80px;
    border: 2px solid #f3f3f3;
    border-top: 3px solid rgba(0, 0, 0, 0.34);
    border-radius: 100%;
    z-index: 4;
    transform: translate(-50%, -50%);

    animation: spin 1s infinite linear;
    @keyframes spin {
      from{
        transform: rotate(0deg);
      }to{
         transform: rotate(360deg);
       }
    }
  }

  .blur {
    position: fixed;
    height: 10px;
    width: 100%;
    background: linear-gradient(0deg ,transparent 0%, rgba(255, 255, 255, 0.50) 50%, white 100%);
    z-index: 2;
  }

  .goods-grid {
    display: grid;
    padding: 16px 0 16px 16px;
    grid-template-columns: repeat(auto-fill, 332px);
    grid-gap: 16px 16px;
  }
}

@media (max-width: 1400px) {
  .goods-list {
    .goods-grid {
      grid-template-columns: repeat(2, 332px);
    }
  }
}

@media (max-width: 1100px) {
  .goods-list {
    .blur {
     display: none;
    }
    .preloader {
      top: 0;
      left: 0;
    }
    .goods-grid {
      padding: 16px 0 40px;
      grid-template-columns: repeat(3, 280px);
      justify-content: center;
    }
  }
}

@media (max-width: 940px) {
  .goods-list {
    .goods-grid {
      grid-template-columns: repeat(2, 400px);
    }
  }
}

@media (max-width: 880px) {
  .goods-list {
    .goods-grid {
      grid-template-columns: repeat(2, 280px);
    }
  }
}

@media (max-width: 650px) {
  .goods-list {
    .goods-grid {
      grid-template-columns: repeat(1, 280px);
    }
  }
}
</style>
