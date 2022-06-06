export function getridofAudio(audioKey, setRecordings) {
    setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
  }