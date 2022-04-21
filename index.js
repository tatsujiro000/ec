//カートボタンを押したらカートアイコンの数字を増加
let cartBtns = $('.cartBtn');
const cartNumIcon = $('.js__cart__cnt');
cartCnt = 0;
let clicked = [];//クリックされているかどうかの配列
let save_items = [];//ローカルストレージ用の配列


$.each(cartBtns, function(index ,cartBtn) {
    $(cartBtn).on("click", function() {
        if(clicked.indexOf(index) >= 0){

            //ボタンのindexが配列に含まれていたら削除
            for(let i = 0; i < clicked.length; i++) {
                if(clicked[i] == index) {
                    clicked.splice(index, 1);
                    //ローカルストレージ配列から該当データを削除
                    save_items.splice(index, 1);
                }
            }
            inactivateBtn(cartBtn);

        } else if(clicked.indexOf(index) == -1){
            let name = cartBtn.dataset.name;
            let price = Number(cartBtn.dataset.price);
            clicked.push(index);

            
            //ローカルストレージ配列にデータを追加
            save_items.push({
                id:index,
                name: name,
                price: price
            });

            activateBtn(cartBtn);

        }
            //ローカルストレージに商品情報を上書き
            localStorage.setItem("items", JSON.stringify(save_items));
            console.log("ローカル上書き");
    })
});


function inactivateBtn(cartBtn){
    cartCnt --;
    if(cartCnt == 0){
        cartNumIcon.parent().addClass('hidden');
    }
    cartNumIcon.html(cartCnt);
    $(cartBtn).removeClass("cartIn");
}

function activateBtn(cartBtn){
    cartCnt ++;
    if(cartCnt >=1 ){
        cartNumIcon.parent().removeClass('hidden');
    }
    cartNumIcon.html(cartCnt);
    $(cartBtn).addClass("cartIn");//カートに入っているよSSのクラス名を付与
}




//カートの中身のHTML
$(".confirmCart").on("click", function() {
    //ローカルストレージに登録されている商品を取得
    let items = JSON.parse(localStorage.getItem("items"));
    let total = 0;

    if(items) {
        console.log(items);
        for(let i=0; i < items.length; i++) {

            // html = `
            // <li>
            //     <h2>${items[i].name}</h2>
            //     <p>${items[i].price}</p>
            // </li>
            // `;これだとテキストと認識されるからだめ

            // let li = $("<li>");
            // let h2 = $("<h2></h2>");
            // let p = $("<p></p>");
            // let liEnd = $("</li>");
            // h2 = $(h2).text(items[i].name);
            // p = $(p).text(items[i].price);
            // console.log(p);
            // html += $(li).append(h2).append(p).append(liEnd);
            // console.log(html);
            // $(confirmElement).html(html);
            
            let html = '<li>'
                     + '<h2>' + items[i].name + '</h2>'
                     + '<p>' + items[i].price + '</p>'
                     + '</li>';
            $(".shopping__list").append(html);

            //合計金額を表示
            total = +total + items[i].price;
            console.log($.type(items[i].price));

        }
    } else {
        console.log("ローカル何もなし判定");
    }
    $("#total").append('合計金額：' + total);

});

//購入する
$('.purchace').on("click", function() {
    alert("購入が確定しました");
})
