import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GroupListSkeleton = () => {
    return (
        <div className="group_list_div">
            <div className="left">
                <div className="img">
                    <Skeleton circle width={50} height={50} />
                </div>
                <div className="info">
                    <Skeleton width={120} height={20} />
                    <Skeleton width={80} height={15} />
                    <div className="post_div">
                        <Skeleton width={160} height={15} />
                    </div>
                </div>
            </div>
            <div className="right">
                <Skeleton circle width={30} height={30} />
                <Skeleton width={40} height={15} />
            </div>
        </div>
    )
}

export default GroupListSkeleton;