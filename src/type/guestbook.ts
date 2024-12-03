export interface GuestbookEntry {
    sectionId: number;
    home: string; 
    writer: string; 
    profileName: string; 
    userType: 'CAREGIVER' | 'VOLUNTEER' | 'CARE_WORKER'; 
    durationHours: number;
    careDate: string; 
    content: string;
    userId: number;
  }