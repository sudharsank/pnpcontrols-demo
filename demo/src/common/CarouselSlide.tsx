import * as React from 'react';
import styles from './CarouselSlide.module.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

export interface ICarouselItem {
    id: number;
	imageSrc: string;
	title: string;
	location: string;
}

export interface ICarouselSlideProps {
	item: ICarouselItem;
	height: number;
	width: number;
	onClick?: () => void;
	displayLabel: boolean;
}

const PromotionSlide: React.FC<ICarouselSlideProps> = (props) => {

	return (
		<div className={styles.carouselSlideWrapper}>
			<span role="button" onClick={(_event) => { props.onClick(); }}>
				<div className={styles.carouselSlide} role="link" data-is-draggable="false" data-is-focusable="true" data-selection-invoke="true"
					style={{ width: '100%', minHeight: `${props.height}px` }}
				>
					<div className={styles.carouselSlideContent}>
						<div className={styles.carouselSlideFileContainer}>
							<div className={styles.carouselSlideThumbnail}>
								<Image src={props.item.imageSrc} height={props.height} imageFit={ImageFit.centerCover} />
							</div>
							{props.displayLabel &&
								<div className={styles.carouselSlideNamePlate}>
									<div className={styles.carouselSlideName}>
										{props.item.title}
									</div>
									<div className={styles.carouselSlideSubText}>
										{props.item.location}
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</span>
		</div>
	);
};

export default PromotionSlide;