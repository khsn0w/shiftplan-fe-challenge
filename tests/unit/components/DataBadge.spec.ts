import {mount} from '@vue/test-utils'
import DataBadge from '@/components/EventsComponents/DateBadge.vue'

describe('Data Badge Component', () => {
    it('Should render normally', () => {
        const BadgeComponent = mount(DataBadge, {
            propsData: {
                date: new Date().toISOString()
            }
        });
        // item is rendered
        expect(BadgeComponent.find('.badge')).toBeTruthy();
    })

    it('should format date correctly', () => {
        // 10, 12, 2021 00:10
        const dateToRender = new Date('2021-12-10T00:10:00');
        const badgeComponent = mount(DataBadge, {
            propsData: {
                date: dateToRender.toISOString(),
                format: 'DD, MM, yyyy HH:mm'
            }
        });
        expect(badgeComponent.text()).toContain('10, 12, 2021 00:10')
    })

    it('Should render the specified color', () => {
        const badgeSuccessComponent = mount(DataBadge, {
            propsData: {
                date: new Date().toISOString(),
                type: 'start'
            }
        });

        expect(badgeSuccessComponent.find('.badge-success')).toBeTruthy();

        const badgeDangerComponent = mount(DataBadge, {
            propsData: {
                date: new Date().toISOString(),
                type: 'end'
            }
        });

        expect(badgeDangerComponent.find('.badge-danger')).toBeTruthy();

    })


})
