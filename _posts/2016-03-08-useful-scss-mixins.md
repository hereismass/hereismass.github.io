---
layout: blogpost
title: Some useful scss mixins
tags: css
---

I generally put these mixins in any new project that involves scss.

Some (most) of them are useless if you use an autoprefixer ([https://github.com/nDmitry/grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) for example), but that's not the point here.


prefix-based mixins :

{% highlight scss %}
/* border-radius */
@mixin border-radius($radius){
  -webkit-border-radius:  $radius;
  -moz-border-radius:     $radius;
  -o-border-radius:       $radius;
  border-radius:          $radius;
}

#mydiv{
  @include border-radius(10px 5px);
}
{% endhighlight %}

{% highlight scss %}
/* appearance */
@mixin appearance($params) {
  -webkit-appearance:$params;
  -moz-appearance:$params;
  appearance:$params;
}

#mydiv{
  @include appearance(none);
}
{% endhighlight %}

{% highlight scss %}
/* keyframes */
@mixin keyframes($animationName) {
  @-webkit-keyframes #{$animationName} {
    @content;
  }
  @-moz-keyframes #{$animationName} {
    @content;
  }
  @-o-keyframes #{$animationName} {
    @content;
  }
  @keyframes #{$animationName} {
    @content;
  }
}

/* animation */
@mixin animation($animate...) {
  $max: length($animate);
  $animations: '';

  @for $i from 1 through $max {
    $animations: #{$animations + nth($animate, $i)};

    @if $i < $max {
      $animations: #{$animations + ", "};
    }
  }
  -webkit-animation: $animations;
  -moz-animation:    $animations;
  -o-animation:      $animations;
  animation:         $animations;
}

#mydiv{
  @include animation(loader-small 3s steps(12) infinite);
  background:url(path/to/loader-sprites.png) 0 0 no-repeat;
}
@include keyframes(loader-small) {
  0% {background-position: 0 0; }
  100% {background-position: 0 -1000px; }
}

{% endhighlight %}

{% highlight scss %}
/* transition */
@mixin transition($args...) {
  -webkit-transition: $args;
  -moz-transition: $args;
  -ms-transition: $args;
  -o-transition: $args;
  transition: $args;
}

#mydiv{
  @include transition(opacity 0s .5s);
}
{% endhighlight %}

{% highlight scss %}
/* transform */
@mixin transform($transforms...) {
  -webkit-transform: $transforms;
  -moz-transform: $transforms;
  -ms-transform: $transforms;
  -o-transform: $transforms;
  transform: $transforms;
}

#mybox{
  @include transform(translate3D(250px,0,0));
}
{% endhighlight %}

{% highlight scss %}
/* overflow-scroll */
@mixin overflow-scroll($arg){
  -webkit-overflow-scrolling: ($arg);
  -moz-overflow-scrolling: ($arg);
  -ms-overflow-scrolling: ($arg);
  -o-overflow-scrolling: ($arg);
  overflow-scrolling: ($arg);
}

#mybox{
  @include overflow-scroll(touch);
}
{% endhighlight %}

{% highlight scss %}
/* box-shadow */
@mixin box-shadow($params) {
  -webkit-box-shadow : $params;
  -moz-box-shadow : $params;
  -o-box-shadow : $params;
  box-shadow : $params;
}

#mybox{
  @include box-shadow(-3px 0 5px -2px #333 inset);
}
{% endhighlight %}

{% highlight scss %}
/* placeholder */
@mixin placeholder {
  @include optional-at-root('::-webkit-input-placeholder') {
    @content;
  }

  @include optional-at-root(':-moz-placeholder') {
    @content;
  }

  @include optional-at-root('::-moz-placeholder') {
    @content;
  }

  @include optional-at-root(':-ms-input-placeholder') {
    @content;
  }
}

#mybox input{
  @include placeholder{
    color:#000000;
  }
}
{% endhighlight %}
