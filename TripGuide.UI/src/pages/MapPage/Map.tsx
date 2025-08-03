import './Map.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import RoutePlanner from "../../components/RoutePlanner/RoutePlanner";
import YandexSearch from "../../components/YandexSearch/YandexSearch";
import WelcomeBanner from './WelcomeBanner';

interface SelectedPlace {
  name: string;
  coordinates: [number, number];
}

interface PredefinedRoute {
  id: number;
  title: string;
  description: string;
  duration: string;
  distance: string;
  places: SelectedPlace[];
  image?: string;
  budgetLevel?: 'low' | 'medium' | 'high';
  childFriendly?: boolean;
  purpose?: 'gastronomy' | 'festivals' | 'history';
}

interface CityRoutes {
  city: string;
  coordinates: [number, number];
  routes: PredefinedRoute[];
}

interface CountrywideRoute extends PredefinedRoute {
  cities: string[]; // Города, которые охватывает маршрут
}

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [budget, setBudget] = useState<string>('');
  const [hasChildren, setHasChildren] = useState<string>('Нет');
  const [currency, setCurrency] = useState<string>('BYN');
  const [purpose, setPurpose] = useState<string>('');
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Минск');
  const [filteredRoutes, setFilteredRoutes] = useState<PredefinedRoute[]>([]);

  // Города и маршруты
  const citiesRoutes: CityRoutes[] = [
    {
      city: 'Минск',
      coordinates: [53.902284, 27.561831],
      routes: [
        {
          id: 1,
          title: "Исторический центр Минска",
          description: "Знакомство с главными достопримечательностями столицы",
          duration: "3-4 часа",
          distance: "5 км",
          places: [
            { name: "Площадь Независимости", coordinates: [53.8939, 27.5464] },
            { name: "Октябрьская площадь", coordinates: [53.9025, 27.5618] },
            { name: "Национальный художественный музей", coordinates: [53.8969, 27.5578] },
            { name: "Верхний город", coordinates: [53.9047, 27.5553] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 2,
          title: "Зеленый маршрут",
          description: "Парки и скверы Минска",
          duration: "5-6 часов",
          distance: "12 км",
          places: [
            { name: "Парк Горького", coordinates: [53.9061, 27.5547] },
            { name: "Ботанический сад", coordinates: [53.9172, 27.6089] },
            { name: "Парк Победы", coordinates: [53.9133, 27.5503] },
            { name: "Лошицкий парк", coordinates: [53.8522, 27.6811] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 3,
          title: "Гастрономический тур",
          description: "Лучшие места белорусской кухни",
          duration: "4-5 часов",
          distance: "8 км",
          places: [
            { name: "Ресторан Раковский Бровар", coordinates: [53.9028, 27.5544] },
            { name: "Камяница", coordinates: [53.9048, 27.5548] },
            { name: "Васильки", coordinates: [53.9006, 27.5594] },
            { name: "Талака", coordinates: [53.8968, 27.5478] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'gastronomy'
        },
        {
          id: 4,
          title: "Культурный маршрут",
          description: "Музеи и театры города",
          duration: "6-8 часов",
          distance: "10 км",
          places: [
            { name: "Национальный театр оперы и балета", coordinates: [53.9103, 27.5542] },
            { name: "Большой театр Беларуси", coordinates: [53.9103, 27.5542] },
            { name: "Музей истории ВОВ", coordinates: [53.9128, 27.5358] },
            { name: "Национальная библиотека", coordinates: [53.9317, 27.6458] }
          ],
          budgetLevel: 'medium',
          childFriendly: false,
          purpose: 'history'
        },
        {
          id: 5,
          title: "Ночной Минск",
          description: "Лучшие места для вечерних прогулок",
          duration: "3-4 часа",
          distance: "7 км",
          places: [
            { name: "Троицкое предместье", coordinates: [53.9094, 27.5588] },
            { name: "Набережная Свислочи", coordinates: [53.9056, 27.5564] },
            { name: "Площадь Свободы", coordinates: [53.9036, 27.5563] },
            { name: "Октябрьская улица", coordinates: [53.9025, 27.5618] }
          ],
          budgetLevel: 'high',
          childFriendly: false,
          purpose: 'festivals'
        }
      ]
    },
    {
      city: 'Брест',
      coordinates: [52.0976, 23.7341],
      routes: [
        {
          id: 6,
          title: "Брестская крепость и город",
          description: "Исторический маршрут по местам воинской славы",
          duration: "1 день",
          distance: "5 км",
          places: [
            { name: "Брестская крепость", coordinates: [52.0826, 23.6553] },
            { name: "Музей обороны Брестской крепости", coordinates: [52.0826, 23.6553] },
            { name: "Пешеходная улица Советская", coordinates: [52.0947, 23.6889] },
            { name: "Музей спасенных ценностей", coordinates: [52.0975, 23.6874] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 7,
          title: "Беловежская пуща",
          description: "Экскурсия в национальный парк",
          duration: "1 день",
          distance: "60 км от Бреста",
          places: [
            { name: "Музей природы", coordinates: [52.5736, 23.7992] },
            { name: "Вольеры с животными", coordinates: [52.5722, 23.8001] },
            { name: "Резиденция Деда Мороза", coordinates: [52.5575, 23.8258] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 8,
          title: "Брестские форты",
          description: "Экскурсия по фортификационным сооружениям",
          duration: "5-6 часов",
          distance: "20 км",
          places: [
            { name: "Форт V", coordinates: [52.0581, 23.7264] },
            { name: "Форт III", coordinates: [52.1234, 23.6789] },
            { name: "Форт I", coordinates: [52.1456, 23.7123] }
          ],
          budgetLevel: 'low',
          childFriendly: false,
          purpose: 'history'
        },
        {
          id: 9,
          title: "Брестский Арбат",
          description: "Прогулка по пешеходной зоне с магазинами и кафе",
          duration: "2-3 часа",
          distance: "1 км",
          places: [
            { name: "Улица Советская", coordinates: [52.0947, 23.6889] },
            { name: "Площадь Ленина", coordinates: [52.0976, 23.6874] },
            { name: "Брестский академический театр драмы", coordinates: [52.0965, 23.6892] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'gastronomy'
        },
        {
          id: 10,
          title: "Брест - город фонарей",
          description: "Вечерняя экскурсия по освещенным улицам города",
          duration: "2 часа",
          distance: "3 км",
          places: [
            { name: "Парк культуры и отдыха", coordinates: [52.0918, 23.6972] },
            { name: "Набережная реки Мухавец", coordinates: [52.0884, 23.6915] },
            { name: "Площадь Свободы", coordinates: [52.0962, 23.6847] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'festivals'
        }
      ]
    },
    {
      city: 'Витебск',
      coordinates: [55.1848, 30.2016],
      routes: [
        {
          id: 11,
          title: "Фестивальный Витебск",
          description: "Маршрут по местам Славянского базара",
          duration: "4-5 часов",
          distance: "6 км",
          places: [
            { name: "Летний амфитеатр", coordinates: [55.1865, 30.2034] },
            { name: "Площадь Победы", coordinates: [55.1911, 30.2014] },
            { name: "Дом-музей Марка Шагала", coordinates: [55.1994, 30.2045] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'festivals'
        },
        {
          id: 12,
          title: "Витебск Шагала",
          description: "По местам, связанным с жизнью художника",
          duration: "3-4 часа",
          distance: "4 км",
          places: [
            { name: "Дом-музей Марка Шагала", coordinates: [55.1994, 30.2045] },
            { name: "Арт-центр Марка Шагала", coordinates: [55.1907, 30.2078] },
            { name: "Улица Покровская", coordinates: [55.1956, 30.2067] }
          ],
          budgetLevel: 'low',
          childFriendly: false,
          purpose: 'history'
        },
        {
          id: 13,
          title: "Витебские храмы",
          description: "Экскурсия по религиозным сооружениям",
          duration: "3 часа",
          distance: "5 км",
          places: [
            { name: "Благовещенская церковь", coordinates: [55.1964, 30.2043] },
            { name: "Свято-Успенский собор", coordinates: [55.1945, 30.2021] },
            { name: "Костел Святой Варвары", coordinates: [55.1912, 30.2089] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 14,
          title: "Витебские дворики",
          description: "Прогулка по старинным дворикам города",
          duration: "2-3 часа",
          distance: "3 км",
          places: [
            { name: "Улица Суворова", coordinates: [55.1934, 30.2056] },
            { name: "Улица Толстого", coordinates: [55.1956, 30.2012] },
            { name: "Улица Ленина", coordinates: [55.1918, 30.2034] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 15,
          title: "Витебская кухня",
          description: "Гастрономический тур по местным ресторанам",
          duration: "4 часа",
          distance: "2 км",
          places: [
            { name: "Ресторан Золотой лев", coordinates: [55.1902, 30.2056] },
            { name: "Кафе Старый город", coordinates: [55.1923, 30.2045] },
            { name: "Бар Хмельной патриот", coordinates: [55.1911, 30.2078] }
          ],
          budgetLevel: 'high',
          childFriendly: false,
          purpose: 'gastronomy'
        }
      ]
    },
    {
      city: 'Гродно',
      coordinates: [53.6694, 23.8131],
      routes: [
        {
          id: 16,
          title: "Старый город Гродно",
          description: "Прогулка по историческому центру",
          duration: "3-4 часа",
          distance: "4 км",
          places: [
            { name: "Старый замок", coordinates: [53.6775, 23.8236] },
            { name: "Новый замок", coordinates: [53.6778, 23.8214] },
            { name: "Фарный костел", coordinates: [53.6789, 23.8278] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 17,
          title: "Гродненские храмы",
          description: "Экскурсия по религиозным сооружениям",
          duration: "3 часа",
          distance: "3 км",
          places: [
            { name: "Борисоглебская церковь", coordinates: [53.6772, 23.8267] },
            { name: "Синагога", coordinates: [53.6784, 23.8301] },
            { name: "Лютеранская кирха", coordinates: [53.6802, 23.8289] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 18,
          title: "Гродненский зоопарк",
          description: "Посещение одного из старейших зоопарков",
          duration: "2-3 часа",
          distance: "2 км",
          places: [
            { name: "Гродненский зоопарк", coordinates: [53.6823, 23.8345] },
            { name: "Парк Жилибера", coordinates: [53.6812, 23.8321] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 19,
          title: "Гродненские мосты",
          description: "Прогулка по мостам через Неман",
          duration: "2 часа",
          distance: "3 км",
          places: [
            { name: "Старый мост", coordinates: [53.6778, 23.8289] },
            { name: "Новый мост", coordinates: [53.6756, 23.8312] },
            { name: "Пешеходный мост", coordinates: [53.6792, 23.8301] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 20,
          title: "Гродненская кухня",
          description: "Знакомство с местной кухней",
          duration: "3-4 часа",
          distance: "2 км",
          places: [
            { name: "Ресторан Старый лямус", coordinates: [53.6789, 23.8278] },
            { name: "Кафе Карамель", coordinates: [53.6776, 23.8291] },
            { name: "Бар Бровар", coordinates: [53.6792, 23.8267] }
          ],
          budgetLevel: 'medium',
          childFriendly: false,
          purpose: 'gastronomy'
        }
      ]
    },
    {
      city: 'Гомель',
      coordinates: [52.4242, 31.0143],
      routes: [
        {
          id: 21,
          title: "Гомельский дворцово-парковый ансамбль",
          description: "Экскурсия по главной достопримечательности",
          duration: "3-4 часа",
          distance: "2 км",
          places: [
            { name: "Дворец Румянцевых-Паскевичей", coordinates: [52.4225, 31.0167] },
            { name: "Парк", coordinates: [52.4234, 31.0156] },
            { name: "Часовня-усыпальница", coordinates: [52.4218, 31.0178] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 22,
          title: "Гомель с высоты",
          description: "Обзорные площадки города",
          duration: "2-3 часа",
          distance: "3 км",
          places: [
            { name: "Обзорная площадка у дворца", coordinates: [52.4225, 31.0167] },
            { name: "Колесо обозрения", coordinates: [52.4245, 31.0156] },
            { name: "Смотровая площадка на набережной", coordinates: [52.4256, 31.0145] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 23,
          title: "Гомельские храмы",
          description: "Экскурсия по религиозным сооружениям",
          duration: "3 часа",
          distance: "4 км",
          places: [
            { name: "Петропавловский собор", coordinates: [52.4267, 31.0178] },
            { name: "Никольская церковь", coordinates: [52.4289, 31.0156] },
            { name: "Костел Рождества Богородицы", coordinates: [52.4256, 31.0189] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 24,
          title: "Гомельская кухня",
          description: "Знакомство с местной кухней",
          duration: "3-4 часа",
          distance: "2 км",
          places: [
            { name: "Ресторан Старый город", coordinates: [52.4245, 31.0156] },
            { name: "Кафе У фонтана", coordinates: [52.4234, 31.0167] },
            { name: "Бар Гомельское пиво", coordinates: [52.4256, 31.0145] }
          ],
          budgetLevel: 'medium',
          childFriendly: false,
          purpose: 'gastronomy'
        },
        {
          id: 25,
          title: "Вечерний Гомель",
          description: "Прогулка по освещенным улицам",
          duration: "2 часа",
          distance: "3 км",
          places: [
            { name: "Набережная реки Сож", coordinates: [52.4256, 31.0145] },
            { name: "Площадь Ленина", coordinates: [52.4245, 31.0156] },
            { name: "Парк культуры и отдыха", coordinates: [52.4267, 31.0178] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'festivals'
        }
      ]
    },
    {
      city: 'Могилев',
      coordinates: [53.9007, 30.3314],
      routes: [
        {
          id: 26,
          title: "Исторический центр Могилева",
          description: "Прогулка по главным достопримечательностям",
          duration: "3-4 часа",
          distance: "4 км",
          places: [
            { name: "Площадь Славы", coordinates: [53.8945, 30.3312] },
            { name: "Ратуша", coordinates: [53.8967, 30.3301] },
            { name: "Драматический театр", coordinates: [53.8956, 30.3323] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 27,
          title: "Могилевские храмы",
          description: "Экскурсия по религиозным сооружениям",
          duration: "3 часа",
          distance: "3 км",
          places: [
            { name: "Свято-Никольский монастырь", coordinates: [53.8989, 30.3345] },
            { name: "Костел Святого Станислава", coordinates: [53.8978, 30.3356] },
            { name: "Борисоглебская церковь", coordinates: [53.8967, 30.3367] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 28,
          title: "Могилевская кухня",
          description: "Знакомство с местной кухней",
          duration: "3-4 часа",
          distance: "2 км",
          places: [
            { name: "Ресторан Старый Могилев", coordinates: [53.8956, 30.3323] },
            { name: "Кафе У ратуши", coordinates: [53.8967, 30.3301] },
            { name: "Бар Могилевское пиво", coordinates: [53.8978, 30.3312] }
          ],
          budgetLevel: 'medium',
          childFriendly: false,
          purpose: 'gastronomy'
        },
        {
          id: 29,
          title: "Могилевские парки",
          description: "Прогулка по зеленым зонам города",
          duration: "2-3 часа",
          distance: "3 км",
          places: [
            { name: "Парк Подниколье", coordinates: [53.8989, 30.3345] },
            { name: "Парк культуры и отдыха", coordinates: [53.9001, 30.3356] },
            { name: "Детский парк", coordinates: [53.9012, 30.3367] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 30,
          title: "Вечерний Могилев",
          description: "Прогулка по освещенным улицам",
          duration: "2 часа",
          distance: "3 км",
          places: [
            { name: "Набережная реки Днепр", coordinates: [53.9023, 30.3378] },
            { name: "Пешеходная улица Ленинская", coordinates: [53.9034, 30.3389] },
            { name: "Площадь Звезд", coordinates: [53.9045, 30.3401] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'festivals'
        }

      ]
    }

  ];


  const countrywideRoutes: CountrywideRoute[] = [
    {
      id: 31,
      title: "Замки Беларуси",
      description: "Путешествие по самым известным замкам страны",
      duration: "3 дня",
      distance: "450 км",
      cities: ["Минск", "Гродно", "Мир", "Несвиж"],
      places: [
        { name: "Мирский замок", coordinates: [53.4515, 26.4730] },
        { name: "Несвижский замок", coordinates: [53.2223, 26.6919] },
        { name: "Лидский замок", coordinates: [53.8879, 25.3027] },
        { name: "Гродненский Старый замок", coordinates: [53.6775, 23.8236] }
      ],
      budgetLevel: 'medium',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 32,
      title: "Природные жемчужины",
      description: "Посещение национальных парков и заповедников",
      duration: "4 дня",
      distance: "600 км",
      cities: ["Брест", "Витебск", "Гродно"],
      places: [
        { name: "Беловежская пуща", coordinates: [52.5736, 23.7992] },
        { name: "Браславские озера", coordinates: [55.6413, 27.0518] },
        { name: "Нарочанский парк", coordinates: [54.8611, 26.7114] },
        { name: "Березинский заповедник", coordinates: [54.7379, 28.3187] }
      ],
      budgetLevel: 'low',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 33,
      title: "Гастрономический тур",
      description: "Знакомство с кухней разных регионов Беларуси",
      duration: "5 дней",
      distance: "700 км",
      cities: ["Минск", "Брест", "Гродно", "Витебск"],
      places: [
        { name: "Ресторан Раковский Бровар (Минск)", coordinates: [53.9028, 27.5544] },
        { name: "Корчма Старый Млын (Мир)", coordinates: [53.4515, 26.4723] },
        { name: "Ресторан Старый лямус (Гродно)", coordinates: [53.6789, 23.8278] },
        { name: "Ресторан Золотой лев (Витебск)", coordinates: [55.1902, 30.2056] }
      ],
      budgetLevel: 'high',
      childFriendly: false,
      purpose: 'gastronomy'
    },
    {
      id: 34,
      title: "Военно-исторический маршрут",
      description: "Важные места военной истории Беларуси",
      duration: "3 дня",
      distance: "500 км",
      cities: ["Минск", "Брест", "Могилев"],
      places: [
        { name: "Музей ВОВ (Минск)", coordinates: [53.9128, 27.5358] },
        { name: "Брестская крепость", coordinates: [52.0826, 23.6553] },
        { name: "Буйничское поле (Могилев)", coordinates: [53.8694, 30.2539] },
        { name: "Хатынь", coordinates: [54.3358, 27.9436] }
      ],
      budgetLevel: 'low',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 35,
      title: "Фестивальный тур",
      description: "Посещение главных культурных событий страны",
      duration: "7 дней",
      distance: "800 км",
      cities: ["Минск", "Витебск", "Гомель"],
      places: [
        { name: "Площадь Победы (Витебск)", coordinates: [55.1911, 30.2014] },
        { name: "Летний амфитеатр (Витебск)", coordinates: [55.1865, 30.2034] },
        { name: "Дворец Румянцевых-Паскевичей (Гомель)", coordinates: [52.4225, 31.0167] },
        { name: "Октябрьская площадь (Минск)", coordinates: [53.9025, 27.5618] }
      ],
      budgetLevel: 'medium',
      childFriendly: true,
      purpose: 'festivals'
    },
    {
      id: 36,
      title: "Религиозные святыни",
      description: "Посещение важнейших религиозных объектов",
      duration: "4 дня",
      distance: "550 км",
      cities: ["Гродно", "Минск", "Полоцк", "Жировичи"],
      places: [
        { name: "Жировичский монастырь", coordinates: [53.0103, 25.3445] },
        { name: "Софийский собор (Полоцк)", coordinates: [55.4856, 28.7586] },
        { name: "Фарный костел (Гродно)", coordinates: [53.6789, 23.8278] },
        { name: "Красный костел (Минск)", coordinates: [53.8969, 27.5478] }
      ],
      budgetLevel: 'low',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 37,
      title: "Литературный маршрут",
      description: "По местам, связанным с белорусскими писателями",
      duration: "5 дней",
      distance: "650 км",
      cities: ["Минск", "Витебск", "Глубокое", "Новогрудок"],
      places: [
        { name: "Дом-музей Янки Купалы (Минск)", coordinates: [53.9061, 27.5667] },
        { name: "Дом-музей Марка Шагала (Витебск)", coordinates: [55.1994, 30.2045] },
        { name: "Музей Якуба Коласа (Минск)", coordinates: [53.9089, 27.5756] },
        { name: "Замковая гора (Новогрудок)", coordinates: [53.5986, 25.8275] }
      ],
      budgetLevel: 'low',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 38,
      title: "Водный маршрут",
      description: "Путешествие по рекам и озерам Беларуси",
      duration: "6 дней",
      distance: "700 км",
      cities: ["Минск", "Браслав", "Нарочь", "Пинск"],
      places: [
        { name: "Нарочанский национальный парк", coordinates: [54.8611, 26.7114] },
        { name: "Браславские озера", coordinates: [55.6413, 27.0518] },
        { name: "Река Припять (Пинск)", coordinates: [52.1199, 26.0954] },
        { name: "Минское море", coordinates: [54.0500, 27.6333] }
      ],
      budgetLevel: 'medium',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 39,
      title: "Этнографический тур",
      description: "Знакомство с традиционной культурой",
      duration: "4 дня",
      distance: "500 км",
      cities: ["Минск", "Мир", "Строчицы", "Дудутки"],
      places: [
        { name: "Музей народной архитектуры (Строчицы)", coordinates: [53.7789, 27.3736] },
        { name: "Музейный комплекс Дудутки", coordinates: [53.5944, 27.6869] },
        { name: "Этнографический музей (Мир)", coordinates: [53.4515, 26.4723] },
        { name: "Музей валунов (Минск)", coordinates: [53.9269, 27.6597] }
      ],
      budgetLevel: 'medium',
      childFriendly: true,
      purpose: 'history'
    },
    {
      id: 40,
      title: "Промышленный тур",
      description: "Посещение известных предприятий Беларуси",
      duration: "3 дня",
      distance: "400 км",
      cities: ["Минск", "Жодино", "Борисов", "Солигорск"],
      places: [
        { name: "БелАЗ (Жодино)", coordinates: [54.0989, 28.3328] },
        { name: "МАЗ (Минск)", coordinates: [53.8625, 27.6661] },
        { name: "Белорусский металлургический завод (Жлобин)", coordinates: [52.8925, 30.0347] },
        { name: "Солигорские калийные комбинаты", coordinates: [52.7928, 27.5356] }
      ],
      budgetLevel: 'medium',
      childFriendly: false,
      purpose: 'history'
    }
  ];
  // Фильтрация маршрутов
  useEffect(() => {
    let routesToFilter: PredefinedRoute[] = [];

    if (selectedCity === 'countrywide') {
      routesToFilter = [...countrywideRoutes];
    } else {
      routesToFilter = citiesRoutes.find(city => city.city === selectedCity)?.routes || [];
    }

    let filtered = [...routesToFilter];


    // Фильтр по бюджету
    if (budget) {
      const budgetValue = parseFloat(budget);
      if (!isNaN(budgetValue)) {
        filtered = filtered.filter(route => {
          if (route.budgetLevel === 'low' && budgetValue < 100) return true;
          if (route.budgetLevel === 'medium' && budgetValue >= 100 && budgetValue < 300) return true;
          if (route.budgetLevel === 'high' && budgetValue >= 300) return true;
          return false;
        });
      }
    }

    // Фильтр по наличию детей
    if (hasChildren === 'Да') {
      filtered = filtered.filter(route => route.childFriendly);
    }

    // Фильтр по цели путешествия
    if (purpose) {
      let purposeFilter: 'gastronomy' | 'festivals' | 'history' | '' = '';
      if (purpose === 'Гастрономический туризм') purposeFilter = 'gastronomy';
      if (purpose === 'Праздники и фестивали') purposeFilter = 'festivals';
      if (purpose === 'Музеи и исторические памятники') purposeFilter = 'history';

      if (purposeFilter) {
        filtered = filtered.filter(route => route.purpose === purposeFilter);
      }
    }

    setFilteredRoutes(filtered);
  }, [selectedCity, budget, hasChildren, purpose]);

  const handleRouteSelect = (route: PredefinedRoute) => {
    setSelectedPlaces(route.places);
    setActiveRoute(route.id);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setActiveRoute(null);
    setSelectedPlaces([]);
  };

  return (
    <>
      <button
        className="burger-button"
        onClick={() => setIsSidebarOpen(open => !open)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="app-container">
        {showWelcomeBanner && (
          <WelcomeBanner onClose={() => setShowWelcomeBanner(false)} />
        )}

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="search-container">
            <YandexSearch
              onPlaceSelect={(place) => {
                setSelectedPlaces([...selectedPlaces, place]);
                setActiveRoute(null);
              }}
            />
          </div>

          <div className="filter-group">
            <label>Выбранные места</label>
            {selectedPlaces.length > 0 ? (
              <div className="selected-places">
                {selectedPlaces.map((place, index) => (
                  <div key={index} className="place-tag">
                    {place.name}
                    <button
                      onClick={() => {
                        setSelectedPlaces(selectedPlaces.filter((_, i) => i !== index));
                        setActiveRoute(null);
                      }}
                      className="remove-place"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-places">Выберите места из поиска выше или выберите готовый маршрут</div>
            )}
          </div>

          {/* Блок выбора города */}
          <div className="filter-group">
            <label>Выберите город</label>
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
            >
              <optgroup label="Города" className="city-optgroup">
                {citiesRoutes.map(city => (
                  <option key={city.city} value={city.city}>{city.city}</option>
                ))}
              </optgroup>
              <optgroup label="Маршруты по всей Беларуси" className="countrywide-optgroup">
                <option value="countrywide">Все маршруты</option>
              </optgroup>
            </select>
          </div>

          {/* Блок с готовыми маршрутами */}
          <div className="filter-group predefined-routes">
            <label>Готовые маршруты ({filteredRoutes.length})</label>
            {filteredRoutes.length > 0 ? (
              <div className="routes-list">
                {filteredRoutes.map(route => (
                  <div
                    key={route.id}
                    className={`route-card ${activeRoute === route.id ? 'active' : ''}`}
                    onClick={() => handleRouteSelect(route)}
                  >
                    <h4>{route.title}</h4>
                    <p className="route-description">{route.description}</p>
                    <div className="route-meta">
                      <span className="duration">{route.duration}</span>
                      <span className="distance">{route.distance}</span>
                      <span className="places-count">{route.places.length} мест</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-routes">Нет маршрутов, соответствующих выбранным фильтрам</div>
            )}
          </div>

          {/* Блок выбора дат */}
          <div className="filter-group calendar-section">
            <label>Период путешествия</label>
            <div className="date-range-picker">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                minDate={new Date()}
                monthsShown={2}
                inline
                calendarClassName="custom-calendar"
                dayClassName={(date) => {
                  if (startDate && endDate && date >= startDate && date <= endDate) {
                    return date.getTime() === startDate.getTime() ||
                      date.getTime() === endDate.getTime()
                      ? 'range-edge' : 'in-range';
                  }
                  return '';
                }}
              />
            </div>

            {startDate && endDate && (
              <div className="date-summary">
                <div className="date-item">
                  <span>Начало:</span>
                  <strong>{startDate.toLocaleDateString('ru-RU')}</strong>
                </div>
                <div className="date-item">
                  <span>Окончание:</span>
                  <strong>{endDate.toLocaleDateString('ru-RU')}</strong>
                </div>
                <div className="date-item highlight">
                  <span>Всего дней:</span>
                  <strong>
                    {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Блок бюджета */}
          <div className="filter-group">
            <label htmlFor="budget">
              Бюджет на человека ({currency})
            </label>
            <div className="budget-input-container">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="currency-select"
              >
                <option value="BYN">BYN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="RUB">RUB</option>
              </select>
              <CurrencyInput
                id="budget"
                name="budget"
                placeholder="Введите сумму"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={(value) => setBudget(value || '')}
                className="currency-input"
                intlConfig={{ locale: 'ru-RU', currency: currency }}
              />
            </div>
            <div className="budget-hint">
              {budget && (
                <>
                  <span>Подходящие маршруты: </span>
                  <strong>
                    {parseFloat(budget) < 100 ? 'эконом' :
                      parseFloat(budget) < 300 ? 'средний' : 'премиум'}
                  </strong>
                </>
              )}
            </div>
          </div>

          {/* Блок наличия детей */}
          <div className="filter-group">
            <label htmlFor="children">
              Наличие детей
            </label>
            <select
              id="children"
              value={hasChildren}
              onChange={(e) => setHasChildren(e.target.value)}
            >
              <option value="Да">Да</option>
              <option value="Нет">Нет</option>
            </select>
          </div>

          {/* Блок цели путешествия */}
          <div className="filter-group">
            <label>Цель путешествия</label>
            <div className="radio-group">
              {['Гастрономический туризм', 'Праздники и фестивали', 'Музеи и исторические памятники'].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="purpose"
                    checked={purpose === option}
                    onChange={() => setPurpose(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Блок исторических событий */}
          <div className="filter-group historical-events">
            <label>Ближайшие события</label>
            <div className="events-timeline">
              {[
                { date: '2023-09-17', event: 'День народного единства', url: '/folk' },
                { date: '2023-07-03', event: 'День Независимости', url: '/independence' },
                { date: '2023-05-09', event: 'День Победы', url: '/victory' }
              ].map((item) => (
                <a href={item.url} key={item.date} className="event-item-link">
                  <div className="event-item">
                    <span className="event-date">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                    <span className="event-name">{item.event}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="map-container">
          <RoutePlanner places={selectedPlaces} />
        </div>
      </div>
    </>
  );
}

export { App };