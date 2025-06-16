import twilio from "twilio";

const accountSID = '';
const authToken = '';

// Criando uma instância do twilio
const client = twilio(accountSID, authToken);

export const sendMessage = async(phone, message) => {
    try {
         // enviar o sms
    const messageResponse = await client.messages.create({
        body: mess,
        from: "+14132878450",
        to: phone
    });

    console.log("Mensagem enviada com sucesso!", messageResponse.sid);
    } catch (error) {
        console.log("Erro ao enviar mensagem", error);
    }
   
}