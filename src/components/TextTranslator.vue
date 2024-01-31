<template>
  <v-container fluid style="padding: 0px">
    <v-row class="d-flex justify-center align-center h-100 text-right">
      <v-col cols="12" style="padding: 0px">
        <v-text-field
          v-model="textTypedInTextField"
          label="Type the text to be translated"
          variant="outlined"
        >
        </v-text-field>

        <v-autocomplete
          :items="languages['country_codes']"
          v-model="targetLanguage"
          density="compact"
          label="Select the target language"
        ></v-autocomplete>
        <v-btn density="default" @click="chatModelInvoke"> Enviar </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center h-100 pt-5">
      <v-col cols="12" style="padding: 0px">
        <div id="chat-container">
          <div class="pt-3 pb-3">
            <div class="user-title-text">{{ translatedText }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { openai } from "../plugins/openai";
import { languages } from "../assets/languages";

export default {
  setup() {
    let targetLanguage = ref(null);
    let textTypedInTextField = ref(null);
    var chatHistory = ref([]);
    let translatedText = ref(null);

    async function chatModelInvoke() {
      translatedText.value = null;
      var llmchat = await sendChatCompletionRequest();
      translatedText.value = llmchat.choices[0].message.content;
      textTypedInTextField.value = null;
    }

    async function sendChatCompletionRequest() {
      return await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
              "Translate the text: " +
              textTypedInTextField.value +
              " to this language: " +
              targetLanguage.value,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
        n: 1,
        stop: "None",
      });
    }

    return {
      targetLanguage,
      languages,
      chatHistory,
      translatedText,
      textTypedInTextField,
      chatModelInvoke,
    };
  },
};
</script>

<style scoped>
#chat-container {
  border: 2px solid grey;
  padding: 10px 20px;
  border-radius: 5px;
  height: fit-content;
  overflow: auto;
}

.ai-typed-text {
  text-align: left;
}
</style>
