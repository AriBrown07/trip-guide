import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/budny-1.png';
import pic2 from '../../../pics/budny-2.jpeg';
import pic3 from '../../../pics/budny-3.jpg';

const BudnyPage = () => {
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

  const timelineEvents = [
    {
      letter: 'А',
        events: [
        {
            title: "Жорес Алфёров",
            link: "/none",
        },
        {
            title: "Светлана Алексиевич",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Б',
        events: [
        {
            title: "Симон Будный",
            link: "/budny",
        },
        {
            title: "Максим Богданович",
            link: "/bogdanovich",
        },
        ],
    },
    {
        letter: "В",
        events: [
        {
            title: "Валентий Ванькович",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Г',
        events: [
        {
            title: "Микола Гусовский",
            link: "/gusovsky",
        },
        ],
    },
    {
      letter: 'Д',
        events: [
        {
            title: "Игнат Домейко",
            link: "/none",
        },
        {
            title: "Винцент Дунин-Марцинкевич",
            link: "/none",
        },
        ],
    },
    // {
    //   letter: 'Е',
    //     events: [
    //     {
    //         title: "Кревская уния",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'Ж',
        events: [
        {
            title: "Дмитрий Жилунович",
            link: "/none",
        },
        ],
    },
    {
      letter: 'З',
        events: [
        {
            title: "Михась Зарецкий",
            link: "/none",
        },
        ],
    },
    // {
    //   letter: 'И',
    //     events: [
    //     {
    //         title: "Принятие II Статута ВКЛ",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'К',
        events: [
        {
            title: "Якуб Колас",
            link: "/kolas",
        },
        {
            title: "Янка Купала",
            link: "/kupala",
        },
        {
            title: "Кастусь Калиновский",
            link: "/kalinowski",
        },
        {
            title: "Владимир Короткевич",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Л',
        events: [
        {
            title: "Михась Лыньков",
            link: "/none",
        },
        ],
    },
    {
      letter: 'М',
        events: [
        {
            title: "Петр Машеров",
            link: "/none",
        },
        ],
    },
    // {
    //   letter: 'Н',
    //     events: [
    //     {
    //         title: "Принятие Конституции Речи Посполитой",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'О',
        events: [
        {
            title: "Наполеон Орда",
            link: "/orda",
        },
        ],
    },
    {
      letter: 'П',
        events: [
        {
            title: "Ефросинья Полоцкая",
            link: "/none",
        },
        ],
    },
    // {
    //   letter: 'Р',
    //     events: [
    //     {
    //         title: "Третий раздел Речи Посполитой",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'С',
        events: [
        {
            title: "Франциск Скорина",
            link: "/skaryna",
        },
        {
            title: "Михаил Савицкий",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Т',
        events: [
        {
            title: "Тётка (Алоиза Пашкевич)",
            link: "/none",
        },
        {
            title: "Максим Танк",
            link: "/tank",
        },
        ],
    },
    // {
    //   letter: 'У',
    //     events: [
    //     {
    //         title: "Формирование 'Громады'",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Ф',
    //     events: [
    //     {
    //         title: "Столыпинская аграрная реформа",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'Х',
        events: [
        {
            title: "Иван Хруцкий",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Ц',
        events: [
        {
            title: "Виталий Цвирко",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Ч',
        events: [
        {
            title: "Михась Чарот",
            link: "/none",
        },
        ],
    },
    {
      letter: 'Ш',
        events: [
        {
            title: "Марк Шагал",
            link: "/none",
        },
        ],
    },
    // {
    //   letter: 'Э',
    //     events: [
    //     {
    //         title: "Великая Отечественная война",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Ю',
    //     events: [
    //     {
    //         title: "Вступление в ООН",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Я',
    //     events: [
    //     {
    //         title: "Вступление в ЮНЕСКО",
    //         link: "/none",
    //     },
    //     ],
    // },
  ];

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
        <IconButton className={styles.homeButton} aria-label="На главную">
          <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
        </IconButton>
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
              Симон Будный (Сымон Будны)
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1530-1593)
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Симон Будный (1530 – 1593) - великий философ, просветитель и писатель, знаковая личность
                в культуре и истории Беларуси. Он был духовным писателем Речи Посполитой и церковным
                реформатором, придерживался сначала кальвинистских, а затем социанских взглядов.
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Симон Будный являлся одним из наиболее образованных людей своей эпохи: закончил Ягеллонский
                университет, учился в Швейцарии и Италии. Он был одним из немногих интеллектуалов, занимавшихся
                развитием народной белорусской культуры. Довольно быстро его идеи прослыли инновационными и
                реформаторскими. С 1562 года он начал издавать свои сочинения на многих языках (белорусском,
                польском, латинском) главным образом с целью пропаганды своего учения.
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                В Несвиже Симон Будный основал типографию, где в 1562 году издал «Катехизис» - книгу, в которой
                высказал свои философские, религиозные, политические и педагогические взгляды. Позже он перевел
                Библию на польский язык и напечатал ее здесь же, в Несвиже, в 1570 и 1572 годах.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Белорусский публицист и гуманист работал в Вильнюсе, Клецке, Лоске, но большая часть его издательской
                деятельности связана с Несвижем - городом, где он провел лучшие годы своей жизни и где теперь установлен
                памятник Симону Будному. В деревне Лоск можно посетить музей, повествующий о деятельности известного реформатора.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BudnyPage };