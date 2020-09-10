
INSERT INTO tab_001
    ( iid    ,   data   ,   is_sandbox   ,   is_live   )
VALUES
    ( DEFAULT, {{data}} , {{is_sandbox}} , {{is_live}} )
;;

-- EXAMPLE:                                                   --
--                                                            --
-- INSERT INTO tab_001                                        --
--     ( iid    ,   data   ,   is_sandbox   ,   is_live   )   --
-- VALUES                                                     --
--     ( DEFAULT, 'ksdfs' , true , false )                    --
-- ;;