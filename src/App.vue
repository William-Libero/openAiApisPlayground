<template>
  <v-app>
    <header class="menu-header">
      <span class="roboto-bold"> Open AI Api Playground </span>
      <v-btn
        :key="item.title"
        v-for="item in items"
        :prepend-icon="item.icon"
        :color="store.currentPage != item.value ? 'grey-lighten-4' : 'primary'"
        class="mt-5"
        @click="changeCurrentSelectedContent(item.value)"
      >
        <template v-if="item.icon != ''" v-slot:prepend>
          <v-icon color="black"></v-icon>
        </template>

        {{ item.title }}
      </v-btn>
    </header>
    <v-main class="d-flex justify-center align-center">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { ref } from "vue";
import { useCurrentPageStore } from "./stores/currentPage";

export default {
  setup() {
    const store = useCurrentPageStore();

    let items = ref([
      {
        title: "Chat completion",
        value: "chat_completion",
        icon: "mdi-message",
      },
      {
        title: "Image generator",
        value: "image_generator",
        icon: "mdi-image-area",
      },
      {
        title: "Summarize text",
        value: "summarize_text",
        icon: "mdi-dots-horizontal",
      },
      {
        title: "Description Generator",
        value: "description_generator",
        icon: "mdi-dots-horizontal",
      },
      {
        title: "Text translator",
        value: "text_translator",
        icon: "mdi-translate",
      },
      {
        title: "Shell commands generator",
        value: "shell_commands_generator",
        icon: "mdi-code-array",
      },
    ]);
    let currentSelectedContent = ref(null);

    function changeCurrentSelectedContent(content) {
      store.$patch({ currentPage: content });
    }

    return {
      store,
      items,
      currentSelectedContent,
      changeCurrentSelectedContent,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

.roboto-thin {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.roboto-black {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}
</style>

<style scoped>
.menu-header {
  width: 20vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #dce0d9;
  display: flex;
  flex-flow: column;
  padding: 20px;
}
</style>
