import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { proxyUrl } from "../utils";
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from "../constants";
import * as FileSystem from "expo-file-system";

type AudioClip = {
  sound: Audio.Sound;
  file: string | null;
};

type RecordVoiceButtonProps = {
  onUserInput: (text: string) => void;
};

const RecordVoiceButton = ({ onUserInput }: RecordVoiceButtonProps) => {
  const [recording, setRecording] = useState<Audio.Recording>(new Audio.Recording());
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecordToggle = async () => {
    isRecording ? await stopRecording() : await startRecording();
  };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status !== "granted") return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error(" Failed to start recording", err);
    }
  }

  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const { sound } = await recording.createNewLoadedSoundAsync();
    const newRecording = {
      sound: sound,
      file: recording.getURI(),
    };

    console.log("Recording stopped and stored at", uri);
    setIsRecording(false);
    transcribeRecording(newRecording);
  }

  async function transcribeRecording(newRecording: AudioClip) {
    const { file: uri } = newRecording;
    if (!uri) return;

    setIsLoading(true);

    try {
      const response = await FileSystem.uploadAsync(`${proxyUrl}/api/transcribe`, uri);

      if (response.status == 200) {
        console.log("Success!");
        const parsedResponse = JSON.parse(response.body); // Assuming backend sends JSON
        console.log(parsedResponse);
        onUserInput(parsedResponse.response);
      }
    } catch (error) {
      console.error("Transcription Error:", error);
    }

    setIsLoading(false);
  }

  return (
    <TouchableOpacity onPress={handleRecordToggle}>
      {isLoading ? (
        <ActivityIndicator size={20} color="white" />
      ) : (
        <FontAwesome name="microphone" size={40} color={isRecording ? "blue" : "white"} />
      )}
    </TouchableOpacity>
  );
};

export default RecordVoiceButton;
