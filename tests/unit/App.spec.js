import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import App from '@/App.vue';
import StopClock from '@/components/StopClock.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/:id', component: App },
    // { path: '/1', component: App },
    // { path: '/2', component: App },
  ],
});

describe('App.vue', () => {
  let app;
  let stopclock1;
  let stopclock2;
  let stopclockArray;

  beforeEach(() => {
    app = shallowMount(App, { localVue, router });

    stopclockArray = app.findAll(StopClock);
    stopclock1 = stopclockArray.wrappers[0];
    stopclock2 = stopclockArray.wrappers[1];
  });

  it('contains two StopClocks with equal start time', () => {
    expect(stopclockArray.length).to.equal(2);
    expect(stopclockArray.is(StopClock)).to.be.true;

    expect(stopclock1.props().minutes).to.equal(stopclock2.props().minutes);
    expect(stopclock1.props().seconds).to.equal(stopclock2.props().seconds);
  });

  it('for "/1" path: starts 1st Stopclock, stops 2nd one', () => {
    router.push('/1');
    expect(stopclock1.props().run).to.equal(true);
    expect(stopclock2.props().run).to.equal(false);
  });

  it('for "/2" path: starts 2nd Stopclock, stops 1st one', () => {
    router.push('/2');
    expect(stopclock2.props().run).to.equal(true);
    expect(stopclock1.props().run).to.equal(false);
  });

  it('swiches path on "stop" event from any StopClock', () => {
    stopclock1.vm.$emit('stop');
    expect(router.currentRoute.path).to.equal('/2');

    stopclock2.vm.$emit('stop');
    expect(router.currentRoute.path).to.equal('/1');
  });

  it('stops both StopClocks when 1st one emits "end"', () => {
    stopclock1.vm.$emit('end');
    expect(stopclock1.props().run).to.equal(false);
    expect(stopclock2.props().run).to.equal(false);
  });

  it('stops both StopClocks when 2nd one emits "end"', () => {
    stopclock2.vm.$emit('end');
    expect(stopclock1.props().run).to.equal(false);
    expect(stopclock2.props().run).to.equal(false);
  });
});
