(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}$(document).ready((function(){var t=window.productOptions,o=t.productOptionLang,n=t.coreBaseLang,a=t.currentProductOption,i=t.options,r={productOptions:a,init:function(){this.eventListeners(),this.generateProductOption(),this.sortable()},sortable:function(){$(".option-value-sortable tbody").sortable({stop:function(){$(".option-value-sortable tbody").sortable("toArray",{attribute:"data-index"}).map((function(e,t){$('.option-row[data-index="'+e+'"]').find(".option-value-order").val(t)}))}}),$(".accordion-product-option").sortable({stop:function(){$(".accordion-product-option").sortable("toArray",{attribute:"data-index"}).map((function(e,t){$('.accordion-item[data-index="'+e+'"]').find(".option-order").val(t)}))}})},generateProductOption:function(){var e=this,t="";$("#accordion-product-option").html(""),this.productOptions.map((function(o,n){t+=e.generateOptionTemplate(o,n)})),$("#accordion-product-option").append(t),this.sortable()},eventListeners:function(){var e=this;$(".product-option-form-wrap").on("click",".add-from-global-option",(function(){var t=$("#global-option").val();return-1!=t?e.addFromGlobalOption(t):toastr.error(o.please_select_option),!1})).on("click",".remove-option",(function(){var t=$(this).data("index");e.productOptions.splice(t,1),$(this).parents(".accordion-item").remove()})).on("keyup",".option-name",(function(){var t=$(this).parents(".accordion-item").data("product-option-index"),o=$(this).val();$(this).parents(".accordion-item").find(".accordion-button").text(o),e.productOptions[t].name=o})).on("change",".option-type",(function(){var t=$(this).parents(".accordion-item").data("product-option-index");e.productOptions[t].option_type=$(this).val(),e.generateProductOption()})).on("change",".option-required",(function(){var t=$(this).parents(".accordion-item").data("product-option-index");e.productOptions[t].required=$(this).is(":checked")})).on("click",".add-new-row",(function(){e.addNewRow($(this))})).on("click",".remove-row",(function(){$(this).parent().parent().remove()})).on("click",".add-new-option",(function(){var t={name:"",values:[{affect_price:0,affect_type:0}],option_type:"N/A",required:!1};e.productOptions.push(t);var o=e.generateOptionTemplate(t,e.productOptions.length-1);$("#accordion-product-option").append(o),e.sortable()}))},addNewRow:function(e){var t=e.parent().find("table tbody"),o=e.parents(".accordion-item").data("product-option-index"),n=t.find("tr").last().clone(),a="options["+o+"][values]["+t.find("tr").length+"][option_value]",i="options["+o+"][values]["+t.find("tr").length+"][affect_price]",r="options["+o+"][values]["+t.find("tr").length+"][affect_type]";n.find(".option-label").prop("name",a).val(""),n.find(".affect_price").prop("name",i).val(0),n.find(".affect_type").prop("name",r).val(0),n.find(".option-value-order").val(t.find("tr").length),n.attr("data-index",t.find("tr").length),t.append(n)},addFromGlobalOption:function(e){var t=this;axios.get(window.productOptions.routes.ajax_option_info+"?id="+e).then((function(e){var o=e.data.data;t.productOptions.push({id:o.id,name:o.name,option_type:o.option_type,option_value:o.option_value,values:o.values,required:o.required}),t.generateProductOption()}))},generateOptionTemplate:function(e,t){var a=this.generateFieldOptions(e),i=void 0!==e.id?e.id:0,r=void 0!==e.order&&9999!=e.order?e.order:t,p=$("#template-option").html(),c=e.required?"checked":"",_=this.generateOptionValues(e.values,e.option_type,t);return p.replace(/__index__/g,t).replace(/__order__/g,r).replace(/__id__/g,i).replace(/__optionName__/g,"#"+(parseInt(t)+1)+" "+e.name).replace(/__nameLabel__/g,n.name).replace(/__option_name__/g,e.name).replace(/__namePlaceHolder__/g,n.name_placeholder).replace(/__optionTypeLabel__/g,o.option_type).replace(/__optionTypeOption__/g,a).replace(/__checked__/g,c).replace(/__requiredLabel__/g,o.required).replace(/__optionValueSortable__/g,_)},generateFieldOptions:function(t){var o="";return $.each(i,(function(n,a){if("object"==e(a))o+='<optgroup label="'+n+'">',$.each(a,(function(e,n){var a=t.option_type===e?"selected":"";o+="<option "+a+' value="'+e+'">'+n+"</option>"})),o+="</optgroup>";else{var i=t.option_type===n?"selected":"";o+="<option "+i+' value="'+n+'">'+a+"</option>"}})),o},generateOptionValues:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,a=o.label,i=o.price,r=o.price_type,p="",c="",_=t.split("\\");if(""!==(_=_[_.length-1])&&void 0!==t&&"N/A"!==t)if("Field"===_){p=$("#template-option-values-of-field").html();var l=0===e[0].affect_type?"selected":"",d=1===e[0].affect_type?"selected":"";c+=p.replace(/__priceLabel__/g,i).replace(/__priceTypeLabel__/g,r).replace(/__id__/g,e[0].id).replace(/__index__/g,n).replace(/__affectPrice__/g,e[0].affect_price).replace(/__affectPriceLabel__/g,o.affect_price_label).replace(/__selectedFixed__/g,l).replace(/__fixedLang__/g,o.fixed).replace(/__selectedPercent__/g,d).replace(/__percentLang__/g,o.percent)}else{if(e.length>0){var u=$("#template-option-type-array").html(),s="",f=u.replace(/__priceLabel__/g,i).replace(/__priceTypeLabel__/g,r).replace(/__index__/g,n).replace(/__label__/g,a);$.each(e,(function(e,t){var a=$("#template-option-type-value").html(),i=void 0===t.order?t.order:e,r=0===t.affect_type?"selected":"",p=1===t.affect_type?"selected":"";s+=a.replace(/__key__/g,e).replace(/__id__/g,t.id).replace(/__order__/g,i).replace(/__index__/g,n).replace(/__labelPlaceholder__/g,o.label_placeholder).replace(/__affectPriceLabel__/g,o.affect_price_label).replace(/__selectedFixed__/g,r).replace(/__fixedLang__/g,o.fixed).replace(/__selectedPercent__/g,p).replace(/__option_value_input__/g,t.option_value?t.option_value:"").replace(/__affectPrice__/g,t.affect_price).replace(/__percentLang__/g,o.percent)})),c+=f.replace(/__optionValue__/g,s)}c+='<button type="button" class="btn btn-info mt-3 add-new-row" id="add-new-row">'.concat(o.add_new_row,"</button>")}return c}};r.init()}))})();