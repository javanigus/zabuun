function zabuun_getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*
 * expand/collapse nav blocks
 */
(function ($) {
	"use strict";

	//localStorage.clear();

	$(document).on("ready", function () {
		if (typeof(Storage) !== "undefined") {
			for (var i = 0; i < localStorage.length; i++){
				$("#" + localStorage.key(i) + " + div").addClass("hidden");
			}
		}

		$("a.category").on("click", function (event) {
			var $div = $(event.currentTarget).next("div.container");
			var id = $(event.currentTarget).attr("id");
			if ($div.hasClass("hidden")) {
				$div.removeClass("hidden");
				if (typeof(Storage) !== "undefined") {
					localStorage.removeItem(id);
				}
			} else {
				$div.addClass("hidden");
				if (typeof(Storage) !== "undefined") {
					localStorage.setItem(id, "hidden");
				}
			}
		});
	});
}(jQuery));

/*
 * expand/collapse nav / header
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		var hideMenu = zabuun_getParameterByName('hideMenu');
		var hideHeader = zabuun_getParameterByName('hideHeader');
		var url;

		$("a.menu.hide").on("click", function (event) {
			if (window.location.search === "") {
				url = window.location.href + "?hideMenu=true";
			} else if (hideMenu === null || hideMenu === undefined) {
				url = window.location.href + "&hideMenu=true";
			} else {
				url = window.location.href.replace("hideMenu=false", "hideMenu=true");
			}

			window.location.href = url;
		})

		$("a.menu.show").on("click", function (event) {
			if (window.location.search === "") {
				url = window.location.href;
			} else if (hideMenu === null || hideMenu === undefined) {
				url = window.location.href + "&hideMenu=false";
			} else {
				url = window.location.href.replace("hideMenu=true", "hideMenu=false");
			}

			window.location.href = url;
		});

		$("a.header.hide").on("click", function (event) {
			if (window.location.search === "") {
				url = window.location.href + "?hideHeader=true";
			} else if (hideHeader === null || hideHeader === undefined) {
				url = window.location.href + "&hideHeader=true";
			} else {
				url = window.location.href.replace("hideHeader=false", "hideHeader=true");
			}

			window.location.href = url;
		})

		$("a.header.show").on("click", function (event) {
			if (window.location.search === "") {
				url = window.location.href;
			} else if (hideHeader === null || hideHeader === undefined) {
				url = window.location.href + "&hideHeader=false";
			} else {
				url = window.location.href.replace("hideHeader=true", "hideHeader=false");
			}

			window.location.href = url;
		});
	});
}(jQuery));

/*
 * show/hide header or nav
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		var hideMenu = zabuun_getParameterByName('hideMenu');
		var hideHeader = zabuun_getParameterByName('hideHeader');

		if (hideMenu === "true") {
			$("div.side").addClass("hidden");
			$("a.menu.hide").addClass("hidden");
			$("a.menu.show").removeClass("hidden");
		}
		if (hideHeader === "true") {
			$("div.header, div.subheader, div.footer").addClass("hidden");
			$("a.header.hide").addClass("hidden");
			$("a.header.show").removeClass("hidden");
		}
	});
}(jQuery));

/*
 * show/hide range of verses
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		if (window.location.pathname.indexOf("/quran/") !== -1) {
			var fromVerse = parseInt(zabuun_getParameterByName('fromVerse'));
			var toVerse = parseInt(zabuun_getParameterByName('toVerse'));

			if (fromVerse <= toVerse) {
				$("p.ayah").addClass("hidden");
				for (var verse=fromVerse; verse <= toVerse; verse++) {
					$("#" + verse).removeClass("hidden");
				}
			}
		}
	});
}(jQuery));
