import React from "react";
import Navbar from "../../components/navbar";
import Markdown from "react-markdown";
import Footersection from "../../components/homepage/footersection";

const Page = () => {
  const markdown = `Planning a trip to Dubai? This bustling metropolis in the United Arab Emirates is known for its ultramodern architecture, luxury shopping, and vibrant nightlife. Before you jet off to this fascinating destination, here are 13 things you should know to make the most of your visit, inspired by travel writer Lara Brunt.

## 1. Best Time to Visit

Dubai's desert climate means it can get extremely hot, especially in the summer months (June to September). The best time to visit is from November to March when the weather is pleasant and ideal for outdoor activities.

## 2. Dress Code
!
While Dubai is relatively liberal compared to other Middle Eastern destinations, it’s important to dress modestly in public places. Swimwear is acceptable at beaches and pools, but women should avoid wearing revealing clothing in malls, restaurants, and cultural sites. Men should avoid walking shirtless outside of the beach or pool areas.

## 3. Cultural Sensitivity

Respect local customs and traditions. Public displays of affection are frowned upon, and during Ramadan, eating, drinking, and smoking in public during daylight hours is prohibited.

## 4. Currency

The local currency is the UAE Dirham (AED). Credit cards are widely accepted, but it’s always a good idea to have some cash on hand for small purchases and tips.

## 5. Language

Arabic is the official language, but English is widely spoken and understood, especially in tourist areas and by service staff.

## 6. Transportation

Dubai’s metro system is clean, efficient, and a great way to get around the city. Taxis are also plentiful and reasonably priced. Consider renting a car if you plan to explore beyond the city limits.

## 7. Safety

Dubai is considered one of the safest cities in the world, with low crime rates. However, it’s always wise to take standard precautions like keeping your belongings secure and being aware of your surroundings.

## 8. Local Etiquette

When greeting someone, use your right hand as the left hand is considered unclean. It’s also polite to accept refreshments when offered, as hospitality is a key part of the culture.

## 9. Food and Drink

Dubai offers a culinary scene that caters to all tastes and budgets, from street food to high-end dining. Alcohol is available at licensed venues such as hotels, bars, and clubs, but drinking in public is illegal.

## 10. Shopping

Dubai is a shopper’s paradise, known for its lavish malls, traditional souks, and tax-free prices. Don’t miss the Dubai Mall and the Gold Souk for an unforgettable shopping experience.

## 11. Attractions

Iconic attractions include the Burj Khalifa, the world’s tallest building, and the Palm Jumeirah, an artificial archipelago. Don’t forget to visit the Dubai Fountain and take a desert safari for a taste of adventure.

## 12. Tipping

Tipping is not mandatory but appreciated. In restaurants, a 10-15% tip is customary if a service charge isn’t included. Tipping taxi drivers, hotel staff, and tour guides is also a common practice.

## 13. Photography

Be mindful of where and whom you photograph. It’s illegal to take photos of government buildings, military installations, and local people without their permission.

By keeping these tips in mind, you’ll be well-prepared to enjoy all that Dubai has to offer. Whether you’re there for business or leisure, this dynamic city promises an unforgettable experience. Safe travels!
`;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center max-w-5xl relative w-full">
        <Navbar />
        <div className=" mt-12 sm:mt-20 w-full md:px-2">
          <div className="w-full relative h-[300px] sm:max-h-[500px] sm:rounded-xl overflow-hidden">
            <img
              src="https://lp-cms-production.imgix.net/2024-06/GettyImages-1238703443.jpg?w=1440&h=810&fit=crop&auto=format&q=75"
              alt=""
              className="sm:rounded-xl h-full w-full object-cover"
            />
            <div className="absolute z-40 h-full  w-full bg-gradient-to-t from-black to-transparent top-0 left-0 flex flex-col justify-end items-start px-4 py-4">
              <p className="bg-white px-2 sm:px-3 font-semibold rounded-full text-xs sm:text-lg mb-1 sm:mb-3">
                Travel
              </p>
              <h1 className="text-white text-xl sm:text-5xl font-semibold max-w-3xl">
                13 things to know before going to Dubai Lara Brunt
              </h1>
              <div className="flex sm:gap-3 mt-3 text-xs sm:text-sm gap-1">
                <div className="flex gap-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 sm:size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <p className=" ">21/04/2025</p>
                </div>
                <div className="flex gap-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className=" size-4 sm:size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>2 MIN READ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full border-l border-r mb-24 py-4 mt-0 ">
          <div className="mt-1 px-4 markdown max-w-4xl">
            <Markdown>{markdown}</Markdown>
          </div>
          <div className=""></div>
        </div>
      </div>
      <Footersection />
    </div>
  );
};

export default Page;
