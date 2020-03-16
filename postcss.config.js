const fs = require('fs')

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-modules')({
		  	generateScopedName: process.env.NODE_ENV === 'production' ? "[hash:base64:7]" : "[name]__[local]___[hash:base64:5]",
		  	getJSON: async function(cssFileName, json, outputFileName) {
		  		//сделал чтобы сразу формировался d.ts файл для стилей
		  		var dtsContent = Object.keys(json).map(className => `export const ${className}: string;`).join('\n');
				var path = require("path");
				var cssName = path.basename(cssFileName, ".css");
				var jsonFileName = path.resolve("./src/style/" + cssName + ".json");
				var dtsFileName = path.resolve("./src/style/" + cssName + ".json.d.ts");
				await fs.writeFileSync(jsonFileName, JSON.stringify(json));
				await fs.writeFileSync(dtsFileName, dtsContent);
	  	    }
	  	})
    ]
}

