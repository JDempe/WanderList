// resizes textarea/card based on text height inside
const autoResizeText = function() {
    $('.card-text').each(function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
}

$(document).ready(function() {
    autoResizeText();
});