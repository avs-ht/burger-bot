import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './index.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: UseFormRegisterReturn<any>;
	errorText?: string;
	clearError?: () => void;
}

const Input = ({
	clearError,
	onChange,
	label,
	register,
	errorText,
	...props
}: Props) => {
	return (
		<div className={styles.inputWrapper}>
			{label && (
				<label className={styles.label} htmlFor={label}>
					{label}
				</label>
			)}
			<div className={styles.inputContainer}>
				<input
					className={styles.input}
					id={label}
					{...register}
					{...props}
					onChange={e => {
						clearError?.();
						onChange?.(e);
					}}
				/>
				{errorText && clearError && (
					<span className={styles.error}>{errorText}</span>
				)}
			</div>
		</div>
	);
};

export default Input;
