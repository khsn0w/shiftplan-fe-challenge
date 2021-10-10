import { EventPreview } from "./EventPreview";
import { Pagination } from "../shared/Pagination";

export class EventsResponse {
  items: EventPreview[];
  pagination: Pagination;
}
