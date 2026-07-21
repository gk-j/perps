export enum eventEnums {
    CREATE_USER = "create_user",
    CREATE_ORDER = "create_order",
    CANCEL_ORDER = "cancel_order",
    CREDIT_BALANCE = "credit_balance",
    GET_ACCOUNT_STATE = "get_account_state",
    GET_OPEN_POSITIONS = "get_open_positions",
    GET_OPEN_ORDERS = "get_open_orders",
    GET_ORDERBOOK = "get_orderbook",
    CLOSE_POSITION = "close_position",
} 


export enum eventResponseEnums {
  CREATE_USER_RESPONSE = "create_user_response",
  CREDIT_BALANCE_RESPONSE = "credit_balance_response",

  CREATE_ORDER_RESPONSE = "create_order_response",
  CANCEL_ORDER_RESPONSE = "cancel_order_response",
  CLOSE_POSITION_RESPONSE = "close_position_response",
  GET_ORDERBOOK_RESPONSE = "get_orderbook_response",
  
  GET_ACCOUNT_STATE_RESPONSE = "get_account_state_response",
  GET_OPEN_POSITIONS_RESPONSE = "get_open_positions_response",
  GET_OPEN_ORDERS_RESPONSE = "get_open_orders_response",
  
  
  INDEX_PRICE_UPDATE = "index_price_update",
  DEPTH_UPDATE = "depth_update",
  
  
  USER_EVENT = "user_event",
  TRADE_UPDATE = "trade_update",
}