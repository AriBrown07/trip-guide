import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/sunday-1.jpg';
import pic2 from '../../../pics/sunday-2.jpeg';
import { Link } from 'react-router-dom';

const PalmSunday = () => {
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
              Вербное воскресенье
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
              Считается, что праздник возник в Иерусалиме. Его появление относят к IV веку:
               тогда Церковь ввела обычай освящать пальмы. Отсюда одно из названий праздника — «неделя ваий» (греч. «ваиа» — пальма).
                Упоминания о празднике встречаются у святителей Амвросия Медиоланского и Епифания Кипрского в IV веке. 
                К этому же периоду относятся его изображения на саркофагах. Заглавие «Die dominica in palmas» (Воскресный день пальм)
                появляется в богослужебных книгах римского обряда с конца VII — начала VIII веков.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
               Этот день отмечается накануне начала Страстной недели и напоминает о евангельских событиях,
               предшествовавших крестному страданию Христа и его Воскресению. 
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В субботу Иисус сотворил чудо и воскресил Лазаря из Вифании. 
                Это потрясло присутствовавших. Многие, видевшие и слышавшие об этом событии, уверовали во Христа именно после этого события. 
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                На следующий день, в воскресенье, он вошел в Иерусалим, где перед праздником иудейской Пасхи собралось множество паломников. 
                Иисус въехал в город на молодом осле, как Давид после битвы над Голиафом. 
                Его встречали как победителя, приветствовал пальмовыми ветвями и хвалебной песней: «Осанна (спасение) Сыну Давидову! 
                Благословен грядущий во имя Господне!». На дорогу, по которой он ехал, люди бросали пальмовые ветви и стелили одежды.
                Именно отсюда берет корни западная традиция освящать пальмовые ветви. В России их заменила верба.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { PalmSunday };