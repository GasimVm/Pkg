define("UsrEstate1Page", ["ProcessModuleUtilities","UsrConstsJs"], function(ProcessModuleUtilities,UsrConstsJs) {
	const abConstants = UsrConstsJs.getAllConstant();
	return {
		entitySchemaName: "UsrEstate",
		attributes: {
			"UsrCommissionsPrice": {
				"dependencies": [
					{
						"columns": ["UsrPrice"],
						"methodName": "onCommissions"
					}
				]
			},
			"UsrCommissionsTypeOffer": {
				"dependencies": [
					{
						"columns": ["UsrTypeOffer"],
						"methodName": "onCommissions"
					}
				]
			},
		},
		messages: {
                "CreateReatlyViews": {
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    "direction": Terrasoft.MessageDirectionType.SUBSCRIBE
                }
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrEstateFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrEstate"
				}
			},
			"UsrReatlyDetail": {
				"schemaName": "UsrSchema975ea63aDetail",
				"entitySchemaName": "UsrReatlyViews",
				"filter": {
					"detailColumn": "UsrEstate",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			 
			onCommissions:function(){
				var price = this.get ("UsrPrice");
				var typeOffer =  (this.$UsrTypeOffer || {}).value;
				var commissions=0;
				if(typeOffer==abConstants.OfferType.Rent){
					  commissions=price*abConstants.Commissions.Rent;
				}else{
					commissions=price*abConstants.Commissions.Sale;
				}
				this.set("UsrCommissions",commissions)

			},
			IsLessPrice:function(){
				if(this.get("UsrPrice")>100000){
					return true;
				}
				return false;
			},
			setValidationConfig: function () {
				this.callParent (arguments);
				this.addColumnValidator ("UsrPrice", this.priceValidator);
				this.addColumnValidator ("UsrSquare", this.priceValidator);

			},
				priceValidator: function () {
				var invalidMessage = "";
				var price = this.get ("UsrPrice");
				var square = this.get ("UsrSquare");
				 
				if (price <= 0 || square<=0) {
				invalidMessage = this.get ("Resources.Strings.InvalidateValue");
				}
				return {
				invalidMessage: invalidMessage
				};
			},
			createReatlyViews: function() {
				var  reatlyId= this.get("Id");
                var args = {
                  sysProcessName: "UsrCreateReatlyViews",
                  parameters: {
					UsrReatlyId: reatlyId,
					}
                 };
                ProcessModuleUtilities.executeProcess(args);
				 
            },
			getActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getButtonMenuItem({
                 Type: "Terrasoft.MenuSeparator",
                 Caption: ""
                }));
                 
                actionMenuItems.addItem(this.getButtonMenuItem({
                 "Caption": {bindTo: "Resources.Strings.UsrAvtoAddReatlyView"},
                 "Tag": "createReatlyViews",
                 "Enabled":true
                }));
				
                return actionMenuItems;
            },
			init: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("CreateReatlyViews", this.onMyCreateReatlyViews, this);
			},
			onMyCreateReatlyViews: function(args) {
				this.reloadEntity();
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPrice",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPrice",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSquare",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSquare",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrType",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrTypeOffer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrTypeOffer"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrComment",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"isRequired": {
						"bindTo": "IsLessPrice"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrReatlyDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "insert",
				"name": "UsrCommissions",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommissions",
					"enabled": false,
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
		]/**SCHEMA_DIFF*/
	};
});
