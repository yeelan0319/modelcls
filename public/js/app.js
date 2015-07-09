var cache = {
	province: [],  //使用filtered渲染dropdown
	city: [],
	data: []  //数据源
}
var filtered = {  
	province: [],  //使用filtered决定选中状态
	city: [],
	data: []  //使用filtered渲染数据表
};
var order = {
	province: 'asc',
	city: 'asc'
};
var provinceCityMap = {};

$(document).ready(function(){
	//初始化页面：请求数据，缓存、计算并且渲染页面
  $.getJSON( location.pathname + "/json", function(data) {
  	//缓存原始数据和不会反复修改的省份数据
  	cache.data = _.sortByOrder(JSON.parse(data), ['province', 'city'], [order.province, order.city]);
  	filtered.data = cache.data;
  	renderList();
  	
  	//为了防止大量计算影响渲染进程，影响用户体验，延迟计算
  	setTimeout(function(){
  		//构建city,provincemap
	  	_.each(cache.data, function(pair){
	  		provinceCityMap[pair.province] = provinceCityMap[pair.province] || [];
	  		if(!~provinceCityMap[pair.province].indexOf(pair.city)) {
	  			provinceCityMap[pair.province].push(pair.city);
	  		}
	  	});
	  	
	  	cache.province = _.keys(provinceCityMap);
	  	filtered.province = cache.province;
	  	renderDropdown('province');

	  	cache.city = _.flatten(_.values(provinceCityMap));
	  	filtered.city = cache.city;
	  	renderDropdown('city');
  	}, 1000);
  });

  //对目前的数据进行重新排序，修改缓存的排序状态并且重新渲染filterData数据。目前仅可以根据一列进行排序
  $('.sort-button').click(function(e){
  	var target = $(e.target).parents('.dropdown').hasClass('province')? 'province' : 'city';
  	order[target] = order[target] === 'asc'? 'desc' : 'asc';
		filtered.data = _.sortByOrder(filtered.data, [target], [order[target]]);
  	renderList();
  });
  
  //防止选择触发dropdown close的事件，并且修改filterList的状态
  $('.dropdown .dropdown-menu').delegate('li .check-item', 'click', function(e){
  	e.stopPropagation();

  	var target = $(e.target).parents('.dropdown').hasClass('province')? 'province' : 'city';
  	order[target] = 'asc';
  	if(e.target.checked){
  		filtered[target].push($(e.target).parent().text());
  		if(filtered[target].length === cache[target].length){
  			$(e.target).parents('.dropdown-menu').find('li .check-all').prop('checked', true);
  		}
  	}
  	else{
  		$(e.target).parents('.dropdown-menu').find('li .check-all').prop('checked', false);
  		filtered[target] = _.without(filtered[target], $(e.target).parent().text());
  	}
  	// 重新计算城市数据
  	if(target === 'province') {
  		var tempCity = [];
  		var oldCacheCity = cache.city;
  		cache.city = _.flatten(_.values(_.pick(provinceCityMap, filtered.province)));

  		_.each(cache.city, function(city){
  			if(~oldCacheCity.indexOf(city)){
  				if(~filtered.city.indexOf(city)){
  					tempCity.push(city);
  				}
  			}
  			else{
  				tempCity.push(city);
  			}
  		});
  		filtered.city = tempCity;
  		renderDropdown('city');
  	}

  	filtered.data = _.filter(cache.data, function(shop){
	  	return ~filtered.province.indexOf(shop.province) && ~filtered.city.indexOf(shop.city);
		});
		filtered.data = _.sortByOrder(filtered.data, [target], [order[target]]);
 		renderList();
  });

  //当item选中状态改变的时候，
  $('.dropdown .dropdown-menu').delegate('li .check-all', 'click', function(e){
  	e.stopPropagation();

  	var target = $(e.target).parents('.dropdown').hasClass('province')? 'province' : 'city';
  	var $el = target === 'province'? $('.province.dropdown .dropdown-checklist') : $('.city.dropdown .dropdown-checklist');
  	order[target] = 'asc';
  	
  	if(e.target.checked) {
  		filtered[target] = cache[target];
  		$el.find('li .check-item').prop('checked', true);
  		if(target === 'province'){
	  		cache.city = _.flatten(_.values(provinceCityMap));
		  	filtered.city = cache.city;
	  		renderDropdown('city');
	  	}
  	}
  	else {
  		filtered[target] = [];
  		$el.find('li .check-item').prop('checked', false);
  		if(target === 'province'){
	  		cache.city = [];
		  	filtered.city = cache.city;
	  		renderDropdown('city');
	  	}
  	}

  	filtered.data = _.filter(cache.data, function(shop){
	  	return ~filtered.province.indexOf(shop.province) && ~filtered.city.indexOf(shop.city);
		});
		filtered.data = _.sortByOrder(filtered.data, [target], [order[target]]);
 		renderList();
  });
});

function renderDropdown(type){
	var $el = type === 'province'? $('.province.dropdown .dropdown-checklist') : $('.city.dropdown .dropdown-checklist');
	
	$el.html('');
	_.each(cache[type], function(data){
		if(~filtered[type].indexOf(data)){
			$el.append('<li><label><input class="check-item" type="checkbox" checked>' + data + '</label></li>');
		}
		else{
			$el.append('<li><label><input class="check-item" type="checkbox">' + data + '</label></li>');
		}
	});
}

function renderList(){
	$('tbody').html('');
	_.each(filtered.data, function(shop){
		$('tbody').append(Handlebars.templates[location.pathname.slice(1)](shop));
	});
}