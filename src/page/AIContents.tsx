import React, { useState } from 'react';
import back from '../assets/img/chat/chat-back.svg'
import { useNavigate } from 'react-router-dom';
import ai_siren from '../assets/img/home/AI_siren.svg'
import ai_icon from '../assets/img/home/AI_icon.svg'
import ai_total_fill from '../assets/img/home/AI_total_fill.svg'
import ai_total from '../assets/img/home/AI_total.svg'
import UserDetailModal from 'components/map/UserDetailModal';
import AIProfile from 'components/home/AIProfile';

const AIContents = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // 애니메이션 제어용 상태

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true); // 모달 열기
        setTimeout(() => setIsModalVisible(true), 0); // 애니메이션 트리거
    };

    const handleBackClick = () => {
        navigate(-1);
    };
    
    return (
        <div className='container' id='ai_contents'>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'><div className="type"></div>이상덕님과의 인연</p>
                    <img src={ai_siren} alt="" />
                </div>
                <div className="middle">
                    <div className="middle_top">
                        <img src={ai_icon} alt="" className="AI_icon" />
                        <p className="condition">체온 및 건강 상태</p>
                    </div>
                    <div className="condition_icon">
                        <div className="total" style={{ backgroundImage: `url(${ai_total})` }}></div>
                        <div className="tem" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/e4b6/acad/6ef4a77c244bb807e4a06b77ad81d0f4?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mQmBuq4diJQ1L5iGPWreCZALYQDVDORwPDLrvl6v1GaslYEeztuSIXaAwQpYV5uqaU~BoKoTBur9DzppZD0tu5nFGWkuOFM6mokN2hhseW0GkNMf5mGZrA6MrxjPLyEGatpbMm9qztanVcIl7aIxzX-Mb~pgW006CcuVE5Rf7IDjsIEb3kU4PMfCnW2s6wUdn28~tYR65Z6USoLY4OdA7FTK69R-5yWraDwC7S~hauDWfnZCCEKxeKOZPG3DV9UPkBYKWehh61zM1rNacQE9kpobxi3OuHi0psXX7hQvIQxjvs5XuCsEuwrxvmoPghXGiqgvo9tVFGS~GTAP1H1SBg__')` }}></div>
                        <div className="eat" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/893d/2995/93efb74da93c0c0616955d957fe137cd?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IMw4CUtYUU1lTnS3x9URucXfAAThhjQqND9-oe7WOBPZLTpD-9VGxqXp985sW620ZiH85FCnrsrMe0N5G6MmsvEPz7iCaa4Owpj-2fSHsOKVODzIuddpPxKxpIb-pQy4vDcOPdELE3fUawnRxHcpFL7fs9M9PPbOS3dglTvo85bBt6-7oDWO1UfnPFUEZeDd4yzq~Xzr-dN7J80HtN-gCmZZBMVn0c0T-~sLnrXQm3MM6-jkg4~koSdfvhQihZIlLnKNMXHp8FbBplXwCLRr-KTfy3zQN1f8JU8z7PyUdYPkRm-g5vMbDjOmJm~fbjAsCTqqE~Ize0rLG-ReF5MiQQ__')` }}></div>
                        <div className="active" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/4ad0/e6b5/ae703f37629e74b4facc85d7f8565f79?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Hras3wnlG5JE7zKhSJCmPfH-lG0HWNCNeeNHH8A3tpyfn4~fEwxWi6Kkl7Y3AaSC~N97VskD7oMdcMto~CTz6XvpGmgJtPkYOgISBw1TC4hCDk4m-ph1teUKvQtbQbTJowiAEgT7~guRKfVk1GobTIH0jfK7yqcxF8qzAxy-j5AU605-eJEaqLRchGQpegdGLimWgmpwzFYdBvtz7M6m6f9xlbHR1~2c3X-t0D4s-DapNtRlSswSrOZP~Junh-FgJygIs7zwG3kBjeGfEckz17GGe9~ICBgftCPjLmr2HKVSyVFcddWO~VIgGViu2yiPyvm6fmVBaqhDkXerZQk33g__')` }}></div>
                        <div className="chat" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/86e5/5629/81f8cf19d63ab5aca678e2cd75e68be2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ms0kXpmbzM725bX2QI-pVz92rtP5OFPdrS9z8IVMJIdKCJXag9yuWc~ThJvG1VIZkup39O9juSZRT6eyP9jqHfJjWaQ~6mX3S7hDp9WzIow4qOsNyYDiZkjp08N~vb58ZTNyZcrX-8~uYiNGSYAeCoXgINjcI8vRDC4~V441oBWI29bdUelyktm54dSfGQikfgnmGWYH6sWB29lV5Le2uHsUmK-3I-ta1sAjpwlqIy4IrtE3A7sxoQQuz6kFZ3oeZERQddNBn4BNw0Vh0AVu1vIiys0qiwbWImKT3lIfYZHAFtERWhvDw~aHfKUZ1ILDi7B~DMAFH4bRELEeaIKsxA__')` }}></div>
                        <div className="toilet" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/254d/fab5/c956b0719b6433432ea9419cfa1c3b18?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iPoWBtRWtp~0xwgdeZzn976IJpL7JX-DRr5andGZmoIl1nJMNm9AubnayWHW-KqK1kIwbmIQcTQJu-TBP73ufW45n9nA8IxS3tSfK-AqiZiDQdtyO6NgaGMgLs-KtfabFph8yfSmU47mlbUyv7wJhHMajQJDxaPRy5SPjxBOUN5RCMP7OSiW3aB6bFeNHM7wlsSNhn3HDgKUfvkiqXwtneWqdGztdGk0cCDsWXn2FvfaD28bzdhCf3J1ma6fHMza7spco8s3UoNxXTtcniDvj5NKlHoeLAPY1mNHg9rSwfVmnaIR9bFx91GxXWDVx7PnWKdx~QmwyjO8NsIo7-cQHg__')` }}></div>
                    </div>
                    <p className="condition_text">
                        이상덕 간병인님의 투약은 하루 2번, 아침 10시와 저녁 6시에 진행합니다. 또한, 복약 후에는 환자 상태를 세심하게 관찰하여 이상 반응이 없는지 확인해야 합니다. <br />식사는 매일 아침 8시와 저녁 5시에 급여됩니다. 식단은 계란과 우유를 필수로 급여해야합니다. 필요한 경우 추가적인 수분 보충을 권장합니다.
                    </p>
                </div>
                <hr />
                <div className="memo_div">
                    <div className="title">메모</div>
                    <textarea name="" id="" placeholder='간병인의 특이사항이 있을 경우, 적어주세요!'>
                    </textarea>
                </div>
            </div>
            <div>
                <div className="profile_contents">
                    <div className="open" onClick={handleOpenModal}>
                        <div className="bar"></div>

                    </div>
                </div>

                <div className="bottom" >

                    <div id='box' className="chat_room">
                        간병인과 연락하기
                    </div>
                    <div id='box' className="detail">
                        봉사 끝마치기
                    </div>
                </div>
            </div>
            {/* AIProfile 모달 */}
            {isModalOpen && (
                <AIProfile
                    userId={95}
                    onClose = {handleCloseModal}
                />
            )}


        </div>
    )
}

export default AIContents