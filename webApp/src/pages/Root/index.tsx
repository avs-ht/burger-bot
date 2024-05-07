import { Outlet } from '@tanstack/react-router';

import styles from './index.module.scss';

export const RootPage = () => (
	<div className={styles.wrapper}>
		<Outlet />
	</div>
);
