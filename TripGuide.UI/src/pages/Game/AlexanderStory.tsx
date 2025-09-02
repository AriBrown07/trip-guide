import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Crown, Sword, Shield, Star, Gem, Award, BookOpen, Zap, Users, Map, Clock, Trophy, Gift, MessageCircle } from 'lucide-react';
import './AlexanderStory.scss';

interface Character {
    id: string;
    name: string;
    title: string;
    image: string;
    relationship: number;
    trust: number;
    influence: number;
    personality: string[];
    backstory: string;
    currentMood: 'happy' | 'neutral' | 'angry' | 'sad' | 'excited';
    specialAbility: string;
}

interface StoryChoice {
    id: number;
    text: string;
    consequence: string;
    romancePoints: number;
    strategyPoints?: number;
    intelligencePoints?: number;
    charismaPoints?: number;
    nextScene: number;
    cost?: number;
    timeRequired?: number;
    affectsCharacter?: {
        id: string;
        relationship: number;
        trust: number;
    }[];
    requiresStat?: {
        type: 'intelligence' | 'charisma' | 'strategy';
        value: number;
    };
    requiresItem?: string;
    unlockCharacter?: string;
}

interface StoryScene {
    id: number;
    title: string;
    location: string;
    timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
    background: string;
    characters: string[];
    mainCharacter: string;
    dialogue: string;
    narration?: string;
    choices: StoryChoice[];
    isEnding?: boolean;
    weatherEffect?: 'rain' | 'storm' | 'snow' | 'fog';
    musicMood?: 'epic' | 'romantic' | 'tense' | 'peaceful';
}

interface GameItem {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    rarity: 'common' | 'rare' | 'legendary';
}

interface AlexanderStoryProps {
    onBack: () => void;
}

const AlexanderStory: React.FC<AlexanderStoryProps> = ({ onBack }) => {
    const [currentScene, setCurrentScene] = useState(1);
    const [romanceLevel, setRomanceLevel] = useState(0);
    const [userDiamonds, setUserDiamonds] = useState(150);
    const [storyProgress, setStoryProgress] = useState(0);
    const [showDialogue, setShowDialogue] = useState(false);
    const [gameTime, setGameTime] = useState(0); // В минутах игрового времени
    const [reputation, setReputation] = useState(50); // Репутация в армии

    const [playerStats, setPlayerStats] = useState({
        intelligence: 2,
        charisma: 2,
        strategy: 2,
        leadership: 1,
        diplomacy: 1
    });

    const [inventory, setInventory] = useState<GameItem[]>([
        {
            id: 'scroll',
            name: 'Древний свиток',
            description: 'Содержит мудрость философов',
            icon: <BookOpen size={16} />,
            rarity: 'common'
        }
    ]);

    const [characters, setCharacters] = useState<Character[]>([
        {
            id: 'alexander',
            name: 'Александр Великий',
            title: 'Царь Македонии',
            image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
            relationship: 3,
            trust: 2,
            influence: 5,
            personality: ['Амбициозный', 'Харизматичный', 'Импульсивный', 'Гениальный'],
            backstory: 'Сын Филиппа II, ученик Аристотеля, мечтает покорить весь известный мир.',
            currentMood: 'excited',
            specialAbility: 'Вдохновение войск'
        },
        {
            id: 'hephaestion',
            name: 'Гефестион',
            title: 'Ближайший друг царя',
            image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
            relationship: 1,
            trust: 1,
            influence: 3,
            personality: ['Верный', 'Ревнивый', 'Благородный'],
            backstory: 'Детский друг Александра, его правая рука и возможно больше чем друг.',
            currentMood: 'neutral',
            specialAbility: 'Личная охрана'
        },
        {
            id: 'parmenion',
            name: 'Парменион',
            title: 'Опытный генерал',
            image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
            relationship: 0,
            trust: 0,
            influence: 4,
            personality: ['Осторожный', 'Мудрый', 'Консервативный'],
            backstory: 'Ветеран войн Филиппа II, не всегда согласен с рискованными планами Александра.',
            currentMood: 'neutral',
            specialAbility: 'Военная тактика'
        },
        {
            id: 'olympias',
            name: 'Олимпиада',
            title: 'Мать Александра',
            image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
            relationship: 0,
            trust: 0,
            influence: 3,
            personality: ['Властная', 'Мистическая', 'Защитная'],
            backstory: 'Царица Эпира, верит в божественное происхождение сына.',
            currentMood: 'neutral',
            specialAbility: 'Политическое влияние'
        }
    ]);

    const [unlockedCharacters, setUnlockedCharacters] = useState(['alexander', 'hephaestion']);
    const [currentWeather, setCurrentWeather] = useState<'clear' | 'rain' | 'storm' | 'fog'>('clear');

    const storyScenes: StoryScene[] = [
        {
            id: 1,
            title: 'Совет перед битвой',
            location: 'Царский шатер',
            timeOfDay: 'evening',
            background: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
            characters: ['alexander', 'hephaestion', 'parmenion'],
            mainCharacter: 'alexander',
            narration: 'Македонский лагерь у реки Граник, 334 год до н.э. В царском шатре собрался военный совет. Александр изучает карты, его глаза горят предвкушением битвы. Завтра решится судьба похода в Азию...',
            dialogue: 'Друзья мои! Завтра мы пересечем Рубикон истории. Персы ждут нас на противоположном берегу, но я вижу в их глазах страх. Что скажете, мой верный советник?',
            musicMood: 'epic',
            choices: [
                {
                    id: 1,
                    text: 'Предложить ночную атаку для внезапности',
                    consequence: 'Александр восхищен вашей дерзостью, но Парменион хмурится',
                    romancePoints: 3,
                    strategyPoints: 2,
                    nextScene: 2,
                    timeRequired: 30,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 2, trust: 1 },
                        { id: 'parmenion', relationship: -1, trust: -1 }
                    ]
                },
                {
                    id: 2,
                    text: 'Изучить местность и найти брод',
                    consequence: 'Мудрый совет впечатляет всех присутствующих',
                    romancePoints: 1,
                    intelligencePoints: 2,
                    nextScene: 3,
                    timeRequired: 60,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 1, trust: 2 },
                        { id: 'parmenion', relationship: 2, trust: 1 }
                    ]
                },
                {
                    id: 3,
                    text: 'Предложить дипломатическое решение (15 💎)',
                    consequence: 'Неожиданное предложение заставляет всех задуматься',
                    romancePoints: 1,
                    charismaPoints: 2,
                    nextScene: 4,
                    cost: 15,
                    timeRequired: 45,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 0, trust: 1 }
                    ]
                },
                {
                    id: 4,
                    text: 'Спросить мнение Гефестиона',
                    consequence: 'Гефестион благодарен за внимание к его мнению',
                    romancePoints: 0,
                    charismaPoints: 1,
                    nextScene: 5,
                    affectsCharacter: [
                        { id: 'hephaestion', relationship: 2, trust: 1 }
                    ],
                    unlockCharacter: 'hephaestion'
                }
            ]
        },
        {
            id: 2,
            title: 'Ночь перед битвой',
            location: 'Берег реки Граник',
            timeOfDay: 'night',
            background: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
            characters: ['alexander'],
            mainCharacter: 'alexander',
            weatherEffect: 'fog',
            narration: 'Туман стелется над рекой. Александр стоит на берегу один, его силуэт освещен лунным светом. Он размышляет о предстоящей битве и своей судьбе...',
            dialogue: 'Ты был прав насчет ночной атаки. Но знаешь... иногда я думаю, не слишком ли я тороплюсь? Отец завоевывал Грецию годами, а я хочу покорить Азию за месяцы.',
            musicMood: 'romantic',
            choices: [
                {
                    id: 1,
                    text: 'Поддержать его амбиции',
                    consequence: 'Александр чувствует вашу поддержку',
                    romancePoints: 4,
                    charismaPoints: 1,
                    nextScene: 6,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 3, trust: 2 }
                    ]
                },
                {
                    id: 2,
                    text: 'Предложить быть осторожнее',
                    consequence: 'Александр ценит вашу заботу о нем',
                    romancePoints: 2,
                    intelligencePoints: 1,
                    nextScene: 7,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 1, trust: 3 }
                    ]
                },
                {
                    id: 3,
                    text: 'Рассказать о своих чувствах (требуется Харизма 3)',
                    consequence: 'Откровенный разговор сближает вас',
                    romancePoints: 6,
                    nextScene: 8,
                    requiresStat: { type: 'charisma', value: 3 },
                    affectsCharacter: [
                        { id: 'alexander', relationship: 4, trust: 3 }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Разведка местности',
            location: 'Холмы у реки',
            timeOfDay: 'dawn',
            background: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
            characters: ['alexander', 'parmenion'],
            mainCharacter: 'alexander',
            narration: 'Рассвет. Вы с небольшим отрядом изучаете местность. Парменион указывает на слабые места в обороне персов, а Александр внимательно слушает.',
            dialogue: 'Превосходная работа! Ты нашел именно то, что нам нужно. Парменион, что думаешь об этом плане?',
            musicMood: 'peaceful',
            choices: [
                {
                    id: 1,
                    text: 'Предложить координированную атаку',
                    consequence: 'План принят единогласно',
                    romancePoints: 2,
                    strategyPoints: 3,
                    nextScene: 9,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 2, trust: 2 },
                        { id: 'parmenion', relationship: 3, trust: 2 }
                    ]
                },
                {
                    id: 2,
                    text: 'Дать Пармениону возглавить операцию',
                    consequence: 'Парменион удивлен и благодарен',
                    romancePoints: 1,
                    charismaPoints: 2,
                    nextScene: 10,
                    affectsCharacter: [
                        { id: 'parmenion', relationship: 4, trust: 3 }
                    ],
                    unlockCharacter: 'parmenion'
                }
            ]
        },
        {
            id: 6,
            title: 'Момент близости',
            location: 'Царский шатер',
            timeOfDay: 'night',
            background: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
            characters: ['alexander'],
            mainCharacter: 'alexander',
            narration: 'Александр приглашает вас в свой шатер. Свечи создают интимную атмосферу. Он наливает вино и смотрит на вас с особой теплотой...',
            dialogue: 'Знаешь, среди всех моих приближенных только ты понимаешь мои мечты. Когда я смотрю на звезды, я вижу не просто небо, а карту будущих завоеваний. А что видишь ты?',
            musicMood: 'romantic',
            choices: [
                {
                    id: 1,
                    text: 'Признаться в своих чувствах',
                    consequence: 'Александр отвечает взаимностью',
                    romancePoints: 8,
                    nextScene: 11,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 5, trust: 4 }
                    ]
                },
                {
                    id: 2,
                    text: 'Поговорить о будущем империи',
                    consequence: 'Глубокий разговор о планах',
                    romancePoints: 3,
                    intelligencePoints: 2,
                    nextScene: 12,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 2, trust: 3 }
                    ]
                },
                {
                    id: 3,
                    text: 'Подарить древний свиток',
                    consequence: 'Александр тронут вашим подарком',
                    romancePoints: 4,
                    nextScene: 13,
                    requiresItem: 'scroll',
                    affectsCharacter: [
                        { id: 'alexander', relationship: 3, trust: 2 }
                    ]
                }
            ]
        },
        {
            id: 11,
            title: 'Клятва верности',
            location: 'Царский шатер',
            timeOfDay: 'night',
            background: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
            characters: ['alexander'],
            mainCharacter: 'alexander',
            narration: 'Александр берет ваши руки в свои. Его глаза сияют в свете свечей. Этот момент изменит все...',
            dialogue: 'Клянусь перед богами, что ты будешь рядом со мной, когда я стану владыкой мира. Не как слуга, а как... тот, кто дорог моему сердцу больше всех сокровищ Персии.',
            musicMood: 'romantic',
            choices: [
                {
                    id: 1,
                    text: 'Дать клятву взаимности',
                    consequence: 'Ваша связь становится нерушимой',
                    romancePoints: 10,
                    nextScene: 14,
                    affectsCharacter: [
                        { id: 'alexander', relationship: 5, trust: 5 }
                    ]
                }
            ],
            isEnding: true
        }
    ];

    const getCurrentScene = () => {
        return storyScenes.find(scene => scene.id === currentScene) || storyScenes[0];
    };

    const getCharacter = (id: string) => {
        return characters.find(char => char.id === id);
    };

    const updateCharacterRelationship = (characterId: string, relationshipChange: number, trustChange: number) => {
        setCharacters(prev => prev.map(char =>
            char.id === characterId
                ? {
                    ...char,
                    relationship: Math.max(0, Math.min(5, char.relationship + relationshipChange)),
                    trust: Math.max(0, Math.min(5, char.trust + trustChange)),
                    currentMood: relationshipChange > 0 ? 'happy' : relationshipChange < 0 ? 'angry' : char.currentMood
                }
                : char
        ));
    };

    const handleChoice = (choice: StoryChoice) => {
        // Проверка стоимости
        if (choice.cost && choice.cost > userDiamonds) {
            alert('Недостаточно алмазов для этого выбора!');
            return;
        }

        // Проверка требований к характеристикам
        if (choice.requiresStat && playerStats[choice.requiresStat.type] < choice.requiresStat.value) {
            alert(`Недостаточно уровня ${choice.requiresStat.type} для этого выбора!`);
            return;
        }

        // Проверка наличия предмета
        if (choice.requiresItem && !inventory.find(item => item.id === choice.requiresItem)) {
            alert('У вас нет необходимого предмета для этого выбора!');
            return;
        }

        // Списание алмазов
        setUserDiamonds(prev => prev - (choice.cost ?? 0));
        setGameTime(prev => prev + (choice.timeRequired ?? 0));

        // Удаление использованного предмета
        if (choice.requiresItem) {
            setInventory(prev => prev.filter(item => item.id !== choice.requiresItem));
        }

        // Обновление времени


        // Обновление характеристик
        setPlayerStats(prev => ({
            ...prev,
            intelligence: Math.min(5, prev.intelligence + (choice.intelligencePoints || 0)),
            charisma: Math.min(5, prev.charisma + (choice.charismaPoints || 0)),
            strategy: Math.min(5, prev.strategy + (choice.strategyPoints || 0))
        }));

        // Обновление отношений с персонажами
        if (choice.affectsCharacter) {
            choice.affectsCharacter.forEach(effect => {
                updateCharacterRelationship(effect.id, effect.relationship, effect.trust);
            });
        }

        // Разблокировка персонажей
        if (choice.unlockCharacter && !unlockedCharacters.includes(choice.unlockCharacter)) {
            setUnlockedCharacters(prev => [...prev, choice.unlockCharacter!]);
        }

        // Обновление уровня романтики
        setRomanceLevel(prev => Math.max(0, Math.min(10, prev + choice.romancePoints)));

        // Обновление прогресса
        setStoryProgress(prev => Math.min(100, prev + 15));

        // Обновление репутации
        setReputation(prev => Math.max(0, Math.min(100, prev + (choice.romancePoints > 2 ? 5 : choice.romancePoints < 0 ? -3 : 2))));

        setTimeout(() => {
            setCurrentScene(choice.nextScene);
            setShowDialogue(false);
        }, 2500);
    };

    const renderHearts = (level: number, max: number = 5) => {
        return Array.from({ length: max }, (_, i) => (
            <Heart
                key={i}
                size={16}
                className={i < level ? 'heart-filled' : 'heart-empty'}
                fill={i < level ? '#e74c3c' : 'none'}
            />
        ));
    };

    const renderStatBar = (stat: number, icon: React.ReactNode, label: string) => {
        return (
            <div className="stat-bar" title={label}>
                <div className="stat-icon">{icon}</div>
                <div className="stat-points">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className={`stat-point ${i < stat ? 'active' : ''}`}></div>
                    ))}
                </div>
                <span className="stat-value">{stat}</span>
            </div>
        );
    };

    const getTimeOfDayIcon = (timeOfDay: string) => {
        switch (timeOfDay) {
            case 'dawn': return '🌅';
            case 'morning': return '🌄';
            case 'afternoon': return '☀️';
            case 'evening': return '🌆';
            case 'night': return '🌙';
            default: return '⏰';
        }
    };

    const getWeatherIcon = (weather: string) => {
        switch (weather) {
            case 'rain': return '🌧️';
            case 'storm': return '⛈️';
            case 'fog': return '🌫️';
            default: return '☀️';
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDialogue(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, [currentScene]);

    // Случайные события погоды
    useEffect(() => {
        const weatherTimer = setInterval(() => {
            const weathers = ['clear', 'rain', 'fog'];
            setCurrentWeather(weathers[Math.floor(Math.random() * weathers.length)] as any);
        }, 30000);
        return () => clearInterval(weatherTimer);
    }, []);

    const scene = getCurrentScene();
    const mainChar = getCharacter(scene.mainCharacter);

    return (
        <div className={`alexander-story ${currentWeather}`}>
            <div className="story-header">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={24} />
                </button>

                <div className="story-info">
                    <h1>Путь Завоевателя</h1>
                    <div className="scene-info">
                        <span className="scene-title">{scene.title}</span>
                        <div className="scene-details">
                            <span>{getTimeOfDayIcon(scene.timeOfDay)} {scene.location}</span>
                            <span>⏱️ {Math.floor(gameTime / 60)}ч {gameTime % 60}м</span>
                            <span>{getWeatherIcon(currentWeather)}</span>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${storyProgress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="story-stats">
                    <div className="romance-level">
                        <span>Романтика</span>
                        {renderHearts(romanceLevel, 10)}
                    </div>
                    <div className="reputation">
                        <Trophy size={16} />
                        <span>{reputation}</span>
                    </div>
                    <div className="diamonds">
                        <Gem size={20} />
                        <span>{userDiamonds}</span>
                    </div>
                </div>
            </div>

            <div className="player-stats">
                {renderStatBar(playerStats.intelligence, <BookOpen size={16} />, 'Интеллект')}
                {renderStatBar(playerStats.charisma, <Heart size={16} />, 'Харизма')}
                {renderStatBar(playerStats.strategy, <Zap size={16} />, 'Стратегия')}
            </div>

            <div className="characters-panel">
                <h3><Users size={16} /> Персонажи</h3>
                <div className="characters-list">
                    {characters.filter(char => unlockedCharacters.includes(char.id)).map(char => (
                        <div key={char.id} className={`character-mini ${char.currentMood}`}>
                            <img src={char.image} alt={char.name} />
                            <div className="character-mini-info">
                                <span className="character-mini-name">{char.name}</span>
                                <div className="character-mini-stats">
                                    <div className="mini-hearts">{renderHearts(char.relationship)}</div>
                                    <div className="trust-indicator">
                                        <Shield size={12} />
                                        <span>{char.trust}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="story-content">
                <div
                    className="story-background"
                    style={{ backgroundImage: `url(${scene.background})` }}
                >
                    <div className="story-overlay"></div>
                    {scene.weatherEffect && <div className={`weather-effect ${scene.weatherEffect}`}></div>}
                </div>

                <div className="character-container">
                    {scene.characters.filter(charId => unlockedCharacters.includes(charId)).map(charId => {
                        const character = getCharacter(charId);
                        if (!character) return null;

                        return (
                            <div
                                key={charId}
                                className={`character-image ${charId === scene.mainCharacter ? 'main-character' : 'side-character'} mood-${character.currentMood}`}
                            >
                                <img src={character.image} alt={character.name} />
                                <div className="character-glow"></div>
                                <div className="character-mood-indicator">
                                    {character.currentMood === 'happy' && '😊'}
                                    {character.currentMood === 'angry' && '😠'}
                                    {character.currentMood === 'sad' && '😢'}
                                    {character.currentMood === 'excited' && '🤩'}
                                    {character.currentMood === 'neutral' && '😐'}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="dialogue-container">
                    {scene.narration && (
                        <div className="narration">
                            <p>{scene.narration}</p>
                        </div>
                    )}

                    {showDialogue && mainChar && (
                        <div className="dialogue-box">
                            <div className="character-name">
                                <Crown size={16} />
                                {mainChar.name}
                                <div className="character-relationship">
                                    {renderHearts(mainChar.relationship)}
                                </div>
                            </div>
                            <div className="dialogue-text">
                                {scene.dialogue}
                            </div>
                        </div>
                    )}
                </div>

                {showDialogue && scene.choices.length > 0 && (
                    <div className="choices-container">
                        {scene.choices.map((choice) => {
                            const isDisabled = Boolean(
                                (choice.cost !== undefined && choice.cost > userDiamonds) ||
                                (choice.requiresStat && playerStats[choice.requiresStat.type] < choice.requiresStat.value) ||
                                (choice.requiresItem && !inventory.find(item => item.id === choice.requiresItem))
                            );

                            return (
                                <button
                                    key={choice.id}
                                    className={`choice-btn ${choice.cost ? 'premium-choice' : ''} ${isDisabled ? 'disabled-choice' : ''}`}
                                    onClick={() => handleChoice(choice)}
                                    disabled={isDisabled}
                                >
                                    <div className="choice-content">
                                        <div className="choice-text">
                                            {choice.text}
                                            {choice.timeRequired && (
                                                <span className="time-required">
                                                    <Clock size={12} /> {choice.timeRequired}м
                                                </span>
                                            )}
                                        </div>

                                        <div className="choice-requirements">
                                            {choice.cost && (
                                                <span className="choice-cost">
                                                    <Gem size={14} /> {choice.cost}
                                                </span>
                                            )}
                                            {choice.requiresStat && (
                                                <span className={`stat-requirement ${playerStats[choice.requiresStat.type] < choice.requiresStat.value ? 'not-met' : 'met'}`}>
                                                    {choice.requiresStat.type === 'intelligence' && <BookOpen size={12} />}
                                                    {choice.requiresStat.type === 'charisma' && <Heart size={12} />}
                                                    {choice.requiresStat.type === 'strategy' && <Zap size={12} />}
                                                    {choice.requiresStat.value}
                                                </span>
                                            )}
                                            {choice.requiresItem && (
                                                <span className={`item-requirement ${!inventory.find(item => item.id === choice.requiresItem) ? 'not-met' : 'met'}`}>
                                                    <Gift size={12} /> Требуется предмет
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="choice-effects">
                                        {choice.romancePoints !== 0 && (
                                            <div className={`effect-indicator ${choice.romancePoints > 0 ? 'positive' : 'negative'}`}>
                                                <Heart size={12} />
                                                {choice.romancePoints > 0 ? '+' : ''}{choice.romancePoints}
                                            </div>
                                        )}
                                        {choice.intelligencePoints && choice.intelligencePoints > 0 && (
                                            <div className="effect-indicator positive">
                                                <BookOpen size={12} />
                                                +{choice.intelligencePoints}
                                            </div>
                                        )}
                                        {choice.charismaPoints && choice.charismaPoints > 0 && (
                                            <div className="effect-indicator positive">
                                                <MessageCircle size={12} />
                                                +{choice.charismaPoints}
                                            </div>
                                        )}
                                        {choice.strategyPoints && choice.strategyPoints > 0 && (
                                            <div className="effect-indicator positive">
                                                <Zap size={12} />
                                                +{choice.strategyPoints}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {scene.isEnding && (
                    <div className="ending-overlay">
                        <div className="ending-content">
                            <Star className="ending-star" size={48} />
                            <h2>Глава завершена</h2>
                            <p>Ваши отношения с Александром достигли нового уровня</p>
                            <div className="ending-stats">
                                <div className="ending-stat">
                                    <span>Уровень романтики:</span>
                                    <div className="ending-hearts">{renderHearts(romanceLevel, 10)}</div>
                                </div>
                                <div className="ending-stat">
                                    <span>Репутация в армии:</span>
                                    <div className="reputation-bar">
                                        <div className="reputation-fill" style={{ width: `${reputation}%` }}></div>
                                        <span>{reputation}/100</span>
                                    </div>
                                </div>
                                <div className="unlocked-characters">
                                    <span>Разблокированные персонажи:</span>
                                    <div className="character-avatars">
                                        {characters.filter(char => unlockedCharacters.includes(char.id)).map(char => (
                                            <img key={char.id} src={char.image} alt={char.name} title={char.name} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="continue-btn" onClick={onBack}>
                                Продолжить приключение
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {inventory.length > 0 && (
                <div className="inventory-panel">
                    <h3><Gift size={16} /> Инвентарь</h3>
                    <div className="inventory-items">
                        {inventory.map(item => (
                            <div key={item.id} className={`inventory-item ${item.rarity}`} title={item.description}>
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlexanderStory;