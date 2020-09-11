


//:Make_Sure_Document_Body_Exists:---------------------------://
    //:SC_JQ_GET_DOC_BOD_2020:-------------------------------://

    let nat_bod =( document.body );
    if(!nat_bod){
        nat_bod = document.createElement("BODY");
        document.body=( nat_bod );  
    };;
    const DOC_BOD=$( document.body );

    //:-------------------------------:SC_JQ_GET_DOC_BOD_2020://
//:---------------------------:Make_Sure_Document_Body_Exists://


function AHK_NEW_JQueryForm_Post(){

    const ___
    ,          I="<input>"
    ,   BOD=DOC_BOD;
    ,   TXT=$( I ).attr({ "type":"text" })
    ,   BTN=$( I ).attr({ "type" :"button", "value":"BTN" })
    ;;

    //:Graph/Tree structure only here:
    BOD.append([
        TXT
    ,   BTN
    ]);


};;


AHK_NEW_JQueryForm_Post();