// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeZumperSearch(url) {
    try {
        // fetch html of the page
        const { data: html} = await axios.get(url);
        const $ = cheerio.load(html);

        // create a listings array and adjust selector to match Zumper's HTML
        listings = [];
        $('.ListingCardContentSection_contentContainer__2PSmy').each((_, el) => {
            const $el = $(el);
            const apartmentName = $el.find('.ListingCardContentSection_detailLinkText__28n9P').text().trim();
            const price = $el.find('.ListingCardContentSection_longTermPrice__2ub_C').text().trim();
            const bedBaContainer = $el.find('.ListingCardContentSection_bedBathContainer__18fa4').text().trim();
            const amenitites = $el.find('.ListingCardContentSection_amenitiesContainer__1KCgc').text().trim();
            listings.push({apartmentName, price, bedBaContainer, amenitites});
        });
        // return listings
        return listings;
    }  catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { scrapeZumperSearch };