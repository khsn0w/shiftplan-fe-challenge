import {mount, shallowMount} from '@vue/test-utils'
import ListItem from "@/components/EventsComponents/ListItem.vue";

describe('List Item tests', () => {
    it('Should render', () => {
        const ListItemComponent = mount(ListItem, {
            propsData: {
                title: 'Shyft Plan'
            }
        });
        expect(ListItemComponent.text()).toContain('Shyft Plan');
    });
    it('should display image and dates', () => {
        // we don't need to instantiate the child components cause they are already tested!
        const ListItemComponent = shallowMount(ListItem, {
            propsData: {
                title: 'Shyft Plan',
                image: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/y8fneyrrjus4o4ogd4jd',
                start: new Date().toISOString(),
                end: new Date().toISOString()
            }
        });
        expect(ListItemComponent.text()).toContain('Shyft Plan');
        expect(ListItemComponent.find('.avatar')).toBeTruthy();

    })
    it('should trigger clicks if clicked', async () => {
        const ListItemComponent = mount(ListItem, {
            propsData: {
                title: 'Shyft Plan',
                clickable: true
            }
        });
        // click on the item
        await ListItemComponent.trigger('click');
        expect(ListItemComponent.emitted().click).toBeTruthy();
    })
})
