export async function sendWhatsApp(phone: string, message: string) {
  const instanceId = process.env.ZAPI_INSTANCE_ID
  const token = process.env.ZAPI_TOKEN
  if (!instanceId || !token) throw new Error("WhatsApp credentials not configured")

  const response = await fetch(
    `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone.replace(/\D/g, ""), message }),
    }
  )
  if (!response.ok) throw new Error(`WhatsApp send failed: ${response.status}`)
  return response.json()
}
