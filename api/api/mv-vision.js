export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageBase64, projectType = "projeto em vidro" } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({
        analysis: "Nenhuma imagem foi enviada para análise."
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_VISION_MODEL || "gpt-5.5";

    if (!apiKey) {
      return res.status(200).json({
        analysis:
          "Imagem recebida. Para uma orientação melhor, envie também largura, altura aproximada, local de instalação e uma foto mais aberta do ambiente. A medição final precisa ser confirmada por análise técnica."
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
        input: [
          {
            role: "system",
            content:
              "Você é um consultor técnico da MV Vidros e Esquadrias. Analise imagens de ambientes para orientar pré-projetos de vidro, esquadrias, box, guarda-corpos, fachadas, divisórias e escadarias. Nunca prometa medidas exatas por foto. Oriente quais medidas confirmar e quais fotos adicionais enviar."
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Analise esta foto para um ${projectType}. Diga o que é possível observar, quais medidas o cliente deve confirmar e quais cuidados técnicos podem existir.`
              },
              {
                type: "input_image",
                image_url: imageBase64
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    const analysis =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Imagem analisada. Confirme largura, altura, local de instalação, tipo de vidro desejado e envie uma foto mais aberta do ambiente.";

    return res.status(200).json({ analysis });
  } catch (error) {
    return res.status(200).json({
      analysis:
        "Não consegui analisar a imagem agora. Envie largura, altura aproximada e uma foto mais aberta do ambiente para o consultor avaliar melhor."
    });
  }
}
