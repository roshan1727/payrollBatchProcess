sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"sap/ui/core/Fragment",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Label, Filter, FilterOperator, Fragment, MessageToast) {
	"use strict";

	return Controller.extend("sierra.pra.PRA_Custom.controller.payout", {
	 onInit: function () {

            var that = this;

            this.globalModel = this.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(this.globalModel);
            oModel.setSizeLimit(500);
            this.getView().setModel(oModel, "oModel");
            console.log("omodel first ", oModel);

            //that.globalModel.header = [];


            // var https = new XMLHttpRequest();
            // https.onreadystatechange=function(){
            //     this.responseText
            //     var sToken1 =  JSON.parse(this.responseText);

            //         console.log(JSON.parse(this.responseText));
            //         debugger;
            //         var result = sToken1.Payout_hdrSet;
            //         debugger;
            //         //for (var j = 0; j < result.length; j++) {

            //         that.globalModel.header = result;

            //         //}
            //         console.log(that.globalModel.header);

            //         var oModelheader = new JSONModel(that.globalModel);
            //         console.log(oModelheader);
            //         //that.getView().getModel("oModel").refresh();

            //         oModelheader.setSizeLimit(500);

            //         that.getView().setModel(oModelheader, "oModelheader");
            //         that.getView().getModel("oModel").refresh();

            // }
            // https.open('GET','https://91d8535ftrial-dev-pra-service-srv.cfapps.us10.hana.ondemand.com/PayouthdrSet')

            // https.send();   

            
            this.onPayoutadd();

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/typedisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.PayoutAddPayoutType = data;

                }
            });

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/statusdisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.PayoutAddStatus = data;

                }
            });

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/freqdisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.PayoutAddFrequency = data;

                }
            });

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/venturedisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.PayoutVenture = data;
                    var oModelPayoutVenture = new JSONModel(data);
                    oModelPayoutVenture.setSizeLimit(500);
                    that.getView().setModel(oModelPayoutVenture, "oModelPayoutVenture");

                }
            });

            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/costdisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.Payoutcostcenteradd = data;

                }
            });
            




        },

	onSearch: function (event) {
            debugger;
            var oItem = event.getParameter("suggestionItem");
            if (oItem) {
                MessageToast.show("Search for: " + oItem.getText());
            } else {
                MessageToast.show("Search is fired!");
            }
            
        },
        onSuggest: function (event) {
            debugger;

            this.oSF = this.getView().byId("searchField");
            var sValue = event.getParameter("suggestValue"),
                aFilters = [];
            if (sValue) {
                aFilters = [
                    new Filter([
                        new Filter("VENTURE_ID", function (sText) {
                            return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        })
                    ], false)

                ];
            }

            this.oSF.getBinding("suggestionItems").filter(aFilters);
            this.oSF.suggest();
        },
        onVentureSelect: function () {
            
            var that = this;
            let costcenter = that.getView().byId("searchField").mProperties.value;
            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/venturejoin?VENTURE_ID=%27" + costcenter + "%27",
                dataType: "json",
                async: false,
                success: function (data) {

                    that.globalModel.PayoutCostcenter = data;

                }
            });
        },
        onPayoutadd: function () {
            var that = this;
            jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/postdisplay",
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.PayoutTableData = data;
                    let ids = data.data.map(payid => {
                        return { PAYOUT_ID_List: payid.PAYOUT_ID }
                    });
                    let payoutdata = { ids };
                    
                    var oModelPayoutid = new JSONModel(payoutdata);
                    oModelPayoutid.setSizeLimit(500);
                    that.getView().setModel(oModelPayoutid, "oModelPayoutid");
                    
                    
                    var oModelPayout = new JSONModel(data);
                    oModelPayout.setSizeLimit(500);
                    that.getView().setModel(oModelPayout, "oModelPayout");

                    let highest = that.globalModel.PayoutTableData.data.reduce((max, shot) => {
                        return shot.PAYOUT_ID >= max.PAYOUT_ID ? shot : max;
                    });
                    let highestValue = Number(highest.PAYOUT_ID);
                    that.globalModel.PayoutID = String(highestValue + 1).padStart(5, '0');
                }
            });
        },
        onSavePayoutAdd: function () {
            debugger;
            let data = {
                PAYOUT_ID: this.getView().byId("productInputpayout").mProperties.value,
                VENTURE: this.getView().byId("ventureselect").mProperties.selectedKey,
                COST_CENTER: this.getView().byId("selectcost").mProperties.selectedKey,
                STATUS: this.getView().byId("selectstatus").mProperties.selectedKey,
                PAYOUT_TYPE: this.getView().byId("payouttypeadd").mProperties.selectedKey,
                REPORTING_FREQUENCY: this.getView().byId("reportingfrequencyadd").mProperties.selectedKey,
                BEGIN_DATE: this.getView().byId("idIssueDate11").mProperties.value,
                END_DATE: this.getView().byId("idIssueDate22").mProperties.value

            }

            $.ajax({
                url: "https://56d6569dtrial-dev-orp-srv.cfapps.us10.hana.ondemand.com/postadd",
                type: 'POST',
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function (data) {
                    console.log("success" + data);

                },
                error: function (e) {
                    console.log("error: " + e);
                }
            });
            this.getView().getModel("oModel").refresh();
            this.onPayoutadd();
            this.byId("payout_add").destroy();
            this.pErrorLogPopover = undefined;

        },

        onDisplayForm: function (oEvent) {
            var model = this.getView().getModel("oModel");
            this.globalModel.navigationMode = "Display";
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routepayout_position", {}, true);
        },
        onPressPayoutAdd: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.payout_add",
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

        onPayoutBalAdj: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.payout_baladj",
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
        onPayoutProvisions: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.payout_provisions",
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
            this.byId("PayoutBalAdjPopover").destroy();
            this.pErrorLogPopover = undefined;
            debugger;
        },

        onSaveBalAdj: function () {

            // var total=0;
            // debugger;

            // this.globalModel.BalAdjLineItem.forEach(item => {
            // 	debugger;
            // 	total += Number(item.Amount)
            // 	this.globalModel.BalAdjLineItemTotal = total;
            // 	debugger;
            // })
            // console.log(total);
            // console.log(this.globalModel.BalAdjLineItem);




            // console.log(this.globalModel.BalAdjLineItemTotal);
            // this.getView().getModel("oModel").refresh();
            // this.byId("PayoutBalAdjPopover").destroy();
            // this.pErrorLogPopover = undefined;
            // debugger;


        },

        onAddLineItem: function () {
            // debugger;
            // var Des = this.getView().byId("idTableARPABudgetItems").getItems()[0].getCells()[1].getValue();
            // var Amt = this.getView().byId("idTableARPABudgetItems").getItems()[0].getCells()[2].getValue();
            // debugger;

            var total = 0;
            debugger;

            this.globalModel.BalAdjLineItem.forEach(item => {
                debugger;
                total += Number(item.Amount)
                this.globalModel.BalAdjLineItemTotal = total;
                debugger;
            })
            console.log(total);
            console.log(this.globalModel.BalAdjLineItem);




            console.log(this.globalModel.BalAdjLineItemTotal);
            this.getView().getModel("oModel").refresh();

            var lineItem = {

                FormType: "Bal",
                FormNum: "Bal_001",
                GLAccount: "",
                Description: "",
                Amount: "",
                FundApproved: 0,
                readOnly: false
            };

            this.globalModel.BalAdjLineItem.push(lineItem);
            console.log(this.globalModel.BalAdjLineItem);

            this.getView().getModel("oModel").refresh();
        },
        onLiveChge: function () {

            // var total=0;
            // debugger;

            // this.globalModel.BalAdjLineItem.forEach( item =>{
            // 	debugger;
            // 		total += Number(item.Amount)
            // 		debugger;
            //  	})
            //  	console.log(total);
            //     console.log(this.globalModel.BalAdjLineItem);
        },
        onpressCostcenter: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.payout_costcenter",
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
        onCloseErrorcost: function () {
            this.byId("Payoutcostcenter").destroy();
            this.pErrorLogPopover = undefined;
            debugger;
        },
        onClosePayoutAdd: function () {
            this.byId("payout_add").destroy();
            this.pErrorLogPopover = undefined;
            debugger;
        },

        onExit: function () {
            this.aKeys = [];
            this.aFilters = [];
            this.oModel = null;
        },
        onToggleHeader: function () {
            this.getPage().setHeaderExpanded(!this.getPage().getHeaderExpanded());
        },
        onToggleFooter: function () {
            this.getPage().setShowFooter(!this.getPage().getShowFooter());
        },
        onSelectChange: function () {
            var aCurrentFilterValues = [];

            aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
            aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
            aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));
            aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectVenture));
            aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectWell));
            this.filterTable(aCurrentFilterValues);
        },

        filterTable: function (aCurrentFilterValues) {
            this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
            this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
        },

        updateFilterCriterias: function (aFilterCriterias) {
            this.removeSnappedLabel(); /* because in case of label with an empty text, */
            this.addSnappedLabel(); /* a space for the snapped content will be allocated and can lead to title misalignment */
            this.oModel.setProperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
        },

        addSnappedLabel: function () {
            var oSnappedLabel = this.getSnappedLabel();
            oSnappedLabel.attachBrowserEvent("click", this.onToggleHeader, this);
            this.getPageTitle().addSnappedContent(oSnappedLabel);
        },

        removeSnappedLabel: function () {
            this.getPageTitle().destroySnappedContent();
        },

        getFilters: function (aCurrentFilterValues) {
            this.aFilters = [];

            this.aFilters = this.aKeys.map(function (sCriteria, i) {
                return new Filter(sCriteria, FilterOperator.Contains, aCurrentFilterValues[i]);
            });

            return this.aFilters;
        },
        getFilterCriteria: function (aCurrentFilterValues) {
            return this.aKeys.filter(function (el, i) {
                if (aCurrentFilterValues[i] !== "") {
                    return el;
                }
            });
        },
        getFormattedSummaryText: function (aFilterCriterias) {
            if (aFilterCriterias.length > 0) {
                return "Filtered By (" + aFilterCriterias.length + "): " + aFilterCriterias.join(", ");
            } else {
                return "Filtered by None";
            }
        },

        getTable: function () {
            return this.getView().byId("idProductsTable");
        },
        getTableItems: function () {
            return this.getTable().getBinding("items");
        },
        getSelect: function (sId) {
            return this.getView().byId(sId);
        },
        getSelectedItemText: function (oSelect) {
            return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
        },
        getPage: function () {
            return this.getView().byId("dynamicPageId");
        },
        getPageTitle: function () {
            return this.getPage().getTitle();
        },
        getSnappedLabel: function () {
            return new Label({
                text: "{/Filter/text}"
            });
        }
	});
});