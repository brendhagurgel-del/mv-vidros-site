# MV Vidros e Esquadrias — Final V4

Arquivos principais:
- `mv_vidros_final_v4.html`: site completo e preview estático.
- `api/mv-assistant.js`: rota serverless para chat com IA real quando houver `OPENAI_API_KEY`.
- `api/mv-vision.js`: rota serverless para análise de imagens com IA real quando houver `OPENAI_API_KEY`.

Variáveis de ambiente para IA real no deploy:
```
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.5
OPENAI_VISION_MODEL=gpt-5.5
```

Observação: no preview estático, o chat e a análise de fotos funcionam com fallback local profissional. Em um deploy com as rotas `/api/*` e chave configurada, as chamadas passam para a IA real.
