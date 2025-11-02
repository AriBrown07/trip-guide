import React, { useRef } from 'react';
import './GuideModal.scss';

// Импортируем аудиофайл - замените на имя вашего файла
import localAudio from './voiceGid.mp3';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  attractions?: string[];
  defaultDescription?: string;
}

export default function GuideModal({ 
  isOpen, 
  onClose, 
  attractions = [], 
  defaultDescription = '' 
}: GuideModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = localAudio;
    a.download = 'audio-guide.mp3';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Ошибка воспроизведения:', error);
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="guide-modal-overlay" role="dialog" aria-modal="true">
      <div className="guide-modal card">
        <button 
          className="guide-modal__close" 
          onClick={onClose} 
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="guide-modal__hero">
          <div className="guide-illustration" aria-hidden>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="72" height="72" rx="12" fill="#FFB74D" />
              <path 
                d="M20 44c0-8.837 7.163-16 16-16s16 7.163 16 16" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="guide-hero-text">
            <h2>Привет, я ваш гид</h2>
            <p className="muted">
              Я буду сопровождать вас на протяжении всего тура — рассказывать истории, 
              давать контекст и помогать не пропустить главное.
            </p>
          </div>
        </div>

        <div className="guide-modal__body">
          <section className="attractions">
            <h4>Достопримечательности в маршруте</h4>
            {attractions.length > 0 ? (
              <ul>
                {attractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            ) : (
              <p className="muted">Список пока пуст — добавьте точки на карту.</p>
            )}
          </section>

          <section className="audio-section">
            <div className="audio-meta">
              <div className="audio-id">
                <strong>Аудиогид:</strong>
                <span className="audio-id__value">Локальный файл</span>
              </div>
              
              {defaultDescription && (
                <div className="audio-desc">{defaultDescription}</div>
              )}
            </div>

            <div className="audio-player-wrapper">
              <audio 
                ref={audioRef} 
                controls 
                className="audio-player"
              >
                <source src={localAudio} type="audio/mpeg" />
                Ваш браузер не поддерживает аудио элемент.
              </audio>
            </div>

            <div className="audio-actions">
              <button 
                className="guide-action" 
                onClick={handleDownload}
              >
                Скачать
              </button>
              <button 
                className="guide-action" 
                onClick={handlePlay}
              >
                Прослушать
              </button>
            </div>
          </section>
        </div>

        <footer className="guide-modal__footer">
          <button className="btn-secondary" onClick={onClose}>
            Закрыть
          </button>
        </footer>
      </div>
    </div>
  );
}