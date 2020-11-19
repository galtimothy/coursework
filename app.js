

let app = new Vue({
    el: '#app',
    data: {
        cart: [],
        sitename: 'After school classes',
        lessons: lessons,
    },
    methods: {

        addToCart: function(lesson){
            if(this.getAvailableSpaces(lesson) > 0) {
                
                let exists = false;
                this.cart.forEach(item => {
                    if(item.lesson == lesson) {
                        exists = true;
                        item.quantity++;
                    }
                });

                if(!exists) {
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
        getAvailableSpaces(lesson) {
            return lesson.availableSpaces - this.countCart(lesson);
        },
        isAvailable(lesson) {
            return (this.getAvailableSpaces(lesson) <= 0) ? true : false;
        }
    },
    computed: {
        cartTotal() {
            let total = 0;
            this.cart.forEach (item => {
                total += item.lesson.price*item.quantity;
            });
            return total.toFixed(2);
        },
        sort() {
            let lessonsArray = this.lessons.slice(0); 
            let that = this;
            function compare(a, b) {
                if (a[that.selectedFilter] > b[that.selectedFilter]) {
                    return that.selectedOrder == 'ascending' ? 1 : -1;
                }
                if (a[that.selectedFilter] < b[that.selectedFilter]) {
                    return that.selectedOrder == 'ascending' ? -1 : 1;
                }
                return 0; 
            }
            return lessonsArray.sort(compare); 
        }       
                
    }           
});
    
