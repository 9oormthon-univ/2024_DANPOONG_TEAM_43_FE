import React from "react";
import { useUserDataQuery } from "service/user";
import { useVolunteerHoursQuery } from "service/volunteerTimes";
import { UserType } from "type/user";
import { userTypeConfig } from "utils/userUtils";

const NeighborTime: React.FC = () => {
  const { data: userData, error: userError } = useUserDataQuery();
  const userId = userData?.userId; 
  const userType = userData?.userType;
  const {
    data: volunteerHours,
    error: volunteerError,
    isLoading: isVolunteerHoursLoading,
  } = useVolunteerHoursQuery(userId!);

  if (userError || volunteerError || !userData) {
    return null;
  }

  const config = userTypeConfig[userType as UserType];

  return (
    <div
      className="neighbor_time"
      style={{
        '--main_color': config.color,
        '--bg_color': config.bgColor,
      } as React.CSSProperties}
    >
      <img src={config.bgImg} alt="" className="background_img" />
      <div className="text">
        <p className="txt">이웃과 함께한 시간</p>
        <p className="time">
          {isVolunteerHoursLoading ? '시간' : `${volunteerHours}시간`}
        </p>
      </div>
      {volunteerHours !== undefined && volunteerHours !== null && volunteerHours >= 80 && (
        <div className="option">요양보호사 자격을 위한 80시간을 모두 이수했어요</div>
      )}
    </div>
  );
};

export default NeighborTime;