/////////////////////////////////////////////////////////
// THIS VERSION OF FETCHFILE.JS IS IN BETA             //
// The Unilicense still applies to this piece of code. //
// See more at the license page of this repository.    //
//                                                     //
// Code by Anvay Mathur                                //
/////////////////////////////////////////////////////////

if ($.ajax == undefined && $ !== undefined) {
	throw new Error("Fetchfile.js requires the full version of jQuery. Fetchfile.js does not support jQuery Slim.");
}
else if ($ == undefined) {
	throw new Error("Fetchfile.js requires jQuery to work.");
}
function Fetchfile(filepath, secure, outputType, whitespaceType, returnId, saveto, callback) {
	const outputTypes = [false, "text", "html", "css", "js", "json"];
	const whitespaceTypes = ["pre", "br", false];
	var checkedOutputType = false;
	var checkedWhitespaceType = false;
	var returntext = "";
	if (filepath == undefined) {
		throw new Error("The filepath parameter is empty. Requires filepath to request content.");

	}
	if (secure == undefined) {
		throw new Error("The secure parameter is empty. Requires secure parameter to do Ajax.");
	}
	if (secure !== true && secure !== false) {
		throw new TypeError("The secure parameter specified (\"" + secure + "\") is not a boolean. Parameter secure requires boolean");

	}
	if (outputType == undefined) {
		throw new TypeError("The outputType parameter is empty. Requires outputType to output content.");
	}
	if (outputType !== undefined) {
		for (var i = 0; i < outputTypes.length; i++) {
			if (outputTypes[i] == outputType) {
				checkedOutputType = true;
			}
		}
		if (checkedOutputType == false) {
			throw new TypeError("The outputType specified (" + outputType + ") does not match the outputTypes supported. Fetchfile.js supports false (boolean), text, html, css, js, and json.");
		}
	}

	if (outputType == "text" && (returnId == undefined || returnId == false)) {
		console.warn("Fetchfile.js does not require an outputType to be specified if you are not printing the output to an element. Please use the boolean false instead of " + outputType + ". If you are trying to fetch JavaScript, use outputType js. Parameter returnId is not required when parameter outputType is not equal to text.");
	}
	if (whitespaceType !== undefined) {
		for (var i = 0; i < whitespaceTypes.length; i++) {
			if (whitespaceTypes[i] == whitespaceType) {
				checkedWhitespaceType = true;
			}
		}
		if (checkedWhitespaceType == false) {
			throw new TypeError("The whitespaceType specified (" + whitespaceType + ") does not match the whitespaceTypes supported. Fetchfile.js supports pre, br, and false (boolean).");
		}
	}
	if (whitespaceType == "br" && outputType == "text") {
		console.warn("It is not ideal to set parameter whitespaceType to \"br\" and outputType to \"text\". Your output will have the text <br /> in it.");
	}
	if ($(returnId).length == 0 && returnId !== false) {
		throw new Error("The returnId specified (" + returnId + ") does not go to any HTML element.");

	}
	if ((returnId !== undefined && returnId !== false) && ((outputType !== "text" && outputType !== "html") && outputType !== false)) {
		console.warn("Fetchfile.js does not require a returnId to be specified if you are not using outputType text or html. Please use the boolean false instead of " + outputType + ".");
	}

	if (secure) {
		$.ajax({
			url: filepath,
			data: { "id": "FETCHPOST" },
			method: "POST",
			success: function (result) {
				if (whitespaceType == "br") {
					var returnResult = String(result).replace(/(\r\n|\n|\r)/gm, "<br />");
				}
				if (whitespaceType == false) {
					var returnResult = String(result).replace(/(\r\n|\n|\r)/gm);
				}
				if (returnId !== false) {
					if (outputType == "text") {
						$(returnId).text(returnResult);
					}
					if (outputType == "html") {
						$(returnId).html(returnResult);
					}
				}
				if (outputType == "css") {
					document.head.indnerHTML += "<style>" + String(result) + "</style>";
				}
				if (outputType == "js") {
					String(result).replace(":newline", "\n");
					function jsfunction(result) {
						eval(result);
					}
					jsfunction(result);
				}

				if (saveto !== undefined && saveto !== false) {
					var resultsaveto = result;
					if (outputType !== "json") {
						resultsaveto = result.replace(/(\r\n|\n|\r)/gm, ":FETCHFILE_NEWLINE:");
					}
					else if (outputType == "json" && typeof result !== "object") {
						try {
							resultsaveto = JSON.parse(result);
						}
						catch {
							console.warn("The outputType specified is \"json\", but the result was not a JSON object.");
							return;
						}
					}
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
				console.warn("The secure Ajax call to " + filepath + " failed. Check your permission settings or if the file exists.");
				return;

			}
		});
	}
	else if (!secure) {
		$.ajax({
			url: filepath,
			method: "POST",
			success: function (result) {

				if (result !== "FETCH_ERRORID_NOT_SECURE_FETCH") {
					if (whitespaceType == "br") {
						var returnResult = String(result).replace(/(\r\n|\n|\r)/gm, "<br />");
					}
					if (whitespaceType == false) {
						var returnResult = String(result).replace(/(\r\n|\n|\r)/gm);
					}
					if (returnId !== false) {
						if (outputType == "text") {
							$(returnId).text(returnResult);
						}
						if (outputType == "html") {
							$(returnId).html(returnResult);
						}
					}
					if (outputType == "css") {
						document.head.innerHTML += "<style>" + String(result) + "</style>";
					}
					if (outputType == "js") {
						String(result).replace(":newline", "\n");
						function jsfunction(result) {
							eval(result);
						}
						jsfunction(result);
					}

					if (saveto !== undefined && saveto !== false) {
						var resultsaveto = result;
						if (outputType !== "json") {
							resultsaveto = result.replace(/(\r\n|\n|\r)/gm, ":FETCHFILE_NEWLINE:");
						}
						else if (outputType == "json" && typeof result !== "object") {
							try {
								resultsaveto = JSON.parse(result);
							}
							catch {
								console.warn("The outputType specified is \"json\", but the result was not a JSON object.");
								return;
							}
						}
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
					console.warn("The filepath specified (" + filepath + ") requires a secure Fetchfile.js call.");
					return;
				}
			},
			error: function () {
				console.warn("The Ajax call to " + filepath + " failed. Check your permission settings or if the file exists.");
				return;
			}
		});
	}

}
