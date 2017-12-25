const scroll = {};

let getNowScroll = ()=>{
  var de = document.documentElement;
  var b = document.body;
  var now = {};
  now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
  now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
  return now;
}

//function
function hamburger(){
  this.classList.toggle("hamburger--open");
  if(sectionContainer.style.display == ""){
    sectionContainer.style.display = "none";
    nav_list.style.display = "";
  }else{
    sectionContainer.style.display = "";
    nav_list.style.display = "none";
  }
}

function lang(){
  let lang_arr = ["Korea", "English", "Japan"];
  var lang_index = lang_arr.indexOf(language.textContent);
  if(lang_index == 2) lang_index = -1;
  language.textContent = lang_arr[++lang_index];
}


header__button.addEventListener('click', hamburger, false);
language.addEventListener('click', lang, false);

profile_info.children[1].children[1].textContent = "hello";
profile_info.children[1].children[0].children[0].textContent = "title";
profile_info.children[0].src = "img/profile.png";
