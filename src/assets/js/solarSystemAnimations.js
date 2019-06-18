export default function() {
  $(document).ready(function() {
    let mainBody = $("#mainBody"),
      universe = $("#universe"),
      solarsys = $("#solar-system");

    const init = function() {
      mainBody
        .removeClass("view-2D opening")
        .addClass("view-3D")
        .delay(2000)
        .queue(function() {
          $(this)
            .removeClass("hide-UI")
            .addClass("set-speed");
          $(this).dequeue();
        });
    }; // End init function

    const setView = function(view) {
      universe.removeClass().addClass(view);
    }; // End setView

    $("#toggle-data").click(function(e) {
      mainBody.toggleClass("data-open data-close");
      e.preventDefault();
    });

    /* $("#toggle-controls").click(function(e) {
      mainBody.toggleClass("controls-open controls-close");
      e.preventDefault();
    });

    $("#data a").click(function(e) {
      let ref = $(this).attr("class");
      solarsys.removeClass().addClass(ref);
      $(this)
        .parent()
        .find("a")
        .removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

    $(".set-view").click(function() {
      mainBody.toggleClass("view-3D view-2D");
    });
    $(".set-zoom").click(function() {
      mainBody.toggleClass("zoom-large zoom-close");
    });
    $(".set-speed").click(function() {
      setView("scale-stretched set-speed");
    });
    $(".set-size").click(function() {
      setView("scale-s set-size");
    });
    $(".set-distance").click(function() {
      setView("scale-d set-distance");
    }); */

    init();
  }); // End document.ready()
}

