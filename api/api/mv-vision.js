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
    const model = process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini";

    if (!apiKey) {
      console.error("OPENAI_API_KEY_MISSING_VISION");
      return res.status(200).json({
        analysis:
          "Imagem recebida. Para uma análise mais precisa, envie largura, altura aproximada, uma foto mais aberta do ambiente e, se possível, uma referência de escala como trena ou régua."
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
        instructions:
          "Você é um consultor técnico da MV Vidros e Esquadrias. Analise imagens de ambientes para orientar pré-projetos de vidro, esquadrias, box, guarda-corpos, fachadas, divisórias, varandas e escadarias. Nunca prometa medida exata apenas por foto. Oriente quais medidas confirmar e quais fotos adicionais enviar.",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Analise esta foto para um ${projectType}. Diga o que é possível observar, quais medidas o cliente deve confirmar, quais fotos adicionais deve enviar e quais cuidados técnicos podem existir.`
              },
              {
                type: "input_image",
                image_url: imageBase64
              }
            ]
          }
        ],
        max_output_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI_VISION_ERROR", {
        status: response.status,
        statusText: response.statusText,
        data
      });

      return res.status(200).json({
        analysis:
          "Recebi a imagem, mas a análise por IA ficou temporariamente indisponível. Envie largura, altura aproximada, local de instalação e uma foto mais aberta do ambiente para o consultor avaliar melhor."
      });
    }

    const analysis =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Imagem analisada. Confirme largura, altura, local de instalação, tipo de vidro desejado e envie uma foto mais aberta do ambiente.";

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("VISION_ROUTE_ERROR", error);

    return res.status(200).json({
      analysis:
        "Não consegui analisar a imagem agora. Envie largura, altura aproximada e uma foto mais aberta do ambiente para o consultor avaliar melhor."
    });
  }
}
