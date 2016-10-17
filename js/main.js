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
				var id = localStorage.key(i);
				if (id.indexOf("menu-") === 0) {
					id = id.replace("menu-", "");
					$("#" + id + " + div").addClass("hidden");
				}
			}
		}

		$("a.category").on("click", function (event) {
			var $div = $(event.currentTarget).next("div.container");
			var id = $(event.currentTarget).attr("id");
			if ($div.hasClass("hidden")) {
				$div.removeClass("hidden");
				if (typeof(Storage) !== "undefined") {
					localStorage.removeItem("menu-"+id);
				}
			} else {
				$div.addClass("hidden");
				if (typeof(Storage) !== "undefined") {
					localStorage.setItem("menu-"+id, "hidden");
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

/*
 * collapse nav on mobile
 */
(function ($) {
	"use strict";

	var mql;

	/**
	 *
	 * @param {obj} mediaQueryList The MediaQueryList obj
	 * @returns {undefined}
	 */
	function handleViewportWidthChange (mediaQueryList) {

		if (mediaQueryList.matches) {

			/* The viewport is <= 640px wide */
			$("a.category + div").addClass("hidden");
		} else {
			/* The viewport is > 640px wide */
		}
	}

	if (window.matchMedia) {
		mql = window.matchMedia("screen and (max-width: 640px)");
		mql.addListener(handleViewportWidthChange);

		$(document).on("ready", function domContentLoaded () {
			handleViewportWidthChange(mql);
		});
	}
}(jQuery));

/*
 * save quran words to local storage
 */
(function ($) {
	"use strict";

	//localStorage.clear();

	$(document).on("ready", function () {
		if (window.location.pathname.indexOf("/quran/") === 0) {
			var chapter = window.location.pathname.split("/")[2];

			if (typeof(Storage) !== "undefined") {
				for (var i = 0; i < localStorage.length; i++){
					var id = localStorage.key(i);
					if (id.indexOf("verse-") === 0) {
						var obj = {};
						obj["word"] = localStorage.getItem(id);
						id = id.replace("verse-", "");
						var surahVerse = id.split(":")[0];
						obj["surah"] = surahVerse.split("-")[0];
						obj["verse"] = surahVerse.split("-")[1];
						obj["index"] = id.split(":")[1];
						if (obj.surah === chapter) {
							console.log("p.ayah." + surahVerse + " span.staticWord:nth-child(" + obj["index"] + ")");
							$("p.ayah." + surahVerse + " span.staticWord:nth-child(" + obj["index"] + ")").addClass("saved");
						}
					}
				}

				$("span.staticWord").on("click", function (event) {
					var wordHtml = $(event.currentTarget)[0].outerHTML;
					var index = $(event.currentTarget).index()+1;
					var verse = $(event.currentTarget).parents("p.ayah").attr("class").replace("ayah ", "");
					if ($(event.currentTarget).hasClass("saved")) {
						$(event.currentTarget).removeClass("saved");
						localStorage.removeItem("verse-"+ verse + ":" + index);
					} else {
						$(event.currentTarget).addClass("saved");
						localStorage.setItem("verse-"+ verse + ":" + index, wordHtml);
					}
				});
			}
		}
	});
}(jQuery));