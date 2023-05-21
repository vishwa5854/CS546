import { Router } from "express";
import axios from "axios";
import { isValidString } from "../helpers.js";

const router = Router();
const API_KEY = "1FZWNo5nh7w5lbsGhqDP4ABLWGaVjy7C";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/venues";

router.route('/').get((req, res) => res.render('homepage', { title: "Venue Finder" }));

router.route('/searchvenues').post(async (req, res) => {
	try {
		if (
			!req.body || 
			!req.body.searchVenueTerm ||
			!isValidString(req.body.searchVenueTerm)
		) return res.status(400).render('error', { error: "Search Term Cannot be empty", title: "Bad Request" });

		let config = {
			method: 'get',
			url: `${BASE_URL}?keyword=${req.body.searchVenueTerm}&apikey=${API_KEY}&countryCode=US&size=10`,
		};

		let venues = await axios.request(config);
		venues = venues.data;

		if (
			!venues._embedded || 
			!venues._embedded.venues || 
			!Array.isArray(venues._embedded.venues) ||
			(venues._embedded.venues.length === 0)
		) return res.render('venueNotFound', { searchVenueTerm: req.body.searchVenueTerm, title: "Venue Not Found" });
		
		return res.render('venueSearchResults', { venues: venues._embedded.venues, title: "Venues Found", searchVenueTerm: req.body.searchVenueTerm });
	} catch (err) {
		return res.status(500).render('error', { title: "Uh, Oh!", error: "Uh, Oh! Something went wrong on our side, we will fix it soon." });
	}
});

router.route('/venuedetails/:id').get(async (req, res) => {
	try {
		let id = req.params.id;

		if (!id) return res.status().render('');

		let config = {
			method: 'get',
			url: `${BASE_URL}/${id}?&apikey=${API_KEY}&countryCode=US`
		};

		let venue = await axios.request(config);
		venue = venue.data;
		
		if (!venue.name) venue.name = "N/A";

		if (
			!venue.images || 
			!venue.images[0] || 
			!venue.images[0].url
		) venue.images = [{ url: '/public/images/No_Image_Available.jpg' }];

		if (!venue.url) venue.url = "N/A";

		if (
			!venue.address || 
			!venue.address.line1
		) venue.address = { line1: "N/A" };

		if (
			!venue.city ||
			!venue.city.name
		) venue.city = { name: "N/A" };

		if (
			!venue.state ||
			!venue.state.stateCode
		) venue.state = { stateCode: "N/A" };

		if (!venue.postalCode) venue.postalCode = "N/A";

		if (
			!venue.boxOfficeInfo ||
			!venue.boxOfficeInfo.phoneNumberDetail
		) venue.boxOfficeInfo = { phoneNumberDetail: "N/A" };

		return res.render('venueByID', { venue, title: "Venue Details" });
	} catch (err) {
		return res.status(404).render('error', { title: "Venue Not Found", error: "a venue with that id does not exist" });
	}
});

export default router;
