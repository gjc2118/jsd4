const mockData = {
	pagination: {
		total_count: 37
	},
	data: [{
		id: "feqkVgjJpYtjy",
		url: "http://giphy.com/gifs/eyes-shocked-bird-feqkVgjJpYtjy",
		rating: "g",
		images: {
			original: {
				url: "http://media0.giphy.com/media/feqkVgjJpYtjy/giphy.gif"
			}
		}
	},{
		id: "FiGiRei2ICzzG",
		url: "http://giphy.com/gifs/funny-cat-FiGiRei2ICzzG",
		rating: "g",
		images: {
			original: {
				url: "http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.gif"
			}
		}
	}]
};


// Step 1 - get source HTML from DOM
const gifTemplate = document.querySelector('#gif-template');
const gifs = document.querySelector('.gifs');

// Step 2 - compile the Handlebars template
const gifTemplateFn = Handlebars.compile(gifTemplate.innerHTML);

// Step 3 - pass JSON to template,
// put final HTML back in DOM
const html = gifTemplateFn(mockData)
gifs.innerHTML = html;



