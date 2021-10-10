// we should mock axios in order to unit test the service
import EventService from "@/services/events/EventService";
import mockAxios from "jest-mock-axios";


describe('Event service testing', () => {
    afterEach(() => {
        mockAxios.reset();
    });
    it('Should return the list of events', async () => {
        const events = {
            "items": [
                {
                    "id": 740,
                    "position": {
                        "name": "Computers",
                        "color": "yellow",
                        "id": 153
                    },
                    "startsAt": "2020-09-05T09:00:00.000Z",
                    "endsAt": "2020-09-05T13:00:00.000Z"
                }
            ],
            "pagination": {
                "offset": 15,
                "limit": 1,
                "count": 27
            }
        };
        mockAxios.get.mockResolvedValueOnce(events);
        const response = await EventService.getAllEvents({});
        expect(response).toEqual(events);

    });

    it('Should return the detailed event', async () => {
        const event = {
            "id": 740,
            "startsAt": "2020-09-05T09:00:00.000Z",
            "endsAt": "2020-09-05T13:00:00.000Z",
            "position": {
                "name": "Computers",
                "color": "yellow",
                "id": 153
            },
            "employees": [
                {
                    "firstName": "Nicolette",
                    "lastName": "Hansen",
                    "image": "https://cdn.fakercloud.com/avatars/smenov_128.jpg",
                    "id": 266
                },
                {
                    "firstName": "Stella",
                    "lastName": "Wuckert",
                    "image": "https://cdn.fakercloud.com/avatars/caspergrl_128.jpg",
                    "id": 60
                },
                {
                    "firstName": "August",
                    "lastName": "Feil",
                    "image": "https://cdn.fakercloud.com/avatars/juaumlol_128.jpg",
                    "id": 218
                }
            ]
        }
        mockAxios.get.mockResolvedValueOnce(event);
        const response = await EventService.getEvent(740);
        expect(response).toEqual(event);

    });

});
