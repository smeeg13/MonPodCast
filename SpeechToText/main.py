import speech_recognition as sr
from pydub import AudioSegment


# Convert mp4 (audio-only) to wav
def convert_mp4_to_wav(mp4_file, wav_file):
    audio = AudioSegment.from_file(mp4_file, format="mp4")
    audio.export(wav_file, format="wav")


# Transcribe speech from a wav file
def transcribe_wav_file(wav_file, language):
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_file) as source:
        audio = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio, language=language)
        return text
    except Exception as e:
        print(f"Error: {e}")
        return None


# Save the transcript to a file
def save_transcript(text, output_file):
    with open(output_file, "w", encoding="utf-8") as file:
        file.write(text)


# Main function
def main():
    mp4_file = "09SA_NAI1_naissances_10h43_25.02.2023(1).mp4"
    wav_file = "temp_audio.wav"
    output_file = "transcript.txt"
    language = "fr-FR"

    convert_mp4_to_wav(mp4_file, wav_file)
    transcript = transcribe_wav_file(wav_file, language)

    if transcript:
        save_transcript(transcript, output_file)
        print(f"Transcript saved to {output_file}")
    else:
        print("Couldn't transcribe the speech.")


if __name__ == "__main__":
    main()