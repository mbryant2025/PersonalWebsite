var resizeTimeout;
window.addEventListener('resize', function(event) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function(){
    window.location.reload();
  }, 200);
});