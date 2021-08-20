<template>
 <div class="form" :class="{ closed: !this.showForm }">
   <div class="overlay" @click="toggleForm()"/>
   <form @submit.prevent="addGood()">
     <div class="success" :class="{ showed: this.saved }">
       <div class="icon">
         <div class="check"/>
       </div>
       Сохранено
     </div>
     <fieldset class="inputs-container">
       <Input
         :value="this.name"
         id="name"
         label="Наименование товара"
         placeholder="Введите наименование товара"
         type="text"
         :error="errors.name"
         required
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
         :value="this.description"
         id="description"
         label="Описание товара"
         placeholder="Введите описание товара"
         type="textarea"
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
         :value="this.image"
         id="image"
         label="Ссылка на изображение товара"
         placeholder="Введите ссылку"
         type="url"
         :error="errors.image"
         required
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
         :value="this.price"
         id="price"
         label="Цена товара"
         placeholder="Введите цену"
         type="number"
         :error="errors.price"
         required
         @change-value="(params)=> handleChangeValue(params)"
       />
       <button :disabled="isButtonDisabled">Добавить товар</button>
     </fieldset>
   </form>
 </div>
</template>
<script>
import Input from "./BaseComponents/Input";
export default {
  name: "Form",
  components: {Input},
  mounted() {
    this.$bus.$on('open-form-modal', () => {
      this.toggleForm();
    })
  },
  data() {
    return {
      saved: false,
      showForm: false,
      name: '',
      description: '',
      image: '',
      price: '',
      errors: {
        name: false,
        image: false,
        price: false,
      },
    };
  },
  computed: {
    isButtonDisabled() {
      return !Boolean(this.name && this.image && this.price);
    }
  },
  methods: {
    toggleForm(){
      this.showForm = !this.showForm;
    },
    clearFrom(){
      this.name = '';
      this.description = '';
      this.image = '';
      this.price = '';
    },
    handleChangeValue(params) {
      this[params.id] = params.value;
      this.validate(params.id);
    },
    validate(param) {
      this.errors[param] = !(this[param] !== '');
    },
    async addGood() {
      await this.$axios.$post("/api/goods", {
        name: this.name,
        description: this.description,
        image: this.image,
        price: this.price,
      })
      this.saved = true;
      setTimeout(() => {
        this.toggleForm();
        this.clearFrom();
        this.saved = false;
        this.$bus.$emit('update-goods');
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.form {
  width: 332px;
  grid-area: form;
  position: relative;
  z-index: 3;

  * {
    border: none;
    margin: 0;
    padding: 0;
  }

  .success {
    transition: all .5s linear;
    position: absolute;
    display: inline-flex;
    right: 0px;
    font-size: smaller;
    background-color: #d9f5d5;
    color: #4a933f;
    border-radius: 12px;
    padding: 4px 8px;
    opacity: 0;
    visibility: hidden;
    transition: all .5s ease-in;

    &.showed {
      opacity: 1;
      visibility: visible;
    }

    .icon {
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background-color: #4a933f;
      margin-right: 2px;

      .check {
        display: inline-block;
        transform: rotate(45deg);
        height: 6px;
        width: 3px;
        border-bottom: 1px solid #d9f5d5;
        border-right: 1px solid #d9f5d5;
      }
    }
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    padding: 24px;

    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    & > * {
      margin-bottom: 16px;
    }
    & button {
      margin-bottom: 0;
      margin-top: 8px;
    }
  }

  button {
    padding: 10px;
    border-radius: 10px;
    background-color: #7BAE73;
    color: white;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.02em;

    &[disabled] {
      background-color: #EEEEEE;
      color: #B4B4B4;
    }
  }
}

@media (max-width: 1100px) {
  .form {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: all .2s ease-out;
    opacity: 1;
    visibility: visible;
    display: flex;
    align-items: center;
    justify-content: center;

    .overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      z-index: 0;
    }
  }

  form {
    position: relative;
    z-index: 1;
    width: 420px;
  }
  .closed {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
