///////////////////////////////////
// Fetchfile.js                  //
// Code by Anvay Mathur          //
// Licensed under the Unilicense //
// See more at unilicense.org    //
///////////////////////////////////

if ($.ajax == undefined && $ !== undefined) {
	throw new Error("Fetchfile.js requires the full version of jQuery. Fetchfile.js does not support jQuery Slim.");
}
else if ($ == undefined) {
	throw new Error("Fetchfile.js requires jQuery to work.");
}
function Fetchfile(filepath, secure, outputType, returnId, saveto, callback) {
	const outputTypes = [false, "text", "html", "css", "js"];
	var checkedOutputType = false;
	var returntext = "";
	if (filepath == undefined) {
		throw new Error("The filepath parameter is empty. Requires filepath to requested content.");

	}
	if (secure == undefined) {
		throw new Error("The secure parameter is empty. Requires secure parameter to do Ajax.");
	}
	if (secure !== true && secure !== false) {
		throw new TypeError("The secure parameter specified (\"" + secure + "\") is not a boolean. Parameter secure requires boolean");

	}
	if (outputType !== undefined) {
		for (var i = 0; i < outputTypes.length; i++) {
			if (outputTypes[i] == outputType) {
				checkedOutputType = true;
			}
		}
		if (checkedOutputType == false) {
			throw new TypeError("The outputType specified (" + outputType + ") does not match the outputTypes supported. Fetchfile.js supports false (boolean), text, html, css, and js.");
		}
	}
	if (outputType == "text" && (returnId == undefined || returnId == false)) {
		console.warn("Fetchfile.js does not require an outputType to be specified if you are not printing the output to an element. Please use the boolean false instead of " + outputType + ". If you are trying to fetch JavaScript, use outputType js. Attribute returnId is not required when attribute outputType is not equal to text.");
	}
	if ($(returnId).length == 0 && returnId !== false) {
		throw new Error("The returnId specified (" + returnId + ") does not go to any HTML element.");

	}
	if ((returnId !== undefined && returnId !== false) && (outputType !== "text" && outputType !== false)) {
		console.warn("Fetchfile.js does not require a returnId to be specified if you are not using outputType text. Please use the boolean false instead of " + outputType + ".");
	}

	if (secure) {
		$.ajax({
			url: filepath,
			data: { "id": "FETCHPOST" },
			method: "POST",
			success: function (result) {
				if (returnId !== false) {
					if (outputType == "text") {
						$(returnId).text(result);
					}
					if (outputType == "html") {
						$(returnId).html(result);
					}
				}
				if (outputType == "css") {
					document.head.innerHTML += "<style>" + result + "</style>";
				}
				if (outputType == "js") {
					result.replace(":newline", "\n");
					function jsfunction(result) {
						eval(result);
					}
					jsfunction(result);
				}
				if (saveto !== undefined && saveto !== false) {
					var resultsaveto = result.replace(/(\r\n|\n|\r)/gm, ":FETCHFILE_NEWLINE:");
					try {
						eval(saveto + " = \"" + resultsaveto + "\";");
					}
					catch {
						console.warn("The file requested could not be saved into a variable. Check if the file being accessed uses the right type of quotes. (\', \")");
					}

				}
				if (callback !== undefined && callback !== false) {
					callback(result);
				}
			},
			error: function () {
				console.warn("The Ajax call to " + filepath + " failed. Check your permission settings or if the file exists.");

			}
		});
	}
	else if (!secure) {
		$.ajax({
			url: filepath,
			method: "POST",
			success: function (result) {
				if (result !== "FETCH_ERRORID_NOT_SECURE_FETCH") {
					if (returnId !== false) {
						if (outputType == "text") {
							$(returnId).text(result);
						}
						if (outputType == "html") {
							$(returnId).html(result);
						}
					}
					if (outputType == "css") {
						document.head.innerHTML += "<style>" + result + "</style>";
					}
					if (outputType == "js") {
						result.replace(":newline", "\n");
						function jsfunction(result) {
							eval(result);
						}
						jsfunction(result);
					}
					if (saveto !== undefined && saveto !== false) {
						var resultsaveto = result.replace(/(\r\n|\n|\r)/gm, ":FETCHFILE_NEWLINE:");
						try {
							eval(saveto + " = \"" + resultsaveto + "\";");
						}
						catch {
							console.warn("The file requested could not be saved into a variable. Check if the file being accessed uses the right type of quotes. (\', \")");
						}

					}
					if (callback !== undefined && callback !== false) {
						callback(result);
					}
				}
				else {
					throw new TypeError("The filepath specified (" + filepath + ") requires a secure fetchfile call.");

				}
			},
			error: function () {
				throw new Error("The Ajax call to " + filepath + " failed. Check your permission settings or if the file exists.");

			}
		});
	}

}
