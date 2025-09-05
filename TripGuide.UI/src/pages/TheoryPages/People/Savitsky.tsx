import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/savitsky-1.jpg';
import pic2 from '../../../pics/savitsy-2.jpg';
import pic3 from '../../../pics/savitsky-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents';

const Savitsky = () => {
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
                            Михаил Савицкий
                        </Typography>
                        <Typography variant="subtitle1" className={styles.figureDates}>
                            1922–2010
                        </Typography>
                        <div className={styles.scrollableContent}>
                            <Typography variant="body1" className={styles.paragraph}>
                                Выдающийся белорусский и советский живописец, график, педагог и общественный деятель, Герой Беларуси (2006), народный художник СССР и БССР. Родился в деревне Звенячи (Толочинский район, Витебская область). Его жизнь и творчество были неразрывно связаны с трагическими и героическими страницами истории XX века: он прошел через ужасы фашистских концлагерей (Бухенвальд, Дора-Миттельбау, Дахау), что стало центральной темой его самого мощного творческого цикла — «Цифры на сердце».
                            </Typography>

                            <Typography variant="body1" className={styles.paragraph}>
                                Савицкий является одним из основоположников сурового стиля в белорусской живописи. Его монументальные, драматические полотна, такие как «Партизанская мадонна», «Вильнюсская башня», «Легенда о красном командире», серия «Цифры на сердце», стали классикой национального искусства. В своих работах он обращался к темам войны, подвига, исторической памяти белорусского народа, создавая эпические и глубоко психологические образы. В более поздний период творчества он также обратился к религиозной тематике, написав цикл картин о судьбе человеческой души.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                М.А. Савицкий долгие годы преподавал, воспитав несколько поколений белорусских художников. Он был лауреатом Государственных премий СССР и Беларуси. Его произведения хранятся в Национальном художественном музее Беларуси, Третьяковской галерее и других крупных собраниях. Умер художник в Минске в 2010 году. Имя Михаила Савицкого носит одна из улиц столицы, а его творческое наследие продолжает оказывать огромное влияние на современную белорусскую культуру, оставаясь примером гражданской и художественной совести.
                            </Typography>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { Savitsky };