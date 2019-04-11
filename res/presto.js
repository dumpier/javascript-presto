/**
 * javascript
*/
var presto = presto || {
	mask_html : "<div class='presto-loading'><img src='https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif'></div>",

	mask : function(target) {
		if(! $(`${target} div.presto-loading`).length ){
			$(target).prepend(this.mask_html);
		}
	},

	complete : function(target) {
		$(`${target} div.presto-loading`).remove();
	},

	load : function(el) {
		let url = el.attr("href");
		let target = el.attr("p-target");
		let params = presto.param.all(el);

		console.log(`load content. url:${url}, target:${target}, params:${params}`);
		this.mask(target);

		$.ajax({ type: "GET", url: url, data: params, timeout: 3000 }).done(function(data){
			console.log(data);
			$(target).html(data);
		}).fail(function(xhr, status, error){
			console.log(`${status},${xhr},${error}`);
			$(target).html(data);
		}).always(function(){
			console.log('always...');
		});
	}
};


presto.table = {
	prop : {
		height : 0, rows : [], header : [], fields : [], target : "",
		css : "table table-bordered table-hover table-striped",
	},

	reset : function () {
		this.prop.height = 0;
		this.prop.target = "";
		this.prop.rows ,this.prop.header, this.prop.fields = [];
		return this;
	},

	header : function(header) { this.prop.header = header; return this; },
	fields : function(fields) { this.prop.fields = fields; return this; },
	rows : function(rows) { this.prop.rows = rows; return this; },
	target : function (target) { this.prop.target = target; return this; },

	render : function(is_not_reset=false) {
		let html = `<table class="${presto.table.prop.css}">${this.html.header()} ${this.html.body()}</table>`;

		console.log(html);
		$(this.prop.target).html(html);

		if(! is_not_reset ) { this.reset(); }

		return this;
	}
}

presto.table.html = {
	header : function () {
		let header = (presto.table.prop.header.length) ? presto.table.prop.header : this.header_default();
		console.log(header);

		let html = `<theader>`;
		header.forEach(function(field){ html += `<th>${field}</th>`; });
		html += `</theader>`;
		return html;
	},

	header_default : function() {
		// 配列の場合、CSVだと判定
		return Array.isArray(presto.table.prop.rows[0]) ? presto.table.prop.rows.shift() : Object.keys(presto.table.prop.rows[0]);
	},

	body : function() {
		if(! presto.table.prop.rows ) { return ""; }
		let html = "";
		presto.table.prop.rows.forEach(function(row){ html += this.line(row); }, this);
		return html;
	},

	line : function(row) {
		let html = "<tr>";
		Object.keys(row).forEach(function(key) { html += `<td>${row[key]}</td>`; });
		html += "</tr>";
		return html;
	}
}


presto.param = {
	all : function (el) { return Object.assign(this.form(el), this.param(el), this.ref(el)); },
	form : function (el) { return $(el).serializeArray(); },
	param : function (el) { return $(el).attr("p-param"); } ,
	ref : function (el) { return $(el).attr("p-ref"); },
}
