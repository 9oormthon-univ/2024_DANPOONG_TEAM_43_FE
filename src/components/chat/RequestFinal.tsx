import React from 'react';
import { RequestFinalProps } from 'type/chat';

const RequestFinal: React.FC<RequestFinalProps> = ({ location, time, work, durationHours, onClose, onSubmit, onEdit }) => {
    return (
        <div className="popup_request_final">
            <div className="popup_content">
                <p className="popup_title">자원 봉사를 요청할까요?</p>
                <div className="details">
                    <p className="detail_item">
                        <span className="detail_label">나의 위치</span>
                        <span className="detail_value">{location}</span>
                    </p>
                    <p className="detail_item">
                        <span className="detail_label">함께하는 시간</span>
                        <span className="detail_value">약 {durationHours}시간 동안 / {time}</span>
                    </p>
                    <p className="detail_item">
                        <span className="detail_label">주된 일</span>
                        <span className="detail_value">{work}</span>
                    </p>
                    <button className="edit" onClick={onEdit}>
                        수정하기
                    </button>
                </div>
                <div className="actions">
                    <div className="bottom_actions">
                        <button className="cancel" onClick={onClose}>
                            취소
                        </button>
                        <button className="submit" onClick={onSubmit}>
                            요청할래요
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestFinal;
