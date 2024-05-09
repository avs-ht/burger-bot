import { useTg } from '$/shared/lib/useTg';
import styles from './Wallet.module.scss';

export const Wallet = () => {
	const { tg } = useTg();
	const isIos =
		/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
		tg.platform.toLowerCase().includes('ios');
	return (
		<div className="flex items-center justify-center pt-5">
			<a
				className={styles.link}
				href={`${isIos ? 'shoebox://' : 'https://www.android.com/payapp'}`}
			>
				Перейти во Wallet
			</a>
		</div>
	);
};
