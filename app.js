

let app = new Vue({
    el: '#app',
    data: {
        cart: [],
        sitename: 'After school classes',
        selectFilter: 'subject',
        selectOrder: 'ascending',
        cartShown: 'false',
        lessons: lessons,
        filters: ['subject', 'location', 'price', 'available'],
        orderBy: ['ascending', 'aescending'],
        order: {
            name: '',
            number:''
        }
    },
    methods: {

        addToCart: function(lesson){
            if(this.getAvailableSpaces(lesson) > 0) {
                
                let exist = false;
                this.cart.forEach( item => {
                    if(item.lesson == lesson) {
                    exist = true;
                    item.quantity++;
                    }
                });

                if(!exist){
                    this.cart.push({
                    lesson: lesson,
                    quantity: 1
                    });
                }
            }
        },
        countCart(lesson) {
            let count = 0;
            this.cart.forEach(item => {
                if(item.lesson === lesson) {
                    count = item.quantity;
                }
            });
            return count;
        },
        viewCart(value) {

            this.cartShown = value;
            

        },
        removeItem(index, event) {
            this.cart.splice(index, 1);
        },
        getAvailableSpaces(lesson) {
            return lesson.availableSpaces - this.countCart(lesson);
        },
        available(lesson) {
            return (this.getAvailableSpaces(lesson) <= 0) ? true : false;
        },
        selectedFilter(filter) {
            return filter == this.selectedFilter ? true : false;
        },
        selectedOrder(order) {
            return order == this.selectedOrder ? true : false;
        },
        increaseQuantity(item) {
            if(item.quantity < 5 ) {
                item.quantity++;  
            }          
        },
        decreaseQuantity(item) {
            if (item.quantity > 0)
            {
                item.quantity--; 
            }           
        }, 
        checkout () {
            alert('Thank you, you are now booked into your class(s)');
            this.cart = [];
        }

    },
    computed: {
        cartCount() {
            return this.cart.length;
        },
        itemsInCart() {
            return (this.cartCount <= 0) ? false : true;
        },
        cartTotal() {
            let total = 0;
            this.cart.forEach (item => {
                total += item.lesson.price * item.quantity;
            });
            return total.toFixed(2);
        },
        isCartShown() {
            return this.cartShown;
        },
        sort() {
            let lessonsArray = this.lessons.slice(0); 
            let that = this;
            function compare(a, b) {
                if (a[that.selectFilter] > b[that.selectFilter]) {
                    return that.selectOrder == 'ascending' ? 1 : -1;
                }
                if (a[that.selectFilter] < b[that.selectFilter]) {
                    return that.selectOrder == 'ascending' ? -1 : 1;
                }
                return 0; 
            }
            return lessonsArray.sort(compare); 
        },
        
             
                
    }           
});
    
