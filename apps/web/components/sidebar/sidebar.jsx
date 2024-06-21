import { useRouter } from "next/router";
import styles from "./sidebar.module.css";
import MoodPreview from "./mood-preview";

export default function Sidebar({ moodList = [], setShowModal, children }) {
  const router = useRouter();

  const updateSelectedMood = (newMood) => {
    router.query.mood = newMood;
    router.push(router);
  };

  return (
    <div className={styles.sidebar} suppressHydrationWarning>
      <div className={styles["sidebar__list"]}>
        <div className={styles.scrollable}>
          {moodList.map(({ type, createdAt }, index) => (
            <MoodPreview
              key={`mood-preview-${createdAt}-${type.toLowerCase()}-${index}`}
              mood={type.toLowerCase()}
              date={createdAt}
              updateSelectedMood={updateSelectedMood}
            />
          ))}
          {children}
        </div>
      </div>
      <div className={styles["sidebar__footer"]}>
        <button
          className={styles["sidebar__add_button"]}
          onClick={() => setShowModal((current) => !current)}
        >
          Log Mood
        </button>
      </div>
    </div>
  );
}
