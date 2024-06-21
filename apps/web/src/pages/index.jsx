import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Inter } from "next/font/google";
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";
import clsx from "clsx";
import Mood from "../../components/mood/mood";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [moodList, setMoodList] = useState([
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:13.806Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:15.602Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:17.097Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:18.673Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:20.001Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:21.721Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:23.848Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:25.134Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:26.492Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:27.618Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:28.652Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:29.832Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:31.175Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:32.475Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:33.673Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:37.347Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:38.868Z",
    },
    {
      mood: "sad",
      date: "2023-11-01T21:10:40.804Z",
    },
    {
      mood: "excited",
      date: "2023-11-01T21:10:42.535Z",
    },
    {
      mood: "pleasant",
      date: "2023-11-01T21:10:44.098Z",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const scollToRef = useRef(null);

  const updateMood = (newMood) => {
    const date = new Date();
    setMoodList((currentMood) => [...currentMood, { mood: newMood, date }]);
    router.query.mood = newMood;
    router.push(router);
    setShowModal(false);
    scollToRef.current.scrollIntoView();
  };

  return (
    <main className={clsx(inter.className, "main")}>
      <Modal
        showModal={showModal}
        updateMood={updateMood}
        closeModal={() => setShowModal(false)}
      />
      <Mood />
      <Sidebar moodList={moodList} setShowModal={setShowModal}>
        <div ref={scollToRef} />
      </Sidebar>
    </main>
  );
}
