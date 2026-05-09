const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function adaptLesson(
  content: string,
  mode: "ADHD" | "Dyslexia" | "Calm"
) {
  const prompt = `
You are EduBridge AI.

Transform the lesson into a calm, neurodivergent-friendly format.

Return ONLY valid JSON.

DO NOT use markdown.
DO NOT use code blocks.
DO NOT explain anything.

Use this exact structure:

{
  "title": "short title",
  "steps": [
    "step 1",
    "step 2",
    "step 3"
  ],
  "support": [
    "support tip 1",
    "support tip 2"
  ],
  "summary": "short emotional support summary"
}

Lesson:
${content}

Mode:
${mode}
`

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    console.log("Gemini response:", data)

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return {
        title: "Gemini API Error",
        steps: ["No response from Gemini"],
        support: [JSON.stringify(data)],
        summary: "Check console log",
      }
    }

    try {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

      return JSON.parse(cleaned)
    } catch {
      return {
        title: "AI response received",
        steps: [text],
        support: ["Please check Gemini formatting"],
        summary: text,
      }
    }
  } catch (error) {
    console.error(error)

    return {
      title: "Network Error",
      steps: ["Failed to connect to Gemini"],
      support: [String(error)],
      summary: "Please check internet/API key",
    }
  }
}