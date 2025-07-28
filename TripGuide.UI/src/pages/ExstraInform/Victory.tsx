import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Flag, ArrowLeft, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Victory.scss';

// Замените пути ниже на актуальные пути к вашим изображениям
import victoryImage1 from './parad.jpg'; // Парад победы
import victoryImage2 from './pob_6786.jpg'; // Вечный огонь
import victoryImage3 from './veterans.jpg';  // Ветераны

const Victory: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      url: victoryImage1,
      alt: 'Парад Победы в Минске'
    },
    {
      url: victoryImage2,
      alt: 'Вечный огонь - символ памяти'
    },
    {
      url: victoryImage3,
      alt: 'Ветераны Великой Отечественной войны'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Функция для открытия YouTube видео
  const openYouTubeVideo = () => {
    // Замените ссылку на актуальное YouTube видео
    window.open('https://youtu.be/rZtN-6H39NU?si=yrJtVdO0weAF2Zgd', '_blank');
  };

  return (
    <div className="victory-page">
      <header className="victory-header">
        <Link to="/map" className="back-button">
          <ArrowLeft size={24} />
          Назад
        </Link>
        <h1>День Победы в Беларуси</h1>
        <button className="youtube-button" onClick={openYouTubeVideo}>
          <Youtube size={24} />
          Видео
        </button>
      </header>

      <div className="victory-content">
        <aside className="victory-sidebar">
          <div className="location-card">
            <MapPin className="location-icon" />
            <div className="location-text">
              <h2>День</h2>
              <h2>Победы</h2>
            </div>
          </div>
          
          <div className="info-cards">
            <div className="info-card">
              <Calendar className="info-icon" />
              <div>
                <h3>Дата празднования</h3>
                <p>9 мая</p>
              </div>
            </div>
            
            <div className="info-card">
              <Users className="info-icon" />
              <div>
                <h3>Значение</h3>
                <p>Память о подвиге народа</p>
              </div>
            </div>
            
            <div className="info-card">
              <Flag className="info-icon" />
              <div>
                <h3>Символ</h3>
                <p>Вечный огонь</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="victory-main">
          <div className="image-gallery">
            <button className="nav-button prev" onClick={prevImage}>
              <ChevronLeft />
            </button>
            
            <div className="image-container">
              <img 
                src={images[currentImageIndex].url} 
                alt={images[currentImageIndex].alt}
                className="main-image"
              />
              <div className="image-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <button className="nav-button next" onClick={nextImage}>
              <ChevronRight />
            </button>
          </div>

          <section className="description">
            <h2>История и значение праздника</h2>
            <p>
              День Победы в Беларуси отмечается 9 мая как один из самых важных государственных праздников. 
              Этот день посвящен победе советского народа в Великой Отечественной войне 1941-1945 годов. 
              Беларусь, как одна из наиболее пострадавших республик, особенно трепетно относится к памяти 
              о тех событиях и подвиге народа.
            </p>
            
            <p>
              В этот день по всей стране проходят торжественные мероприятия, парады, возложения цветов 
              к памятникам и мемориалам. Особое внимание уделяется ветеранам войны, которых с каждым годом 
              становится все меньше. Главные мероприятия проходят у Вечного огня и мемориального комплекса 
              "Курган Славы".
            </p>

            <h3>Традиции празднования</h3>
            <p>
              В День Победы белорусы отдают дань памяти погибшим и чествуют ветеранов. Традиционно 
              проводятся шествия "Бессмертного полка", когда люди несут фотографии своих родственников, 
              участвовавших в войне. Вечером небо озаряется праздничным салютом.
            </p>

            <p>
              Особое место в праздновании занимает акция "Память", когда молодёжь и волонтёры ухаживают 
              за воинскими захоронениями и памятниками. В школах проходят уроки мужества, а в музеях - 
              тематические выставки, посвящённые военной истории Беларуси.
            </p>

            <div className="traditions-grid">
              <div className="tradition-card">
                <h4>Парад Победы</h4>
                <p>Торжественное шествие военной техники и войск</p>
              </div>
              <div className="tradition-card">
                <h4>Минута молчания</h4>
                <p>Общенациональная минута памяти погибших</p>
              </div>
              <div className="tradition-card">
                <h4>Бессмертный полк</h4>
                <p>Шествие с портретами участников войны</p>
              </div>
              <div className="tradition-card">
                <h4>Праздничный салют</h4>
                <p>Фейерверк в честь Дня Победы</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Victory;