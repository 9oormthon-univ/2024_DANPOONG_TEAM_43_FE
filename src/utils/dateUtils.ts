export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(dateString).toLocaleString('ko-KR', options);
  };

export  const convertTo24HourTime = (timeString: string, selectedDate: Date): Date | null => {
    const regex = /(오전|오후) (\d{1,2})시 (\d{1,2})분/;
    const match = timeString.match(regex);

    if (!match) return null; 

    const [, period, hours, minutes] = match;
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    if (period === '오후' && hour !== 12) {
        hour += 12;
    } else if (period === '오전' && hour === 12) {
        hour = 0;
    }

    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);

    return date;
};

export const calculateDurationHours = (start: Date, end: Date): number => {
    const diffInMs = end.getTime() - start.getTime();
    return diffInMs / (1000 * 60 * 60); 
};

// 시간 차이를 계산하는 함수
export const calculateTimeDifference = (lastNews: string) => {
    const now = new Date(); 
    const newsTime = new Date(lastNews);
    const diffInMs = now.getTime() - newsTime.getTime(); 
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); 
    return diffInHours;
};