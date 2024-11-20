import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from 'page/Home';
import Map from 'page/Map';
import Group from 'page/Group';
import Chats from 'page/Chats';
import MyPage from 'page/MyPage';
import Nav from 'components/common/Nav';
import Header from 'components/common/Header';
import Login from 'page/Login';
import KakaoLoginRedirect from 'page/KakaoLoginRedirect';

const App: React.FC = () => {
  const location = useLocation();

  const showHeaderAndNav = !['/login', '/kakao-login', '/signup', '/chat-room','/chat-volunteer'].includes(location.pathname);

  return (
    <>
      {showHeaderAndNav && <Header/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/group" element={<Group />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakao-login" element={<KakaoLoginRedirect />} />
      </Routes>
      {showHeaderAndNav && <Nav />}
    </>
  )
}

export default App