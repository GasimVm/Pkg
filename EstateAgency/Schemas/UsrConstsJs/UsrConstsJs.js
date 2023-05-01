 define("UsrConstsJs", [], function() {
	const obj = {
		 
		"OfferType": {
			"Sale": "6ae38981-1727-468d-91de-3a10903cb4e1",
			"Rent": "aa4b01b0-2f6f-4059-922b-5ea9b6358284",
		},
		"Commissions":{
			"Sale":"0.02",
			"Rent":"0.5",
		}
	};
	Ext.define("Terrasoft.configuration.Constants.UsrConstsJs", {
		"alternateClassName": "Terrasoft.UsrConstsJs",
		getAllConstant() {
			return obj;
		}
	});
	return new Terrasoft.UsrConstsJs();
});
