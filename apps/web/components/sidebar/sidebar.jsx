import { useRouter } from "next/router";

import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { Spin } from "antd";

import styles from "./sidebar.module.css";
import MoodPreview from "./mood-preview";
import useScrollableHeight from "@/hooks/useScrollableHeight";


export default function Sidebar({ moodList = [], setShowModal, children }) {
	const router = useRouter();
	const { scrollRef, springNegativeScrollY } = useScrollableHeight();

	const updateSelectedMood = (newMood) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, mood: newMood },
			},
			undefined,
			{ shallow: true }
		);
	};

	return (
		<div className={styles.sidebar} suppressHydrationWarning>
			<div className={styles["sidebar__list"]}>
				{moodList.length !== 0 ? (
					<div className={styles.scrollable}>
						<motion.div style={{ y: springNegativeScrollY }} animate={{ y: 50 }} ref={scrollRef}>
							{moodList.map(({ type, createdAt }, index) => (
								<MoodPreview
									key={`mood-preview-${createdAt}-${type}-${index}`}
									mood={type}
									date={createdAt}
									updateSelectedMood={updateSelectedMood}
								/>
							))}
							{children}
						</motion.div>
					</div>
				) : (
					<div className={styles.spinner}>
						<Spin />
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

Sidebar.propTypes = {
  moodList: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  setShowModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
