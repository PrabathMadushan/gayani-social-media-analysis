import { FaBrain, FaChartLine, FaEyeDropper } from "react-icons/fa";
import "./App.css";
import logo from "./assets/scrutiny.png";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

function App() {
  const push = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <div className="max-w-[1200px] w-full">
        <div className="pt-[60px] flex flex-col items-center">
          <div className="flex items-center justify-center">
            <img src={logo} alt="" width={100} height={100} />
          </div>

          <h1 className="text-gray-200 mt-10 text-[60px] font-bold text-center">
            Welcome to Social Insights
          </h1>
          <h2 className="text-gray-300 text-[40px] font-bold text-center">
            Empower Your Business with Data-Driven Decisions
          </h2>
          <p className="text-gray-400 mt-4 text-[18px] text-center mx-[15%]">
            Discover what’s trending on social media and unlock insights that
            drive growth. Our cutting-edge analytics platform helps businesses
            understand customer sentiment, track key topics, and stay ahead of
            the competition.
          </p>
          <button 
          onClick={()=>{
            push("/home")
          }}
          className="bg-blue-500 mt-10 w-[150px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
        <div className="flex  justify-between text-center mt-20 text-gray-100 gap-y-7  flex-wrap">
          <div className="flex w-full lg:w-1/3 flex-col items-center gap-2 ">
            <FaChartLine size={40} />
            <div className="text-[32px] font-bold">Real-Time Trends</div>
            <div className="text-gray-400">
              Stay updated with the latest buzz and hot topics in your industry.
            </div>
          </div>
          <div className="flex  w-full lg:w-1/3 flex-col items-center gap-2">
            <FaBrain size={40} />
            <div className="text-[32px] font-bold">AI-Powered Analysis</div>
            <div className="text-gray-400">
              Get deep insights into customer behavior and preferences.
            </div>
          </div>
          <div className="flex  w-full lg:w-1/3 flex-col items-center gap-2">
            <FaEyeDropper size={40} />
            <div className="text-[32px] font-bold">Strategic Insights</div>
            <div className="text-gray-400">
              Make smarter marketing decisions with actionable data.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-[50px] mt-[50px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-center text-[#781ecc] text-[32px] font-bold">
                Trending Keywords
              </div>
              <div className="mt-4 overflow-x-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Trends
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Search volume
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Started
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_x, index) => (
                      <tr className="bg-white border-b " key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {faker.commerce.productName()}
                        </th>
                        <td className="px-6 py-4">
                          {faker.number.int({ min: 0, max: 100 })}%
                        </td>
                        <td className="px-6 py-4">
                          {faker.number.int({ min: 1, max: 20 })} hours ago
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="text-center text-[#781ecc] text-[32px] font-bold">
                Trending Hashtags (#)
              </div>
              <div className="mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Trends
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Search volume
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Started
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_x, index) => (
                      <tr key={index} className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          #{faker.lorem.word()}
                        </th>
                        <td className="px-6 py-4">
                          {faker.number.int({ min: 0, max: 100 })}%
                        </td>
                        <td className="px-6 py-4">
                          {faker.number.int({ min: 1, max: 20 })} hours ago
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-[50px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-gray-300 text-[32px] font-bold text-center">
            Trending Industries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            <div className="max-w-sm rounded bg-gray-200 overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://cdn.prod.website-files.com/605370362d0fed204ff3c1b0/66043ef4e7a9dd698a5594ab_22ed23b6-734e-47b8-a3bc-8edbab19b684.png"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  Information Technology
                </div>
                <p className="text-gray-700 text-base">
                  With the advent of the digital age, the information sector has
                  risen to unprecedented heights. A once-nascent field has
                  blossomed into a towering giant, with technology becoming the
                  bedrock of modern civilization. The numbers speak for
                  themselves: by 2031, an additional 455,200 jobs are expected
                  to materialize in computer systems design and related
                  services, a testament to the sector’s colossal role in job
                  creation.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded bg-gray-200 overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://cdn.prod.website-files.com/605370362d0fed204ff3c1b0/66043ef41a2ee4eb2b63fa27_38a03f92-4033-498e-91e2-576e0ca0a782.png"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Health Care</div>
                <p className="text-gray-700 text-base">
                  Fueled by the dual forces of an aging population and the
                  persistent rise of chronic health conditions, the healthcare
                  industry is undergoing a significant transformation. It’s a
                  sector where the promise of growth is not just in numbers but
                  in the profound impact it has on society. With an anticipated
                  addition of over 2 million jobs between 2022 and 2032, the
                  healthcare and social assistance industry stands as a beacon
                  of employment opportunity. 
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded bg-gray-200 overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://cdn.prod.website-files.com/605370362d0fed204ff3c1b0/66043ef70e0658b5063d3842_faf80e13-14d5-4175-bae5-619c5cae66ae.png"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Green Economy</div>
                <p className="text-gray-700 text-base">
                  The green economy, no longer a niche interest, is flourishing
                  into a formidable force as it becomes increasingly associated
                  with sustainability. The year 2021 marked a 9% expansion in
                  renewable electricity capacity, with solar PV and wind power
                  leading the charge and accounting for a staggering 88% of new
                  capacity. It’s not just about having enough money to invest in
                  renewable technologies; it’s about recognizing the shift
                  towards a more sustainable future and the effort required to
                  be part of it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
