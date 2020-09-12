




/** This function does not reference any[ extern / global ]  **/
/** variables, so it can be cut+pasted as a snippet when     **/
/** quickly hacking things together.                         **/
function AHK_NEW_JQueryForm_Post(){ "use strict"

    //:Make_Sure_Document_Body_Exists:-----------------------://
    //:SC_JQ_GET_DOC_BOD_2020:-------------------------------://
    
        let nat_bod =( document.body );
        if(!nat_bod){
            nat_bod = document.createElement("BODY");
            document.body=( nat_bod );  
        };;
        const DOC_BOD=$( document.body );
    
    //:-------------------------------:SC_JQ_GET_DOC_BOD_2020://
    //:-----------------------:Make_Sure_Document_Body_Exists://

    const _2020_09_11_=""
    ,          I="<input>"
    ,          T="<textarea>"
    ,   T_I=$( T ).attr({ "cols":"64"    , "rows":"32"   })
    ,   BTN=$( I ).attr({ "type":"button", "value":"BTN" })
    ,   T_O=$( T ).attr({ "cols":"64"    , "rows":"32"   })
    ;;

    //:Graph/Tree structure only here:
    DOC_BOD.append([
        T_I //:Text____Input
    ,   BTN //:Submit_Button
    ,   T_O //:Text___Output
    ]);

    BTN.on("click",(j_q_evt)=>{

        let dat={
            
            /** When set to positive value, no code is       **/
            /** executed and the response back from          **/
            /** server is this object. This is so we can     **/
            /** confirm the server gets the data we think    **/
            /** we are sending it. - - - - - - - - - - - - - **/
            debug_payload:1

        ,   a:"aaa"
        ,   b:"bbb"
        ,   c:"ccc"
        };;
        let dat_str=( JSON.stringify( dat ) );

        let url =(""                                    
            +"https://"                                 
            +"njs-paypal-01.herokuapp.com/"  
            +"DANGER_ZONE.API"                       
        );;
        let xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.send(dat_str /** dat **/ );
            xhr.onreadystatechange=(e)=>{
                console.log(e                 );
                console.log( xhr.status       );
                console.log( xhr.readyState   );
                console.log( xhr.responseText );
                if( xhr.readyState===4 ){
                     
                    T_O.val(()=>{ return(xhr.responseText); });

                };;
            };;

    });;

};;


AHK_NEW_JQueryForm_Post();


 
