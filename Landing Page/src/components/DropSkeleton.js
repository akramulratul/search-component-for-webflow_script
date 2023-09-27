import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const DropSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <SkeletonTheme baseColor="#0c222d17" highlightColor="#03172630" key={i}>
        <div className="list-item">
          <div className="card-skeleton">
            <div className="left-col">
              <Skeleton width={104} />
              <Skeleton width={48} />
            </div>
            <div className="right-col">
              <Skeleton circle width={24} height={24} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    ));
};

export default DropSkeleton;
