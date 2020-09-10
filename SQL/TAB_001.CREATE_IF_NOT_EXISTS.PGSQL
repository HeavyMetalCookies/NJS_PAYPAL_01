
-- tab_001 === PayPal Credentials Table
-- This table will hold authorization info for paypal.
CREATE TABLE IF NOT EXISTS tab_001(

    -- iid: Integer ID
    iid SERIAL PRIMARY KEY

    -- All data as one big string.
,   data       VARCHAR( 2048 )         

    -- Must be one or the other, not both:
,   is_sandbox BOOL  --Is it a sandbox?
,   is_live    BOOL  --Is it live?
);;



