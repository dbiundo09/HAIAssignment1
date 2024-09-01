
import { useState } from 'react';
import Chat from './pages/chat/Chat';

const url = process.env.NODE_ENV === 'production' ? 'https://course-tools-demo.onrender.com/' : 'http://127.0.0.1:8000/';
function App() {

  return (
      <Chat />
  )
}

export default App;
