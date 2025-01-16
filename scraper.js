// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeZumperSearch(url, count=1, maxPages=3) {
    try {
        // fetch html of the page
        const { data: html} = await axios.get(url);
        const $ = cheerio.load(html);

        // create a listings array and adjust selector to match Zumper's HTML
        listings = [];
        $('.ListingCardContentSection_contentContainer__2PSmy').each((_, el) => {
            const $el = $(el);
            const apartmentName = $el.find('.ListingCardContentSection_detailLinkText__28n9P').text().trim() || "Unknown";
            const price = $el.find('.ListingCardContentSection_longTermPrice__2ub_C').text().trim() || "Not Specified";
            const bedBaContainer = $el.find('.ListingCardContentSection_bedBathContainer__18fa4').text().trim() || "Not Specified";
            const amenitites = $el.find('.ListingCardContentSection_amenitiesContainer__1KCgc').text().trim() || "Not Specified";

            listings.push({
                apartmentName,
                price, 
                bedBaContainer,
                amenitites});
        });
        const nextPageUrl = $('.nextPageSelector').attr('href'); // Update selector
        if (nextPageUrl && count < maxPages) {
            const nextPageListings = await scrapeZumperSearch(nextPageUrl, count+1, maxPages);
            listings.push(...nextPageListings);
        }
        return listings;
    }  catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = { scrapeZumperSearch };