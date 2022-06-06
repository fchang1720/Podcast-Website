export async function startRecording(setRecorderState) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      setRecorderState((prevState) => {
        return {
          ...prevState,
          initRecording: true,
          mediaStream: stream,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  export function keepRecording(recorder) {
    if (recorder.state !== "inactive") recorder.stop();
  }