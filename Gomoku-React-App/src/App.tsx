import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, UserProvider } from './components/app';
import { Game, GameLog, Games, Home, Login, SignUp } from './pages';

import style from './css/App.module.css';

function App() {
  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/game-log/:id" element={<GameLog />} />
          <Route path="/games" element={<Games />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App;
