import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReactWordcloud from 'react-wordcloud';
import Tag from "./components/Tag";
import "./App.css";

function App() {
  const [mode, setMode] = useState(true);
  const [tags, setTags] = useState([]);

  const swithMode = useCallback(() => setMode(m => !m), []);

  const getTags = useCallback(async () => {
    const { data } = await axios.get("http://localhost:3000/tags");

    setTags(data);
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const totalWeight = useMemo(
    () =>
      tags.reduce(
        (prev, current) => prev + current.value,
        0
      ),
    [tags]
  );

  return (
    <div className="App" style={{ flex: 1, justifyContent: 'space-between' }}>
      <button onClick={swithMode}>
        Switch View
      </button>
      {mode ? tags.map(({ text, value }) => (
        <Tag name={text} weight={value / totalWeight * 100} />
      )) : <ReactWordcloud words={tags} />}
    </div>
  );
}

export default App;
