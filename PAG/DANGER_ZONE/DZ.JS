




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
    ,   T_I=$( T ).attr({ "cols":"64" , "rows":"128" })
    ,   BTN=$( I ).attr({ "type":"button", "value":"BTN" })
    ,   T_O=$( T ).attr({ "cols":"64" , "rows":"128" })
    ;;

    //:Graph/Tree structure only here:
    DOC_BOD.append([
        T_I //:Text____Input
    ,   BTN //:Submit_Button
    ,   T_O //:Text___Output
    ]);


};;


AHK_NEW_JQueryForm_Post();