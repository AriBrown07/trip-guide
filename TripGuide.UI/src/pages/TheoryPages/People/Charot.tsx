import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/charot-1.jpg';
import pic2 from '../../../pics/charot-2.jpg';
import pic3 from '../../../pics/charot-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents';

const Charot = () => {
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
                            Михась Чарот
                        </Typography>
                        

                        <Typography variant="subtitle1" className={styles.figureDates}>
                            7 ноября 1896 — 29 октября 1937
                        </Typography>

                        <div className={styles.scrollableContent}>
                            <Typography variant="body1" className={styles.paragraph}>
                                Михась Чарот (настоящее имя — Михаил Семёнович Куделькин; белор. Міхась Чарот) — классик белорусской литературы XX века, один из ключевых поэтов и прозаиков периода Белорусского Возрождения (1920-е годы). Родился в крестьянской семье в местечке Руденск (сейчас Пуховичский район Минской области). Участвовал в Первой мировой и Гражданской войнах. Его литературный дебют пришёлся на начало 1920-х годов. Чарот был одним из основателей и активнейших участников литературного объединения «Маладняк», которое сыграло огромную роль в консолидации молодых белорусских писателей и развитии национальной культуры. Его ранняя поэзия была полена романтикой революционных преобразований и верой в светлое будущее.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                Самым известным и значительным произведением Михася Чарота стала поэма «Босые на пожаре» (1921), которая стала одним из символов эпохи. Это яркое, эмоциональное произведение о Гражданской войне и судьбе белорусского народа. Другим его magnum opus является роман в стихах «Середина» (1924), посвящённый жизни белорусской деревни. Чарот также проявил себя как талантливый драматург, написав пьесу «На Купалье» (1921). Кроме того, он является автором слов государственного гимна БССР («Мы, беларусы...»), который был официальным гимном республики с 1955 по 1991 годы и чья музыкальная основа используется в современном гимне Республики Беларусь.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                Как и многие деятели белорусского возрождения 1920-1930-х годов, Михась Чарот стал жертвой сталинских репрессий. В 1937 году он был арестован по ложному обвинению в национал-демократизме и шпионаже. 29 октября 1937 года поэт был приговорён к высшей мере наказания и расстрелян в тот же день в Минске. Его наследие было надолго забыто и вычеркнуто из официальной литературы. Реабилитирован Чарот был лишь в 1957 году. Сегодня его имя восстановлено в истории белорусской литературы. Его творчество, особенно поэма «Босые на пожаре», считается классическим и изучается в школах и вузах как яркий образец литературы белорусского романтизма и символ трагической судьбы целого поколения национальной интеллигенции.
                            </Typography>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { Charot };