import React from 'react';
import { Home, MapPin, Compass } from 'lucide-react';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__background">
        <div className="not-found__decorative-elements">
          <div className="compass compass--top-left"></div>
          <div className="compass compass--bottom-right"></div>
        </div>
        
        <div className="not-found__content">
          <div className="parchment">
            <div className="parchment__content">
              <div className="not-found__icon">
                <MapPin size={48} />
              </div>
              
              <h1 className="not-found__title">
                Страница не найдена
              </h1>
              
              <div className="not-found__number">404</div>
              
              <p className="not-found__description">
                Кажется, Вы заблудились в просторах нашего сайта. 
                Данная территория еще не исследована или была перемещена 
                в другое место на карте.
              </p>
              
              <div className="not-found__actions">
                <button className="btn btn--primary" onClick={() => window.history.back()}>
                  <Compass size={20} />
                  Вернуться назад
                </button>
                
                <button className="btn btn--secondary" onClick={() => window.location.href = '/'}>
                  <Home size={20} />
                  На главную
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;