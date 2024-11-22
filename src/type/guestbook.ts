export interface GuestbookEntry {
    sectionId: number;
    volunteerName: string;
    durationHours: number;
    caregiverName: string;
    caregiverAddress: string;
    caregiverAge: number | null;
    careDate: string;
    content: string;
  }