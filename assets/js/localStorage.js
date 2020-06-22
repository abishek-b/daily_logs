var LocalStorage = {
    set : function(key, data){
        window.localStorage.setItem(key, JSON.stringify(data))
    },
    get : function(key){
        return JSON.parse(window.localStorage.getItem(key))
    },
    clear : function(){
        window.localStorage.clear()
    },
    delete : function(key){
        window.localStorage.removeItem(key)
    }
}

