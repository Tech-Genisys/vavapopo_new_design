import HashTagCard from "./HashTag/HashTagCard";

const getRecendHasthtags = async () => {
  const url = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
  const userGetUrl = process.env.NEXT_PUBLIC_RAPIDAPI_USER_URL;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const rawData = (await response.json()).data.items;
    const filteredData = [];
    let count = 0;
    for (let item of rawData) {
      if (count == 6) break;
      item = item.node;
      if (!item.is_video) {
        const user = await fetch(`${userGetUrl}/${item.owner.id}`, options);
        const username = (await user.json()).data.username;
        filteredData.push({
          imageUrl: item.display_url,
          userId: username,
        });
        count++;
      }
    }
    return filteredData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const HashTagSection = async () => {
  // const data = await getRecendHasthtags();
  const data = null;
  if (!data) return;
  return (
    <div className="w-full flex flex-col py-10 bg-background overflow-hidden">
      <div className="bg-dark py-5 text-white">
        <h1 className="font-bold text-2xl sm:text-3xl text-center">
          {`Through Our Visitors' Eyes`}
        </h1>
        <p
          className="text-center font-black text-2xl mt-2"
          data-aos="flip-up"
          data-aos-duration="500"
        >
          #vavapopo
        </p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6">
        {data &&
          data.map((item) => (
            <HashTagCard img={item.imageUrl} name={item.userId} />
          ))}
      </div>
      <div className="bg-dark py-8 flex justify-center gap-3 text-white w-full">
        <h1 className="font-semibold text-base">Follow Vavapopo :</h1>
        <img src="/footer/facebookIcon.svg" alt="" />
        <img src="/footer/instaIcon.svg" alt="" />
        <img src="/footer/linkedInIcon.svg" alt="" />
      </div>
    </div>
  );
};

export default HashTagSection;
