export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [], imageBase64 = null } = req.body || {};

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    if (!apiKey) {
      console.error("OPENAI_API_KEY_MISSING");
      return res.status(200).json({
        reply:
          "A chave da IA ainda não está configurada no servidor. Mesmo assim, posso te orientar: me diga o tipo de projeto, medidas aproximadas e cidade/bairro para preparar seu atendimento."
      });
    }

    const instructions = `
Você é o Consultor Digital da MV Vidros e Esquadrias.

Você é especialista em:
- box para banheiro
- guarda-corpo em vidro
- escadarias com vidro
- esquadrias de alumínio
- fachadas comerciais
- fechamento de varanda
- divisórias de ambiente
- projetos sob medida em vidro

Seu trabalho é conversar com o cliente como um consultor profissional.

Você deve:
- entender o projeto do cliente;
- pedir as medidas certas;
- orientar quais fotos enviar;
- explicar possibilidades de acabamento;
- dizer quais detalhes técnicos precisam ser confirmados;
- conduzir o cliente para o WhatsApp da MV;
- nunca prometer orçamento final sem medição técnica;
- nunca dizer que consegue medir com precisão absoluta apenas por foto.

Tom de voz:
profissional, direto, consultivo, simpático e seguro.

WhatsApp oficial da empresa:
(85) 98542-7744.
`;

    const lastText =
      messages
        .map((m) => {
          const role = m.role === "assistant" ? "Assistente" : "Cliente";
          return `${role}: ${typeof m.content === "string" ? m.content : ""}`;
        })
        .join("\n")
        .slice(-6000) || "Cliente iniciou a conversa.";

    let input;

    if (imageBase64) {
      input = [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                lastText +
                "\n\nO cliente também enviou uma imagem do ambiente. Analise visualmente e oriente quais medidas, fotos adicionais e informações técnicas ele deve confirmar."
            },
            {
              type: "input_image",
              image_url: imageBase64
            }
          ]
        }
      ];
    } else {
      input = lastText;
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        instructions,
        input,
        max_output_tokens: 700
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OPENAI_ERROR", {
        status: openaiResponse.status,
        statusText: openaiResponse.statusText,
        data
      });

      return res.status(200).json({
        reply:
          "A IA recebeu sua mensagem, mas houve um erro temporário na conexão com o servidor. Me diga o tipo de projeto, medidas aproximadas e cidade/bairro para eu organizar seu atendimento pelo WhatsApp."
      });
    }

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Entendi. Me diga qual projeto deseja fazer, as medidas aproximadas e envie uma foto do ambiente para eu orientar melhor.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("ASSISTANT_ROUTE_ERROR", error);

    return res.status(200).json({
      reply:
        "Tive uma instabilidade ao processar sua mensagem. Me diga qual projeto você deseja fazer e quais medidas aproximadas possui."
    });
  }
}
