export interface MenuItemProps {
    label: string;
    certificateData: {
      myName: string;
      volunteerDate: string;
      myType: string;
      partnerName: string;
      myIdentity:number;
      address:string;
      durationTimes:number;
      content:string;
      partnerId:number;
      partnerType:string;
    };
  }

export interface CareCertificateProps {
    certificateData: {
      certificateId: string;
      identity: string;
      username: string;
      issueDate: string;
      totalHours: number;
    };
  }


export interface CertificateProps {
    type: string;
    certificateData: {
      myName: string;
      volunteerDate: string;
      myType: string;
      partnerName: string;
      myIdentity:number;
      address:string;
      durationTimes:number;
      content:string;
    };
  }
  