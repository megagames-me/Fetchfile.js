# Fetchfile.js
[![version (v1.2.1)](https://img.shields.io/badge/version-v1.2.1-green.svg)](https://shields.io/) [![earliest stable version (v1.2.1)](https://img.shields.io/badge/earliest%20stable%20version-v1.2.1-red.svg)](https://shields.io/) [![ version in dev (v1.2.2-beta)](https://img.shields.io/badge/version%20in%20dev-v1.2.2--beta-yellow.svg)](https://shields.io/)

The simplest way to use Ajax for beginners.
## About
We all love Ajax, right? But, JavaScript just messed it up. You have to use the most annoying syntax ever: XMLHttpRequest, or XHR. It is an absolute *pain* to write it out. But, I decided to create a library that can fit XHR into *one* line of JS code. It is called Fetchfile.js.

### Comparison
#### XHR

```javascript
//XMLHttpRequest
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("ajaxoutput").innerHTML = this.responseText;
	}
};
xhttp.open("GET", "path/to/file.txt", true);
xhttp.send();
```

#### Fetchfile.js

```javascript
Fetchfile("path/to/file.txt", false, "text", "#ajaxoutput");
```
They do the exact same thing, but one is by far the easiest to write.

## Installation
### npm
To install Fetchfile.js on npm, run the command `npm i @megagames-me/Fetchfile.js`.

**Important:** Fetchfile.js requires jQuery 3.4.1 as a dependency. 
### CDN
To import Fetchfile.js into your HTML project, use this code.
```html
<script type="text/javascript" src="//code.jquery.com/jquery-3.4.1.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/megagames-me/Fetchfile.js@1.2.1/fetchfile.min.js"></script>
```
<hr />
*Note:* If you want to, you can use the beta version here:
```html
<script type="text/javascript" src="//gitcdn.link/cdn/megagames-me/Fetchfile.js/f6c5f716e3d84d9b3ef230a67322ed827509a76e/beta/fetchfile.js"></script>
```
This is not recommended, as it uses the latest beta version. This, however, is NOT a release! It is just the file straight from GitHub raw. This may change, so this is **not** recommended for production usage.
<hr />
**Important:** Do NOT use jQuery Slim. jQuery Slim does not contain the `$.ajax` function, which Fetchfile.js requires.

## Parameters
```javascript
Fetchfile(filepath, secure, outputType, whitespaceType, returnId, saveto, callback);
```

<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Description</th>
			<th>Allowed Content</th>
			<th>Optionalilty</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="desc"><code><em>filepath</em></code></td>
			<td>Specifies what file to fetch content from.</td>
			<td><code class="javascript">"/path/to/file.txt"</code></td>
			<td><em>Required</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>secure</em></code></td>
			<td>Specifies if Ajax call should send data specifing it is from an Ajax call.<br><em>Important: A secure file must be PHP. If secured file is accessed without the data, the PHP file fetched MUST echo <code>"FETCH_ERRORID_NOT_SECURE_FETCH"</code>. You can call secure Ajax calls on insecure files.</em></td>
			<td><code class="javascript">[true, false]</code></td>
			<td><em>Required</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>outputType</em></code></td>
			<td>Specifies how the result of the Ajax call is processed. False is used when you do not want to return to DOM.<br><em>Important: Only the outputTypes "text" and "html" require a <code>returnId</code>. The others just run like normal CSS and JavaScript.</em></td>
			<td><code class="javascript">[false, "text", "html", "css", "js", "json"]</code></td>
			<td><em>Required</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>whitespaceType</em></code></td>
			<td>Specifies how the newlines are processed. "pre" uses the \n character, "br" uses <code>&lt;br /&gt;</code>, false removes all newlines.<br><em>Important: whitespaceType does not matter when <code>outputType</code> is not "text" or "html".</em></td>
			<td><code class="javascript">["pre", "br", false]</code></td>
			<td><em>Required</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>returnId</em></code></td>
			<td>Specifies where the Ajax result is outputted on the DOM. False specifies to not put the output on the DOM.<br><em>Important: You can hover over the <code>validJQuerySelector</code> text on the right to see some examples.</em></td>
			<td><code class="javascript">[false, <span title="example: #id, .class, etc.">validJQuerySelector</span>]</code></td>
			<td><em>Required</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>saveto</em></code></td>
			<td>Specifies the variable to hold the Ajax result in. False specifies to not use a variable. If the variable doesn't exist yet, it will create one.<br><em>Important: If the content of the variable contains quotes ("), please add a backslash before them (\) to be able to save it to a variable. Be careful, you cannot call the variable during the beginning, only in an event listener or the <code>callback</code> function as it is asynchronous.</em></td>
			<td><code class="javascript">[false, <span>variableName</span>]</code></td>
			<td><em>Optional</em></td>
		</tr>
		<tr>
			<td class="desc"><code><em>callback</em></code></td>
			<td>Specifies the callback function to be called after the Ajax call. The parameter <code><em>result</em></code> can be used in the callback function as the Ajax result.</td>
			<td><code class="javascript">[false, <span title="example: function(result){console.log(result)}">function</span>]</code></td>
			<td><em>Optional</em></td>
		</tr>
	</tbody>
</table>
