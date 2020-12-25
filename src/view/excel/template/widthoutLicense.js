export default (url, code) => {
    var template = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title></title>
</head>

<body>
	<script>
		var itemCode = "${code}"
		var url = "${url}";
		if (location.protocol === "https:") {
			url = "${url}";
		}
		if (location.search) {
			url = url + location.search + "&itemCode=" + itemCode;
		} else {
			url = url + "?itemCode=" + itemCode;
		}
		if (history.replaceState && location.href.indexOf("/ganfutong.jiangxi.gov.cn/jmopen/webapp/html5") > -1) {
			history.replaceState(null, document.title, url);
			window.location.reload();
		} else {
			location.replace(url)
		}
	</script>
</body>

</html>`;
    return template;
};