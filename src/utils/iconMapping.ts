import walkIcon1 from '../assets/img/map/walk1.svg';
import eatIcon1 from '../assets/img/map/eat1.svg';
import bathIcon1 from '../assets/img/map/bath1.svg';
import toiletIcon1 from '../assets/img/map/toilet1.svg';
import talkIcon1 from '../assets/img/map/talk1.svg';

import walkIcon2 from '../assets/img/map/walk2.svg';
import eatIcon2 from '../assets/img/map/eat2.svg';
import bathIcon2 from '../assets/img/map/bath2.svg';
import toiletIcon2 from '../assets/img/map/toilet2.svg';
import talkIcon2 from '../assets/img/map/talk2.svg';

import walkIcon3 from '../assets/img/map/walk3.svg';
import eatIcon3 from '../assets/img/map/eat3.svg';
import bathIcon3 from '../assets/img/map/bath3.svg';
import toiletIcon3 from '../assets/img/map/toilet3.svg';
import talkIcon3 from '../assets/img/map/talk3.svg';


export const iconMapping: { [key: string]: { [key: string]: string } } = {
  CAREGIVER: {
    walk: walkIcon1,
    eat: eatIcon1,
    bath: bathIcon1,
    toilet: toiletIcon1,
    talk: talkIcon1,
  },
  VOLUNTEER: {
    walk: walkIcon2,
    eat: eatIcon2,
    bath: bathIcon2,
    toilet: toiletIcon2,
    talk: talkIcon2,
  },
  CARE_WORKER: {
    walk: walkIcon3,
    eat: eatIcon3,
    bath: bathIcon3,
    toilet: toiletIcon3,
    talk: talkIcon3,
  },
};
