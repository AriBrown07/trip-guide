import React, { useState } from 'react';
import { Camera, Settings, Grid, User, Heart, MessageCircle, Bookmark, MoreHorizontal, Edit3, Plus, X, Share2 } from 'lucide-react';
import './Profile.scss';

interface Post {
  id: number;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface Story {
  id: number;
  imageUrl: string;
  title: string;
}

const Profile: React.FC = () => {
  // Основные данные профиля
  const [avatar, setAvatar] = useState<string>('');
  const [username, setUsername] = useState<string>('Новый пользователь');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState('Расскажите о себе...');
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState('posts');

  // Статистика
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0
  });

  // Обработчики для аватара
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчики для имени пользователя
  const handleUsernameEdit = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const saveUsername = () => {
    setIsEditingUsername(false);
    if (!username.trim()) {
      setUsername('Новый пользователь');
    }
  };

  // Обработчики для био
  const handleBioEdit = () => {
    setIsEditingBio(!isEditingBio);
  };

  const saveBio = () => {
    setIsEditingBio(false);
    if (!bio.trim()) {
      setBio('Расскажите о себе...');
    }
  };

  // Обработчики для постов
  const handleAddPost = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPost: Post = {
          id: Date.now(),
          imageUrl: e.target?.result as string,
          likes: 0,
          comments: 0
        };
        setPosts([...posts, newPost]);
        setStats({...stats, posts: stats.posts + 1});
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    setStats({...stats, posts: stats.posts - 1});
  };

  // Обработчики для сторис
  const handleAddStory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newStory: Story = {
          id: Date.now(),
          imageUrl: e.target?.result as string,
          title: `История ${stories.length + 1}`
        };
        setStories([...stories, newStory]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteStory = (id: number) => {
    setStories(stories.filter(story => story.id !== id));
  };

  const updateStoryTitle = (id: number, newTitle: string) => {
    setStories(stories.map(story => 
      story.id === id ? {...story, title: newTitle} : story
    ));
  };

  // Обработчик поделиться профилем
  const shareProfile = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert('Ссылка на профиль скопирована в буфер обмена!');
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-scroll">
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-container">
              {avatar ? (
                <img src={avatar} alt="Profile Avatar" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  <User size={48} />
                </div>
              )}
              <label htmlFor="avatar-upload" className="avatar-overlay">
                <Camera size={24} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatar-input"
              />
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-name-section">
              {isEditingUsername ? (
                <div className="username-edit">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="username-input"
                    autoFocus
                  />
                  <button onClick={saveUsername} className="username-save-btn">
                    Сохранить
                  </button>
                </div>
              ) : (
                <h1 className="profile-name" onClick={handleUsernameEdit}>
                  {username}
                </h1>
              )}
              <button className="settings-btn">
                <Settings size={20} />
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.posts}</span>
                <span className="stat-label">публикаций</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.followers}</span>
                <span className="stat-label">подписчиков</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.following}</span>
                <span className="stat-label">подписок</span>
              </div>
            </div>

            <div className="profile-bio">
              {isEditingBio ? (
                <div className="bio-edit">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bio-textarea"
                    rows={3}
                    autoFocus
                  />
                  <div className="bio-actions">
                    <button onClick={saveBio} className="bio-save-btn">
                      Сохранить
                    </button>
                    <button onClick={() => setIsEditingBio(false)} className="bio-cancel-btn">
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bio-display">
                  <p className="bio-text">{bio}</p>
                  <button onClick={handleBioEdit} className="bio-edit-btn">
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="profile-actions">
              <label htmlFor="post-upload" className="edit-profile-btn">
                Добавить публикацию
              </label>
              <input
                id="post-upload"
                type="file"
                accept="image/*"
                onChange={handleAddPost}
                className="hidden-input"
              />
              <button onClick={shareProfile} className="share-profile-btn">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="stories-section">
          <label htmlFor="story-upload" className="story-highlight add-story">
            <div className="story-circle">
              <Plus size={24} />
            </div>
            <span className="story-title">Добавить</span>
            <input
              id="story-upload"
              type="file"
              accept="image/*"
              onChange={handleAddStory}
              className="hidden-input"
            />
          </label>

          {stories.map((story) => (
            <div key={story.id} className="story-highlight">
              <div className="story-circle">
                <img src={story.imageUrl} alt={story.title} />
                <button 
                  onClick={() => deleteStory(story.id)} 
                  className="delete-story-btn"
                >
                  <X size={16} />
                </button>
              </div>
              <input
                type="text"
                value={story.title}
                onChange={(e) => updateStoryTitle(story.id, e.target.value)}
                className="story-title-input"
              />
            </div>
          ))}
        </div>

        <div className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <Grid size={20} />
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tagged' ? 'active' : ''}`}
            onClick={() => setActiveTab('tagged')}
          >
            <User size={20} />
          </button>
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={20} />
          </button>
        </div>

        {activeTab === 'posts' && (
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-item">
                  <img src={post.imageUrl} alt={`Post ${post.id}`} className="post-image" />
                  <div className="post-overlay">
                    <div className="post-stats">
                      <div className="post-stat">
                        <Heart size={16} fill="white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="post-stat">
                        <MessageCircle size={16} fill="white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="delete-post-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-posts">
                <Camera size={48} />
                <h3>Нет публикаций</h3>
                <p>Добавьте свою первую публикацию</p>
                <label htmlFor="post-upload" className="add-first-post-btn">
                  Добавить публикацию
                </label>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tagged' && (
          <div className="empty-tab">
            <User size={48} />
            <h3>Фото с вами</h3>
            <p>Когда люди отмечают вас на фото, они будут появляться здесь.</p>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="empty-tab">
            <Bookmark size={48} />
            <h3>Сохраненное</h3>
            <p>Сохраняйте фото и видео, чтобы посмотреть их позже.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;