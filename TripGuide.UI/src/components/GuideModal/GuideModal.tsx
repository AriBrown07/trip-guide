import React, { useState, useEffect, useRef } from 'react';
import './GuideModal.scss';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAudioId?: string;
  attractions?: string[]; // list of attraction names to show
  defaultDescription?: string;
}

export default function GuideModal({ isOpen, onClose, defaultAudioId, attractions = [], defaultDescription = '' }: GuideModalProps) {
  const [audioId, setAudioId] = useState(defaultAudioId || '');
  const [description, setDescription] = useState(defaultDescription);
  const [isEditingId, setIsEditingId] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (defaultAudioId) setAudioId(defaultAudioId);
  }, [defaultAudioId]);

  useEffect(() => {
    if (audioId && audioId.trim() !== '') {
      setAudioUrl(`/audio/${encodeURIComponent(audioId)}.mp3`);
    } else {
      setAudioUrl(null);
    }
  }, [audioId]);

  useEffect(() => {
    setDescription(defaultDescription);
  }, [defaultDescription]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${audioId || 'guide'}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePlay = async () => {
    if (!audioUrl || !audioRef.current) return;
    audioRef.current.src = audioUrl;
    try { await audioRef.current.play(); } catch (e) { /* ignore */ }
  };

  return (
    <div className="guide-modal-overlay" role="dialog" aria-modal="true">
      <div className="guide-modal card">
        <button className="guide-modal__close" onClick={onClose} aria-label="Закрыть">×</button>

        <div className="guide-modal__hero">
          <div className="guide-illustration" aria-hidden>
            {/* simple decorative circle */}
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="72" height="72" rx="12" fill="#FFB74D" />
              <path d="M20 44c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="guide-hero-text">
            <h2>Привет, я ваш гид</h2>
            <p className="muted">Я буду сопровождать вас на протяжении всего тура — рассказывать истории, давать контекст и помогать не пропустить главное.</p>
          </div>
        </div>

        <div className="guide-modal__body">
          <section className="attractions">
            <h4>Достопримечательности в маршруте</h4>
            {attractions.length > 0 ? (
              <ul>
                {attractions.map((a, i) => (
                  <li key={i}>{a}</li>
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
                {!isEditingId ? (
                  <>
                    <span className="audio-id__value">{audioId || '— не задан'}</span>
                    <button className="link-edit" onClick={() => setIsEditingId(true)}>Изменить</button>
                  </>
                ) : (
                  <div className="edit-row">
                    <input value={audioId} onChange={e => setAudioId(e.target.value)} placeholder="guide-1" />
                    <button className="btn" onClick={() => setIsEditingId(false)}>Сохранить</button>
                  </div>
                )}
              </div>

              {description && (
                <div className="audio-desc">{description}</div>
              )}
            </div>

            <div className="audio-player-wrapper">
              <audio ref={audioRef} controls className="audio-player">
                <source src={audioUrl ?? ''} type="audio/mpeg" />
                Ваш браузер не поддерживает аудио.
              </audio>
            </div>

            <div className="audio-actions">
              <button className={`guide-action ${audioUrl ? '' : 'disabled'}`} onClick={handleDownload} disabled={!audioUrl}>Скачать</button>
              <button className={`guide-action ${audioUrl ? '' : 'disabled'}`} onClick={handlePlay} disabled={!audioUrl}>Прослушать</button>
              <a className={`guide-action link ${audioUrl ? '' : 'disabled'}`} href={audioUrl ?? '#'} target="_blank" rel="noreferrer" onClick={e => { if (!audioUrl) e.preventDefault(); }}>Открыть</a>
            </div>
          </section>
        </div>

        <footer className="guide-modal__footer">
          <button className="btn-secondary" onClick={onClose}>Закрыть</button>
        </footer>
      </div>
    </div>
  );
}
