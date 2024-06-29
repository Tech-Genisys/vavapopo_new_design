import React from "react";

const Daycard = ({ data }) => {
  const [active, setActive] = React.useState(data.images[0].url);
  return (
    <div className=" bg-white shadow px-3 rounded-2xl flex flex-col md:flex-row items-center md:items-start md:gap-9 py-3">
      <div className="grid gap-4 w-full md:max-w-[400px]">
        <div className="w-full">
          <h1 className=" font-semibold">Day {data.id + 1}</h1>
        </div>
        <div>
          <img
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[200px]"
            src={active}
            alt=""
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {data.images.slice(0, 4).map((i, index) => {
            return (
              <div key={index}>
                <img
                  onClick={() => setActive(i.url)}
                  src={i.url}
                  className="h-12 max-w-full cursor-pointer rounded-lg object-cover object-center"
                  alt="gallery-image"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full mt-3">
        <h1 className=" text-xl font-bold mb-1">{data.title}</h1>
        <p className="text-sm whitespace-pre-line leading-loose">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default Daycard;
