import { useRouter } from "next/router";
import styles from "./sidebar.module.css";
import MoodPreview from "./mood-preview";
import { Spin } from 'antd';


export default function Sidebar({ moodList = [], setShowModal, children }) {
	const router = useRouter();

	const updateSelectedMood = (newMood) => {
		router.query.mood = newMood;
		router.push(router);
	};

	return (
		<div className={styles.sidebar} suppressHydrationWarning>
			<div className={styles["sidebar__list"]}>
				{moodList.length !== 0 ? (
					<div className={styles.scrollable}>
						{moodList.map(({ type, createdAt }, index) => (
							<MoodPreview
								key={`mood-preview-${createdAt}-${type}-${index}`}
								mood={type}
								date={createdAt}
								updateSelectedMood={updateSelectedMood}
							/>
						))}
						{children}
					</div>
				) : (
					<div className={styles.spinner}>
						<Spin  />
					</div>
				)}
			</div>
			<div className={styles.sidebar}>
				<button
					className={styles["sidebar__add_button"]}
					onClick={() => setShowModal((current) => !current)}>
					Log Mood
				</button>
			</div>
		</div>
	);
}
