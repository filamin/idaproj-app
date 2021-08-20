<template>
  <div class="input">
    <label :for="id">
      {{ label }}
      <div v-if="required" class="required"></div>
    </label>
    <input
      v-model="internalValue"
      v-if="!showTextAria"
      :class="{'error-border': error}"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      @keyup.enter="() => {
        handleInput;
        $event.target.blur();
        $event.target.blur();
      }"
      @blur="handleInput"
      @keypress="handleInsert"
    />
    <textarea
      v-model="internalValue"
      v-else
      :class="{'error-border': error}"
      :id="id"
      :placeholder="placeholder"
      @blur="handleInput"
    />
    <span class="error" v-if="error">Поле является обязательным</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    error: {
      type: Boolean,
      default: () => false,
    }
  },
  computed: {
    showTextAria() {
      return this.type === 'textarea';
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.internalValue = val;
      },
    },
  },
  data() {
    return {
      internalValue: '',
    }
  },
  methods: {
    handleInput() {
      const params = {
        id: this.id,
        value: this.internalValue
      };

      this.$emit('change-value', params);
    },
    handleInsert(evt){
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if (this.type === 'number' &&(charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped lang="less">
.input {
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485E;
    margin-bottom: 0.4em;
  }

  .required {
    display: inline-block;
    vertical-align: super;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #FF8484;
  }

  input,
  textarea {
    border: none;
    background: #FFFEFB;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 1em;
    font-family: inherit;
    transition: 0.4s;

    &.error-border {
      box-shadow:
        0 0 0 1px #FF8484,
        0px 2px 5px rgba(0, 0, 0, 0.1);
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:hover,
  textarea:hover,
  input:focus,
  textarea:focus {
    transform: scale(1.05);
  }

  input::placeholder,
  textarea::placeholder {
    font-size: 12px;
    line-height: 15px;
    color: #B4B4B4;
  }

  textarea {
    resize: none;
  }

  .error {
    position: absolute;
    bottom: -12px;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #FF8484;
  }
}
</style>
