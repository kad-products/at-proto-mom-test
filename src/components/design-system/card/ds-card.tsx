'use client';
import classnames from 'classnames';
import styleClasses from './ds-card.module.css';

export default function DSCard({
	title,
	body,
	children,
	band,
	className,
	style,
}: {
	title: string;
	body?: string | React.ReactNode;
	children?: React.ReactNode;
	band?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}): React.ReactNode {
	const bodyContent = body ?? children;
	return (
		<div className={classnames(styleClasses.dsCard, 'ds-card', className)} style={style}>
			<div className={classnames(styleClasses.dsCardTitle, 'ds-card-title')}>{title}</div>
			{(bodyContent || band) && (
				<div className={classnames(styleClasses.dsCardBody, 'ds-card-body')}>
					{bodyContent}
					{band && <div className={classnames(styleClasses.dsCardBand, 'ds-card-band')}>{band}</div>}
				</div>
			)}
		</div>
	);
}
