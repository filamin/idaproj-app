<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",

  data() {
    return {
      options: ['По умолчанию', 'Цена (max)', 'Цена (min)', 'Имя'],
      selected: 'По умолчанию',
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
}
</script>

<style scoped lang="less">
.custom-select {
  position: relative;
  z-index: 3;
  width: 120px;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  font-size: 12px;
}

.custom-select .selected {
  background: #FFFEFB;
  border-radius: 4px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: none;
  color: #B4B4B4;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: none;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #B4B4B4 transparent transparent transparent;
}

.custom-select .items {
  color: #B4B4B4;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border: none;
  position: absolute;
  background: #FFFEFB;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #B4B4B4;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #f8f8f8;
}

.selectHide {
  display: none;
}
</style>
