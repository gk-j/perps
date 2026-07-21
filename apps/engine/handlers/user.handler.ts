import { eventResponseEnums } from "@repo/commontypes";
import type { EventHandler } from "../dispatcher/eventDispatcher";
import { USERMANAGER } from "../state";
import { errorResponse, successResponse } from "../utils/responseHandlers";
import { mapErrorToResponse } from "../utils/mapErrorToResponse";
// should initiate user
export class CreateUserHandler implements EventHandler{
    handle(event:any):any{
        try {
            const {userId} = event.payload
            if(USERMANAGER.hasUser(userId)){
                return errorResponse(
                    event.requestId,
                    eventResponseEnums.CREATE_USER_RESPONSE,
                    "USER_ALREADY_EXISTS",
                    ); 
            }
            USERMANAGER.createUser(userId)
            return successResponse(
                event.requestId,
                eventResponseEnums.CREATE_USER_RESPONSE,
                { userId },
            );
        } catch (error) {
            return mapErrorToResponse(
            error,
            eventResponseEnums.CREATE_USER_RESPONSE,
            event.requestId,
        );
        }
    }
}