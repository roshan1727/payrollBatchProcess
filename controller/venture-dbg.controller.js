sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/Label',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Label, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("sierra.pra.PRA_Custom.controller.venture", {
        onInit: function () {

            var that = this;

            //New code
            debugger;
            this.globalModel = this.getOwnerComponent().getModel("globalModel");
            debugger;
            var oModel = new JSONModel(this.globalModel);
            console.log("omodel first ", oModel);
            debugger;
            // var oModel = new JSONModel(this.oDataDynMain);
            oModel.setSizeLimit(500);
            this.getView().setModel(oModel, "oModel");
            console.log("oModel l", oModel);
            debugger;


            this.getOwnerComponent().getModel().read("/ventureSet", {
                success: function (oData, oResponse) {
                    debugger;
                    that.globalModel.Venture = [];
                    debugger;
                    that.globalModel.ventureList1 = oData.results;

                    for (var j = 0; j < that.globalModel.ventureList1.length; j++) {
                        that.globalModel.Venture.push(that.globalModel.ventureList1[j]);
                    }
                    debugger;
                    that.getView().getModel("oModel").refresh();
                    debugger;
                    // that.globalModel.layoutSettings = oData.results;
                    //
                    //	console.log("result comp",this.oModel);
                    //filter starts
                    debugger;
                    //		console.log("Result",this.oModel);
                    debugger;
                    // 	debugger;

                    that.aKeys = [
                        "cmp_code", "1", "DECKTYPE", "Venture", "WELLNAME"
                    ];
                    that.oSelectName = that.getSelect("slName");
                    that.oSelectCategory = that.getSelect("slCategory");
                    that.oSelectSupplierName = that.getSelect("slDOIType");
                    this.oSelectVenture = this.getSelect("slVenture");
                    this.oSelectWell = this.getSelect("slWell");
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

        
            //dropdown end
            //new code end
            //this.oModel = new JSONModel();
            // 	debugger;
            //   this.oModel.loadData(sap.ui.require.toUrl("sierra/pra/PRA_Custom/revenue_data.json"), null, false);
            // 	debugger;
            //this.getView().setModel(this.oModel);

        },
        
        onSelectionChge: function(oEvent){
        	debugger;
        
            var oVentureList2 = this.getView().byId("idProductsTable2");
            var oItemsBinding2 = oVentureList2.getBinding("items");
            var oSelect = oEvent.getSource().getBindingContext("oModel").getObject().Vname;
            
            var oFilter = [
                new Filter("Vname", FilterOperator.EQ, oSelect)

            ];
           
            oItemsBinding2.filter(oFilter);

        },

        onSelectRequestRevenueHeaderList: function (oEvent) {


            var model = this.getView().getModel("oModel");

            var contextPaths = oEvent.getSource()._aSelectedPaths;
            // var selectedRequest = oEvent.getParameters("listitem");
            this.globalModel.navigatedRequest = model.getProperty(contextPaths[0]);


            var paths = oEvent.getSource()._aSelectedPaths;
            var path = paths[0];
            var indexStr = path.slice(path.length - 1);
            this.selectedProgramIndex = parseInt(indexStr);
        },
        onPopinLayoutChanged: function () {
            var oTable = this.byId("idProductsTable");
            var oComboBox = this.byId("idPopinLayout");
            var sPopinLayout = oComboBox.getSelectedKey();
            switch (sPopinLayout) {
                case "Block":
                    oTable.setPopinLayout(PopinLayout.Block);
                    break;
                case "GridLarge":
                    oTable.setPopinLayout(PopinLayout.GridLarge);
                    break;
                case "GridSmall":
                    oTable.setPopinLayout(PopinLayout.GridSmall);
                    break;
                default:
                    oTable.setPopinLayout(PopinLayout.Block);
                    break;
            }
        },

        // 		var smartFilterBar = this.getView().byId("SmartFilterID");
        // smartFilterBar.clear();

        onDisplayForm: function (oEvent) {
            var model = this.getView().getModel("oModel");
            this.globalModel.navigationMode = "Display";
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("owner_details", {}, true);
        },

        onDoiHeaderAddPress: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.doi_header_add",
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
            this.byId("ErrorLogPopover").destroy();
            this.pErrorLogPopover = undefined;
            debugger;
        },
        onCloseLogPopover: function () {

            debugger;
            var oVentureList = this.getView().byId("idProductsTable");
            var oItemsBinding = oVentureList.getBinding("items");
            var oVentureList2 = this.getView().byId("idProductsTable2");
            var oItemsBinding2 = oVentureList2.getBinding("items");

            oItemsBinding.filter([]);
            oItemsBinding2.filter([]);

            this.byId("ErrorLogPopover").destroy();
            this.pErrorLogPopover = undefined;
            debugger;
        },

        onPressFilter: function () {
            var oView = this.getView();
            var that = this;

            if (!that.pErrorLogPopover) {
                that.pErrorLogPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sierra.pra.PRA_Custom.view.venture_filter",
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

        onChange: function (oEvent) {

            var oVentureList = this.getView().byId("idProductsTable");
            var oItemsBinding = oVentureList.getBinding("items");
            var oVentureList2 = this.getView().byId("idProductsTable2");
            var oItemsBinding2 = oVentureList2.getBinding("items");

            debugger;
            var selectedItems = oEvent.mParameters.value;

            debugger;
            console.log(selectedItems);
            debugger;

            var oFilter = [
                new Filter("Vname", FilterOperator.EQ, selectedItems)

            ];
            oItemsBinding.filter(oFilter);
            oItemsBinding2.filter(oFilter);


            var companyCode = this.getView().byId("idProductsTable").getItems()[0].getCells()[3].mProperties.text;
            this.globalModel = this.getOwnerComponent().getModel("globalModel");

            this.globalModel.companyCode = companyCode;

            this.getView().getModel("oModel").refresh();



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
            debugger;
            this.oModel.setProperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
            debugger;
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