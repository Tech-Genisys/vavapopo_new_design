import Image from "next/image";

function AboutCard({ src, title, description }) {
  return (
    <div className="w-[150px] md:w-[200px] text-white flex flex-col items-center text-center lg:block lg:text-start">
      <Image
        src={`/about/${src}`}
        width={60}
        height={60}
        className="mb-4 h-[40px] w-[40px] md:h=[60px] md:w-[60px]"
      />
      <p className="font-semibold mb-2 text-sm md:text-base">{title}</p>
      <p className="text-[10px] md:text-xs">{description}</p>
    </div>
  );
}

function Aboutsection() {
  return (
    <main
      className="min-h-[600px] lg:min-h-screen bg-[#003329] z-10 text-white py-32 px-5 xl:px-0 overflow-hidden"
      id="about"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-3xl md:text-5xl mb-10">Who We Are</h2>
        <p className="text-sm md:text-base" data-aos="fade">
          Experience the cultural heritage of Kerala like never before with us.
          Our unique vacations immerse you in the daily life of locals, offering
          authentic and memorable stays in rural areas beyond typical tourist
          spots like Munnar, Cochin, and Alleppey. We pride ourselves on our
          exceptional hospitality, ensuring guests feel both excited and at
          home. Discover the true essence of Kerala with us, where every moment
          is a blend of happiness, curiosity, and genuine connection.
        </p>
        <div className="flex justify-center lg:block">
          <div className="mt-20 grid grid-cols-2 gap-10 lg:grid-cols-4">
            <div data-aos="fade-right">
              <AboutCard
                src="culture.svg"
                title="Explore the culture"
                description="Explore the native culture of your destination with our packages, tailored to enrich your travel experience."
              />
            </div>
            <div data-aos="fade-right">
              <AboutCard
                src="custom.svg"
                title="Customize your trip"
                description="We provide custom packages, tailored to ensure you fully enjoy, relax, and make the most of your holidays."
              />
            </div>
            <div data-aos="fade-left">
              <AboutCard
                src="unique.svg"
                title="Unique packages"
                description="Experience one-of-a-kind adventures with our unique packages, offering unforgettable memories."
              />
            </div>
            <div data-aos="fade-left">
              <AboutCard
                src="support.svg"
                title="Customer support"
                description="Dedicated assistance available 24/7 to address your inquiries, ensuring a seamless and satisfying customer experience."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Aboutsection;
