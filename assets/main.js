$(function() {
  $(".js-collapse").on("click", function(e) {
    e.preventDefault();
    toggleSideNavSection($(this));
  });
});

function toggleSideNavSection($el) {
  $el.toggleClass("expanded");
}
