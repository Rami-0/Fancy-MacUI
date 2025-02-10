'use client';
import React, {useState, useEffect} from 'react';
import css from './Card.module.css';
import VideoModel from '../VideoModel/VideoModel';
import Image, {StaticImageData} from "next/image";

interface CardProps {
    img: string | (string | StaticImageData)[];
    title: string;
    description: string;
    link?: string;
    video?: string;
}

const Card: React.FC<CardProps> = ({img, title, description, link, video}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<string | StaticImageData>();

    useEffect(() => {
        if (Array.isArray(img)) {
            let i = img.length - 1;
            let j = 0;
            const intervalId = setInterval(() => {
                setCurrentImageIndex(img[j]);
                if (j < i) {
                    j++;
                } else {
                    j = 0;
                }
            }, 3000);

            return () => clearInterval(intervalId); // Cleanup on component unmount
        } else {
            setCurrentImageIndex(img);
        }
    }, [img]);

    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (video) {
            VideoModel({video: video});
        } else if (link) {
            window.open(link.toString()); // Open the link if there's no video
        }
    };

    return (
        <div className={css.wrapper} onClick={onClick}>
            <div className={css.imgWrapper}>
                {currentImageIndex && <Image src={currentImageIndex} alt='post' />}
            </div>
            <div className={css.textWrapper}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Card;