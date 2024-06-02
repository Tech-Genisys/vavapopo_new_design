import React from "react";
import PackCard from "./PackCard";

const PackSection = ({ packs }) => {
  return (
    <div className="flex justify-center">
      <div className=" w-full  max-w-7xl px-11 flex justify-center">
        <div className="flex flex-col gap-8 border-t-2 py-12 border-[#F0FFF1]  w-full items-center justify-center">
          {!packs.length && <p>No package found, try different filter</p>}
          {packs.map((pack) => (
            <>
              <PackCard
                key={pack.id}
                title={pack.packageTitle}
                description={pack.description}
                state={pack.state}
                price={pack.startingPrice}
                days={pack.totalDays}
                images={pack.days.flatMap((day) => day.images)}
                id={pack.id}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackSection;
