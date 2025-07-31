import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/gusovsky-1.jpeg';
import pic2 from '../../../pics/gusovsky-2.jpg';
import pic3 from '../../../pics/gusovsky-3.jpg';
import { Link } from 'react-router-dom';

const GusovskyPage = () => {
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
              Микола Гусовский
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (около 1470-1533)
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Микола Гусовский - белорусский поэт-гуманист и просветитель эпохи Возрождения, представитель
                новолатинской восточно-европейской литературной школы. В 1518 году Гусовский принял сан
                католического священника, некоторое время служил публичным нотариусом, а в 1521-м в качестве
                придворного сопровождал епископа Эразма Циолека в Рим, где стал свидетелем эпидемии чумы.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                После годичного пребывания в Риме Гусовский поселился в Кракове. Виленский воевода Николай
                Радзивилл хотел направить в подарок Папе римскому Льву Х чучело зубра, в связи с этим Микола
                должен был написать некое «приложение» к подарку. Так появилась поэма «Песня про облик, дикость
                зубра и охоту на него», которая сейчас более известна как «Песня про зубра». Поскольку Лев Х умер,
                до того как смог получить подарок, поэма была посвящена королеве Боне, которая дала средства на печать произведения.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В 1980 году ЮНЕСКО по поводу 500-летия Миколы Гусовского включила его имя в календарь международных
                дат выдающихся деятелей мировой культуры. В Минске в честь поэта названы улица и переулок, установлен памятник во дворике БГУ.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { GusovskyPage };