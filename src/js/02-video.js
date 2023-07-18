import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', event => {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
});

player.on(
  'timeupdate',
  throttle(event => {
    const currentTime = event.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);