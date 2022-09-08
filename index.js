function enableTest(i){

    prodRegister.hidden = !prodRegister.hidden

    if (i === 1) {
      
        btnPincipal.innerHTML=""
        btnOn = document.createElement('button')
        btnOn.textContent = 'cliquer pour entrer un Produit'
        btnOn.classList = 'btnOn'
        
        btnPincipal.appendChild(btnOn)

        btnOn.addEventListener('click', (e)=>{
            mode++
            btnMode = mode%2
           enableTest(btnMode)
        
        })
       

    }
    if (i === 0) {
       
        btnPincipal.innerHTML=""
        btnOff = document.createElement('button')
        btnOff.textContent = 'cliquer pour Cacher le Formulaire'
        btnOff.classList = 'btnOff'
        btnPincipal.appendChild(btnOff)
        
        btnOff.addEventListener('click', (e)=>{
            mode++
            btnMode = mode%2
           enableTest(btnMode)
        
        })

    }

}

let PrintTab= (tab)=>{
    if(tab.length>=1){
        prodTabBody.innerHTML=""

        for (let item of tab) {
            
            
            
            let tabTr = document.createElement('tr')
    
            let prodNameTd = document.createElement('td')
            let marketPriceTd = document.createElement('td')
            let sellingPriceTd = document.createElement('td')
            let quantityTd = document.createElement('td')
            let optTd = document.createElement('td')
            let editBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')
    
            prodNameTd.textContent = `${item.ProdName}`
            marketPriceTd.textContent = `${item.MarketPrice}`
            sellingPriceTd.textContent = `${item.SellingPrice}`
            quantityTd.textContent = `${item.Quantity}`
            editBtn.textContent = 'Edit'
            deleteBtn.textContent = 'Delete'
            
            
            optTd.classList = 'optTd'
            editBtn.classList = 'editBtn'
            editBtn.setAttribute('id', editBtn)
            deleteBtn.classList = 'deleteBtn'
            deleteBtn.setAttribute('id', deleteBtn)
    
            prodTabBody.appendChild(tabTr)
            tabTr.appendChild(prodNameTd)
            tabTr.appendChild(marketPriceTd)
            tabTr.appendChild(sellingPriceTd)
            tabTr.appendChild(quantityTd)
            tabTr.appendChild(optTd)
            optTd.appendChild(editBtn)
            optTd.appendChild(deleteBtn)
    
    
            //fonctionalité deelete
    
            deleteBtn.addEventListener("click", (e)=>{
    
                let indexRemoved = tab.indexOf(item)
                tab.splice(indexRemoved, 1 )
                console.log(tab);
                alert("le produit que vous venez d'indexé sera supprimer")
                let td = deleteBtn.parentNode
                let tr = td.parentNode
                prodTabBody.removeChild(tr)
    
                
            })
    
            //fonctionnalité de update
    
                //transformer les élements du tableau en inputs por l'update
    
                    editBtn.addEventListener('click', (e)=>{
    
                        prodNameTd .innerHTML=''
                        marketPriceTd.innerHTML=''
                        sellingPriceTd.innerHTML=''
                        quantityTd.innerHTML=''
                        optTd.innerHTML=''
    
                        //------------------------------------
    
                        let prodNameUpdateInput = document.createElement('input')
                        let marketPriceUpdateInput = document.createElement('input')
                        let sellingPriceUpdateInput = document.createElement('input')
                        let quantityUpdateInput = document.createElement('input')
                        let submitUpdateBtn = document.createElement('button')
    
    
                        //afficher les anciens elements dans le placeholder des inputs
    
                        prodNameUpdateInput.setAttribute('placeholder', `${item.ProdName}`)
                        marketPriceUpdateInput.setAttribute('placeholder', `${item.MarketPrice}`)
                        sellingPriceUpdateInput.setAttribute('placeholder', `${item.SellingPrice}`)
                        quantityUpdateInput.setAttribute('placeholder', `${item.Quantity}`)
    
                        marketPriceUpdateInput.setAttribute('type', 'number')
                        sellingPriceUpdateInput.setAttribute('type', 'number')
                        quantityUpdateInput.setAttribute('type', 'number')
    
                        prodNameUpdateInput.setAttribute('required', true)
                        marketPriceUpdateInput.setAttribute('required', true)
                        sellingPriceUpdateInput.setAttribute('required',true)
                        quantityUpdateInput.setAttribute('required',true)
    
                        submitUpdateBtn.textContent = 'Submit'
                        submitUpdateBtn.classList = 'submitUpdateBtn'
    
                        
                        prodNameTd.appendChild(prodNameUpdateInput)
                        marketPriceTd.appendChild(marketPriceUpdateInput)
                        sellingPriceTd.appendChild(sellingPriceUpdateInput)
                        quantityTd.appendChild(quantityUpdateInput)
                        optTd.appendChild(submitUpdateBtn)
    
    
    
                        //inserer les updates à la place des anciens
    
                        submitUpdateBtn.addEventListener('click', (e)=>{
    
                            if (prodNameUpdateInput.value.length>0) {
                                item.ProdName = prodNameUpdateInput.value
                            }
                            if (marketPriceUpdateInput.value.length>0) {
                                item.MarketPrice = marketPriceUpdateInput.value
                            }
                            if (sellingPriceUpdateInput.value.length>0) {
                                item.SellingPrice = sellingPriceUpdateInput.value
                            }
                            if (quantityUpdateInput.value.length>0) {
                                item.Quantity = quantityUpdateInput.value
                            }
                            alert("les modification faite sera appliqué à votre stock de Produits")
                            console.log(item);

                           PrintTab(tab)
    
                           
                        })
    
    
                    })
    
    
        }
    }
}


let stock = []
let formProdName= document.getElementById('formProdNameInput')
let formMarketPrice = document.getElementById('formMarketPriceInput')
let formSellingPrice = document.getElementById('formSellingPriceInput')
let formQuantity = document.getElementById('formQuantityInput')
let prodRegister = document.querySelector('#prodRegister')
let prodTabBody = document.getElementById('prodTabBody')


let  btnFormAdd = document.getElementById('btnFormAdd')
let btnPincipal =document.getElementById('btnPincipal')

let mode = 1
let btnMode

btnFormAdd.addEventListener('click', (e)=>{
    mode++
    btnMode = mode%2
   enableTest(btnMode)

})


//event


prodRegister.addEventListener("submit" , (e)=>{
    e.preventDefault()

    stock.push(
        {
    
        ProdName: formProdName.value,
        MarketPrice: Number(formMarketPrice.value),
        SellingPrice : Number(formSellingPrice.value),
        Quantity : Number(formQuantity.value),
    })
    //vider les inputs
    formProdName.value=""
    formMarketPrice.value=""
    formSellingPrice.value=""
    formQuantity.value=""

    mode++
    btnMode = mode%2
    enableTest(btnMode)

    PrintTab(stock)

})
