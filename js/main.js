/*
 * expand/collapse nav blocks
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$("a.category").on("click", function (event) {
			var $div = $(event.currentTarget).next("div.container");
			if ($div.hasClass("hidden")) {
				$div.removeClass("hidden");
			} else {
				$div.addClass("hidden");
			}
		});
	});
}(jQuery));

/*
 * expand/collapse nav
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$("a.menu.hide").on("click", function (event) {
			$("div.side").addClass("hidden");
			$("a.menu.show").removeClass("hidden");
			$("div.main").addClass("full-width");
		});

		$("a.menu.show").on("click", function (event) {
			$(event.currentTarget).addClass("hidden");
			$("div.side").removeClass("hidden");
			$("div.main").removeClass("full-width");
		});
	});
}(jQuery));