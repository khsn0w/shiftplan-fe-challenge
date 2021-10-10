import {EventsPayload} from "@/models/events/EventsPayload";
import {EventPreview} from "@/models/events/EventPreview";
import {EventsDetails} from "@/models/events/EventsDetails";

export default class EventStoreModel extends EventsPayload {
    events: EventPreview[] | undefined;
    event: EventsDetails | undefined;
    hasMoreData: boolean;
}
