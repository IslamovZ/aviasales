const fs = require('fs')

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-modules')({
		  	generateScopedName: "[name]__[local]___[hash:base64:5]",
		  	getJSON: function(cssFileName, json, outputFileName) {
		  		//сделал чтобы сразу формировался d.ts файл для стилей
		  		var dtsContent = Object.keys(json).map(className => `export const ${className}: string;`).join('\n');
				var path = require("path");
				var cssName = path.basename(cssFileName, ".css");
				var jsonFileName = path.resolve("./src/" + cssName + ".json");
				var dtsFileName = path.resolve("./src/" + cssName + ".json.d.ts");
				fs.writeFileSync(jsonFileName, JSON.stringify(json));
				fs.writeFileSync(dtsFileName, dtsContent);
	  	    }
	  	})
    ]
}