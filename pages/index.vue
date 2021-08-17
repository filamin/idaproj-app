<template>
  <div class='root'>
    <div class='container'>
      <Header/>
      <Form/>
      <GoodsList
        :goods="goods"
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
      goods: []
    };
  },
}
</script>

<style lang='less'>
html {
  font-family: 'Source Sans Pro', sans-serif;
}
body {
  margin: 0;
  padding: 0;
  background: #e5e5e540;
}

.root {
  height: 100vh;
  width: 100vw;

  .container {
    padding: 32px 32px 0;
    display: grid;
    grid-template:
            "header header" 40px
            "form goods-list"  calc(100vh - 32px - 40px - 16px) / auto auto;
    grid-gap: 16px;
  }
}

@media (max-width: 1100px) {
  .root {
    .container {
      display: flex;
      flex-direction: column;
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
