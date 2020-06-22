# Fetchfile.js
[![version](https://img.shields.io/badge/version-v1.2.1-green.svg)](https://shields.io/)

The simplest way to use Ajax for beginners.

## Installation
### npm
To install Fetchfile.js on npm, run the command `npm i @megagames-me/Fetchfile.js`.

**Important:** Fetchfile.js requires jQuery 3.4.1 as a dependency. 
### CDN
To import Fetchfile.js into your HTML project, use this code.
```html
<script type="text/javascript" src="//code.jquery.com/jquery-3.4.1.js"></script>
<script src="//cdn.jsdelivr.net/gh/megagames-me/Fetchfile.js@1.2.1/fetchfile.min.js"></script>
```
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
