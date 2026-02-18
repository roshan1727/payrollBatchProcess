/*global XLSX*/
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
	"sap/m/library"
], function (Controller, Fragment, JSONModel, Format, Utility, BusyIndicator, Parameters, TimeHorizon, ProportionZoomStrategy, Filter,
	FilterOperator,
	MessageBox, MessageToast, Device, Popover, Button, mobileLibrary) {
	"use strict";

	return Controller.extend("sierra.pra.PRA_Custom.controller.business_associate", {
		onInit: function() {
				var that = this;

				this.globalModel = this.getOwnerComponent().getModel("globalModel");
				var oModel = new JSONModel(this.globalModel);
			console.log("omodel first ", oModel);
			// var oModel = new JSONModel(this.oDataDynMain);
			oModel.setSizeLimit(500);
			this.getView().setModel(oModel, "oModel");
				console.log("oModel l",oModel);
				this.getOwnerComponent().getModel().read("/Business_AssociateSet", {
				success: function (oData, oResponse) {
				//	that.globalModel.companyList = oData.results;
						
					// for (var j = 0; j < that.globalModel.companyList.length; j++) {
					// 	//	that.globalModel.header.push(that.globalModel.companyList[j]);
					// }

				//	that.getView().getModel("oModel").refresh();

					// that.globalModel.layoutSettings = oData.results;
					//
				//	console.log("result comp",this.oModel);
					//filter starts
			
				//		console.log("Result",this.oModel);
				
						// 	debugger;
					
						that.aKeys = [
							"CmpCode", "Doi", "DeckType"
						];
						that.oSelectName = that.getSelect("slName");
						that.oSelectCategory = that.getSelect("slCategory");
						that.oSelectSupplierName = that.getSelect("slDOIType");
						// this.oSelectProduct = this.getSelect("slProduct");
						// this.oSelectWell = this.getSelect("slWell");
						// this.oSelectVenture = this.getSelect("slVenture");
						// this.oSelectDOIType = this.getSelect("slDOIType");
						
						oModel.setProperty("/Filter/text", "Filtered by None");
						that.addSnappedLabel();
			
						var oFB = that.getView().byId("filterbar");
						if (oFB) {
							oFB.variantsInitialized();
						}
					//filter end
				},
				error: function (oError) {
					// show error
					 debugger;
				}
			});
			
			
			//dropdown
			this.getOwnerComponent().getModel().read("/SE_CMP_CODESet", {
				success: function (oData, oResponse) {
					
					that.globalModel.companyCode = oData.results;
					console.log("company code",that.globalModel.companyCode);	
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_BANUMBERSet", {
				success: function (oData, oResponse) {
					that.globalModel.wellIdList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/owner_detailsSet", {
				success: function (oData, oResponse) {
					that.globalModel.ventureList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
		
			//dropdown end
				//new code end
			 	//this.oModel = new JSONModel();
		// 	debugger;
		  //   this.oModel.loadData(sap.ui.require.toUrl("sierra/pra/PRA_Custom/revenue_data.json"), null, false);
		// 	debugger;
		 	//this.getView().setModel(this.oModel);
			
		},
		
		onPressBAFilter: function (req, oEvent){
				var BaNumber = this.getView().byId("slBaNumber").getSelectedItem().mProperties.text;
				var Name1 = this.getView().byId("Name1").getSelectedItem().mProperties.text;
				var that = this;
				// var keys = "(BaNumber='" + BaNumber + "',Name1='" +
				// Name1 + "')";
				 
			// filterARPASummary = new Filter([
			// 			new Filter("FormType", FilterOperator.EQ, "ARPA"),
			// 			new Filter("FormNum", FilterOperator.EQ, "ARPA_001")
			// 		]);
				
				var oFilter = [
						new Filter("BaNumber", FilterOperator.EQ, BaNumber)
					//	new Filter("Name1", FilterOperator.EQ, Name1)
					]; 
		
					this.getOwnerComponent().getModel().read("/Business_AssociateSet" , {
					filters: oFilter,
				// this.oModeloData.update("/Orders_detailsSet(OrderId='000004000060')", oEntry, {
				success: function (oData, oResponse) {
					that.globalModel.businessPartnerData = oData.results;
					debugger;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
					 
					MessageBox.error("Error in getting Business Partner Details - Please check with your System Admin");
				}
			});
		}

	});

});