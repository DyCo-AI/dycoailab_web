(() => {
  const videos = document.querySelectorAll('.offroad-page video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => {
        if (other !== video) other.pause();
      });
    });
  });
})();
