sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Label, Filter, FilterOperator, Fragment) {
	"use strict";

	return Controller.extend("sierra.pra.PRA_Custom.controller.non-operated", {
		onInit: function () {

        },
        onBalance: function(){
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.non-operated_balance",
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
        onCloseBalance: function () {
			this.byId("non-operated_balance").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
		},
		onImport: function(){
			debugger;
			this.byId("non-operated_balance").destroy();
		    this.pErrorLogPopover = undefined;
		    
			var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.non-operated_balance_upload",
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
		onCloseErrorLogPopover: function () {
			this.byId("View1view").destroy();
		    this.pErrorLogPopover = undefined;
			debugger;
			
			 var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.non-operated_balance",
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