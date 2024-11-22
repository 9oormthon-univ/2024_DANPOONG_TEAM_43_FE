import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import nav_home from '../assets/img/nav/house.svg';
import nav_home_fill from '../assets/img/nav/house-fill.svg';
import nav_map from '../assets/img/nav/map-pin.svg';
import nav_map_fill from '../assets/img/nav/map-pin-fill.svg';
import nav_group from '../assets/img/nav/users-three.svg';
import nav_group_fill from '../assets/img/nav/users-three-fill.svg';
import nav_chats from '../assets/img/nav/chats.svg';
import nav_chats_fill from '../assets/img/nav/chats-fill.svg';
import nav_my from '../assets/img/nav/my.svg';
import nav_my_fill from '../assets/img/nav/my-fill.svg';

const Nav = () => {
  const location = useLocation();

  const getActiveNav = (path: string) => {
    switch (path) {
      case '/':
        return 1;
      case '/Map':
        return 2;
      case '/Group':
        return 3;
      case '/Chats':
        return 4;
      case '/MyPage':
        return 5;
      default:
        return 0;
    }
  };

  const activeNav = getActiveNav(location.pathname);

  return (
    <div className="navbar_div">
      <div>
        <NavLink to="/">
          <img
            src={activeNav === 1 ? nav_home_fill : nav_home}
            alt="Home"
            className="icon"
          />
          <p className={activeNav === 1 ? 'title' : 'txt'}>홈</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/Map">
          <img
            src={activeNav === 2 ? nav_map_fill : nav_map}
            alt="Map"
            className="icon"
          />
          <p className={activeNav === 2 ? 'title' : 'txt'}>이웃</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/Group">
          <img
            src={activeNav === 3 ? nav_group_fill : nav_group}
            alt="Group"
            className="icon"
          />
          <p className={activeNav === 3 ? 'title' : 'txt'}>모임</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/Chats">
          <img
            src={activeNav === 4 ? nav_chats_fill : nav_chats}
            alt="Chats"
            className="icon"
          />
          <p className={activeNav === 4 ? 'title' : 'txt'}>채팅</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/MyPage">
          <img
            src={activeNav === 5 ? nav_my_fill : nav_my}
            alt="MyPage"
            className="icon"
          />
          <p className={activeNav === 5 ? 'title' : 'txt'}>마이페이지</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;