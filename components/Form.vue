<template>
 <div class="form" :class="{ closed: !showForm }">
   <div class="overlay" @click="toggleForm()"></div>
   <form>
     <fieldset class="inputs-container">
       <Input
         id="name"
         label="Наименование товара"
         placeholder="Введите наименование товара"
         type="text"
         :error="errors.name"
         required
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
         id="description"
         label="Описание товара"
         placeholder="Введите описание товара"
         type="textarea"
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
         id="image"
         label="Ссылка на изображение товара"
         placeholder="Введите ссылку"
         type="url"
         :error="errors.image"
         required
         @change-value="(params)=> handleChangeValue(params)"
       />
       <Input
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
    handleChangeValue(params) {
      this[params.id] = params.value;
      this.validate(params.id);
    },
    validate(param) {
      this.errors[param] = !(this[param] !== '');
    }
  }
}
</script>

<style scoped lang="less">
.form {
  width: 332px;
  grid-area: form;

  * {
    border: none;
    margin: 0;
    padding: 0;
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
    display: none;
  }
}
</style>
