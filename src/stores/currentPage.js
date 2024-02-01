import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentPageStore = defineStore("currentPage", () => {
  const currentPage = ref("chat_completion");
  function changeCurrentPage(currentPage) {
    currentPage.value = currentPage;
  }

  return { currentPage, changeCurrentPage };
});
