import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import styles from "./CarouselLayout.module.scss";
import Slider from 'react-slick';
import CarouselSlide, { ICarouselItem } from './CarouselSlide';

const ASPECT_RATIO: number = 9 / 16;

export interface ICarouselLayoutProps {
    items: any[];
    onSlideClick?: (currentIndex: number) => void;
    onBeforeChange?: (currentIndex: number) => void;
    onAfterChange?: (currentIndex: number) => void;
}

export interface ICarouselLayoutState {
    currentSlide: number;
    width: number;
    height: number;
}

const CarouselLayout: FC<ICarouselLayoutProps> = (props) => {
    let _wrapperDiv: HTMLDivElement;
    let _slider: Slider;
    const [state, setState] = useState<ICarouselLayoutState>({
        currentSlide: 0,
        width: 0,
        height: 0
    });

    var settings: any = {
        accessibility: false,
        adaptiveHeight: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: styles.centerPadding,
        dots: true,
        cssEase: "ease",
        draggable: false,
        easing: "linear",
        edgeFriction: 0.35,
        fade: false,
        infinite: props.items.length > 1,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        rows: 1,
        slide: "div",
        slidesPerRow: 1,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        respondTo: "slider",
        afterChange: (currentSlide: number) => {
            if (props.onAfterChange) {
                props.onAfterChange(currentSlide);
            }
            setState({
                ...state,
                currentSlide
            });
        },
        beforeChange: (currentSlide: number) => {
            if (props.onBeforeChange) {
                props.onBeforeChange(currentSlide);
            }
        }
    };

    useEffect(() => {
        setState({
            ...state,
            width: _wrapperDiv && _wrapperDiv.clientWidth,
            height: _wrapperDiv && Math.floor(_wrapperDiv.clientWidth * ASPECT_RATIO)
        });
    }, [props]);

    return (
        <div ref={(el) => { _wrapperDiv = el; }}>
            <div className={styles.carouselLayout}>
                <Slider ref={c => (_slider = c)} {...settings}>
                    {props.items.map((item: ICarouselItem) => {
                        return <CarouselSlide
                            displayLabel={false}
                            item={item}
                            width={state.width}
                            height={state.height}
                            onClick={() => { props.onSlideClick(item.id); }}
                        />;
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default CarouselLayout;