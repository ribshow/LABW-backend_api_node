import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

// Criando uma instância do twilio
const client = twilio(accountSID, authToken);

export const sendMessage = async (phone, message) => {
  try {
    // enviar o sms
    const messageResponse = await client.messages.create({
      body: message,
      from: "+14132878450",
      to: phone,
    });

    console.log("Mensagem enviada com sucesso!", messageResponse.sid);
  } catch (error) {
    console.log("Erro ao enviar mensagem", error);
  }
};
