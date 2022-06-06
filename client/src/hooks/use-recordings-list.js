import { useState, useEffect } from "react";
import { getridofAudio } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key.js";

export default function useRecordingsList(audio) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState) => {
        return [...prevState, { key: generateKey(), audio }];
      });
  }, [audio]);

  return {
    recordings,
    getridofAudio: (audioKey) => getridofAudio(audioKey, setRecordings),
  };
}