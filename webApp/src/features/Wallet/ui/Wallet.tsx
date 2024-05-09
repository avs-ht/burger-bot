import styles from './Wallet.module.scss';

export const Wallet = () => {
	return (
		<div className="flex items-center justify-center">
			<a className={styles.link} href="wallet:://wallet.com/">
				Перейти во Wallet
			</a>
		</div>
	);
};
