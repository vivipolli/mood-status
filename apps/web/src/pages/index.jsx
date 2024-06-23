import { useState, useRef, useEffect, useCallback } from "react";
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
  const scrollToRef = useRef(null);

  function pushToRoute(newMood) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, mood: newMood },
    }, undefined, { shallow: true });
  }

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await moodService.fetchMoods();
        if (data.length === 0) {
          setShowModal(true);
          setCloseDisable(true);
        } else {
          setMoodList(data);
          pushToRoute(data[data.length - 1]?.type)         
        }
      } catch (error) {
        console.error('Failed to fetch moods:', error);
      }
    };

    fetchMoods();
  }, []);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView();
    }
  },[moodList])

  const updateMood = useCallback(async (newMood) => {
    const parsedMood = newMood.toUpperCase();
    try {
      const createdMood = await moodService.createMood({ type: parsedMood });
      setMoodList((currentMood) => {
        const updatedMoodList = [...currentMood, createdMood];
        // Check if the new mood list is actually different to prevent unnecessary updates
        if (JSON.stringify(currentMood) !== JSON.stringify(updatedMoodList)) {
          return updatedMoodList;
        }
        return currentMood;
      });
      // Update router only if the new mood is different
      if (router.query.mood !== newMood) pushToRoute(newMood)

      setShowModal(false);
      setCloseDisable(false);

      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView();
      }
    } catch (error) {
      console.error('Failed to create mood:', error);
    }
  }, [router]);

  return (
    <main className={clsx(inter.className, "main")}>
      <Modal
        showModal={showModal}
        updateMood={updateMood}
        closeModal={() => setShowModal(closeDisable)}
      />
      <Mood />
      <Sidebar moodList={moodList} setShowModal={setShowModal}>
        <div ref={scrollToRef} />
      </Sidebar>
    </main>
  );
}
