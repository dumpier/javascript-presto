# javascript-presto
Javascript

<a href="https://dumpier.github.io/javascript-presto/">github pages</a>
```html
css class
- presto-get
- presto-post
// 
<a href="./character.html" class="presto-get" p-target="panel" p-ref="">

```

```javascript
// rend object to table
let rows = [
  {"id": 1, "name": "test", "caption" : "memo"},
  {"id": 2, "name": "test", "caption" : "memo"},
  {"id": 3, "name": "test", "caption" : "memo"},
];
presto.table.target("div#presto-json-panel").rows(rows).render();

// rend csv to table
let csv = [
  ["id", "name", "caption"],
  [1, "name", "memo"],
  [2, "name", "memo"],
  [3, "name", "memo"],
];
presto.table.target("div#presto-csv-panel").rows(csv).render();
```
