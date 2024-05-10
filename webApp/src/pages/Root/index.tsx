import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from '@tanstack/react-router';

import styles from './index.module.scss';

const client = new QueryClient();

export const RootPage = () => (
	<div className={styles.wrapper}>
		<QueryClientProvider client={client}>
			<Outlet />
		</QueryClientProvider>
	</div>
);
