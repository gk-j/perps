
import type { eventResponseEnums } from "@repo/commontypes";
import {
  InsufficientMarginError,
  OrderbookNotFoundError,
  OrderNotCancellableError,
  OrderNotFoundError,
  PositionNotFoundError,
  UnauthorizedOrderError,
  UserNotFoundError,
} from "./errors";
import { errorResponse } from "./responseHandlers";


export function mapErrorToResponse(
  error: unknown,
  responseKind: eventResponseEnums,
  requestId: string,
): any {
  if (error instanceof UserNotFoundError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof InsufficientMarginError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof OrderbookNotFoundError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof OrderNotFoundError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof UnauthorizedOrderError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof OrderNotCancellableError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  if (error instanceof PositionNotFoundError) {
    return errorResponse(requestId, responseKind, error.message);
  }
  throw error;
}
