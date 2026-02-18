sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, Label, Filter, FilterOperator, Fragment) {
	"use strict";

	return Controller.extend("sierra.pra.PRA_Custom.controller.revenue_header", {
		onInit: function() {
			
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
				console.log("oModel l",oModel);
				debugger;

			
				this.getOwnerComponent().getModel().read("/Revenue_HDRSet", {
				success: function (oData, oResponse) {
					 debugger;
						that.globalModel.header=[];
					 debugger;
					that.globalModel.companyList = oData.results;
						
					for (var j = 0; j < that.globalModel.companyList.length; j++) {
							that.globalModel.header.push(that.globalModel.companyList[j]);
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
			
			
			//dropdown
			this.getOwnerComponent().getModel().read("/SE_CMP_CODESet", {
				success: function (oData, oResponse) {
					
					that.globalModel.companyCode = oData.results;
					console.log("company code",that.globalModel.companyCode);	
				
					that.getView().getModel("oModel").refresh();
					 debugger;
					// that.globalModel.layoutSettings = oData.results;
					//
				//	console.log("result comp",this.oModel);
				
				},
				error: function (oError) {
					// show error
					 debugger;
				}
			});
			this.getOwnerComponent().getModel().read("/SE_WELL_IDSet", {
				success: function (oData, oResponse) {
					that.globalModel.wellIdList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_VENTURESet", {
				success: function (oData, oResponse) {
					that.globalModel.ventureList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_DECKTYPESet", {
				success: function (oData, oResponse) {
					that.globalModel.deckTypeList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_PRODUCTSet", {
				success: function (oData, oResponse) {
					that.globalModel.productList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_ENTITYTYPESet", {
				success: function (oData, oResponse) {
					that.globalModel.entityTypeList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_PAYCODESet", {
				success: function (oData, oResponse) {
					that.globalModel.payCodeList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_SUSPENSEREASONSet", {
				success: function (oData, oResponse) {
					that.globalModel.suspenseReasonList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_BANUMBERSet", {
				success: function (oData, oResponse) {
					that.globalModel.baNumberList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_WELLNAMESet", {
				success: function (oData, oResponse) {
					that.globalModel.wellNameList = oData.results;
					that.getView().getModel("oModel").refresh();
				},
				error: function (oError) {
				}
			});
			this.getOwnerComponent().getModel().read("/SE_OWNERIDSet", {
				success: function (oData, oResponse) {
					that.globalModel.ownerIdList = oData.results;
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

		onExit: function() {
			this.aKeys = [];
			this.aFilters = [];
			this.oModel = null;
		},
		onToggleHeader: function() {
			this.getPage().setHeaderExpanded(!this.getPage().getHeaderExpanded());
		},
		onToggleFooter: function() {
			this.getPage().setShowFooter(!this.getPage().getShowFooter());
		},
		onSelectChange: function() {
			var aCurrentFilterValues = [];
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectVenture)); 
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectWell));
			this.filterTable(aCurrentFilterValues);
		},

		filterTable: function(aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
			this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
		},

		updateFilterCriterias: function(aFilterCriterias) {
			this.removeSnappedLabel(); /* because in case of label with an empty text, */
			this.addSnappedLabel(); /* a space for the snapped content will be allocated and can lead to title misalignment */
			debugger;
			this.oModel.setProperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
			debugger;
		},

		addSnappedLabel: function() {
			var oSnappedLabel = this.getSnappedLabel();
			oSnappedLabel.attachBrowserEvent("click", this.onToggleHeader, this);
			this.getPageTitle().addSnappedContent(oSnappedLabel);
		},

		removeSnappedLabel: function() {
			this.getPageTitle().destroySnappedContent();
		},

		getFilters: function(aCurrentFilterValues) {
			this.aFilters = [];

			this.aFilters = this.aKeys.map(function(sCriteria, i) {
				return new Filter(sCriteria, FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},
		getFilterCriteria: function(aCurrentFilterValues) {
			return this.aKeys.filter(function(el, i) {
				if (aCurrentFilterValues[i] !== "") {
					return el;
				}
			});
		},
		getFormattedSummaryText: function(aFilterCriterias) {
			if (aFilterCriterias.length > 0) {
				return "Filtered By (" + aFilterCriterias.length + "): " + aFilterCriterias.join(", ");
			} else {
				return "Filtered by None";
			}
		},

		getTable: function() {
			return this.getView().byId("idProductsTable");
		},
		getTableItems: function() {
			return this.getTable().getBinding("items");
		},
		getSelect: function(sId) {
			return this.getView().byId(sId);
		},
		getSelectedItemText: function(oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
		getPage: function() {
			return this.getView().byId("dynamicPageId");
		},
		getPageTitle: function() {
			return this.getPage().getTitle();
		},
		getSnappedLabel: function() {
			return new Label({
				text: "{/Filter/text}"
			});
		}
	});
});
