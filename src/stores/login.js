import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/stores/auth";
 
export const useLogin = defineStore("login", () => {
  const auth = useAuth();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    email: "",
    password: "",
  });
 
  function resetForm() {
    form.email = "";
    form.password = "";
 
    errors.value = {};
  }
 
  async function handleSubmit() {
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("login", form)
      .then((response) => {
        auth.login(response.data.token);
      })
      .catch((error) => {
          alert(error.response.data.status);
      })
      .finally(() => {
        form.password = "";
        loading.value = false;
      });
  }
 
  return { form, errors, loading, resetForm, handleSubmit };
});