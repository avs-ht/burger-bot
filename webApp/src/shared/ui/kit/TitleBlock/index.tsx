import React from 'react';

interface Props {
	title: string;
	children: React.ReactNode;
}
export const TitleBlock = ({ title, children }: Props) => {
	return (
		<div className="">
			<h2 className="text-menu mb-1 text-xs font-bold">{title}</h2>
			{children}
		</div>
	);
};
