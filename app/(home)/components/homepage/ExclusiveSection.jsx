import ExclusivePackCarousel from "./ExclusivePack/ExclusivePackCarousel";

export const dynamic = "force-dynamic";

const ExclusiveSection = async () => {
  let packData = [];
  try {
    packData = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api`, {
        next: { tags: ["homepage_exc"] },
      })
    ).json();
  } catch (error) {
    console.log(error);
  }
  if (packData.length < 2) return <div></div>;
  return (
    <div className="w-full flex justify-center min-h-screen bg-background py-0 lg:py-24 overflow-hidden">
      <div className="w-full max-w-5xl px-7 py-8 relative flex flex-col items-center">
        <div className="w-[98%] bg-gradient-to-b from-[#E0F9DC] to-transparent bg-opacity-20 absolute top-8 bottom-60 rounded-3xl max-h-[600px]"></div>
        <div className="flex flex-col items-center py-14 max-w-xl z-10">
          <h1
            className="font-bold text-3xl tracking-wide text-center"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            Exclusive packs recommendations from our experienced Travel Experts
          </h1>
          <h1
            className="text-center mt-6 font-semibold text-sm tracking-wider"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Expertly curated travel packs, personalized by seasoned Travel
            Experts, offering exclusive recommendations for unforgettable
            journeys.
          </h1>
        </div>
        <div className="flex justify-center z-30">
          <ExclusivePackCarousel itemList={packData} />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveSection;
