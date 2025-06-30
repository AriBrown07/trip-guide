import React, { useState } from 'react';
import { Typography, Button, Box, TextField, List, ListItem, Collapse, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore, ExpandLess, Search } from '@mui/icons-material';
import styles from './CountryIntro.module.scss';
import map from "../../pics/Belarus.png";
import papyrus from "../../pics/papyrus.png";
import touch from "../../pics/touch.png";

const CountryIntro: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const categories = [
    {
      name: 'Личности',
      items: ['Франциск Скорина', 'Якуб Колас', 'Василь Быков', 'Максим Богданович']
    },
    {
      name: 'События',
      items: ['Образование ВКЛ', 'Битва под Грюнвальдом', 'Восстание Калиновского']
    },
    {
      name: 'Места',
      items: ['Несвижский замок', 'Мирский замок', 'Беловежская пуща']
    },
    {
      name: 'Культура',
      items: ['Купалье', 'Масленица', 'Слуцкие пояса']
    }
  ];

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };
  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    // Здесь можно добавить логику для отображения деталей о выбранном элементе
    console.log(`Выбрано: ${itemName}`);
  };
  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
  )}));

  return (
    <main className={styles.mainContent}>
            <div className={styles.textBox}>
            <img
                src={papyrus}
                alt="text"
                className={styles.textImage}
            />
            <div className={styles.overlayText}>
                Нажмите на любую<br/>иконку, расположенную<br/>на мини-стране, чтобы<br/>узнать больше об<br/>изображенной на ней<br/>достопримечательности<br/>
                <img src={touch} alt="тык" />
            </div>
            </div>
            {/* Карта */}
            <div className={styles.mapContainer}>
            <img 
                src= {map}
                alt="Карта Беларуси" 
                className={styles.mapImage}
            />
            </div>

            {/* Список категорий */}
            <div className={styles.categoriesPanel}>
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
    </main>
  );
};

export {CountryIntro};