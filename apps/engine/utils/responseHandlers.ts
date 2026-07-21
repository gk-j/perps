import type { eventResponseEnums } from "@repo/commontypes";


export function successResponse<T>(
  requestId: string,
  kind: eventResponseEnums,
  data: T,
  message: string | null = null,
): any {
  return {
    requestId,
    kind,
    data: { success: true, message, data },
  } ;
}

export function errorResponse(
  requestId: string,
  kind: eventResponseEnums,
  message: string,
) {
  return {
    requestId,
    kind,
    data: { success: false, message, data: null },
  } ;
}
