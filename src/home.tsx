import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AgeDistribution,
  getAgeDistribution,
  getHashtags,
  getSentimentDistribution,
  getTrendingHashtags,
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

const dataLineChart = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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

  const [hashTags, setHashtags] = useState<string[]>([]);
  const [useful, setUseful] = useState("");

  const getData = () => {
    if (topic.trim() !== "") {
      getSentimentDistribution(topic).then((e) => {
        setSentimentD(e);
      });

      getAgeDistribution(topic).then((e) => {
        setAge(e);
      });
      getHashtags(topic).then((e) => {
        setHashtags(e);
        console.log("eeeee", e);
      });
      getUsefulResources(topic).then((e) => {
        setUseful(e);
      });
    } else {
      alert("Please enter a topic");
    }
  };

  return (
    <div className="text-white">
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
          <div className="mt-4 grid gap-6 grid-cols-2 justify-items-center bg-slate-100 rounded-lg p-4">
            <div className="w-full h-[500px] bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
              <h1>Sentiment Distribution of Topics</h1>
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
                  {data.map((entry, index) => (
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
            <div className="w-full h-[500px] bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
              <h1>Engagement Distribution Across Age Groups</h1>
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
                  {data.map((entry, index) => (
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
            <div className="w-full h-[500px] p-6 bg-slate-200 flex flex-col text-gray-800 rounded-lg items-start justify-start">
              <h1 className="text-[22px] font-bold">
                Generated Hashtags for the topic
              </h1>
              <div className="flex flex-wrap mt-6 gap-2">
                {hashTags?.map((e, index) => (
                  <h1
                    key={index}
                    className="text-[16px] py-1 px-2 font-semibold rounded-lg  bg-gray-300"
                  >
                    {e}
                  </h1>
                ))}
              </div>
            </div>
            <div className="w-full bg-slate-200 p-4 flex flex-col text-gray-800 rounded-lg items-center justify-start">
              <h1 className="font-bold text-[20px]">Useful resources for case study</h1>
              <div className="text-[12px] mt-4" dangerouslySetInnerHTML={{ __html: useful }}></div>
            </div>
            <div className="w-full col-span-2 h-[500px] bg-slate-200 flex flex-col text-gray-800 rounded-lg items-center justify-center">
             
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          getTrendingHashtags()
            .then((data) => {
              console.log(data);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        click
      </button>
    </div>
  );
};

export default Home;
