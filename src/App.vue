<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuth } from "@/stores/auth";
 
const auth = useAuth();
</script>
 
<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container md:px-2 px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <h2 class="text-xl font-bold">
            Projeto Revenda Mais
          </h2>
        </div>
        <div class="flex gap-4 items-center">
          <template v-if="auth.check">
             <button @click="auth.logout" class="router-link">Logout</button>
          </template>
          
        </div>
      </nav>
    </div>
  </header>
 
  <div class="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
  </div>
</template>