import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, TextField, List, ListItem, Collapse, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore, ExpandLess, Search, ArrowBack } from '@mui/icons-material';
import styles from './CountryIntro.module.scss';
import map from "../../pics/Belarus.png";
import map1 from "../../pics/Home/icon_map.png";
import papyrus from "../../pics/papyrus.png";
import touch from "../../pics/touch.png";

// Импортируем изображения для достопримечательностей
import Sophia_Cathedral from './image/Sophia_Cathedral.png';
import mirImage from './image/mir_castle.png';
import brestImage from './image/brest_krepost.png';
import castleImage from './image/castle.png';
import Naroch from './image/Naroch.png';
import Khatyn from './image/Khatyn.png';

const CountryIntro: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Объект с маршрутами для каждого элемента
  const itemRoutes = {
    'Франциск Скорина': '/skaryna',
    'Якуб Колас': '/kolas',
    'Симон Будный': '/budny',
    'Микола Гусовский': '/gusovsky',
    'Первое упоминание Полоцка': '/polock',
    'Битва на Немиге': '/nemiga',
    'Восстание Калиновского': '/kalinovsky', //нет
    'Несвижский замок': '/nesvizh',
    'Мирский замок': '/mir',
    'Беловежская пуща': '/pushcha',
    'Купалье': '/kupalle',
    'Масленица': '/carnival', 
    'Новый Год': '/newYear' //нет
  };

  const categories = [
    {
      name: 'Личности',
      items: ['Франциск Скорина', 'Якуб Колас', 'Симон Будный', 'Микола Гусовский']
    },
    {
      name: 'События',
      items: ['Первое упоминание Полоцка', 'Битва на Немиге', 'Восстание Калиновского']
    },
    {
      name: 'Места',
      items: ['Несвижский замок', 'Мирский замок', 'Беловежская пуща']
    },
    {
      name: 'Культура',
      items: ['Купалье', 'Масленица', 'Новый Год']
    }
  ];

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    const route = itemRoutes[itemName as keyof typeof itemRoutes];
    if (route) {
      navigate(route);
    }
  };

  const handleLandmarkClick = (link: string) => {
    navigate(link);
  };

  const handleTestClick = () => {
    navigate('/test');
  };

  const handleBackClick = () => {
    navigate('/map');
  };

    const handleProfile = () => {
    navigate('/profile');
  };

   const handleGame = () => {
    navigate('/game');
  };


  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase()))
  }));

  return (

    <main className={styles.mainContent}>
      {/* Кнопка назад */}
      <div className={styles.backButtonCont}>
        <Button
          className={styles.backButton}
          onClick={handleBackClick}
        >
          <img src={map1} className={styles.map1} alt="map icon" />
        </Button>

       

      </div>

      <div className={styles.textBox}>
        <img
          src={papyrus}
          alt="text"
          className={styles.textImage}
        />
        <div className={styles.overlayText}>
          Нажмите на любую<br />иконку, расположенную<br />на мини-стране, чтобы<br />узнать больше об<br />изображенной на ней<br />достопримечательности<br />
          <img src={touch} alt="тык" />
        </div>
      </div>

      {/* Карта с интерактивными кружочками */}
      <div className={styles.mapContainer}>
        <img
          src={map}
          alt="Карта Беларуси"
          className={styles.mapImage}
        />

        {/* Отдельные кружки для каждой достопримечательности */}
        <div className={styles.landmarkCircle}
          style={{ left: '60%', top: '29%' }}
          onClick={() => handleLandmarkClick('/sophia')}
          title="Софийский собор">
          <div className={styles.circleInner}>
            <img src={Sophia_Cathedral} alt="Софийский собор" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.landmarkCircle}
          style={{ left: '24%', top: '52%' }}
          onClick={() => handleLandmarkClick('/mir')}
          title="Мирский замок">
          <div className={styles.circleInner}>
            <img src={mirImage} alt="Мирский замок" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.landmarkCircle}
          style={{ left: '17%', top: '66%' }}
          onClick={() => handleLandmarkClick('/brest')}
          title="Брестская крепость">
          <div className={styles.circleInner}>
            <img src={brestImage} alt="Брестская крепость" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.landmarkCircle}
          style={{ left: '68%', top: '70%' }}
          onClick={() => handleLandmarkClick('/palace')}
          title="Дворец Румянцевых-Паскевичей">
          <div className={styles.circleInner}>
            <img src={castleImage} alt="Дворец Румянцевых-Паскевичей" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.landmarkCircle}
          style={{ left: '43%', top: '36%' }}
          onClick={() => handleLandmarkClick('/naroch')}
          title="Нарочь">
          <div className={styles.circleInner}>
            <img src={Naroch} alt="Нарочь" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.landmarkCircle}
          style={{ left: '60%', top: '43%' }}
          onClick={() => handleLandmarkClick('/hatyn')}
          title="Хатынь">
          <div className={styles.circleInner}>
            <img src={Khatyn} alt="Хатынь" className={styles.landmarkImage} />
          </div>
        </div>

        <div className={styles.textBel}>Беларусь</div>
      </div>

      {/* Список категорий */}
      <div className={styles.categoriesPanel}>
        {/* Верхняя часть — список и поиск */}
        <div className={styles.categoriesContent}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Поиск..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <List className={styles.categoriesList}>
            {filteredCategories.map((category) => (
              <div key={category.name} className={styles.categoryItem}>
                <ListItemButton
                  onClick={() => toggleCategory(category.name)}
                  className={styles.categoryHeader}
                >
                  <ListItemText primary={category.name} />
                  {openCategory === category.name ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openCategory === category.name}>
                  <List className={styles.itemsList}>
                    {category.items.map((item) => (
                      <ListItem
                        key={item}
                        disablePadding
                      >
                        <ListItemButton
                          className={styles.listItem}
                          onClick={() => handleItemClick(item)}
                          selected={selectedItem === item}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </div>
      </div>
      {/* кнопка пройти тест */}
      <div className={styles.testButtonContainer}>
        <Button
          onClick={handleTestClick}
          className={styles.testButton}
        >
          Пройти тест
        </Button>
      </div>

    </main>
  );
};

export { CountryIntro };