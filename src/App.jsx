import { useState } from 'react';
import './App.css';

import Waapi from './components/Waapi/Waapi';
import NodeGraph from './components/NodeGraph/NodeGraph';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    {/* <NodeGraph /> */}
    <Waapi />
    </div>
  )
}

export default App
