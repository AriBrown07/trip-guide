import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/orda-1.jpg';
import pic2 from '../../../pics/orda-2.jpg';
import pic3 from '../../../pics/orda-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents';

const Horde = () => {
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
                            Наполеон Орда
                        </Typography>
                        <Typography variant="subtitle1" className={styles.figureDates}>
                            1807–1883
                        </Typography>
                        <div className={styles.scrollableContent}>
                            <Typography variant="body1" className={styles.paragraph}>
                                Выдающийся художник, композитор, музыкант и педагог, чье творчество является неотъемлемой частью культурного наследия Беларуси, Польши и Литвы. Родился в деревне Вороцевичи (сейчас Ивановский район Брестской области) в шляхетской семье. Активный участник Ноябрьского восстания 1830–1831 годов против Российской империи, после поражения которого был вынужден эмигрировать. Жил во Франции, где сблизился с Адамом Мицкевичем, Фредериком Шопеном и другими видными представителями эмиграции.
                            </Typography>

                            <Typography variant="body1" className={styles.paragraph}>
                                Мировую известность Наполеону Орде принесли его альбомы с зарисовками, созданные во время путешествий по землям бывшей Речи Посполитой в 1872–1883 годах. Он оставил после себя более 1000 акварелей и рисунков, которые являются бесценным историческим источником. На них запечатлены архитектурные памятники, городские и сельские пейзажи, замки, дворцы и костелы Беларуси, Литвы, Украины, Польши и других стран. Его работы, отличающиеся документальной точностью и художественным мастерством, сохранили для потомков облик многих утраченных ныне памятников истории и культуры.
                            </Typography>
                            <Typography variant="body1" className={styles.paragraph}>
                                Как композитор Орда создал более 20 полек, мазурок, вальсов и других музыкальных произведений. Умер и похоронен в Варшаве, но главное его наследие — визуальная летопись белорусских земель — остается живым свидетельством богатейшего культурно-исторического наследия региона. Его работы сегодня активно используются историками, реставраторами и краеведами для воссоздания утраченного архитектурного наследия.
                            </Typography>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { Horde };