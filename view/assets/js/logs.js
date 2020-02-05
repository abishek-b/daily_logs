var Logs ={
    logContainer : $("#logs-container"),
    logs:[],
    init: function(){
        Logs.logs = LocalStorage.get('logs')
        if(Logs.logs == null){
            Logs.logs = []
        }
        Logs.logs.forEach(log=>{
            Logs.addLogsToContainer(log)
        })
        Logs.initAddLog()
    },
    addLogsToContainer : function(log){
        Logs.logContainer.prepend(`<div class="row mb-2">
                        <h6 class="w-100">`+log.log_time+`</h6>
                        <p class="h4 font-weight-lighter">`+log.log+`</p>
                    </div>`)
    },
    initAddLog : function(){
        $("#btn-add-log").on("click", function(e){
            e.preventDefault()
            var log = {
                log :$("#log_text").val(),
                log_time : (new Date()).toString()
            }
            Logs.updateLogs(log)
            Logs.addLogsToContainer(log)

        })
    },
    updateLogs: function(log){
        Logs.logs.push(log)
        LocalStorage.set('logs',Logs.logs)
    }
}
Logs.init()