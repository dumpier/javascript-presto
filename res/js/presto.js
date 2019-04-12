var presto = presto || {
	lodder : `<div class='presto-loading'><div class="loader"></div></div>`,

	loading : function(target) {
		if(! $(`${target} div.presto-loading`).length ){
			$(target).prepend(this.lodder);
		}
	},

	complete : function(target) {
		$(`${target} div.presto-loading`).remove();
	},

	load : function(el) {
		let url = el.attr("href");
		let target = el.attr("p-target") ? el.attr("p-target") : "#game-content-panel";
		let params = presto.param.all(el);

		this.loading(target);
		console.log(`load content. url:${url}, target:${target}, params:${params}`);

		$.ajax({ type: "GET", url: url, data: params, timeout: 3000 }).done(function(data){
			$(target).html(data);
		}).fail(function(xhr, status, error){
			$(target).html(`Error!${status},${xhr},${error}`);
		}).always(function(){
			console.log('always...');
		});
	}
};

presto.param = {
	all : function (el) { return Object.assign( this.form(el), this.param(el), this.ref(el) ); },
	form : function (el) { return $(el).serializeArray(); },
	param : function (el) { return $(el).attr("p-param"); } ,
	ref : function (el) { return $(el).attr("p-ref"); },
}


// ----------------------------------------
// tableの生成
// ----------------------------------------
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
		// if(! is_not_reset ) { this.reset(); }
		return this;
	}
}

presto.table.html = {
	// 1個上のnamespace
	prop : presto.table.prop,

	header : function () {
		let header = (this.prop.header.length) ? this.prop.header : this.header_default();
		console.log(`header: ${header}`);

		let html = `<theader>`;
		header.forEach(function(field){ html += `<th>${field}</th>`; });
		html += `</theader>`;
		return html;
	},

	header_default : function() {
		// 配列の場合、CSVだと判定
		return Array.isArray(this.prop.rows[0]) ? this.prop.rows.shift() : Object.keys(this.prop.rows[0]);
	},

	body : function() {
		if(! this.prop.rows ) { return ""; }
		let html = "";
		this.prop.rows.forEach(function(row){ html += this.line(row); }, this);
		return html;
	},

	line : function(row) {
		let html = "<tr>";
		Object.keys(row).forEach(function(key) { html += `<td>${row[key]}</td>`; });
		html += "</tr>";
		return html;
	}
}
// ----------------------------------------


// ----------------------------------------
// ディレクティブ
// ----------------------------------------
presto.directive = {}
presto.directive.on = {}
presto.directive.bind = {}
presto.directive.model = {}
presto.directive.if = {}
presto.directive.elseif = {}
presto.directive.else = {}
presto.directive.endif = {}
presto.directive.for = {}
presto.directive.forearch = {}
