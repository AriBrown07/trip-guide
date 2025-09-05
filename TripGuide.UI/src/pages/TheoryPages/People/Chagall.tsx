import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/hagal-4.jpg';
import pic2 from '../../../pics/hagal-2.jpg';
import pic3 from '../../../pics/hagal-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents';

const Chagall = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const images = [
        { id: 1, src: pic1, alt: '' },
        { id: 2, src: pic2, alt: '' },
        { id: 3, src: pic3, alt: '' },
    ];

    const handlePrev = () => {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    const scrollTimeline = (direction: 'left' | 'right') => {
        if (timelineRef.current) {
            timelineRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.container}>
            {/* Шапка */}
            <header className={styles.header}>
                <Link to="/home">
                    <IconButton className={styles.homeButton} aria-label="На главную">
                        <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
                    </IconButton>
                </Link>
                <Typography variant="h1" className={styles.headerTitle}>
                    Исторические личности Беларуси
                </Typography>
            </header>

            {/* Основное содержимое */}
            <main className={styles.mainContent}>
                {/* Горизонтальная лента времени */}
                <div className={styles.timelineContainer}>
                    <IconButton
                        className={styles.timelineArrow}
                        onClick={() => scrollTimeline('left')}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <div className={styles.timelineWrapper} ref={timelineRef}>
                        <div className={styles.timeline}>
                            {timelineEvents.map((event, index) => (
                                <Tooltip
                                    key={index}
                                    title={
                                        <Box sx={{ p: 1 }}>
                                            {event.events.map((item, itemIndex) => (
                                                <Box
                                                    key={itemIndex}
                                                    sx={{
                                                        mb: 1,
                                                        cursor: item.link ? "pointer" : "default",
                                                        "&:hover": {
                                                            backgroundColor: item.link ? "rgba(0, 0, 0, 0.05)" : "transparent"
                                                        },
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Чтобы не срабатывал клик по маркеру
                                                        if (item.link) navigate(item.link);
                                                    }}
                                                >
                                                    <Typography variant="body2" sx={{ fontFamily: "Huninn", fontWeight: "bold", color: "#5c3a21" }}>
                                                        {item.title}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    }
                                    placement="bottom"
                                    arrow
                                >
                                    <div className={styles.timelineMarker}>
                                        {event.letter}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>

                    <IconButton
                        className={styles.timelineArrow}
                        onClick={() => scrollTimeline('right')}
                    >
                        <ChevronRight />
                    </IconButton>
                </div>

                <div className={styles.contentWrapper}>
                    {/* Галерея */}
                    <div className={styles.galleryWrapper}>
                        <IconButton onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}>
                            <ChevronLeft />
                        </IconButton>
                        <div className={styles.imageContainer} onClick={openModal}>
                            <img
                                src={images[currentImageIndex].src}
                                alt={images[currentImageIndex].alt}
                                className={styles.figureImage}
                            />
                        </div>
                        <IconButton onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}>
                            <ChevronRight />
                        </IconButton>
                    </div>

                    {/* Модальное окно для полноэкранного просмотра */}
                    <Dialog
                        open={isModalOpen}
                        onClose={closeModal}
                        maxWidth="lg"
                        sx={{
                            '& .MuiDialog-paper': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                maxWidth: '100vw',
                                overflow: 'visible',
                            },
                            '& .MuiDialogContent-root': {
                                padding: 0,
                                backgroundColor: 'transparent',
                            }
                        }}
                        BackdropProps={{
                            sx: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(4px)',
                            }
                        }}
                    >
                        <DialogContent className={styles.modalContent}>

                            <Box className={styles.modalGallery}>
                                <IconButton
                                    className={styles.modalArrow}
                                    onClick={handlePrev}
                                    aria-label="Предыдущее фото"
                                >
                                    <ChevronLeft />
                                </IconButton>
                                <div className={styles.modalImage}>
                                    <img
                                        src={images[currentImageIndex].src}
                                        alt={images[currentImageIndex].alt}
                                        className={styles.modalImage}
                                    /></div>

                                <IconButton
                                    className={styles.modalArrow}
                                    onClick={handleNext}
                                    aria-label="Следующее фото"
                                >
                                    <ChevronRight />
                                </IconButton>
                            </Box>
                        </DialogContent>
                    </Dialog>

                    <div className={styles.textBlock}>
                        <Typography variant="h2" className={styles.figureName}>
                            Марк Шагал
                        </Typography>
                        

                        <Typography variant="subtitle1" className={styles.figureDates}>
                            6 июля 1887 — 28 марта 1985
                        </Typography>

                        <div className={styles.scrollableContent}>
                            <Typography variant="body1" className={styles.paragraph}>
                                Марк Шагал (белор. Марк Шагал; идиш מאַרק שאַגאַל; фр. Marc Chagall) — один из самых знаменитых художников XX века, чьё творчество является неотъемлемой частью мирового культурного наследия. Родился в Витебске (тогда в составе Российской империи, сейчас Беларусь) в еврейской семье. Витебск, его родной город, стал для Шагала главным источником вдохновения на всю жизнь. Образы провинциального быта, еврейских местечек, витебских улочек и домов, а также воспоминания детства проходят красной нитью через все его творчество, от ранних работ до поздних полотен. Даже прожив большую часть жизни во Франции, Шагал мысленно постоянно возвращался в свой «витебский универсум», который он поэтически преобразил в своем искусстве.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                Шагал является уникальным мастером, которого невозможно однозначно отнести к какому-либо одному художественному направлению. Он впитал влияния фовизма, кубизма, но создал свой собственный, instantly узнаваемый стиль. Его картины — это поэтический, фантасмагорический мир, где стираются границы между реальностью и вымыслом. Герои его полотен летают, бытовые сцены соседствуют с библейскими сюжетами, а яркие, насыщенные цвета создают ощущение праздника и чуда. Среди его самых известных работ — «Над городом», «Я и деревня», «Прогулка», а также монументальные проекты — росписи плафона Гранд-опера в Париже и метрополии-опера в Нью-Йорке, витражи для соборов и синагог по всему миру.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                Марк Шагал прожил долгую жизнь, став свидетелем ключевых событий века и добившись международного признания. Несмотря на то, что большую часть жизни он провел за пределами Беларуси (во Франции, США), его глубочайшая связь с родиной никогда не прерывалась. Сегодня Шагал является одним из главных культурных брендов Витебска и Беларуси в мире. В его родном городе работает Арт-центр Марка Шагала, где хранится крупная коллекция его графических работ и проводятся международные выставки. Его творчество, в котором переплелись еврейская, русская и белорусская культурные традиции, служит мостом между культурами и продолжает восхищать зрителей своей искренностью, поэзией и вневременной мудростью.
                            </Typography>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { Chagall };