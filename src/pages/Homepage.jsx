import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Side from "../components/Side";
// import { useState } from "react";
// import Side from "../components/Side";
// import { FaBar } from "react-icons/fa";

export default function Homepage() {

  // const [loading, setLoading] = useState(false);

  // const changeToggle = () => {    
  //   setLoading(!loading);
  // };

  return (
    <main className={styles.homepage}>
      {/* <Side /> */}
      <PageNav />
      <div className="flex justify-center items-center h-[90%]">
        <section>
          <h1 className="max-[1024px]:text-5xl text-7xl">
            You travel the world.
            <br />
            WorldWise keeps track of your adventures.
          </h1>
          <h2 className="max-[1024px]:text-2xl text-2xl">
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </h2>
          <Link to="/app/cities" className="cta">
            Start tracking now
          </Link>
        </section>
        <Side  />
      </div>
    </main>
  );
}
