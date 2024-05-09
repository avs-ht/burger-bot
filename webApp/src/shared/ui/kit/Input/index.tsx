import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './index.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: UseFormRegisterReturn<any>;
	errorText?: string;
	clearError?: () => void;
	labelAsPlaceholder?: boolean;
}

const Input = ({
	clearError,
	labelAsPlaceholder = false,
	onChange,
	label,
	register,
	errorText,
	...props
}: Props) => {
	return (
		<div className={styles.inputWrapper}>
			{label && !labelAsPlaceholder && (
				<label className={styles.label} htmlFor={label}>
					{label}
				</label>
			)}
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} placeholder:text-menu text-sm`}
					id={label}
					{...register}
					{...props}
					placeholder={labelAsPlaceholder ? label : undefined}
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
