export interface GuestbookEntry {
    sectionId: number;
    home: string; // 방명록 작성 장소 (e.g., "username_3님의 집")
    writer: string; // 방명록 작성자 (e.g., "내가 남긴 방명록")
    profileName: string; // 프로필 이름 (e.g., "username_3")
    userType: 'CAREGIVER' | 'VOLUNTEER' | 'CARE_WORKER'; // 유저 타입
    durationHours: number; // 활동 시간
    careDate: string; // 케어 날짜
    content: string; // 방명록 내용
  }