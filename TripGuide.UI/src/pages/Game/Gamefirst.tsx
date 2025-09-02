import React, { useState } from 'react';
import { Crown, Heart, Star, Sword, Shield, Gem, Lock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Gamefirst.scss';

interface Character {
  id: number;
  name: string;
  title: string;
  era: string;
  imageUrl: string;
  description: string;
  personality: string[];
  romanceLevel: number;
  isLocked: boolean;
  story: string;
  specialSkill: string;
}

const Gamefirst: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [userDiamonds, setUserDiamonds] = useState(150);
  const navigate = useNavigate();

  const characters: Character[] = [
    {
      id: 1,
      name: 'Александр Великий',
      title: 'Македонский Завоеватель',
      era: '356-323 до н.э.',
      imageUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Великий полководец, покоривший полмира. Его амбиции не знают границ, как и его страсть.',
      personality: ['Амбициозный', 'Харизматичный', 'Решительный'],
      romanceLevel: 3,
      isLocked: false,
      story: 'Путь Завоевателя',
      specialSkill: 'Военная стратегия'
    },
    {
      id: 2,
      name: 'Клеопатра VII',
      title: 'Последняя Фараон',
      era: '69-30 до н.э.',
      imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Мудрая и прекрасная правительница Египта. Её красота и ум покоряли императоров.',
      personality: ['Мудрая', 'Обольстительная', 'Властная'],
      romanceLevel: 5,
      isLocked: false,
      story: 'Тайны Нила',
      specialSkill: 'Дипломатия'
    },
    {
      id: 3,
      name: 'Леонардо да Винчи',
      title: 'Гений Возрождения',
      era: '1452-1519',
      imageUrl: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Художник, изобретатель, мыслитель. В его глазах горит огонь творчества и страсти к познанию.',
      personality: ['Творческий', 'Загадочный', 'Гениальный'],
      romanceLevel: 2,
      isLocked: false,
      story: 'Секреты Мастера',
      specialSkill: 'Изобретательство'
    },
    {
      id: 4,
      name: 'Жанна д\'Арк',
      title: 'Орлеанская Дева',
      era: '1412-1431',
      imageUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Святая воительница, ведомая божественным призванием. Её вера сильнее любых сомнений.',
      personality: ['Отважная', 'Преданная', 'Духовная'],
      romanceLevel: 1,
      isLocked: true,
      story: 'Божественное Призвание',
      specialSkill: 'Боевое искусство'
    },
    {
      id: 5,
      name: 'Наполеон Бонапарт',
      title: 'Император Франции',
      era: '1769-1821',
      imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Великий стратег и реформатор. За суровой внешностью скрывается романтическая душа.',
      personality: ['Стратег', 'Амбициозный', 'Романтичный'],
      romanceLevel: 4,
      isLocked: true,
      story: 'Империя Сердца',
      specialSkill: 'Лидерство'
    },
    {
      id: 6,
      name: 'Мария Антуанетта',
      title: 'Королева Франции',
      era: '1755-1793',
      imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Королева моды и роскоши. Её жизнь - это бал, который может закончиться трагедией.',
      personality: ['Элегантная', 'Капризная', 'Чувственная'],
      romanceLevel: 0,
      isLocked: true,
      story: 'Версальские Интриги',
      specialSkill: 'Этикет'
    }
  ];

  const handleCharacterSelect = (character: Character) => {
    if (character.isLocked) {
      if (userDiamonds >= 50) {
        setUserDiamonds(prev => prev - 50);
        const updatedCharacter = { ...character, isLocked: false };
        setSelectedCharacter(updatedCharacter);
      }
    } else {
      setSelectedCharacter(character);
    }
  };

  const renderHearts = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Heart
        key={i}
        size={16}
        className={i < level ? 'heart-filled' : 'heart-empty'}
        fill={i < level ? '#e74c3c' : 'none'}
      />
    ));
  };

  const handleStartStory = () => {
    if (selectedCharacter) {
      navigate(`/alexanderStory/`);
    }
  };

  return (
    <div className="gamefirst-container">
      <div className="game-header">
        <div className="header-content">
          <div className="game-title">
            <Crown className="crown-icon" />
            <h1>Gamefirst: Исторические Романы</h1>
          </div>
          <div className="user-resources">
            <div className="resource-item">
              <Gem className="gem-icon" />
              <span>{userDiamonds}</span>
            </div>
            <div className="resource-item">
              <Star className="star-icon" />
              <span>∞</span>
            </div>
          </div>
        </div>
      </div>

      <div className="characters-grid">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`character-card ${character.isLocked ? 'locked' : ''} ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
            onClick={() => handleCharacterSelect(character)}
          >
            {character.isLocked && (
              <div className="lock-overlay">
                <Lock size={32} />
                <span>50 💎</span>
              </div>
            )}

            <div className="character-image">
              <img src={character.imageUrl} alt={character.name} />
              <div className="character-overlay">
                <div className="romance-level">
                  {renderHearts(character.romanceLevel)}
                </div>
              </div>
            </div>

            <div className="character-info">
              <h3 className="character-name">{character.name}</h3>
              <p className="character-title">{character.title}</p>
              <p className="character-era">{character.era}</p>

              <div className="personality-tags">
                {character.personality.map((trait, index) => (
                  <span key={index} className="personality-tag">
                    {trait}
                  </span>
                ))}
              </div>

              <div className="character-actions">
                <button className="story-btn">
                  <Play size={16} />
                  {character.story}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="character-details">
          <div className="details-content">
            <button
              className="close-btn"
              onClick={() => setSelectedCharacter(null)}
            >
              ×
            </button>

            <div className="details-header">
              <img src={selectedCharacter.imageUrl} alt={selectedCharacter.name} />
              <div className="details-info">
                <h2>{selectedCharacter.name}</h2>
                <h3>{selectedCharacter.title}</h3>
                <p className="era">{selectedCharacter.era}</p>

                <div className="romance-progress">
                  <span>Уровень романа:</span>
                  <div className="hearts">
                    {renderHearts(selectedCharacter.romanceLevel)}
                  </div>
                </div>
              </div>
            </div>

            <div className="details-body">
              <p className="description">{selectedCharacter.description}</p>

              <div className="special-skill">
                <Sword className="skill-icon" />
                <span>Особый навык: {selectedCharacter.specialSkill}</span>
              </div>

              <div className="story-actions">
                <button
                  className="primary-btn"
                  onClick={handleStartStory}
                >
                  <Play size={20} />
                  Начать историю
                </button>
              </div>

              <button className="secondary-btn">
                <Heart size={20} />
                Подарить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamefirst;