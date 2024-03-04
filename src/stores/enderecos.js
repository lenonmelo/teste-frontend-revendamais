import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useEnderecos = defineStore("enderecos", () => {
  
  const loading = ref(false);
  const enderecos = ref([]);
  const form = reactive({
    cep: "",
    endereco: "",
  });

  function resetForm() {
    form.cep = "";
    form.endereco = "";

  }

  function getFilterByCep(cep) {
    if (cep == "") {
      alert("Favor preencher o campo CEP");
      return false;
    }
    return window.axios
      .get('enderecos/buscaPorCep/' + cep)
      .then((response) => (
        enderecos.value = response.data
        )).catch((error) => {
          if(error.response.data.message['cep'] != undefined){
            alert(error.response.data.message['cep'][0]);
          } else {
            alert(error.response.data.message);
          }
          
          
      });
  }

  function getFilterByEndereco(endereco) {
    if (endereco == "") {
      alert("Favor preencher o campo Endereço");
      return false;
    }
    return window.axios
      .post('enderecos/buscaPorEndereco/', {endereco: endereco})
      .then((response) => (
        enderecos.value = response.data
        )).catch((error) => {
          alert(error.response.data.message);
      });
  }

  return {
    loading,
    enderecos,
    resetForm,
    getFilterByCep,
    getFilterByEndereco
  };
});