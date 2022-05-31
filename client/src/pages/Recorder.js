import RecorderControls from "../components/Audio/recorderControls";
import RecordingsList from "../components/Audio/recorderList";
import useRecorder from "../hooks/userRecorder";
// import "./app.css";

const Recorder = ()=> {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;

  return (
    <section className="voice-recorder">
      <h1 className="title">Voice Recorder</h1>
      <div className="recorder-container">
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        <RecordingsList audio={audio} />
      </div>
    </section>
  );
}

export default Recorder;