---
layout: blogpost
title: Basic helpers for Handlebars
tags: templating
---

I use [Handlebars](http://handlebarsjs.com/) for some time now, which is really great with a lot of possibilities. I more specifically use [hbs](https://github.com/donpark/hbs) when doing an Express project.

This is some helpers I use almost all the time that everybody using handlebars should have :)

### Block/Extend

Present by default in other templating engines like Twig or Jade, `extend` allows a template to extend another template where a `block` has been declared :

{% highlight handlebars %}
//layout.hbs
<!doctype html>
<html>
  <head>
    <title>My title</title>
    <link rel='stylesheet' href='design.css'>
    {% raw %}{{{block "stylesheets"}}}{% endraw %}
  </head>
  <body>
    {% raw %}{{{body}}}{% endraw %}
    <script type="text/javascript" src="main.js"></script>
    {% raw %}{{{block "scripts"}}}{% endraw %}
  </body>
</html>
{% endhighlight %}

{% highlight handlebars %}
//article.hbs
<h1>My article title</h1>
<p>My article content</p>
{% raw %}{{#extend "stylesheets"}}{% endraw %}
  <link rel='stylesheet' href='article.css'>
{% raw %}{{/extend}}{% endraw %}
{% raw %}{{#extend "scripts"}}{% endraw %}
  <script type="text/javascript" src="article.js"></script>
{% raw %}{{/extend}}{% endraw %}
{% endhighlight %}

The page `contact` will have look like this :

{% highlight html %}
<!doctype html>
<html>
  <head>
    <title>My title</title>
    <link rel='stylesheet' href='design.css'>
    <link rel='stylesheet' href='article.css'>
  </head>
  <body>
    <h1>My article title</h1>
    <p>My article content</p>
    <script type="text/javascript" src="main.js"></script>
    <script type="text/javascript" src="article.js"></script>
  </body>
</html>
{% endhighlight %}

The helpers code:

{% highlight javascript %}
var hbs = require('hbs');
// ...
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');
  // clear the block
  blocks[name] = [];
  return val;
});
{% endhighlight %}

### Better If

By nature Handlebars is logicless. The idea is to avoid to put logic in the template files. But sometimes it can be really useful to add some. For example, the `if` built-in helper allows you to test if a value is `true` or `false`. What if you want to compare some strings?

Here we have :

{% highlight handlebars %}
//page.hbs
{% raw %}{{#ifCond value1 '===' value2}}{% endraw %}
  //stuff
{% raw %}{{/ifCond}}{% endraw %}
{% raw %}{{#ifCond value1 '||' value2}}{% endraw %}
  //stuff
{% raw %}{{/ifCond}}{% endraw %}
{% endhighlight %}

The helper code:

{% highlight javascript %}
var hbs = require('hbs');
// ...
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
{% endhighlight %}

### Limit

What if you want to use `each` but only for the first 2 elements?

{% highlight handlebars %}
//page.hbs
{% raw %}{{#each (limit articles 2)}}{% endraw %}
  <h2>{% raw %}{{title}}{% endraw %}</h2>
  <p>{% raw %}{{text}}{% endraw %}</p>
{% raw %}{{/each}}{% endraw %}
{% endhighlight %}

The helper code:

{% highlight javascript %}
var hbs = require('hbs');
// ...
hbs.registerHelper('limit', function (arr, limit) {
  return arr.slice(0, limit);
});
{% endhighlight %}

### Concatenate

If you want to do a simple concatenation between two strings:

{% highlight handlebars %}
//page.hbs
{% raw %}{{#concat 'prefix_' mystring}}{{/concat}}{% endraw %}
{% endhighlight %}

{% highlight javascript %}
var hbs = require('hbs');
// ...
hbs.registerHelper('concat', function(string1, string2) {
  return '' + string1 + string2;
});
{% endhighlight %}
