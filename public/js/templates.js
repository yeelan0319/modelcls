(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['xiaoniu-repair'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr class=\"row\">\n  <td class=\"col-sm-1\">"
    + alias3(((helper = (helper = helpers.province || (depth0 != null ? depth0.province : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"province","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"col-sm-1\">"
    + alias3(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"col-sm-3\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"col-sm-4\">"
    + alias3(((helper = (helper = helpers.address || (depth0 != null ? depth0.address : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"address","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"col-sm-1\">"
    + alias3(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"owner","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"col-sm-2\">"
    + alias3(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"phone","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>";
},"useData":true});
})();