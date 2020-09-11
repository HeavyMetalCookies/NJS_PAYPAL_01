
    var database_inited=( false );

    const   fs = require(  "fs"); //:File System
    const http = require("http"); //:HTTP
    const   pg = require(  "pg"); //:Database Driver

    /** **************************************************** ***

    Main entry point for server traffic. This function should
    be small as it is just a helpful wrapper for 
    ServerTrafficHandler_Core.

    Benifits of this wrapper:

    1. Do not have to remember to call server_res.end()
       in other parts of code. Server response ends when
       we get back here.
    
    2. ServerTrafficHandler_Core can be async and allows us
       to simplify waiting on database initialization by 
       writing[      await InitDatabase()      ]
        

    *** **************************************************** **/
    function ServerTrafficHandler(
        server_req //:Incomming request  from client.
    ,   server_res //:Outgoing  response from server.
    ){

        //:sob:State_Object_Bundle:
        const sob={
            server_req
        ,   server_res
        };;

        ServerTrafficHandler_Core( sob ).then(()=>{

            console.log("[TRAFFIC_HANDLER:DONE]");

        }).catch( (err)=>{

            console.log("[TRAFFIC_HANDLER:ERR]:" + err );

        }).finally(()=>{

            sob.server_res.end();

        });;
    };;

    //: Had to split off ServerTrafficHandler into a         ://
    //: ServerTrafficHandler_Core(...) function so that      ://
    //: We could simplify waiting on database initialization.://
    async function ServerTrafficHandler_Core( sob ){

        //:If database not initialized, pause here until
        //:the database is initialized.
        if(!database_inited ){ 
            database_inited=(true);
            console.log("[ABOUT_TO::InitDatabase()]");

            await InitDatabase( sob );

            console.log("[BACK_FROM:InitDatabase()]");
        };;

        //:MAIN_REQUEST_TRAFFIC_HANDLING_LOGIC:--------------://

            const url_sanitized=(
                sob.server_req.url
                .toUpperCase()

                .split("/")
        
                //:Remove empty strings:
                .reduce((o,c)=>{if(c){ o.push( c ) };},[])

                .join("/")
            );;
            switch( url_sanitized ){ case 
            "IP":{

                sob.server_res.write("[IP]");

            };break;case 
            "WHATEVER":{
    
                sob.server_res.write("[WHATEVER]");

            };break;case
            "ANOTHER":{

                sob.server_res.write("[ANOTHER]");

            };break;default:{

                sob.server_res.write(
                    "[default:url_sanitized]:("
                        +url_sanitized      +")"
                );;

            };;};;

        //:--------------:MAIN_REQUEST_TRAFFIC_HANDLING_LOGIC://

        /** Resolve_Implied_Promise_Of_Async_Function **/
        return( 1 );

    };;

    const SERVER=http.createServer( ServerTrafficHandler );

    //: Start up the server. Listen for traffic on port in   ://
    //: heroku virtual machine (physical server) environment ://
    //: variables,or test locally on hard coded port number. ://
    SERVER.listen( process.env.PORT || 5190 /**AIM_PORT**/ );


    /** **************************************************** ***

    Initializes database tables if they do not exist yet.

    With all this boilerplate, we could make a helper function
    that reads from a file and then executes a database query.
    However, such helper functions add an extra layer of    
    [abstraction/indirection] to the code and things get hard
    to follow quickly. (In my experience.)

    *** **************************************************** **/
    function InitDatabase( //:-------------------------------://

        sob //:server_req & server_res

    ){ 
    return new Promise(function(

        //:These functions supplied
        //:by node.js runtime.
        resolve_promise  
    ,   reject_promise   

    ){
    fs.readFile( 

        "./SQL/TAB_001.CREATE_IF_NOT_EXISTS.PGSQL"

    ,( err, create_if_not_exists )=>{ if( err ){ 

        reject_promise( "[FILE_READ_ERROR]" );

    }else{ //:-----------------------------------------------://
    //:------------------------------------------------------://
    //:             BEGIN:DATABASE_OPERATIONS:               ://
    //:------------------------------------------------------://
    
        //::QUERY_TEXT:WILL_BE_RAN_HERE:---------------------://
    
        var pg_client = new pg.Client({
            connectionString:( 
                process.env.DATABASE_URL
            )
            ,
            ssl:( 
                {rejectUnauthorized:false}  
            )
        });;
    
        pg_client.connect();
        pg_client.query( 
    
            create_if_not_exists.toString() //:<--[ QUERY_TEXT ]
    
        ).then(     ( pg_res )=>{
    
            console.log("[DATABASE_INIT_SUCCESS]");
    
        }).catch(   ( pg_err )=>{
    
            reject_promise("[DATABASE_SETUP:FAIL]");
    
        }).finally( (        )=>{
    
            //:Wait here to close connection. When "end()"   ://
            //:called without a callback parameter,it returns://
            //:a promise.                                    ://
            pg_client.end().then(()=>{
    
                resolve_promise();
    
            }).catch((err)=>{
    
                sob.server_res.write(
                "[FAILED_TO_CLOSE_DATABASE_CONNECTION]"
                );;
                reject_promise();
            });;
            
        });;
    
        //:----------------------:QUERY_TEXT:WILL_BE_RAN_HERE://

    //:------------------------------------------------------://
    //:               END:DATABASE_OPERATIONS:               ://
    //:------------------------------------------------------://
    };;  //:InitDatabase:readFile,err? //:-------------------://
    });; //:InitDatabase:readFile      //:-------------------://
    });; //:InitDatabase:PROMISE       //:-------------------://
    };;  //:InitDatabase:BODY          //:-------------------://
