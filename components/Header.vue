<template>
  <div class='header'>
    <div class="left">
      <h2>Добавление товара</h2>
      <button @click="$bus.$emit('open-form-modal')">+</button>
    </div>
    <Select
      @input="(val)=> $bus.$emit('sort-goods', val)"
    />
  </div>
</template>

<script>
import Select from "./BaseComponents/Select";
export default {
  name: 'Header',
  components: {Select},
}
</script>

<style scoped lang='less'>
.header {
  grid-area: header;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 32px;

  .left {
    display: inline-flex;
    align-items: center;

    button {
      display: none;

      margin-left: 5px;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      color: white;
      border: none;
      font-size: 16px;
      font-weight: bold;
      background-color: #93d487;
    }

    button:hover {
      background-color: #5edc49;
    }
  }

  h2 {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: #3F3F3F;
  }
}
@media (max-width: 1100px) {
  .header {
    padding: 0;
    .left {
      button {
        display: block;
      }
    }
  }
}
@media (max-width: 650px) {
  .header {
    padding: 0 8px;

    h2 {
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>
