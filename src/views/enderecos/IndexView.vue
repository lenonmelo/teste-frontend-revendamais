<script setup>

import { useEnderecos } from "@/stores/enderecos";
import {mask} from 'vue-the-mask'

const store = useEnderecos();

//Realiza filtro de endereço por CEP ou por ENdereço textual
const filtrarEnderecos = () => {

  let tipo = document.querySelector('input[name="tipo"]:checked').value;

  if(tipo == 1)
  {
    let cep = document.getElementById('cep').value;
    store.getFilterByCep(cep);
  } else {
    let endereco = document.getElementById('endereco').value;
    store.getFilterByEndereco(endereco);
  }
  
}

const escolherTipoFiltro = (tipo) => {
  //Limpa os campos
  document.getElementById("cep").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("bloco1").style.display = 'none';
  document.getElementById("bloco2").style.display = 'none';

  if(tipo == 1)
  {
    document.getElementById("bloco1").style.display = 'block';
  } else {
    document.getElementById("bloco2").style.display = 'block';
  }
}

</script>
<script>
  export default {
    directives: {mask}
  }
</script>
<template>
  <div class="container">
    <div class="flex flex-col mx-auto col-10">
      <h1 class="text-2xl font-bold mb-4 text-center">Encontrar endereços</h1>
      <div class="card">
        <div class="card-body">
        <h1 class="text-2xl text-center">Filtro</h1>
        <div class="flex flex-col gap-2 mb-4">
         <label for="centro_custo_id">Realizar o filtro por:</label>
         <div class="flex gap-2 mb-4">
         CEP: <input id="tipo" name="tipo" type="radio" value="1" @click="escolherTipoFiltro(1)" checked />  
         Endereço: <input id="tipo" name="tipo" type="radio" value="2" @click="escolherTipoFiltro(2)" />  
         </div>
         
          </div>
          <div class="flex flex-col gap-2 mb-4" id="bloco1" >
          <label for="cep">CEP:</label>
          <input id="cep" name="cep" type="text" class="form-input"  v-mask="'#########'" />  
          </div>
          <div class="flex flex-col gap-2 mb-4" id="bloco2" style="display:none">
          <label for="endereco">Endereço:</label>
          <input id="endereco" name="endereco" type="text" class="form-input" />  
          </div>
          <button @click="filtrarEnderecos" class="btn btn-primary w-full">
            Filtrar
          </button>
        </div>
      </div>


<div class="border-t h-[1px] my-6"></div>
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="endereco in store.enderecos" :key="endereco.id">
                
                <td>{{ endereco.cep }}</td>
                <td>{{ endereco.logradouro }}</td>
                <td>{{ endereco.bairro }}</td>
                <td>{{ endereco.cidade }}</td>
                <td>{{ endereco.estado }}</td>
            
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
