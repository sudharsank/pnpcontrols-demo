import * as React from 'react';
import { useEffect, useState, FC } from 'react';
import styles from './CarouselDemo.module.scss';
import { ICarouselDemoProps } from './ICarouselDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape, ICarouselImageProps } from "@pnp/spfx-controls-react/lib/Carousel";
import { ImageFit } from 'office-ui-fabric-react/lib/components/Image';
import CarouselLayout from '../../../common/CarouselLayout';
import { SPComponentLoader } from '@microsoft/sp-loader';

const CarouselDemo: FC<ICarouselDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [items, setItems] = useState<ICarouselImageProps[]>([]);

    const _demo = async () => {
        let tempitems: ICarouselImageProps[] = [];
        tempitems.push({
            imageSrc: 'https://m365devpractice.sharepoint.com/Shared%20Documents/GradyA@o365practice.onmicrosoft.com.jpg',
            title: 'Colosseum',
            description: 'This is Colosseum',
            url: 'https://en.wikipedia.org/wiki/Colosseum',
            showDetailsOnHover: true,
            imageFit: ImageFit.cover
        },
            {
                imageSrc: 'https://m365devpractice.sharepoint.com/Shared%20Documents/HenriettaM@o365practice.onmicrosoft.com.jpg',
                title: 'Colosseum',
                description: 'This is Colosseum',
                url: 'https://en.wikipedia.org/wiki/Colosseum',
                showDetailsOnHover: true,
                imageFit: ImageFit.cover
            });
        setItems(tempitems);
    };

    useEffect(() => {
        _demo();
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css');
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css');
    }, [props]);

    return (
        <section className={`${styles.carouselDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            {/* <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
                <h2>Well done, {escape(userDisplayName)}!</h2>
                <div>{environmentMessage}</div>
            </div> */}
            {items && items.length > 0 &&
                <div>
                    <CarouselLayout
                        items={items}
                        onSlideClick={(itemid) => { console.log(itemid); }}
                    ></CarouselLayout>
                    {/* <Carousel
                        buttonsLocation={CarouselButtonsLocation.center}
                        buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
                        //contentContainerStyles={styles.carouselImageContent}
                        isInfinite={true}
                        indicatorShape={CarouselIndicatorShape.circle}
                        pauseOnHover={true}
                        element={[
                            {
                                imageSrc: 'https://m365devpractice.sharepoint.com/Shared%20Documents/GradyA@o365practice.onmicrosoft.com.jpg',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover
                            },
                            {
                                imageSrc: 'https://m365devpractice.sharepoint.com/Shared%20Documents/HenriettaM@o365practice.onmicrosoft.com.jpg',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover
                            },
                            {
                                imageSrc: 'https://m365devpractice.sharepoint.com/Shared%20Documents/LynneR@o365practice.onmicrosoft.com.jpg',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover
                            }
                        ]}
                        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
                        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
                    /> */}
                </div>
            }
        </section>
    );
};

export default CarouselDemo;
