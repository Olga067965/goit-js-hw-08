import Player from '@vimeo/player';
import { throttle } from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', event => {
  const currentTime = event.seconds;

  // збережено поточний час відтворення у локальному сховищі
  localStorage.setItem('videoplayer-current-time', currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  // отримано збережений час відтворення з локального сховища
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    // встановлено час відтворення плеєра зі збереженої позиції
    player.setCurrentTime(savedTime);
  }
});

player.on(
  'timeupdate',
  throttle(event => {
    const currentTime = event.seconds;

    // збережено поточний час відтворення у локальному сховищі
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);
