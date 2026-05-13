export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [], imageBase64 = null } = req.body || {};

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-5.5";

    if (!apiKey) {
      return res.status(200).json({
        reply:
          "Olá! Sou o assistente da MV Vidros e Esquadrias. Posso te ajudar a montar um pré-projeto, entender medidas, escolher acabamento e preparar as informações para um consultor. Me diga: qual projeto você quer fazer? Box, guarda-corpo, esquadria, fachada, varanda ou escadaria?"
      });
    }

    const systemPrompt = `
Você é o Assistente de Pré-Projeto da MV Vidros e Esquadrias.
Você conversa como um consultor profissional especializado em vidros, esquadrias, box, guarda-corpos, fachadas, fechamento de varanda, divisórias e escadarias com vidro.

Sua função:
- entender o projeto do cliente;
- pedir medidas importantes;
- orientar quais fotos enviar;
- explicar opções de acabamento;
- ajudar o cliente a organizar um pré-projeto;
- lembrar que a prévia do site é estimativa, não orçamento final;
- conduzir o cliente para o WhatsApp da empresa.

Tom:
profissional, claro, consultivo, direto e acolhedor.

Nunca prometa medida exata por foto. Diga que pode fazer uma leitura visual inicial, mas o orçamento final depende de conferência técnica.
WhatsApp oficial: (85) 98542-7744.
`;

    const input = [
      {
        role: "system",
        content: systemPrompt
      },
      ...messages
    ];

    if (imageBase64) {
      input.push({
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              "Analise esta imagem enviada pelo cliente e oriente quais medidas e informações ele precisa confirmar para um orçamento de vidro/esquadria."
          },
          {
            type: "input_image",
            image_url: imageBase64
          }
        ]
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        reply:
          "Consegui receber sua mensagem, mas a IA está temporariamente indisponível. Me diga o tipo de projeto, medidas aproximadas e cidade/bairro para preparar seu atendimento pelo WhatsApp."
      });
    }

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Entendi. Me envie o tipo de projeto, medidas aproximadas, cidade/bairro e fotos do ambiente para eu te orientar melhor.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(200).json({
      reply:
        "Tive uma instabilidade ao processar sua mensagem. Me diga qual projeto você deseja fazer e quais medidas aproximadas possui."
    });
  }
}
