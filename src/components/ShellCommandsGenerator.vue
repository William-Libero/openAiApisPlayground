<template>
  <v-container fluid style="padding: 0px">
    <v-row class="d-flex justify-center align-center h-100">
      <v-col cols="12" style="padding: 0px">
        <div id="chat-container">
          <div v-for="chat in chatHistory" :key="chat.id" class="pt-3 pb-7">
            <div class="user-title-text">{{ chat.userTitle }}:</div>
            <div class="user-typed-text pb-5">
              {{ chat.userTextValue }}
            </div>
            <div class="user-title-text">{{ chat.aiTitle }}:</div>
            <div class="ai-text">{{ chat.aiTextValue }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center h-100 pt-5 text-right">
      <v-col cols="12" style="padding: 0px">
        <v-text-field
          v-model="textTypedInTextField"
          label="Type what you want to do with the shell command"
          variant="outlined"
        >
        </v-text-field>
        <v-btn density="default" @click="chatModelInvoke"> Enviar </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { openai } from "../plugins/openai";

export default {
  setup() {
    let textTypedInTextField = ref(null);
    var chatHistory = ref([]);

    async function chatModelInvoke() {
      userChatText();

      var llmchat = await sendChatCompletionRequest();

      textTypedInTextField.value = null;

      await AIChatText(llmchat);
    }

    function userChatText() {
      chatHistory.value.push({
        id: chatHistory.length > 0 ? chatHistory.length + 1 : 1,
        userTitle: "You",
        userTextValue: textTypedInTextField.value,
        aiTitle: "Shell command:",
        aiTextValue: "",
      });
    }

    async function sendChatCompletionRequest() {
      return await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an experienced software engineer with a lot of professional experience with shell commands. When you answer, you will always be technical and direct, but also extroverted.",
          },
          {
            role: "user",
            content:
              "Write a shell command that does the following: " +
              textTypedInTextField.value,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
        n: 1,
        stop: "None",
        stream: true,
      });
    }

    async function AIChatText(llmchat) {
      for await (const chunk of llmchat) {
        chatHistory.value[chatHistory.value.length - 1].aiTextValue +=
          chunk.choices[0]?.delta?.content || "";
      }
    }

    return {
      chatHistory,
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
  height: 55vh;
  overflow: auto;
}

.ai-typed-text {
  text-align: left;
}
</style>
