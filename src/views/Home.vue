<script>
import ChatCompletion from "../components/ChatCompletion.vue";
import DescriptionGenerator from "../components/DescriptionGenerator.vue";
import ImageGenerator from "../components/ImageGenerator.vue";
import ShellCommandsGenerator from "../components/ShellCommandsGenerator.vue";
import SummarizeText from "../components/SummarizeText.vue";
import TextTranslator from "../components/TextTranslator.vue";
import { useCurrentPageStore } from "../stores/currentPage";

export default {
  components: {
    ChatCompletion,
    ImageGenerator,
    DescriptionGenerator,
    SummarizeText,
    TextTranslator,
    ShellCommandsGenerator,
  },
  setup() {
    const store = useCurrentPageStore();
    return { store };
  },
};
</script>

<template>
  <v-container fluid>
    <v-row class="d-flex justify-space-evenly align-center h-100 pt-5">
      <v-col cols="1" style="padding: 0px"> </v-col>
      <v-col cols="6" style="padding: 0px">
        <chat-completion v-if="store.currentPage == 'chat_completion'" />
        <image-generator v-if="store.currentPage == 'image_generator'" />
        <summarize-text v-if="store.currentPage == 'summarize_text'" />
        <description-generator
          v-if="store.currentPage == 'description_generator'"
        />
        <text-translator v-if="store.currentPage == 'text_translator'" />
        <shell-commands-generator
          v-if="store.currentPage == 'shell_commands_generator'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
