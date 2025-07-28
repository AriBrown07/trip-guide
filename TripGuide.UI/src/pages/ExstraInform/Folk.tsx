import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Flag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Folk.scss';

// Замените пути ниже на актуальные пути к вашим изображениям
import folkImage1 from './flag.jpg'; // Белорусский национальный флаг
import folkImage2 from './belarussian.jpg'; // Люди в национальных костюмах
import folkImage3 from './simvol.jpg';  // Традиционные белорусские символы

const Folk: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      url: folkImage1,
      alt: 'Белорусский национальный флаг'
    },
    {
      url: folkImage2,
      alt: 'Люди в национальных костюмах'
    },
    {
      url: folkImage3,
      alt: 'Традиционные белорусские символы'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="folk-page">
      <header className="folk-header">
        <Link to="/map" className="back-button">
          <ArrowLeft size={24} />
          Назад
        </Link>
        <h1>День народного единства Беларуси</h1>
      </header>

      <div className="folk-content">
        <aside className="folk-sidebar">
          <div className="location-card">
            <MapPin className="location-icon" />
            <div className="location-text">
              <h2>День народного</h2>
              <h2>единства</h2>
            </div>
          </div>
          
          <div className="info-cards">
            <div className="info-card">
              <Calendar className="info-icon" />
              <div>
                <h3>Дата празднования</h3>
                <p>17 сентября</p>
              </div>
            </div>
            
            <div className="info-card">
              <Users className="info-icon" />
              <div>
                <h3>Значение</h3>
                <p>Единство народа</p>
              </div>
            </div>
            
            <div className="info-card">
              <Flag className="info-icon" />
              <div>
                <h3>Символ</h3>
                <p>Национальная гордость</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="folk-main">
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
              День народного единства в Беларуси отмечается 17 сентября и является одним из важнейших 
              государственных праздников страны. Этот день символизирует единство белорусского народа, 
              его культурную самобытность и стремление к независимости.
            </p>
            
            <p>
              Праздник был учрежден для укрепления национального самосознания и подчеркивания важности 
              сплоченности всех граждан Беларуси независимо от их этнической принадлежности, 
              вероисповедания или политических взглядов. В этот день проходят торжественные мероприятия, 
              концерты народной музыки, выставки декоративно-прикладного искусства.
            </p>

            <h3>Традиции празднования</h3>
            <p>
              В День народного единства белорусы особенно гордятся своей историей, культурой и традициями. 
              Люди надевают национальные костюмы, участвуют в народных гуляниях, исполняют традиционные 
              песни и танцы. Особое внимание уделяется белорусскому языку, литературе и народному творчеству.
            </p>

            <p>
              Праздник объединяет людей разных поколений, напоминая о важности сохранения национальной 
              идентичности и передачи культурного наследия будущим поколениям. В школах и университетах 
              проводятся открытые уроки, посвященные истории Беларуси и ее культурным достижениям.
            </p>

            <div className="traditions-grid">
              <div className="tradition-card">
                <h4>Народные гуляния</h4>
                <p>Массовые мероприятия с участием фольклорных коллективов</p>
              </div>
              <div className="tradition-card">
                <h4>Национальные костюмы</h4>
                <p>Демонстрация богатства белорусского народного костюма</p>
              </div>
              <div className="tradition-card">
                <h4>Культурные выставки</h4>
                <p>Экспозиции народного искусства и ремесел</p>
              </div>
              <div className="tradition-card">
                <h4>Концерты</h4>
                <p>Выступления народных артистов и коллективов</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Folk;