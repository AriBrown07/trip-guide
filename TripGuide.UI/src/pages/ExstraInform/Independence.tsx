import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Flag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Independence.scss';

// Замените пути ниже на актуальные пути к вашим изображениям
import independenceImage1 from './den-nez-rb.jpg'; // Фото празднования
import independenceImage2 from './large_gerb_322e195415.jpg'; // Государственные символы
import independenceImage3 from './maxresdefault.jpg';  // Праздничный салют

const Independence: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      url: independenceImage1,
      alt: 'Празднование Дня независимости'
    },
    {
      url: independenceImage2,
      alt: 'Государственные символы Беларуси'
    },
    {
      url: independenceImage3,
      alt: 'Праздничный салют в Минске'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="independence-page">
      <header className="independence-header">
        <Link to="/map" className="back-button">
          <ArrowLeft size={24} />
          Назад
        </Link>
        <h1>День независимости Беларуси</h1>
      </header>

      <div className="independence-content">
        <aside className="independence-sidebar">
          <div className="location-card">
            <MapPin className="location-icon" />
            <div className="location-text">
              <h2>День</h2>
              <h2>независимости</h2>
            </div>
          </div>
          
          <div className="info-cards">
            <div className="info-card">
              <Calendar className="info-icon" />
              <div>
                <h3>Дата празднования</h3>
                <p>3 июля</p>
              </div>
            </div>
            
            <div className="info-card">
              <Users className="info-icon" />
              <div>
                <h3>Значение</h3>
                <p>Суверенитет страны</p>
              </div>
            </div>
            
            <div className="info-card">
              <Flag className="info-icon" />
              <div>
                <h3>Символ</h3>
                <p>Государственность</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="independence-main">
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
              День независимости Беларуси отмечается 3 июля в честь освобождения Минска от немецко-фашистских 
              захватчиков в 1944 году. Этот государственный праздник символизирует свободу, суверенитет и 
              независимость белорусского народа. Дата была выбрана не случайно - она отражает важнейший момент 
              в истории страны, когда Беларусь обрела путь к самостоятельному развитию.
            </p>
            
            <p>
              Праздник был учрежден в 1996 году и с тех пор является главным национальным праздником страны. 
              В этот день по всей Беларуси проходят торжественные мероприятия, военные парады, концерты и 
              народные гуляния. Особенно масштабные празднования происходят в Минске, где вечером устраивают 
              грандиозный салют.
            </p>

            <h3>Традиции празднования</h3>
            <p>
              День независимости - это время, когда белорусы особенно гордятся своей страной и ее достижениями. 
              Традиционно в этот день проходят возложения цветов к памятникам воинам-освободителям, чествование 
              ветеранов Великой Отечественной войны. На главных площадях городов организуются концерты с участием 
              лучших творческих коллективов страны.
            </p>

            <p>
              Важной частью праздника является демонстрация единства народа и власти. Президент страны выступает 
              с поздравительной речью, вручаются государственные награды. Вечером улицы городов наполняются 
              праздничной атмосферой - люди выходят на прогулки, участвуют в массовых мероприятиях, наслаждаются 
              фейерверками.
            </p>

            <div className="traditions-grid">
              <div className="tradition-card">
                <h4>Военный парад</h4>
                <p>Торжественное шествие военной техники и войск по главным улицам Минска</p>
              </div>
              <div className="tradition-card">
                <h4>Концерты</h4>
                <p>Выступления звезд белорусской эстрады и народных коллективов</p>
              </div>
              <div className="tradition-card">
                <h4>Народные гуляния</h4>
                <p>Праздничные мероприятия в парках и на площадях по всей стране</p>
              </div>
              <div className="tradition-card">
                <h4>Салют</h4>
                <p>Грандиозный фейерверк в столице и других крупных городах</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Independence;