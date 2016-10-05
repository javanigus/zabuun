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