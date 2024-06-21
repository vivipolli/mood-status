import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { Inter } from "next/font/google";
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";
import clsx from "clsx";
import Mood from "../../components/mood/mood";
import moodService from "@/services/mood.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [moodList, setMoodList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const scollToRef = useRef(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await moodService.fetchMoods();
        setMoodList(data);
      } catch (error) {
        console.error('Failed to fetch moods:', error);
      }
    };

    fetchMoods();
  }, []);

  const updateMood = async (newMood) => {
    try {
      const createdMood = await moodService.createMood({ type: newMood });
      setMoodList((currentMood) => [...currentMood, createdMood]);
      router.query.mood = newMood;
      router.push(router);
      setShowModal(false);
      scollToRef.current.scrollIntoView();
    } catch (error) {
      console.error('Failed to create mood:', error);
    }
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
