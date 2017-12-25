window.$ = window.jQuery = require("jquery");
require("layui-layer/dist/layer.js");

require("../../node_modules/ace-builds/src-noconflict/ace.js");
require("../../node_modules/ace-builds/src-noconflict/ext-language_tools.js");

ace.config.set("basePath", "node_modules/ace-builds/src-noconflict");
ace.require("ace/ext/language_tools");
var editor = ace.edit("code-editor");
editor.session.setMode("ace/mode/php");
editor.setTheme("ace/theme/monokai");
// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: 16
});

function phpExecute() {

};

phpExecute.prototype.init = function() {
	this.initVersions();
	this.initActions();
};

phpExecute.prototype.initVersions = function() {
	var index = layer.load(2, {
		shade: [0.3, '#000']
	});	
	$.post("/php/versions.php", function(result) {
		var html = "";
		for (var i=0; i<result.length; i++) {
			html += "<option value='"+result[i]+"'>"+result[i]+"</option>";
		}
		$("#versions").html(html);
		layer.close(index);
	}, "json");
};

phpExecute.prototype.initActions = function() {
	var index;
	$("#run").click(function(){
		var version = $("#versions").val();
		var cmd = editor.getValue();
		$.ajax({
	        type: "POST",
	        url: "/php/execute.php",
	        beforeSend: function() {
				index = layer.load(2, {
					shade: [0.3, '#000']
				});
				$("#code-result").html("");
	        },
	        complete: function() {
	        	layer.close(index);
	        },
	        data: {
				version: version,
				cmd: cmd
			},
	        dataType: 'json',
	        success: function(result) {
				var code = "<pre>"+result.join("\n")+"</pre>";
				$("#code-result").html(code);
			},
			error: function(err) {
				$("#code-result").html("<pre>"+err.responseText+"</pre>");
			}
		});
	});
};

var phpObj = new phpExecute();
phpObj.init();