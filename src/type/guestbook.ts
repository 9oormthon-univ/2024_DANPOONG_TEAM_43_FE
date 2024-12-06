export interface GuestbookEntry {
  otherType: {
    userType: 'CAREGIVER' | 'VOLUNTEER' | 'CARE_WORKER';
    username: string;
    content: string | null;
    userId: number;
  };
  caregiver: {
    userType: 'CAREGIVER' | 'VOLUNTEER' | 'CARE_WORKER';
    username: string;
    content: string | null;
    userId: number;
  };
}