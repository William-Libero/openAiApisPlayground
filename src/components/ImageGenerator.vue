<script>
import { ref, watch } from "vue";
import { openai } from "../plugins/openai";

export default {
  setup() {
    let textTypedInTextField = ref(null);
    let loading = ref(null);
    let generatedImage = ref(null);

    async function chatModelInvoke() {
      loading.value = true;
      generatedImage.value = await openai.images.generate({
        model: "dall-e-3",
        prompt: textTypedInTextField.value,
      });
      loading.value = false;
      console.log(generatedImage.value.data[0].url);
    }

    return { textTypedInTextField, loading, generatedImage, chatModelInvoke };
  },
};
</script>

<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center h-100 pt-5">
      <v-col cols="12">
        <div class="w-full d-flex justify-center align-center pb-10">
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="50"
            :width="7"
            color="primary"
          ></v-progress-circular>
          <img
            class="generatedImage"
            v-else-if="generatedImage != null"
            :src="generatedImage.data[0].url"
          />
        </div>
        <v-text-field
          v-model="textTypedInTextField"
          label="Type the description of the image"
          variant="outlined"
        >
        </v-text-field>
        <v-btn density="default" @click="chatModelInvoke"> Enviar </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#chat-container {
  border: 2px solid grey;
  padding: 10px 20px;
  border-radius: 5px;
  height: 500px;
  overflow: auto;
}

.ai-typed-text {
  text-align: left;
}

.generatedImage {
  width: 100%;
}
</style>
