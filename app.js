function ElementBuilder(name) {
  this.element = document.createElement(name);

  this.text = function (text) {
    this.element.textContent = text;
    return this;
  };

  this.type = function (type) {
    this.element.type = type;
    return this;
  };

  this.placeholder = function (text) {
    this.element.placeholder = text;
    return this;
  };

  this.value = function (value) {
    this.element.value = value;
    return this;
  };

  this.appendTo = function (parent) {
    if (parent instanceof ElementBuilder) {
      parent.build().appendChild(this.element);
      return this;
    } else {
      parent.appendChild(this.element);
      return this;
    }
  };

  this.id = function (id) {
    this.element.id = id;
    return this;
  };

  this.name = function (name) {
    this.element.name = name;
    return this;
  };

  this.action = function (action) {
    this.element.action = action;
    return this;
  };

  this.method = function (method) {
    this.element.method = method;
    return this;
  };

  this.target = function (target) {
    this.element.target = target;
    return this;
  };

  this.build = function () {
    return this.element;
  };

  this.hide = function () {
    this.element.style.display = "none";
    return this;
  };

  this.show = function () {
    this.element.style.display = "block";
    return this;
  };

  this.style = function(style){
    this.element.style = style;
    return this;
  }

  this.className = function (className) {
    this.element.className = className;
    return this;
  };

  this.onClick = function (fn) {
    this.element.onclick = fn;
    return this;
  };

  this.html = function (htmlValue) {
    this.element.innerHTML = htmlValue;
    return this;
  };

  this.src = function (src) {
    this.element.src = src;
    return this;
  };

  this.alt = function (alt) {
    this.element.alt = alt;
    return this;
  };
}

const builder = {
  create(name){
    return new ElementBuilder(name);
  }
};


class Product {
  constructor(id,title,price,src,numInBasket,countInBasket){
      this.id = id;//Math.random();
      this.title= title,
      this.price= price,
      this.src= src,
      this.numInBasket= numInBasket,
      this.countInBasket= countInBasket
  }

}

class Products{
  constructor(){
      this.state =  [];
              
      produce.forEach(prd => {
          this.state.push(new Product(prd.id,prd.title,prd.price,prd.src,0,0));
      });
  }
}

class ProductApp{
  constructor(root){
    this.list = new Products();
    this.basket = new BasketList(root);
    this.root = root;
  }

  addBasket(id){
      let arrBsk = this.list.state.filter((flt)=>{return flt.id==id});
      arrBsk[0].numInBasket+=1;
      return this.list;
  }

  init(){  
    const sectionParent = builder
    .create("div")
    .id("sectionParent")
    .appendTo(this.root);

    const section = builder
    .create("section")
    .className("products")
    .appendTo(sectionParent);
    
    const sectionTitle = builder
    .create("div")
    .className("section-title")
    .appendTo(section);

    builder
    .create("H2")
    .id("ourP")
    .text("Our Products")
    .appendTo(sectionTitle);

    const overlay =builder
    .create("div")
    .className("cart-overlay")
    .appendTo(this.root);

    this.productsCenter = builder
    .create("div")
    .className('products-center')
    .appendTo(this.root);

    this.list.state.forEach((product)=>{
        const article = builder
        .create("article")
        .className("product")
        .appendTo(this.productsCenter);

        const imgContainer = builder
        .create("div")
        .className("img-container")
        .appendTo(article);

        builder
        .create("img")
        .className("product-img")
        .src(product.src)
        .appendTo(imgContainer);

        const button = builder
        .create("button")
        .className("bag-btn")
        .text(product.price)
        .onClick(()=>{
            this.addBasket(product.id);
            this.basket.makeBaskets( this.list.state);
            this.basket.init();
            this.basket.getCountBasket();
            this.basket.getTotalBasket();
        })
        .appendTo(imgContainer);

        builder
        .create("i")
        .className("fas fa-shopping-cart")
        .text("Add to cart")
        .appendTo(button);

        builder
        .create("i")
        .className("fas fa-shopping-cart")
        .appendTo(button);

        builder
        .create("H3")
        .text(product.title)
        .appendTo(article);
    })   
  }

}

class BasketList{
  constructor(root){
      this.baskets= [];
      this.root = root;
      this.navbar = new Navbar(root);
  }

  makeBaskets(list){
      this.baskets = list.filter((flt)=>{return flt.numInBasket>0});
      return this.baskets;
  }

  upturn(id){
      let arrBsk = this.baskets.filter((flt)=>{return flt.id==id});
      arrBsk[0].numInBasket+=1;
      return this.baskets;
  }

  downturn(id){
      let arrBsk = this.baskets.filter((flt)=>{return flt.id==id});        
      if(arrBsk[0].numInBasket>0){
          arrBsk[0].numInBasket-=1;
      }
      return this.baskets;
  }

  removeBsk(id){
      let arrBsk = this.baskets.filter((flt)=>{return flt.id==id});        
      arrBsk[0].numInBasket=0;
      return this.baskets;
  }

  removeAll(){
      this.baskets.forEach((basket)=>{
          basket.numInBasket=0;
      });
      return this.baskets;
  }

  getCountBasket(){
    this.countBsk = 0;
    this.baskets.forEach((tag)=>{
      this.countBsk += tag.numInBasket;
    });
    const count = document.getElementById("countBsk");
    count.textContent = this.countBsk;
  }

  getTotalBasket(){
    this.total = 0;
    this.baskets.forEach((tag)=>{
      this.total = Number(this.total) + (tag.price * tag.numInBasket);
    });
    const amount = document.getElementById("cart-total");
    amount.textContent = this.total;
  }


init(){
    
    const basketDiv = document.getElementById("basket");
    if(basketDiv){
      this.root.removeChild(basketDiv);
    }

    const cart = builder
    .create("div")
    .className("cart")
    .id("basket")
    .appendTo(this.root);

    const closeCart = builder
    .create("span")
    .className("close-cart")
    .appendTo(cart);

    builder
    .create("i")
    .className("far fa-window-close")
    .onClick(()=>{
      this.navbar.hideBaskets();      
    })
    .appendTo(closeCart);

    builder
    .create("H2")
    .text("your cart")
    .appendTo(cart);

    const contentCart = builder
    .create("div")
    .className("cart-content")
    .appendTo(cart);
   
    const listCart = builder
    .create("div")
    .appendTo(contentCart);

  if(this.baskets.length !=0){
    this.baskets.forEach((products)=>{
      const itemCart = builder
      .create("div")
      .className("cart-item")
      .appendTo(listCart);

      builder
      .create("img")
      .src(products.src)
      .appendTo(itemCart);
    
      const titleCart = builder
      .create("div")
      .appendTo(itemCart);
    
      builder
      .create("H4")
      .text(products.title)
      .appendTo(titleCart);
    
      builder
      .create("H5")
      .text(products.price)
      .appendTo(titleCart);
    
      builder
      .create("span")
      .className("remove-item")
      .text("Remove")
      .onClick(()=>{
        this.removeBsk(products.id);
        this.makeBaskets(this.baskets);
        this.init();           
        this.navbar.showBaskets();
        this.getCountBasket();
        this.getTotalBasket();
      })
      .appendTo(titleCart);

      const numberCart = builder
      .create("div")
      .appendTo(itemCart);

      builder
      .create("i")
      .className("fas fa-chevron-up")
      .onClick(()=>{
        this.upturn(products.id);
        amount.text(products.numInBasket);
        this.getCountBasket();
        this.getTotalBasket();
      })
      .appendTo(numberCart);
    
    const amount = builder
      .create("p")
      .className("item-amount")
      .text(products.numInBasket)
      .appendTo(numberCart);
    
      builder
      .create("i")
      .className("fas fa-chevron-down")
      .onClick(()=>{
        this.downturn(products.id);
        if(products.numInBasket==0){
          this.makeBaskets(this.baskets);
          this.init();           
          this.navbar.showBaskets();
          this.getCountBasket();
          this.getTotalBasket();
        }
        else{
          amount.text(products.numInBasket);
          this.getCountBasket();
          this.getTotalBasket();
        }
      })
      .appendTo(numberCart);
    })
  }

    const footerCart = builder
    .create("div")
    .className("cart-footer")
    .appendTo(cart);

    const totalCart = builder
    .create("H3")
    .text("your total :  $")
    .appendTo(footerCart);
    
    builder
    .create("span")
    .className("cart-total")
    .id("cart-total")
    .text(0)
    .appendTo(totalCart);
    
    builder
    .create("button")
    .className("clear-cart banner-btn")
    .text("clear cart")
    .style("width: 80%;")
    .onClick(()=>{
      this.removeAll();
      this.makeBaskets(this.baskets);
      this.init();           
      this.navbar.showBaskets();
      this.getCountBasket();
      this.getTotalBasket();
    })
    .appendTo(footerCart);
    
    builder
    .create("button")
    .className("clear-cart banner-btn")
    .text("Buy cart...!")
    .style("width: 80%;")
    .appendTo(footerCart);
}

}

class Navbar{
  constructor(root){
      this.root =root;
      this.list = [];
  }

  showBaskets(){
    const basketDiv = document.getElementById("basket");
    basketDiv.className ="cart showCart";
 
    const overlay = document.getElementsByClassName("cart-overlay")[0];
    overlay.className = "cart-overlay transparentBcg";
  }
       
  hideBaskets(){
    const basketDiv = document.getElementById("basket");
    basketDiv.className = "cart";
 
    const overlay = document.getElementsByClassName("cart-overlay")[0];
    overlay.className = "cart-overlay";
  }
 
  init(){
    const ourH = builder
    .create("div")
    .className("navbar")
    .id("ourH")
    .appendTo(this.root);

    const nav = builder
    .create("nav")
    .className("navbar")
    .appendTo(ourH);

    const navbar = builder
    .create("div")
    .className("navbar-center")
    .appendTo(nav);

    const icon = builder
    .create("span")
    .className("nav-icon")
    .appendTo(navbar);

    builder
    .create("i")
    .className("fas fa-bars")
    .appendTo(icon);
    
    builder
    .create("img")
    .src("./images/logo.svg")
    .alt("store logo")
    .appendTo(navbar);

    const btn = builder
    .create("div")
    .className("cart-btn")
    .appendTo(navbar);

    const navIcon = builder
    .create("span")
    .className("nav-icon")
    .appendTo(btn);

    builder
    .create("i")
    .className("fas fa-fas fa-cart-plus basket")
    .onClick(()=>{      
       this.showBaskets();
    })
    .appendTo(navIcon);
   
    builder
    .create("div")
    .className("cart-items")
    .id("countBsk")
    .text('0')
    .appendTo(btn);
  }
}

class Header{
  constructor(root){
      this.root =root;
  }

  init(){
      const header = builder
      .create("div")
      .appendTo(this.root);

      const hero = builder
      .create("header")
      .className("hero")
      .appendTo(header);

      const banner = builder
      .create("div")
      .className("banner")
      .appendTo(hero);

      const title = builder
      .create("H1")
      .className("banner-title")
      .text("furniture collection")
      .appendTo(banner);

      builder
      .create("button")
      .className("banner-btn")
      .text("shop now")
      .appendTo(banner);

      builder
      .create("a")
      .id("button")
      .appendTo(banner);

  }
}

class App {
  constructor(root) {
    this.root = root;
    this.navbar = new Navbar(this.root);
    this.header = new Header(this.root);
    this.products = new ProductApp(this.root);
    this.baskets = new BasketList(this.root);
 }
  render() {
    this.navbar.init();
    this.header.init();
    this.products.init();
    this.baskets.init();
  }
}


const app = new App(document.getElementById("root"));
app.render();