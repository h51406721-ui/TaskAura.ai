import { useRef } from "react";

export function useVoiceInput(onTranscribed: (text: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadAudio() {
    if (!inputRef.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", inputRef.current.files[0]);
    const res = await fetch("/api/ai/transcribe", {
      method: "POST",
      body: formData
    });
    const { text } = await res.json();
    onTranscribed(text);
  }

  return { inputRef, uploadAudio };
}
