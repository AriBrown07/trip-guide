import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/kolas-1.jpg';
import pic2 from '../../../pics/kolas-2.jpg';
import pic3 from '../../../pics/kolas-3.jpg';

const KolasPage = () => {
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
              Якуб Колас (Константин Мицкевич)
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1882-1956)
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Якуб Колас (настоящее имя – Константин Мицкевич) родился в 1882 году в деревне Окинчицы
                (сегодня – территория города Столбцы) в семье лесника. Оба родителя будущего писателя были
                родом из деревни Николаевщина. У Константина было ещё двенадцать братьев и сестер. Но из-за
                недоедания и болезней до взрослого возраста дожили девять. Семья Мицкевичей из-за профессии
                отца часто меняла место прописки. Поэтому и образование мальчик получал сначала дома, а
                только потом в школе. Большое влияние на будущего поэта оказал его дядька Антон, который
                с ранних лет привил племяннику любовь к чтению. В 12-летнем возрасте Мицкевич впервые
                познакомился с белорусской литературой. Она произвела на него большое впечатление.
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Константин окончил сначала народную школу, а затем, в 1902 году, Несвижскую учительскую семинарию.
                Во время учёбы увлекся художественной литературой: читал как русских классиков, так белорусских и
                зарубежных авторов. Писал собственные стихи на русском языке. Также проявил себя как этнограф –
                записывал в тетрадки народный фольклор. В 1902-1906 годах работал учителем в Пинском районе в деревнях
                Люсино и Пинковичи. Продолжал собирать фольклор. Был одним из организаторов незаконного учительского съезда
                1906 года. Съезд разогнала полиция. А Мицкевичу запретили заниматься учительской деятельностью. Но вопреки
                указу он вплоть до 1912 года работал нелегально. Позже события этих лет легли в основу романа «На ростанях».
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                В 1906-1907 годах в деревне Смолярня открыл частную школу. В 1907 переехал в Вильню, где работал
                заведующим отдела литературы в “Нашай Ніве”, но по указанию полиции уволился оттуда и покинул город.
                В начале 1908 года некоторое время работал учителем в деревне Сани, после чего был арестован по обвинению
                в революционной деятельности, направленной на ликвидацию действующего государственного строя. Мицкевича
                осудили на 3 года, все время заключения (1908-1911) он провел в Минской тюрьме. На протяжении всего срока
                продолжал создавать произведения. После освобождения вернулся на Пинщину, где продолжал работать учителем
                до 1914 года. В 1915 вместе с семьей эвакуировался в Подмосковье, где недолго работал учителем, но вскоре его мобилизовали в армию.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В 1916 году по экспресс-программе закончил Александровское военное училище и был направлен на службу в
                резервный полк в Пермь. В 1917 в звании подпоручика направлен на Румынский фронт. Но из-за болезни, вскоре,
                покинул зону боевых действий, а позже как учитель был демобилизован. С 1918 и до 1921 года работал учителем
                в городе Обоянь (Курская область). В 1921 вернулся в Минск. 20-е годы - время творческого успеха для Якуба Коласа.
                Он становится известным писателем, его читают и знают. Он ведёт активную общественную жизнь. С 1929 года занимает
                должность вице-президента Академии наук БССР. Принимает участие в съездах писателей.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В то же время, уже с середины 20-х годов им заинтересовались репрессивные органы. В 1925 году в его квартире
                проводится обыск, часть документов конфискуется. Писателю устраивают многочасовой допрос. В 30-х ситуаци
                ухудшается. Коласа постоянно критикуют, обвиняют в нацдемовщине. На разных уровнях, от заседаний, до публикаций
                в газетах твердят, что в своих произведениях он идеализирует кулачество и частную собственность, а также
                бесклассовость белорусского народа. В это время арестовываются и репрессируются близкие родственники писателя
                – Язэп Лёсик и Александр Каменский. Сам Колас вынужден был покаяться в прессе во всех приписанных ему грехах
                и пообещать в дальнейшем писать лишь правильную, идеологически выверенную литературу. Впрочем, постоянное
                давление на него это не остановило. В 1938 году в квартире поэта проходит новый обыск. С писателем обходятся
                унизительно – ставят к стенке, как преступника. Искали оружие, которое не было найдено. Коласу грозил арест.
                Считается, что широкая известность помешала советской власти репрессировать его также, как многих других беларусов.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Во время войны Якуб Колас живет в Москве и Ташкенте. После освобождения Минска в 1944 году возвращается на родину.
                Продолжает работать в Академии наук, ведет активную общественно-политическую жизнь: избирался депутатом верховного
                совета БССР (1938-1956) и верховного совета СССР (1946-1956). Был председателем Белорусского республиканского комитета
                защиты мира. В последние годы Якуб Колас много болел. За 10 лет он 26 раз перенес воспаление легких. Но все равно
                продолжал создавать новые произведения и умер за рабочим столом 13 августа 1956 года от сердечно-сосудистой
                недостаточности. Похоронен на Военном кладбище в Минске, недалеко от могилы Янки Купалы.
              </Typography>              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { KolasPage };