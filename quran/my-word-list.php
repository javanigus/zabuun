<!doctype html>
<html class="no-js" lang="">
	<head>
		<title>Zabuun - Learn Arabic for English Speakers</title>
		<meta name="description" content="">
		<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/head.php';?>
	</head>
	<body>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/ie8.php';?>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/header.php';?>
		<div class="content">
			<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/side.php';?>
			<div class="main">
				<h1>Word-for-Word Arabic-English Translation of the Quran</h1>
				<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/page-options.php';?>
				<h1>My Quran Vocabulary List</h1>
				<div class="vocab-words"></div>
			</div>
		</div>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/footer.php';?>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/layout/scripts.php';?>
		<script>
/*
 * get and display quran words from local storage
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
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
					$("div.vocab-words").append(obj["word"]);
				}
			}
		}
	});
}(jQuery));
		</script>
	</body>
</html>

