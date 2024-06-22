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
  const [closeDisable, setCloseDisable] =useState(false);
  const router = useRouter();
  const scollToRef = useRef(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await moodService.fetchMoods();
        if (data.length === 0) {
          setShowModal(true);
          setCloseDisable(true);
        } else {
          setMoodList(data);
          router.query.mood = data[data.length - 1]?.type;
          router.push(router);
          
        }
      } catch (error) {
        console.error('Failed to fetch moods:', error);
      }
    };

    fetchMoods();
  }, []);

  useEffect(() => {
    if (scollToRef.current) {
      scollToRef.current.scrollIntoView();
    }
  })

  const updateMood = async (newMood) => {
    const parsedMood = newMood.toUpperCase();
    try {
      const createdMood = await moodService.createMood({ type: parsedMood });
      setMoodList((currentMood) => [...currentMood, createdMood]);
      router.query.mood = newMood;
      router.push(router);
      setShowModal(false);
      setCloseDisable(false);
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
        closeModal={() => setShowModal(closeDisable)}
      />
      <Mood />
      <Sidebar moodList={moodList} setShowModal={setShowModal}>
        <div ref={scollToRef} />
      </Sidebar>
    </main>
  );
}
