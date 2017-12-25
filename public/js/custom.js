//init
Vue.component('card-view',{
  template: '<div class="card"><img alt="add image" style="width:100%"><div class="card_container"><h4><b>title</b></h4><p>text</p></div></div>'
});

var hamburger_nav = {
  template: '<nav><div id="menu"><div id="header__button" class="container"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div></div></div></nav>'
}

new Vue({
 el: '#p3'
});

new Vue({
 el: '#nav',
 components: {
   'hamburger-nav': hamburger_nav
 }
});
