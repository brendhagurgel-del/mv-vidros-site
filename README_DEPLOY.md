# MV Vidros e Esquadrias — Deploy final

## Arquivos
- `index.html`: site completo.
- `api/mv-assistant.js`: chat com IA real.
- `api/mv-vision.js`: análise de imagem com IA real.
- `mv-logo-transparent.png`: logo sem fundo.
- `vercel.json`: configuração para Vercel.

## Variáveis de ambiente obrigatórias
OPENAI_API_KEY=sua chave da OpenAI
OPENAI_MODEL=gpt-5.5
OPENAI_VISION_MODEL=gpt-5.5

## Teste rápido
Depois do deploy, abra:
- `/api/mv-assistant` não abre no navegador por GET; é rota POST.
- Teste o chat pelo próprio site.

## Observação sobre WhatsApp e fotos
O WhatsApp via link `wa.me` não permite anexar automaticamente arquivos locais. O chat de IA analisa fotos dentro do site. Na mensagem de WhatsApp, o site informa que o cliente tem fotos e pode enviar na conversa. Para enviar links das fotos automaticamente no WhatsApp, integrar Cloudinary/Supabase/Firebase Storage.
