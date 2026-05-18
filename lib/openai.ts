import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface Diagnosis {
  score: number
  rarity: "LENDARIO" | "RARO" | "COMUM" | "BAIXO"
  presencaDigital: { score: number; label: string; descricao: string }
  clareza: { score: number; label: string; descricao: string }
  cta: { score: number; label: string; descricao: string }
  reputacao: { score: number; label: string; descricao: string }
  gaps: string[]
  oportunidades: string[]
  angulo: string
}

interface LeadInput {
  name: string
  category: string
  city: string
  website?: string
  rating?: number
  phone?: string
}

const DIAGNOSIS_SYSTEM_PROMPT = `
Você é um analista comercial especialista em presença digital local.
Analise a empresa e retorne APENAS JSON com esta estrutura exata:
{
  "score": number (0-100),
  "rarity": "LENDARIO"|"RARO"|"COMUM"|"BAIXO",
  "presencaDigital": { "score": number, "label": string, "descricao": string },
  "clareza": { "score": number, "label": string, "descricao": string },
  "cta": { "score": number, "label": string, "descricao": string },
  "reputacao": { "score": number, "label": string, "descricao": string },
  "gaps": string[],
  "oportunidades": string[],
  "angulo": string
}
`

export async function generateDiagnosis(lead: LeadInput): Promise<Diagnosis> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: DIAGNOSIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: JSON.stringify({
          nome: lead.name,
          categoria: lead.category,
          cidade: lead.city,
          website: lead.website,
          avaliacao: lead.rating,
          telefone: lead.phone,
        }),
      },
    ],
  })
  return JSON.parse(completion.choices[0].message.content!) as Diagnosis
}

const MESSAGE_SYSTEM_PROMPT = `
Você é um especialista em copywriting para prospecção B2B local.
Crie uma mensagem personalizada para WhatsApp (máximo 300 caracteres) para o lead fornecido.
A mensagem deve:
- Mencionar o nome da empresa
- Destacar um ponto forte identificado
- Ter uma proposta de valor clara
- Terminar com CTA direto
Retorne APENAS o texto da mensagem, sem aspas ou formatação extra.
`

export async function generateMessage(lead: LeadInput & { angulo?: string }): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: MESSAGE_SYSTEM_PROMPT },
      {
        role: "user",
        content: JSON.stringify({
          nome: lead.name,
          categoria: lead.category,
          cidade: lead.city,
          angulo: lead.angulo,
        }),
      },
    ],
  })
  return completion.choices[0].message.content ?? ""
}
