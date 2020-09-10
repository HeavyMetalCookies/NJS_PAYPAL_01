
    var database_inited=( false );

    const   fs = require(  "fs"); //:File System
    const http = require("http"); //:HTTP

    function ServerTrafficHandler(
        server_req //:Incomming request  from client.
    ,   server_res //:Outgoing  response from server.
    ){

        //:sob:State_Object_Bundle:
        const sob={
            server_req
        ,   server_res
        };;

        //:If database not initialized, pause here until
        //:the database is initialized.
        if( !database_inited ){ 
             database_inited=(true);
             await InitDatabase( sob );
        };;

        server_res.write("[hello_world]");
        server_res.end();

    };;

    const SERVER=http.createServer( ServerTrafficHandler );

    //: Start up the server. Listen for traffic on port in   ://
    //: heroku virtual machine (physical server) environment ://
    //: variables,or test locally on hard coded port number. ://
    SERVER.listen( process.env.PORT || 5190 /**AIM_PORT**/ );



    function InitDatabase( sob ){
    new Promise(function(resolve_promise, reject_promise) {

        fs.readFile( "./SQL/TAB_001.CREATE_IF_NOT_EXISTS.PGSQL"
        ,( err, dat )=>{
            if( err ){
                reject_promise( "[FILE_READ_ERROR]" );
            }else{

                var QUERY_TEXT_WILL_BE_RAN_HERE=( 
                    dat.toString() 
                );;

                //:QUERY_TEXT_WILL_BE_RAN_HERE:--------------://

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

                    QUERY_TEXT_WILL_BE_RAN_HERE

                ).then(     ( pg_res )=>{

                    //:Okay. Do nothing.

                }).catch(   ( pg_err )=>{

                    reject_promise("[DATABASE_SETUP:FAIL]");

                }).finally( (        )=>{

                    //: Wait here to close connection. - - - ://
                    //: When "end()" called without a  - - - ://
                    //: callback parameter,            - - - ://
                    //: it returns a promise.          - - - ://
                    await pg_client.end(); 
                    resolve_promise();
                });;

                //:--------------:QUERY_TEXT_WILL_BE_RAN_HERE://
            };;
        });;
    };;};;


