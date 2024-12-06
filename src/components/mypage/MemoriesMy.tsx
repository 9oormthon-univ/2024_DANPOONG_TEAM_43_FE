// import React from 'react';
// import { GuestbookEntry } from 'type/guestbook';
// import { getBackgroundColor, getBackgroundColor2, getCertificatedBackImage, getUserTypeText, imageMapping } from 'utils/userUtils';

// interface MemoriesProps {
//   entry: GuestbookEntry;
// }

// const MemoriesMy: React.FC<MemoriesProps> = ({ entry }) => {
//   return (
//     <div 
//       className={`relative flex p-4 rounded-lg shadow-md ${getBackgroundColor(entry.userType)} items-start`}
//     >
//       <img
//         src={getCertificatedBackImage(entry.userType)}
//         alt="backImage"
//         className="absolute bottom-0 right-0 h-auto z-[50]"
//         style={{
//           width: 'auto',
//           objectFit: 'cover',
//           objectPosition: 'right',
//         }}
//       />

//       <div
//         className="flex-shrink-0 items-center rounded-full justify-center inline-flex mr-3"
//         style={{
//           border: `2px solid ${getBackgroundColor2(entry.userType)}`,
//           width: '60px',
//           height: '60px',
//         }}
//       >
//         <img
//           src={imageMapping[entry.userType][entry.userId % 10 || entry.sectionId % 10]}
//           alt="user"
//           className="w-full h-full rounded-full object-cover"
//         />
//       </div>

//       <div className="flex flex-col flex-1 space-y-2 text-left">
//         <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug">
//           {getUserTypeText(entry.userType)} {entry.profileName}님
//         </div>
//         <div className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-normal break-words z-[50]">
//           {entry.content}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemoriesMy;