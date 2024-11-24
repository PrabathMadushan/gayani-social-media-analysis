import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from "recharts";
import {
  AgeDistribution,
  getAgeDistribution,
  getHashtags,
  getInstructions,
  getSentimentDistribution,
  getUsefulResources,
  SentimentDistribution,
} from "./firebase";
import { useState } from "react";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface CustomizedLabelProps {
  cx: number; // Center x-coordinate of the pie chart
  cy: number; // Center y-coordinate of the pie chart
  midAngle: number; // Angle of the middle of the slice
  innerRadius: number; // Inner radius of the slice
  outerRadius: number; // Outer radius of the slice
  percent: number; // Percentage of the slice
  name: number; // Index of the slice
}

const RADIAN = Math.PI / 180; // Conversion factor for degrees to radians

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps): React.ReactNode => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Home = () => {
  const [topic, setTopic] = useState("");
  const [sentimentD, setSentimentD] = useState<SentimentDistribution>({
    negative: 0,
    neutral: 0,
    positive: 0,
  });
  const [age, setAge] = useState<AgeDistribution>({
    r10to20: 0,
    r20to30: 0,
    r30to50: 0,
    r50to80: 0,
  });
  const [loading,setLoading] = useState(false)

  const [hashTags, setHashtags] = useState<string[]>([]);
  const [useful, setUseful] = useState("");
  const [instructions, setInstructions] = useState("");

  const getData = () => {
    if (topic.trim() !== "") {
      setLoading(true)
      Promise.all([
        getSentimentDistribution(topic).then((e) => {
          setSentimentD(e);
        }),
        getAgeDistribution(topic).then((e) => {
          setAge(e);
        }),
        getHashtags(topic).then((e) => {
          setHashtags(e);
          console.log("eeeee", e);
        }),
        getUsefulResources(topic).then((e) => {
          setUseful(e);
        }),
        getInstructions(topic).then((e) => {
          setInstructions(e);
        }),
      ])
        .then(() => {})
        .finally(()=>{
          setLoading(false);
        })
        .catch(() => {
          alert("Error. Please try again!");
        });
    } else {
      alert("Please enter a topic");
    }
  };

  return (
    <div className="text-white">
      {loading && <div className="fixed flex items-center justify-center w-full h-full bg-black opacity-90 z-50">
        loading....
      </div>}
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="max-w-[1200px] w-full">
          <div className="flex mt-6 gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`rounded-lg flex-1 border-gray-300 text-gray-800 border outline-none $ py-3 px-3 w-full`}
            />
            <button
              onClick={() => {
                getData();
              }}
              className="bg-blue-500 w-[150px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Generate
            </button>
          </div>
          <div className="mt-4 grid gap-6 grid-cols-1 lg:grid-cols-2  justify-items-center bg-slate-100 rounded-lg p-4">
            <div className="w-full p-10 bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
              <div>Sentiment Distribution of Topics</div>
              <PieChart width={400} height={400}>
                <Pie
                  data={[
                    { name: "Positive", value: sentimentD.positive },
                    { name: "Negative", value: sentimentD.negative },
                    { name: "Neutral", value: sentimentD.neutral },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(x) => renderCustomizedLabel(x)}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="w-full p-10 bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
              <div>Engagement Distribution Across Age Groups</div>
              <PieChart width={400} height={400}>
                <Pie
                  data={[
                    { name: "10 to 20", value: age.r10to20 },
                    { name: "20 to 30", value: age.r20to30 },
                    { name: "30 to 50", value: age.r30to50 },
                    { name: "50 to 80", value: age.r50to80 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(x) => renderCustomizedLabel(x)}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="w-full p-6 bg-slate-200 flex flex-col text-gray-800 rounded-lg items-start justify-start">
              <div className="text-[22px] font-bold">
                Generated Hashtags for the topic
              </div>
              <div className="flex flex-wrap mt-6 gap-2">
                {hashTags?.map((e, index) => (
                  <div
                    key={index}
                    className="text-[16px] py-1 px-2 font-semibold rounded-lg  bg-gray-300"
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full bg-slate-200 p-4 flex flex-col text-gray-800 rounded-lg items-center justify-start">
              <div className="font-bold text-[20px]">
                Useful resources for case study
              </div>
              <div
                className="text-[12px] mt-4"
                dangerouslySetInnerHTML={{ __html: useful }}
              ></div>
            </div>
            <div className="w-full p-6 lg:col-span-2 bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
              <div
                className="text-[12px] mt-4"
                dangerouslySetInnerHTML={{
                  __html: instructions
                    .replace("```html", "")
                    .replace("```", ""),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
