const { ApexImagine } = require('apexify.js');

exports.config = {
    name: 'imagegen',
    author: 'Biru',
    description: 'Generates images based on a text prompt using the Prodia model',
    category: 'art',
    usage: ['/imagegen?prompt=pretty girl naked']
};

exports.initialize = async function ({ req, res }) {
    try {
        // Check if there is a query parameter named 'prompt'
        const imagePrompt = req.query.prompt;
        if (!imagePrompt) {
            return res.status(400).json({ error: "No image prompt provided." });
        }

        // Define the model and image options
        const model = 'prodia';
        const imageOptions = {
            count: 2,              // Generates 2 images by default
            nsfw: true,           // Disable NSFW content
            deepCheck: false,      // Disable deep check for NSFW content
            nsfwWords: [],         // Optional NSFW words to check the image content for
            Api_key: 'eaca0864-70a4-4653-8dc7-f5ba3918326f', // Your API key
            negative_prompt: "",
            sampler: "DPM++ 2M Karras",
            height: 512,
            width: 512,
            cfg_scale: 9,
            steps: 20,
            seed: -1,
            image_style: "3-model"
        };

        try {
            // Generate the image using ApexImagine
            const imageResponse = await ApexImagine(model, imagePrompt, imageOptions);

            if (imageResponse && imageResponse.length > 0) {
                // Return the generated image URLs in the response
                return res.json({
                    message: `Images successfully generated for prompt: "${imagePrompt}".`,
                    images: imageResponse
                });
            } else {
                return res.status(500).json({ error: "Failed to generate images." });
            }

        } catch (imageError) {
            console.error("Error generating images:", imageError);
            return res.status(500).json({ error: "An error occurred while generating the images." });
        }

    } catch (requestError) {
        console.error("Error with the image request:", requestError);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
