import { getTrendingHashtags, getTrendingTopics } from "./firebase";

const Home = () => {
  return (
    <div className="text-white">
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
