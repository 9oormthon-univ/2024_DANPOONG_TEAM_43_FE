export interface MemoData {
    id: number;
    volunteerId: number;
    caregiverId: number;
    volunteerName: string;
    caregiverName: string;
    volunteerAge: number;
    phoneNum: string;
    address: string;
    startTime: string;
    endTime: string;
    durationHours: number;
    salary: number;
    location: string;
    mainTask: string;
    volunteerType: string;
    roomId: string;
    userId: number;
    userType: 'CAREGIVER';
    memo: string;
  }