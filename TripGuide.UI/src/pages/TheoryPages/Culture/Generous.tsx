import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/generos-1.jpg';
import pic2 from '../../../pics/generos-2.jpg';
import { Link } from 'react-router-dom';

const Generous = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: pic1, alt: '' },
    { id: 2, src: pic2, alt: '' },
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
    // {
    //   letter: 'А',
    //     events: [
    //     {
    //         title: "",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'Б',
      events: [
        {
          title: "Богач",
          link: "/bogach",
        },
      ],
    },
    {
      letter: "В",
      events: [
        {
          title: "Вербное воскресенье",
          link: "/sunday",
        },
      ],
    },
    {
      letter: 'Г',
      events: [
        {
          title: "Громницы",
          link: "/gromnitsy",
        },
      ],
    },
    {
      letter: 'Д',
      events: [
        {
          title: "Деды",
          link: "/grandfathers",
        },
        {
          title: "Драники",
          link: "/draniki",
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
    // {
    //   letter: 'Ж',
    //     events: [
    //     {
    //         title: "праздник урожая",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'З',
      events: [
        {
          title: "Зажинки",
          link: "/zazhinki",
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
          title: "Коляды",
          link: "/kolyada",
        },
        {
          title: "Купалье",
          link: "/kupalle",
        },
      ],
    },
    {
      letter: 'Л',
      events: [
        {
          title: "Ляльник",
          link: "/lyalnik",
        },
      ],
    },
    {
      letter: 'М',
      events: [
        {
          title: "Масленица",
          link: "/carnival",
        },
      ],
    },
    {
      letter: 'Н',
      events: [
        {
          title: "Новый Год",
          link: "/newYear",
        },
      ],
    },
    {
      letter: 'О',
      events: [
        {
          title: "День Октябрьской революции",
          link: "/october",
        },
      ],
    },
    {
      letter: 'П',
      events: [
        {
          title: "Покров",
          link: "/cover",
        },
        {
          title: "Пасха",
          link: "/easter",
        },
      ],
    },
    {
      letter: 'Р',
      events: [
        {
          title: "Радуница",
          link: "/radunitsa",
        },
      ],
    },
    {
      letter: 'С',
      events: [
        {
          title: "Сорочины",
          link: "/sorochiny",
        },
      ],
    },
    {
      letter: 'Т',
      events: [
        {
          title: "Толока",
          link: "/cleanup",
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
    // {
    //   letter: 'Х',
    //     events: [
    //     {
    //         title: "Отречение Николая II от престола",
    //         link: "/none",
    //     },
    //     {
    //         title: "Октябрьская революция",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Ц',
    //     events: [
    //     {
    //         title: "Брест-Литовский договор",
    //         link: "/none",
    //     },
    //     {
    //         title: "Провозглашение БНР",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Ч',
    //     events: [
    //     {
    //         title: "Провозглашение БССР",
    //         link: "/none",
    //     },
    //     ],
    // },
    // {
    //   letter: 'Ш',
    //     events: [
    //     {
    //         title: "Шчодры вечар",
    //         link: "/none",
    //     },
    //     ],
    // },
    {
      letter: 'Щ',
      events: [
        {
          title: "Щедрый вечер",
          link: "/generous",
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
    {
      letter: 'Ю',
      events: [
        {
          title: "Юрьев день",
          link: "/yuriev",
        },
      ],
    },
    {
      letter: 'Я',
      events: [
        {
          title: "Яблочный Спас",
          link: "/apple",
        },
      ],
    },
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
        <Link to="/home">
          <IconButton className={styles.homeButton} aria-label="На главную">
            <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
          </IconButton>
        </Link>
        <Typography variant="h1" className={styles.headerTitle}>
          Культура Беларуси
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
              Щедрый вечер
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Щедрый вечер – один из самых ярких и веселых праздников в белорусском народном календаре, который отмечается 13 января (канун Старого Нового года). Этот день завершает цикл зимних святок и посвящен щедрой встрече нового года. Традиционно считается, что чем богаче и веселее пройдет праздник, тем более урожайным и удачным будет год. В деревнях Беларуси до сих пор сохранились многие обряды этого праздника.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Главный обычай Щедрого вечера – щедрование, когда группы молодежи ходят по домам с песнями-щедровками. Ряженые в ярких костюмах желают хозяевам здоровья, богатства и хорошего урожая, за что получают угощения – колбасу, сало, блины или деньги. Особенно популярны образы Козы, Медведя и других персонажей, символизирующих плодородие и достаток. В ответ на щедровки хозяева должны быть гостеприимными, иначе рискуют «накликать» бедный год.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                На праздничный стол в этот день обязательно ставят богатые и сытные блюда – кутью с маслом и медом, блины, мясные угощения и домашнюю колбасу. Особое значение имеет «щедруха» – каша, которую готовили с добавлением сала и мяса. Ужин в Щедрый вечер был семейным и торжественным: считалось, что чем обильнее стол, тем больше достатка придет в дом. После застолья молодежь часто собиралась на вечорки с играми, гаданиями и танцами.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Сегодня Щедрый вечер остается любимым зимним праздником, который широко отмечают как в деревнях, так и в городах Беларуси. Фольклорные коллективы устраивают театрализованные представления, а в этнографических музеях проходят мастер-классы по традиционным обрядам. Этот праздник не только сохраняет связь с древними обычаями, но и дарит людям радость, тепло общения и веру в то, что новый год принесет счастье и благополучие.
              </Typography>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Generous };