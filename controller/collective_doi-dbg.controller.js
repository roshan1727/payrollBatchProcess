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

	return Controller.extend("sierra.pra.PRA_Custom.controller.collective_doi", {
		onInit: function() {
				var that = this;
            this.globalModel = this.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(this.globalModel);
            oModel.setSizeLimit(500);
            this.getView().setModel(oModel, "oModel");

	
			 this.getOwnerComponent().getModel().read("/venture_doiSet", {
                success: function (oData, oResponse) {
                    debugger;
                    that.globalModel.DOI = [];
                    debugger;
                    that.globalModel.ventureList2 = oData.results;

                    for (var j = 0; j < that.globalModel.ventureList2.length; j++) {
                        that.globalModel.DOI.push(that.globalModel.ventureList2[j]);
                    }
                    debugger;
                    that.getView().getModel("oModel").refresh();
                    debugger;
                },
                error: function (oError) {
                    // show error
                    debugger;
                }
            });
                    
                this.getOwnerComponent().getModel().read("/DOI_OWNERSet", {
                success: function (oData, oResponse) {
                    debugger;
                    that.globalModel.DOI2 = [];
                    debugger;
                    that.globalModel.ventureList3 = oData.results;

                    for (var j = 0; j < that.globalModel.ventureList2.length; j++) {
                        that.globalModel.DOI2.push(that.globalModel.ventureList3[j]);
                    }
                    debugger;
                    that.getView().getModel("oModel").refresh();
                    debugger;
                },
                error: function (oError) {
                    // show error
                    debugger;
                }
            });

			
			
		},
		onPressaddDoi: function(){
			var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.collective_doi_header_add",
                    controller: that
                }).then(function (oDialog) {
                    debugger;
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            that.pErrorLogPopover.then(function (oDialog) {
                oDialog.open();
            });
		},
		onPresscomment : function(){
			var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.collective_doi_comments",
                    controller: that
                }).then(function (oDialog) {
                    debugger;
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            that.pErrorLogPopover.then(function (oDialog) {
                oDialog.open();
            });
		},
		
		onMarketFreePopup: function () {
			var oView = this.getView();
			var that = this;

			if (!that.pErrorLogPopover) {
				that.pErrorLogPopover = Fragment.load({
					id: oView.getId(),
					name: "sierra.pra.PRA_Custom.view.collective_doi_market_free",
					controller: that
				}).then(function (oDialog) {
					debugger;
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			that.pErrorLogPopover.then(function (oDialog) {
				oDialog.open();
			});

		},
		onBearerPopup : function(){
				var oView = this.getView();
			var that = this;

			if (!that.pErrorLogPopover) {
				that.pErrorLogPopover = Fragment.load({
					id: oView.getId(),
					name: "sierra.pra.PRA_Custom.view.collective_doi_bearer_group",
					controller: that
				}).then(function (oDialog) {
					debugger;
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			that.pErrorLogPopover.then(function (oDialog) {
				oDialog.open();
			});

		},
		onCloseMarketFreePopover: function () {
			this.byId("collective_doi_market_free").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
		},
	    onClosecomment: function () {
			this.byId("collective_doi_comments").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
		},
		onCloseBearerPopover: function () {
			this.byId("collective_doi_bearer_group").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
		},

        onPressView: function(oEvent){

            debugger;
            
        	this.getOwnerComponent().getRouter().navTo("payoutPosition");
            debugger;
        },
        onCloseErrorLogPopover: function () {
			this.byId("ErrorLogPopover").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
		},
		
		onPressFilter: function (req, oEvent){
            var oView = this.getView();
            var that = this;

                    if (!that.pErrorLogPopover) {
            that.pErrorLogPopover = Fragment.load({
                id: oView.getId(), 
                name: "sierra.pra.PRA_Custom.view.collective_doi_filter",
                controller: that
            }).then(function (oDialog) {
                debugger;
                oView.addDependent(oDialog);
                return oDialog;
            });
        }
            that.pErrorLogPopover.then(function (oDialog) {
            oDialog.open();
        });
		}

	});

});