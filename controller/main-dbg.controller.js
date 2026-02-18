sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/gantt/misc/Format",
	"sap/gantt/misc/Utility",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/theming/Parameters",
	"sap/gantt/config/TimeHorizon",
	"sap/gantt/axistime/ProportionZoomStrategy",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/Device",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/ButtonType",
	"sap/ui/core/Core",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/TextArea"

], function (Controller, Fragment, JSONModel, Format, Utility, BusyIndicator, Parameters, TimeHorizon, ProportionZoomStrategy, Filter,
	FilterOperator,
	MessageBox, MessageToast, Device, Popover, Button, mobileLibrary, Dialog, DialogType, ButtonType, HorizontalLayout, VerticleLayout,
	Lable, Text, TextArea) {
	"use strict";

	return Controller.extend("sierra.pra.PRA_Custom.controller.main", {
		onInit: function () {
			var that = this;
			this.oModelItems = {
				selectedKey: "root1",
				navigation: [{
					title: "Venture",
					icon: "sap-icon://capital-projects",
					expanded: false,
					key: "venture"
				},
				{
					title: "Collective DOI Header",
					icon: "sap-icon://globe",
					expanded: false,
					key: "root4"
				 },
				 {
					title: "Joint Venture Equity Group",
					icon: "sap-icon://capital-projects",
					expanded: false,
					key: "jointventure"
				},
				 //{
				// 	title: "Unified DOI Header",
				// 	icon: "sap-icon://globe",
				// 	expanded: false,
				// 	key: "root1"
				// },
				{
					title: "Business Partner",
					icon: "sap-icon://business-by-design",
					expanded: false,
					key: "root2"
				},
				{
					title: "Payout",
					icon: "sap-icon://loan",
					key: "root3",
					expanded: false,
					// items: [{
					// 	title: "Payout",
					// 	key: "ABC"
					// }, {
					// 	title: "Provisions",
					// 	key: "KMS"
					// }]
				},
				{
					title: "Non-Operated Payout",
					icon: "sap-icon://business-by-design",
					expanded: false,
					key: "non-operated"
				},
				{
					title: "Payout Imports",
					icon: "sap-icon://loan",
					expanded: false,
					key: "payout_imports"
				}
				]
			};
			
			var oModel = new JSONModel(this.oModelItems);
			oModel.setSizeLimit(500);
			this.getView().setModel(oModel, "oModel");
			this.getOwnerComponent().getRouter().navTo("revenue_header");
			
		},

		onItemSelect: function (oEvent) {
			var that = this;
			var item = oEvent.getParameter('item');
           if (item.getKey() == "root1") {

				this.getOwnerComponent().getRouter().navTo("revenue_header");

			} else if (item.getKey() == "root2") {
				this.getOwnerComponent().getRouter().navTo("business_associate");
				// this.byId("pageContainer").to(this.getView().createId(item.getKey()));
			} else if (item.getKey() == "root3") {
				this.getOwnerComponent().getRouter().navTo("payout");
			} else if (item.getKey() == "root4") {
				this.getOwnerComponent().getRouter().navTo("collective_doi");
			}else if (item.getKey() == "KMS") {
				this.getOwnerComponent().getRouter().navTo("revenue_header");
			}else if (item.getKey() == "GHI") {
				this.getOwnerComponent().getRouter().navTo("business_associate");
			}else if (item.getKey() == "venture") {
				this.getOwnerComponent().getRouter().navTo("venture");
			}else if (item.getKey() == "jointventure") {
				this.getOwnerComponent().getRouter().navTo("jointventure");
			}else if (item.getKey() == "non-operated") {
				this.getOwnerComponent().getRouter().navTo("non-operated");
			}
			
		},

		onMenuButtonPress: function () {
			var toolPage = this.byId("toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onSelectForm: function (oEvent) {
			var param = oEvent.getParameters();
		},

		onDisplayForm: function (oEvent) {

			 

			var param = oEvent.getParameters();
			this.getOwnerComponent().getRouter().navTo("revenue_header");

			 
		},

		onManageForm: function (oEvent) {

			var item = oEvent.getParameter('item');
		
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("revenue_header", {}, true);

			 
		}
	});
});

