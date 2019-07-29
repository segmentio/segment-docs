$(function() {
  $(".js-collapse").on("click", function(e) {
    e.preventDefault();
    toggleSideNavSection($(this).parent());
  });
});

function toggleSideNavSection($el) {
  $el.toggleClass("expanded");
}
