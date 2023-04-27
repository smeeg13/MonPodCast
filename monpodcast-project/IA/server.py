from flask import Flask, request, jsonify
from flask_cors import CORS
from moviepy.editor import *
import speech_recognition as sr
import os 



app = Flask(__name__)
CORS(app)

@app.route('/my-endpoint', methods=['POST'])
def my_endpoint():
    transcript = ""
    try:
        wav_file = "temp_audio.wav"
        temp_mp4 = "temp_mp4.mp4"
        language = "fr-FR"

        print(request.files['file'])
        mp4_file = request.files['file']
        
        print(mp4_file)
     
        mp4_file.save(temp_mp4)

        audio = AudioFileClip(temp_mp4)

        audio.write_audiofile(wav_file)
        # Convert the video clip to an audio clip
        #audio_clip = clip.audio
    
        # Save the audio clip as a WAV file
        #audio_clip.write_audiofile(wav_file)


        transcript = transcribe_wav_file(wav_file, language)
       

        if os.path.exists(temp_mp4):
            # remove the file
            os.remove(temp_mp4)
            os.remove(wav_file)
            print("File removed successfully.")
        else:
            print("File not found.")
            
        if transcript:
            return jsonify({'data': str(transcript)})
        else:
            return jsonify({'data': "Unable to read the mp4 file"})
   
    except Exception as e:
        return jsonify({'data': str(e)})
    

# Convert mp4 (audio-only) to wav
def convert_mp4_to_wav(mp4_file, wav_file):
   # Load the mp4 file
    clip = AudioFileClip(mp4_file)

    # Write the audio from the clip to a wav file
    clip.write_audiofile(wav_file)

    # Close the clip
    clip.close()


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
def textGeneration(file_mp4):
    try:
        wav_file = "temp_audio.wav"
        output_file = "transcript.txt"
        language = "fr-FR"

        convert_mp4_to_wav(file_mp4, wav_file)
        
        transcript = transcribe_wav_file(wav_file, language)

        if transcript:
            return transcript
    
        else:
            return print("Couldn't transcribe the speech.")
    except Exception as e:
        return e



if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000)

