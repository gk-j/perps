
import { createClient } from "redis";
import { requestMap } from "./requestMap";
import { eventResponseEnums, eventSchema } from "@repo/commontypes";

const consumerRedis = await createClient().connect();

export async function listenForRequestId() {
  let lastId = "0";

  while (true) {
    try {
      const res = await consumerRedis.xRead(
        { key: "stream2", id: lastId },
        { COUNT: 1, BLOCK: 0 },
      );

      if (!res || !Array.isArray(res)) continue;

      const message = res[0]?.messages?.[0];
      if (!message) continue;
      lastId = message.id;
      const parsedData = JSON.parse(message.message.data);
      console.log(parsedData);
      const payload = eventSchema.parse(parsedData);

      if (payload.type === eventResponseEnums.CREATE_USER_RESPONSE) {
        if (payload.requestId) {
          const pendingRequest = requestMap.get(payload.requestId);
          if (!pendingRequest) {
            continue;
          }
          clearTimeout(pendingRequest.timeOutId);
          requestMap.delete(payload.requestId);
          pendingRequest.resolve(payload.data);
        }
      } else if (payload.type === eventResponseEnums.CREATE_ORDER_RESPONSE) {
        if (payload.requestId) {
          const pendingRequest = requestMap.get(payload.requestId);
          if (!pendingRequest) {
            continue;
          }
          clearTimeout(pendingRequest.timeOutId);
          requestMap.delete(payload.requestId);
          pendingRequest.resolve(payload.data);
        }
      } 
    } catch (e) {
      console.error(e);
      continue;
    }
  }
}
