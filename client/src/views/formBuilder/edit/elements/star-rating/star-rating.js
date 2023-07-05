const script = function(){
    window.$(".star-input-1").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','#babfc7')
        window.$(".star-input-3").css('color','#babfc7')
        window.$(".star-input-4").css('color','#babfc7')
        window.$(".star-input-5").css('color','#babfc7')
    })

    window.$(".star-input-2").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','#babfc7')
        window.$(".star-input-4").css('color','#babfc7')
        window.$(".star-input-5").css('color','#babfc7')
    })
    window.$(".star-input-3").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','#babfc7')
        window.$(".star-input-5").css('color','#babfc7')
    })
    window.$(".star-input-4").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','orange')
        window.$(".star-input-5").css('color','#babfc7')
    })
    window.$(".star-input-5").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','orange')
        window.$(".star-input-5").css('color','orange')
    })
}

let starRatingType = {
    model: {
        defaults: {
            tagName: 'div',
            attributes: {class: 'star-rating'},
            components:[
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Type a question'
                },
                `
                <div class="star-rating-input">
                    <span class="fa fa-star star-input-1 star-input"></span>
                    <span class="fa fa-star star-input-2 star-input"></span>
                    <span class="fa fa-star star-input-3 star-input"></span>
                    <span class="fa fa-star star-input-4 star-input"></span>
                    <span class="fa fa-star star-input-5 star-input"></span>
                </div>
                `
            ],
            styles: `
                .star-rating{padding: 10px; width: 100%; cursor:pointer}
                .star-rating-input>span {font-size: 30px; color: #babfc7;}
            `,
            script
        }
    }
}

export default starRatingType