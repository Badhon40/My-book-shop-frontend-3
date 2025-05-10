import DealsBanner from "./bestDeals/DealsBanner";
import Banner from "./Banner/Banner";
import NewArrival from "./New Arrival/NewArrival";

import ChooseUs from "./ChooseUs/ChooseUs";
import Reviews from "./Reviews/Reviews";
import Category from "./Category/Category";
import NewLaunchBook from "./NewLaunch/NewLaunch";

const Home = () => {
  return (
    <div className="bg-gray-100 ">
      <Banner></Banner>
      <NewLaunchBook></NewLaunchBook>
      <Category></Category>
      <NewArrival></NewArrival>
      <ChooseUs></ChooseUs>
      <DealsBanner></DealsBanner>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
