import CryptoJS from "crypto-js";

var cript = import.meta.env.VITE_OPENAI_API_KEY;
var decript = CryptoJS.AES.decrypt(cript, "secret key 123");
var decryptedData = decript.toString(CryptoJS.enc.Utf8);

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: decryptedData,
  dangerouslyAllowBrowser: true,
});
