import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/kupalle-1.jpg';
import pic2 from '../../../pics/kupalle-2.jpg';
import { Link } from 'react-router-dom';

const KupallePage = () => {
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
          link: "/none",
        },
      ],
    },
    {
      letter: "В",
      events: [
        {
          title: "Вербное воскресенье",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Г',
      events: [
        {
          title: "Громницы",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Д',
      events: [
        {
          title: "Деды",
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
          title: "Коляды",
          link: "/none",
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
          link: "/none",
        },
      ],
    },
    {
      letter: 'М',
      events: [
        {
          title: "Масленица",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Н',
      events: [
        {
          title: "Новый Год",
          link: "/none",
        },
      ],
    },
    {
      letter: 'О',
      events: [
        {
          title: "День Октябрьской революции",
          link: "/none",
        },
      ],
    },
    {
      letter: 'П',
      events: [
        {
          title: "Покров",
          link: "/none",
        },
        {
          title: "Пасха",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Р',
      events: [
        {
          title: "Радуница",
          link: "/none",
        },
      ],
    },
    {
      letter: 'С',
      events: [
        {
          title: "Сорочины",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Т',
      events: [
        {
          title: "Толока",
          link: "/none",
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
    {
      letter: 'Ю',
      events: [
        {
          title: "Юрьев день",
          link: "/none",
        },
      ],
    },
    {
      letter: 'Я',
      events: [
        {
          title: "Яблочный Спас",
          link: "/none",
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
              Купалье
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Магические обряды и ритуалы Купалья возникли еще в языческие времена. "Купало" означало
                "сердитое", "горячее", "кипящее гневом", "ярое" – именно так предки представляли солнце и
                его чудодейственную силу. Во время праздника люди благодарили и почитаемые могущественные стихии – Огонь, Воду, Землю.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                С распространением христианства к Купалью был приурочен день рождения Иоанна Крестителя.
                Созвучие слов "купало" и "купать", "погружать в воду" в народном сознании привело к смешению в названии праздника – Иван Купала.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В обрядах белорусского Купалья тесно переплелись древние языческие и более поздние христианские традиции.
                И сегодня по православному календарю праздник отмечают в ночь с 6 на 7 июля, по католическому – 24 июня.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                С Купальем связано много удивительных легенд и преданий. В народе верили, что в эту ночь реки
                светятся особым призрачным светом, а в их водах купаются души умерших в облике русалок. По земле
                ходят ведьмы, колдуны и духи, которые стремятся навредить человеку, растения и звери разговаривают,
                а солнце на рассвете "играет". Увидеть эти чудеса, понять язык зверей и птиц можно с помощью цветка
                папоротника, по поверьям зацветающего всего на миг раз в году. Он давал сверхъестественную способност
                видеть будущее и находить скрытые сокровища мира, но заполучить его мог только очень смелый человек.
                Поиск "папараць-кветкі" – один из самых таинственных ритуалов купальской ночи.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { KupallePage };