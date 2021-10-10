import http from "../../helpers/http-common";
import {EventsPayload} from "@/models/events/EventsPayload";

class EventService {

    getAllEvents(payload: EventsPayload): Promise<any> {
        return http.get("/events", {
            params: {
                ...payload
            }
        });
    }

    getEvent(id: number): Promise<any> {
        return http.get(`/events/${id}`);
    }
}


export default new EventService();

