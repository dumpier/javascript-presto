# javascript-presto

<a href="https://dumpier.github.io/javascript-presto/">github pages</a>


```html
# css class
- presto-get
- presto-post
# html property
- p-target
- p-param
- p-form
- p-ref

<a href="./character.html" class="presto-get" p-target="panel" p-ref="">

```


```javascript
// rend object to table
let rows = [
  {"id": 1, "name": "test", "caption" : "memo"},
  {"id": 2, "name": "test", "caption" : "memo"},
  {"id": 3, "name": "test", "caption" : "memo"},
];
presto.table.target("#panel").rows(rows).render();
presto.table.target("#panel").render(rows);
presto.table.target("#panel").build(rows);
presto.table.target("#panel").css("css-name").style("font:9pt;").render(rows);

// rend csv to table
let csv = [
  ["id", "name", "caption"],
  [1, "name", "memo"],
  [2, "name", "memo"],
  [3, "name", "memo"],
];
presto.table.target("#panel").rows(csv).render();
```
